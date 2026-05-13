import { h, a as h$1, m, r, k } from "../_chunks/_libs/@takumi-rs/helpers.mjs";
async function loadRendererResources(renderer, options) {
  const tasks = [];
  if (options?.fonts && options.fonts.length > 0) tasks.push(renderer.loadFonts(options.fonts));
  if (options?.persistentImages && options.persistentImages.length > 0) tasks.push(...options.persistentImages.map((image) => Promise.resolve(renderer.putPersistentImage(image, options.signal))));
  if (tasks.length > 0) await Promise.all(tasks);
}
let importPromise = null;
function getImports(module) {
  importPromise ??= getImportsImpl(module);
  return importPromise;
}
async function getImportsImpl(module) {
  if (module) return initializeWasm(module);
  if (shouldSkipCoreImport()) return initializeWasm(importWasmBindings());
  try {
    return await import("../_chunks/_libs/@takumi-rs/core.mjs");
  } catch (error) {
    if (isNodeEnvironment()) throw new Error("Failed to load @takumi-rs/core in Node.js runtime. Takumi requires the native napi-rs module in Node environments.", { cause: error });
    console.warn("Unable to import @takumi-rs/core. Falling back to auto-detection of WASM bindings.", { cause: error });
  }
  return initializeWasm(importWasmBindings());
}
async function initializeWasm(module) {
  const wasm = await import("../_chunks/_libs/@takumi-rs/wasm.mjs").then(function(n) {
    return n._;
  });
  const resolvedModule = typeof module === "function" ? await module() : await module;
  const wasmModule = resolvedModule !== void 0 && typeof resolvedModule === "object" && "default" in resolvedModule ? resolvedModule.default : resolvedModule;
  try {
    await wasm.default(wasmModule ? { module_or_path: wasmModule } : void 0);
    return wasm;
  } catch (error) {
    throw new Error("Couldn't automatically resolve Takumi native bindings. Please specify the module option with the WASM module.", { cause: error });
  }
}
function hackFakeProcessForBrowser() {
  const before = globalThis.process;
  globalThis.process ??= {};
  globalThis.process.env ??= {};
  return before;
}
async function importWasmBindings() {
  const beforeProcess = hackFakeProcessForBrowser();
  const nextPath = "@takumi-rs/wasm/next";
  if (process.env.NEXT_RUNTIME) {
    globalThis.process = beforeProcess;
    return import(
      /* @vite-ignore */
      nextPath
    );
  }
  globalThis.process = beforeProcess;
  return import(
    /* turbopackIgnore: true */
    /* webpackIgnore: true */
    "../_chunks/_libs/@takumi-rs/wasm.mjs"
  ).then(function(n) {
    return n.n;
  });
}
function shouldSkipCoreImport() {
  const beforeProcess = hackFakeProcessForBrowser();
  if (process.env.NEXT_RUNTIME === "edge") {
    globalThis.process = beforeProcess;
    return true;
  }
  globalThis.process = beforeProcess;
  if (typeof window !== "undefined") return true;
  if (typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") return true;
  if ("WebSocketPair" in globalThis) return true;
  if ("EdgeRuntime" in globalThis) return true;
  const maybeWorkerGlobalScope = globalThis.WorkerGlobalScope;
  if (maybeWorkerGlobalScope !== void 0 && maybeWorkerGlobalScope.prototype.isPrototypeOf(globalThis)) return true;
  return false;
}
function isNodeEnvironment() {
  return typeof process !== "undefined" && typeof process.versions === "object" && process.versions !== null && typeof process.versions.node === "string";
}
let globalRenderer;
function isTakumiNode(element) {
  if (typeof element !== "object" || element === null || !("type" in element)) return false;
  return element.type === "container" || element.type === "text" || element.type === "image";
}
async function transformElement(element, options) {
  if (isTakumiNode(element)) return {
    node: element,
    stylesheets: []
  };
  if (typeof element === "string") return r(element);
  return k(element, options?.jsx);
}
async function render(element, options) {
  const imports = await getImports(options && "module" in options ? options.module : void 0);
  const isExternalRenderer = options && "renderer" in options;
  const renderer = isExternalRenderer ? options.renderer : globalRenderer ??= new imports.Renderer({ loadDefaultFonts: options?.loadDefaultFonts });
  if (!isExternalRenderer) await loadRendererResources(renderer, options);
  const { node: originalNode, stylesheets } = await transformElement(element, options);
  const emojiType = options?.emoji ?? "twemoji";
  const node = emojiType !== "from-font" ? h(originalNode, emojiType) : originalNode;
  const fetchedResources = options?.fetchedResources ?? await h$1(m(node), options?.resourcesOptions);
  const renderOptions = {
    ...options,
    fetchedResources,
    stylesheets: [...options?.stylesheets ?? [], ...stylesheets]
  };
  return renderer.render(node, renderOptions, options?.signal);
}
function mergeOptions(defaultOptions, options) {
  return options;
}
const contentTypeMap = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
  ico: "image/x-icon",
  raw: "application/octet-stream"
};
function defaultErrorHandler(error) {
  console.error("Failed to render image.");
  console.error(error);
}
function createImageResponse(defaultOptions) {
  return function imageResponse(element, options) {
    const mergedOptions = mergeOptions(defaultOptions, options);
    let resolveReady;
    let rejectReady;
    const ready = new Promise((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = reject;
    });
    const stream = new ReadableStream({ async start(controller) {
      try {
        const image = await render(element, mergedOptions);
        controller.enqueue(image);
        controller.close();
        resolveReady();
      } catch (error) {
        controller.error(error);
        rejectReady(error);
        await (mergedOptions?.onError ?? defaultErrorHandler)(error);
      }
    } });
    const headers = new Headers(mergedOptions?.headers);
    if (!headers.get("content-type")) headers.set("content-type", contentTypeMap[mergedOptions?.format ?? "png"]);
    const response = new Response(stream, {
      headers,
      status: mergedOptions?.status,
      statusText: mergedOptions?.statusText
    });
    return Object.defineProperty(response, "ready", {
      enumerable: false,
      value: ready,
      writable: false
    });
  };
}
let defaultImageResponse;
var ImageResponse = class extends Response {
  ready;
  constructor(component, options) {
    defaultImageResponse ??= createImageResponse();
    const response = defaultImageResponse(component, options);
    super(response.body, response);
    this.ready = response.ready;
  }
};
export {
  ImageResponse as I,
  createImageResponse as c
};
