import { createRequire } from "node:module";
import { m } from "./helpers.mjs";
const require$1 = createRequire(import.meta.url);
new URL(".", import.meta.url).pathname;
const { readFileSync } = require$1(
  /* turbopackOptional: true */
  "node:fs"
);
let nativeBinding = null;
const loadErrors = [];
const isMusl = () => {
  let musl = false;
  if (process.platform === "linux") {
    musl = isMuslFromFilesystem();
    if (musl === null) musl = isMuslFromReport();
    if (musl === null) musl = isMuslFromChildProcess();
  }
  return musl;
};
const isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-");
const isMuslFromFilesystem = () => {
  try {
    return readFileSync("/usr/bin/ldd", "utf-8").includes("musl");
  } catch {
    return null;
  }
};
const isMuslFromReport = () => {
  var _process$report;
  let report = null;
  if (typeof ((_process$report = process.report) === null || _process$report === void 0 ? void 0 : _process$report.getReport) === "function") {
    process.report.excludeNetwork = true;
    report = process.report.getReport();
  }
  if (!report) return null;
  if (report.header && report.header.glibcVersionRuntime) return false;
  if (Array.isArray(report.sharedObjects)) {
    if (report.sharedObjects.some(isFileMusl)) return true;
  }
  return false;
};
const isMuslFromChildProcess = () => {
  try {
    return require$1(
      /* turbopackOptional: true */
      "child_process"
    ).execSync("ldd --version", { encoding: "utf8" }).includes("musl");
  } catch (e) {
    return false;
  }
};
function requireNative() {
  if (process.env.TAKUMI_CORE_TARGET) try {
    return require$1(
      /* turbopackOptional: true */
      process.env.TAKUMI_CORE_TARGET
    );
  } catch (err) {
    loadErrors.push(err);
  }
  else if (process.platform === "android") if (process.arch === "arm64") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.android-arm64.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-android-arm64/core.android-arm64.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-android-arm64/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else if (process.arch === "arm") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.android-arm-eabi.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-android-arm-eabi/core.android-arm-eabi.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-android-arm-eabi/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Android ${process.arch}`));
  else if (process.platform === "win32") if (process.arch === "x64") {
    var _process$config, _process$config2;
    if (((_process$config = process.config) === null || _process$config === void 0 || (_process$config = _process$config.variables) === null || _process$config === void 0 ? void 0 : _process$config.shlib_suffix) === "dll.a" || ((_process$config2 = process.config) === null || _process$config2 === void 0 || (_process$config2 = _process$config2.variables) === null || _process$config2 === void 0 ? void 0 : _process$config2.node_target_type) === "shared_library") {
      try {
        return require$1(
          /* turbopackOptional: true */
          "../core.win32-x64-gnu.node"
        );
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-win32-x64-gnu/core.win32-x64-gnu.node"
        );
        const bindingPackageVersion = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-win32-x64-gnu/package.json"
        ).version;
        if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else {
      try {
        return require$1(
          /* turbopackOptional: true */
          "../core.win32-x64-msvc.node"
        );
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-win32-x64-msvc/core.win32-x64-msvc.node"
        );
        const bindingPackageVersion = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-win32-x64-msvc/package.json"
        ).version;
        if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    }
  } else if (process.arch === "ia32") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.win32-ia32-msvc.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-win32-ia32-msvc/core.win32-ia32-msvc.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-win32-ia32-msvc/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else if (process.arch === "arm64") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.win32-arm64-msvc.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-win32-arm64-msvc/core.win32-arm64-msvc.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-win32-arm64-msvc/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Windows: ${process.arch}`));
  else if (process.platform === "darwin") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.darwin-universal.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-darwin-universal/core.darwin-universal.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-darwin-universal/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
    if (process.arch === "x64") {
      try {
        return require$1(
          /* turbopackOptional: true */
          "../core.darwin-x64.node"
        );
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-darwin-x64/core.darwin-x64.node"
        );
        const bindingPackageVersion = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-darwin-x64/package.json"
        ).version;
        if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require$1(
          /* turbopackOptional: true */
          "../core.darwin-arm64.node"
        );
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-darwin-arm64/core.darwin-arm64.node"
        );
        const bindingPackageVersion = require$1(
          /* turbopackOptional: true */
          "@takumi-rs/core-darwin-arm64/package.json"
        ).version;
        if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on macOS: ${process.arch}`));
  } else if (process.platform === "freebsd") if (process.arch === "x64") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.freebsd-x64.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-freebsd-x64/core.freebsd-x64.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-freebsd-x64/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else if (process.arch === "arm64") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.freebsd-arm64.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-freebsd-arm64/core.freebsd-arm64.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-freebsd-arm64/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
  else if (process.platform === "linux") if (process.arch === "x64") if (isMusl()) {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-x64-musl.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-x64-musl/core.linux-x64-musl.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-x64-musl/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-x64-gnu.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-x64-gnu/core.linux-x64-gnu.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-x64-gnu/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  }
  else if (process.arch === "arm64") if (isMusl()) {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-arm64-musl.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm64-musl/core.linux-arm64-musl.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm64-musl/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-arm64-gnu.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm64-gnu/core.linux-arm64-gnu.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm64-gnu/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  }
  else if (process.arch === "arm") if (isMusl()) {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-arm-musleabihf.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm-musleabihf/core.linux-arm-musleabihf.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm-musleabihf/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-arm-gnueabihf.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm-gnueabihf/core.linux-arm-gnueabihf.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-arm-gnueabihf/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  }
  else if (process.arch === "loong64") if (isMusl()) {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-loong64-musl.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-loong64-musl/core.linux-loong64-musl.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-loong64-musl/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-loong64-gnu.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-loong64-gnu/core.linux-loong64-gnu.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-loong64-gnu/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  }
  else if (process.arch === "riscv64") if (isMusl()) {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-riscv64-musl.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-riscv64-musl/core.linux-riscv64-musl.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-riscv64-musl/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-riscv64-gnu.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-riscv64-gnu/core.linux-riscv64-gnu.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-riscv64-gnu/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  }
  else if (process.arch === "ppc64") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-ppc64-gnu.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-ppc64-gnu/core.linux-ppc64-gnu.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-ppc64-gnu/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else if (process.arch === "s390x") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.linux-s390x-gnu.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-s390x-gnu/core.linux-s390x-gnu.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-linux-s390x-gnu/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Linux: ${process.arch}`));
  else if (process.platform === "openharmony") if (process.arch === "arm64") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.openharmony-arm64.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-openharmony-arm64/core.openharmony-arm64.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-openharmony-arm64/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else if (process.arch === "x64") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.openharmony-x64.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-openharmony-x64/core.openharmony-x64.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-openharmony-x64/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else if (process.arch === "arm") {
    try {
      return require$1(
        /* turbopackOptional: true */
        "../core.openharmony-arm.node"
      );
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-openharmony-arm/core.openharmony-arm.node"
      );
      const bindingPackageVersion = require$1(
        /* turbopackOptional: true */
        "@takumi-rs/core-openharmony-arm/package.json"
      ).version;
      if (bindingPackageVersion !== "1.1.2" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.1.2 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
  } else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
  else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
}
nativeBinding = requireNative();
if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
  let wasiBinding = null;
  let wasiBindingError = null;
  try {
    wasiBinding = require$1(
      /* turbopackOptional: true */
      "./core.wasi.cjs"
    );
    nativeBinding = wasiBinding;
  } catch (err) {
    if (process.env.NAPI_RS_FORCE_WASI) wasiBindingError = err;
  }
  if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) try {
    wasiBinding = require$1(
      /* turbopackOptional: true */
      "@takumi-rs/core-wasm32-wasi/core.wasm32-wasi.node"
    );
    nativeBinding = wasiBinding;
  } catch (err) {
    if (process.env.NAPI_RS_FORCE_WASI) {
      if (!wasiBindingError) wasiBindingError = err;
      else wasiBindingError.cause = err;
      loadErrors.push(err);
    }
  }
  if (process.env.NAPI_RS_FORCE_WASI === "error" && !wasiBinding) {
    const error = /* @__PURE__ */ new Error("WASI binding not found and NAPI_RS_FORCE_WASI is set to error");
    error.cause = wasiBindingError;
    throw error;
  }
}
if (!nativeBinding) {
  if (loadErrors.length > 0) throw new Error("Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.", { cause: loadErrors.reduce((err, cur) => {
    cur.cause = err;
    return cur;
  }) });
  throw new Error(`Failed to load native binding`);
}
const { Renderer: Renderer$1, AnimationOutputFormat, DitheringAlgorithm, OutputFormat } = nativeBinding;
var Renderer = class extends Renderer$1 {
  fontsMark = /* @__PURE__ */ new Set();
  fontBuffersMark = /* @__PURE__ */ new WeakSet();
  persistentImageSrcMark = /* @__PURE__ */ new Set();
  pendingPersistentImages = /* @__PURE__ */ new Map();
  async putPersistentImage(source, signal) {
    if (!this.isNewPersistentImage(source.src)) return this.pendingPersistentImages.get(source.src);
    const pending = resolveImageLoader(source).then(async (resolved) => {
      if (signal === null || signal === void 0 ? void 0 : signal.aborted) return;
      await super.putPersistentImage(resolved, signal);
      this.persistentImageSrcMark.add(source.src);
    }).finally(() => {
      this.pendingPersistentImages.delete(source.src);
    });
    this.pendingPersistentImages.set(source.src, pending);
    return pending;
  }
  async loadFonts(fonts, signal) {
    const batchFontsMark = /* @__PURE__ */ new Set();
    const batchFontBuffersMark = /* @__PURE__ */ new WeakSet();
    const targetFonts = fonts.filter((font) => {
      const key = createFontKey(font);
      if (isBuffer(key)) {
        if (this.fontBuffersMark.has(key) || batchFontBuffersMark.has(key)) return false;
        batchFontBuffersMark.add(key);
        return true;
      }
      if (this.fontsMark.has(key) || batchFontsMark.has(key)) return false;
      batchFontsMark.add(key);
      return true;
    });
    const resolvedFonts = await Promise.all(targetFonts.map(resolveFontLoader));
    const loadedCount = await super.loadFonts(resolvedFonts, signal);
    targetFonts.forEach((font) => this.checkAndMarkFont(font));
    return loadedCount;
  }
  async loadFont(data, signal) {
    if (!this.isNewFont(data)) return 0;
    const resolved = await resolveFontLoader(data);
    const loadedCount = await super.loadFont(resolved, signal);
    this.checkAndMarkFont(data);
    return loadedCount;
  }
  loadFontSync(font) {
    if (!this.isNewFont(font)) return;
    const resolved = resolveSyncFontLoader(font);
    super.loadFontSync(resolved);
    this.checkAndMarkFont(font);
  }
  clearImageStore() {
    super.clearImageStore();
    this.persistentImageSrcMark.clear();
    this.pendingPersistentImages.clear();
  }
  checkAndMarkFont(font) {
    const key = createFontKey(font);
    if (isBuffer(key)) {
      const isNew2 = !this.fontBuffersMark.has(key);
      this.fontBuffersMark.add(key);
      return isNew2;
    }
    const isNew = !this.fontsMark.has(key);
    this.fontsMark.add(key);
    return isNew;
  }
  isNewFont(font) {
    const key = createFontKey(font);
    return isBuffer(key) ? !this.fontBuffersMark.has(key) : !this.fontsMark.has(key);
  }
  isNewPersistentImage(src) {
    return !this.persistentImageSrcMark.has(src) && !this.pendingPersistentImages.has(src);
  }
};
function createFontKey(font) {
  var _font$name, _font$style, _font$weight;
  if ("key" in font && font.key) return font.key;
  if (isBuffer(font)) return font;
  return `${(_font$name = font.name) !== null && _font$name !== void 0 ? _font$name : ""}-${(_font$style = font.style) !== null && _font$style !== void 0 ? _font$style : ""}-${(_font$weight = font.weight) !== null && _font$weight !== void 0 ? _font$weight : ""}`;
}
async function resolveFontLoader(font) {
  if ("data" in font && typeof font.data === "function") return {
    ...font,
    data: await font.data()
  };
  return font;
}
async function resolveImageLoader(source) {
  if (typeof source.data === "function") return {
    ...source,
    data: await source.data()
  };
  return source;
}
function resolveSyncFontLoader(font) {
  if ("data" in font && typeof font.data === "function") return {
    ...font,
    data: font.data()
  };
  return font;
}
function isBuffer(data) {
  return data instanceof Uint8Array || data instanceof ArrayBuffer;
}
export {
  Renderer,
  m as extractResourceUrls
};
