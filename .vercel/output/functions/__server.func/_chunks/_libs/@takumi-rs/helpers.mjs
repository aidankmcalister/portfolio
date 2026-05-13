function e(e2, t2) {
  t2 && Object.keys(t2).length > 0 && (e2.style = t2);
}
function t(e2, t2) {
  t2 && Object.keys(t2).length > 0 && (e2.preset = t2);
}
function n(e2, t2) {
  t2.tagName !== void 0 && (e2.tagName = t2.tagName), t2.className !== void 0 && (e2.className = t2.className), t2.id !== void 0 && (e2.id = t2.id), t2.dir !== void 0 && (e2.dir = t2.dir), t2.attributes !== void 0 && (e2.attributes = t2.attributes);
}
function r$3(r2) {
  let i2 = { type: `container`, children: r2.children };
  return r2.tw && (i2.tw = r2.tw), n(i2, r2), t(i2, r2.preset), e(i2, r2.style), i2;
}
function i$2(r2, i2) {
  if (typeof r2 == `string`) {
    let t2 = { type: `text`, text: r2 };
    return e(t2, i2), t2;
  }
  let a2 = { type: `text`, text: r2.text };
  return r2.tw && (a2.tw = r2.tw), n(a2, r2), t(a2, r2.preset), e(a2, r2.style), a2;
}
function a$2(r2) {
  let i2 = { type: `image`, src: r2.src, width: r2.width, height: r2.height };
  return r2.tw && (i2.tw = r2.tw), n(i2, r2), t(i2, r2.preset), e(i2, r2.style), i2;
}
function s$2(e2) {
  return `${e2}%`;
}
const r$2 = /\uFE0F/g, i$1 = new RegExp("\\p{Extended_Pictographic}", "u"), a$1 = new RegExp("^(?:\\p{Regional_Indicator}){2}$", "u"), o$1 = /^[#*0-9]\uFE0F?\u20E3$/u;
function s$1(e2) {
  let t2 = e2.indexOf(`‍`) < 0 ? e2.replace(r$2, ``) : e2, n2 = ``;
  for (let e3 = 0, r2 = 0; e3 < t2.length; e3++) {
    let i2 = t2.charCodeAt(e3);
    if (r2) {
      let e4 = (65536 + (r2 - 55296 << 10) + (i2 - 56320)).toString(16);
      n2 += (n2 ? `-` : ``) + e4, r2 = 0;
    } else 55296 <= i2 && i2 <= 56319 ? r2 = i2 : n2 += (n2 ? `-` : ``) + i2.toString(16);
  }
  return n2;
}
const c$1 = { twemoji: (e2) => `https://cdn.jsdelivr.net/gh/jdecked/twemoji@17.0.2/assets/svg/${e2.toLowerCase()}.svg`, openmoji: `https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/`, blobmoji: `https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/`, noto: (e2) => `https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@v2.051/svg/emoji_u${e2.toLowerCase().replaceAll(`-`, `_`)}.svg`, fluent: (e2) => `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${e2.toLowerCase()}_color.svg`, fluentFlat: (e2) => `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${e2.toLowerCase()}_flat.svg` };
function l$1(e2, t2) {
  let n2 = s$1(e2), r2 = c$1[t2];
  return typeof r2 == `function` ? r2(n2) : `${r2}${n2.toUpperCase()}.svg`;
}
let u$1;
function d$2() {
  return u$1 === void 0 && (u$1 = typeof Intl < `u` && typeof Intl.Segmenter == `function` ? new Intl.Segmenter(`en`, { granularity: `grapheme` }) : null), u$1;
}
function f$2(e2) {
  let t2 = d$2();
  return t2 ? Array.from(t2.segment(e2)) : Array.from(e2).map((e3) => ({ segment: e3 }));
}
function p$2(e2) {
  return i$1.test(e2) || a$1.test(e2) || o$1.test(e2);
}
function m$2(n2, r2) {
  let i2 = [], a2 = ``, o2 = f$2(n2.text);
  for (let { segment: n3 } of o2) p$2(n3) ? (a2 &&= (i2.push(i$2({ text: a2 })), ``), i2.push(a$2({ src: l$1(n3, r2), style: { display: `inline-block`, width: `1em`, height: `1em`, margin: `0 0.05em 0 0.1em`, verticalAlign: `-0.1em` } }))) : a2 += n3;
  return a2 && i2.push(i$2({ text: a2 })), i2;
}
function h$2(e2, t2) {
  if (e2.type === `text`) {
    if (f$2(e2.text).some(({ segment: e3 }) => p$2(e3))) {
      let { type: r2, ...i2 } = e2;
      return r$3({ ...i2, children: m$2(e2, t2) });
    }
  } else if (e2.type === `container` && e2.children) return { ...e2, children: e2.children.map((e3) => e3 && h$2(e3, t2)) };
  return e2;
}
const d$1 = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
function f$1(e2) {
  return e2.startsWith(`https://`) || e2.startsWith(`http://`);
}
function p$1(e2, t2) {
  if (typeof e2 == `string`) for (let n2 of e2.matchAll(d$1)) {
    let e3 = n2[2]?.trim();
    e3 && f$1(e3) && t2.add(e3);
  }
  else if (Array.isArray(e2)) for (let n2 of e2) p$1(n2, t2);
}
function m$1(e2) {
  let t2 = /* @__PURE__ */ new Set(), n2 = (e3) => {
    let r2 = (e4) => {
      e4 && (p$1(e4.backgroundImage, t2), p$1(e4.maskImage, t2));
    };
    if (r2(e3.style), r2(e3.preset), e3.type === `image`) {
      typeof e3.src == `string` && f$1(e3.src) && t2.add(e3.src);
      return;
    }
    if (e3.type === `container`) for (let t3 of e3.children ?? []) n2(t3);
  };
  return n2(e2), [...t2];
}
async function h$1(e2, t2) {
  let n2 = AbortSignal.timeout(t2?.timeout ?? 5e3), r2 = t2?.fetch ?? globalThis.fetch, i2 = t2?.throwOnError ?? true, a2 = [...new Set(e2)].map(async (e3) => {
    if (t2?.cache?.has(e3)) {
      let n3 = t2.cache.get(e3);
      if (n3) return { src: e3, data: n3 };
    }
    let i3 = await r2(e3, { signal: n2 });
    if (!i3.ok) throw Error(`HTTP ${i3.status}: ${i3.statusText} for ${e3}`);
    let a3 = await i3.arrayBuffer();
    return t2?.cache?.set(e3, a3), { src: e3, data: a3 };
  });
  return i2 ? Promise.all(a2) : (await Promise.allSettled(a2)).filter((e3) => e3.status === `fulfilled`).map((e3) => e3.value);
}
const r$1 = { html: { display: `block` }, head: { display: `none` }, meta: { display: `none` }, title: { display: `none` }, link: { display: `none` }, style: { display: `none` }, script: { display: `none` }, body: { margin: 8, display: `block` }, p: { marginTop: `1em`, marginBottom: `1em`, display: `block` }, blockquote: { marginTop: `1em`, marginBottom: `1em`, marginLeft: 40, marginRight: 40, display: `block` }, center: { textAlign: `center`, display: `block` }, hr: { marginTop: `0.5em`, marginBottom: `0.5em`, marginLeft: `auto`, marginRight: `auto`, borderWidth: 1, display: `block` }, h1: { fontSize: `2em`, marginTop: `0.67em`, marginBottom: `0.67em`, marginLeft: 0, marginRight: 0, fontWeight: `bold`, display: `block` }, h2: { fontSize: `1.5em`, marginTop: `0.83em`, marginBottom: `0.83em`, marginLeft: 0, marginRight: 0, fontWeight: `bold`, display: `block` }, h3: { fontSize: `1.17em`, marginTop: `1em`, marginBottom: `1em`, marginLeft: 0, marginRight: 0, fontWeight: `bold`, display: `block` }, h4: { marginTop: `1.33em`, marginBottom: `1.33em`, marginLeft: 0, marginRight: 0, fontWeight: `bold`, display: `block` }, h5: { fontSize: `0.83em`, marginTop: `1.67em`, marginBottom: `1.67em`, marginLeft: 0, marginRight: 0, fontWeight: `bold`, display: `block` }, h6: { fontSize: `0.67em`, marginTop: `2.33em`, marginBottom: `2.33em`, marginLeft: 0, marginRight: 0, fontWeight: `bold`, display: `block` }, u: { textDecoration: `underline` }, strong: { fontWeight: `bold` }, b: { fontWeight: `bold` }, i: { fontStyle: `italic` }, em: { fontStyle: `italic` }, code: { fontFamily: `monospace` }, kbd: { fontFamily: `monospace` }, pre: { fontFamily: `monospace`, margin: `1em 0`, display: `block` }, mark: { backgroundColor: `yellow`, color: `black` }, big: { fontSize: `1.2em` }, small: { fontSize: `0.8em` }, s: { textDecoration: `line-through` }, div: { display: `block` } };
function i(e2) {
  if (e2 !== false) return e2 ?? r$1;
}
function a(e2, t2) {
  let n2;
  for (let r2 in e2) {
    if (!Object.hasOwn(e2, r2)) continue;
    let i2 = e2[r2];
    r2 === `children` || r2 === `className` || r2 === `class` || r2 === `id` || r2 === `style` || r2 === t2 || r2 === `ref` || r2 === `key` || r2 === `dangerouslySetInnerHTML` || r2 === `suppressHydrationWarning` || i2 == null || i2 === false || typeof i2 == `function` || typeof i2 == `symbol` || typeof i2 != `object` && (n2 ??= {}, n2[r2] = i2 === true ? `` : String(i2));
  }
  return n2;
}
var o = /* @__PURE__ */ Symbol(`Fragment`), s = /* @__PURE__ */ new Set([`area`, `base`, `br`, `col`, `embed`, `hr`, `img`, `input`, `keygen`, `link`, `meta`, `param`, `source`, `track`, `wbr`]), c = /* @__PURE__ */ new Set([`script`, `style`]), l = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:-]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!)([\s\S]*?)(>))/gm, u = /[\@\.a-z0-9_\:\-]/i;
function d(e2) {
  let t2 = {};
  if (e2) {
    let n2 = `none`, r2, i2 = ``, a2, o2;
    for (let s2 = 0; s2 < e2.length; s2++) {
      let c2 = e2[s2];
      n2 === `none` ? u.test(c2) ? (r2 && (t2[r2] = i2, r2 = void 0, i2 = ``), a2 = s2, n2 = `key`) : c2 === `=` && r2 && (n2 = `value`) : n2 === `key` ? u.test(c2) || (r2 = e2.substring(a2, s2), n2 = c2 === `=` ? `value` : `none`) : c2 === o2 && s2 > 0 && e2[s2 - 1] !== `\\` ? o2 && (i2 = e2.substring(a2, s2), o2 = void 0, n2 = `none`) : (c2 === `"` || c2 === `'`) && !o2 && (a2 = s2 + 1, o2 = c2);
    }
    n2 === `key` && a2 != null && a2 < e2.length && (r2 = e2.substring(a2, e2.length)), r2 && (t2[r2] = i2);
  }
  return t2;
}
function f(e2) {
  let t2 = typeof e2 == `string` ? e2 : e2.value, n2, r2, i2, a2, o2, u2, f2, p2, m2, h2 = [];
  l.lastIndex = 0, r2 = n2 = { type: 0, children: [] };
  let g2 = 0;
  function _2() {
    a2 = t2.substring(g2, l.lastIndex - i2[0].length), a2 && r2.children.push({ type: 2, value: a2, parent: r2 });
  }
  for (; i2 = l.exec(t2); ) {
    if (u2 = i2[5] || i2[8], f2 = i2[6] || i2[9], p2 = i2[7] || i2[10], c.has(r2.name) && i2[2] !== r2.name) {
      o2 = l.lastIndex - i2[0].length, r2.children.length > 0 && (r2.children[0].value += i2[0]);
      continue;
    } else if (u2 === `<!--`) {
      if (o2 = l.lastIndex - i2[0].length, c.has(r2.name)) continue;
      m2 = { type: 3, value: f2, parent: r2, loc: [{ start: o2, end: o2 + u2.length }, { start: l.lastIndex - p2.length, end: l.lastIndex }] }, h2.push(m2), m2.parent.children.push(m2);
    } else if (u2 === `<!`) o2 = l.lastIndex - i2[0].length, m2 = { type: 4, value: f2, parent: r2, loc: [{ start: o2, end: o2 + u2.length }, { start: l.lastIndex - p2.length, end: l.lastIndex }] }, h2.push(m2), m2.parent.children.push(m2);
    else if (i2[1] !== `/`) if (_2(), c.has(r2.name)) {
      g2 = l.lastIndex, _2();
      continue;
    } else m2 = { type: 1, name: i2[2] + ``, attributes: d(i2[3]), parent: r2, children: [], loc: [{ start: l.lastIndex - i2[0].length, end: l.lastIndex }] }, h2.push(m2), m2.parent.children.push(m2), i2[4] && i2[4].indexOf(`/`) > -1 || s.has(m2.name) ? (m2.loc[1] = m2.loc[0], m2.isSelfClosingTag = true) : r2 = m2;
    else _2(), i2[2] + `` === r2.name ? (m2 = r2, r2 = m2.parent, m2.loc.push({ start: l.lastIndex - i2[0].length, end: l.lastIndex }), a2 = t2.substring(m2.loc[0].end, m2.loc[1].start), m2.children.length === 0 && m2.children.push({ type: 2, value: a2, parent: r2 })) : i2[2] + `` === h2[h2.length - 1].name && h2[h2.length - 1].isSelfClosingTag === true && (m2 = h2[h2.length - 1], m2.loc.push({ start: l.lastIndex - i2[0].length, end: l.lastIndex }));
    g2 = l.lastIndex;
  }
  return a2 = t2.slice(g2), r2.children.push({ type: 2, value: a2, parent: r2 }), n2;
}
var p = /* @__PURE__ */ Symbol(`HTMLString`), m = /* @__PURE__ */ Symbol(`AttrString`), h = /* @__PURE__ */ Symbol(`RenderFn`);
function g$1(e2, t2 = [p]) {
  let n2 = { value: e2 };
  for (let e3 of t2) Object.defineProperty(n2, e3, { value: true, enumerable: false, writable: false });
  return n2;
}
var _$1 = { "&": `&amp;`, "<": `&lt;`, ">": `&gt;` };
function v$1(e2) {
  return e2.replace(/[&<>]/g, (e3) => _$1[e3] || e3);
}
function y$1(e2) {
  let t2 = ``;
  for (let [n2, r2] of Object.entries(e2)) t2 += ` ${n2}="${r2}"`;
  return g$1(t2, [p, m]);
}
function b$1(e2) {
  if (e2.children.length === 0) {
    let t2 = e2;
    for (; t2 = t2.parent; ) if (t2.name === `svg`) return true;
  }
  return false;
}
function x$1(e2) {
  let { name: t2, attributes: n2 = {} } = e2, r2 = e2.children.map((e3) => S$1(e3)).join(``);
  if (h in e2) {
    let t3 = e2[h](n2, g$1(r2));
    return t3 && t3[p] ? t3.value : v$1(String(t3));
  }
  if (t2 === o) return r2;
  let i2 = b$1(e2);
  return i2 || s.has(t2) ? `<${e2.name}${y$1(n2).value}${i2 ? ` /` : ``}>` : `<${e2.name}${y$1(n2).value}>${r2}</${e2.name}>`;
}
function S$1(e2) {
  switch (e2.type) {
    case 0:
      return e2.children.map((e3) => S$1(e3)).join(``);
    case 1:
      return x$1(e2);
    case 2:
      return `${e2.value}`;
    case 3:
      return `<!--${e2.value}-->`;
    case 4:
      return `<!${e2.value}>`;
  }
}
const C$1 = /* @__PURE__ */ new Set([`head`, `meta`, `link`, `style`, `script`]);
function w$1(e2) {
  return C$1.has(e2);
}
function T$1(e2, t2) {
  return e2.type === t2 && `props` in e2;
}
function E$1(e2) {
  return e2.replace(/([A-Z])/g, `-$1`).toLowerCase();
}
function D$1(e2) {
  return typeof e2 == `object` && !!e2 && `type` in e2;
}
function O$1(e2) {
  return typeof e2 == `function`;
}
const k$1 = /* @__PURE__ */ Symbol.for(`react.forward_ref`), A$1 = /* @__PURE__ */ Symbol.for(`react.memo`), j$1 = /* @__PURE__ */ Symbol.for(`react.fragment`);
function M$1(e2) {
  return e2.$$typeof === k$1;
}
function N$1(e2) {
  return e2.$$typeof === A$1;
}
function P$1(e2) {
  return e2.type === j$1;
}
function F$1(e2, t2) {
  let n2 = f(e2), r2 = { nodes: [], stylesheets: [] }, a2 = i(t2?.defaultStyles), o2 = t2?.tailwindClassesProperty ?? `tw`;
  for (let e3 of n2.children) I$1(e3, a2, o2, r2.nodes, r2.stylesheets);
  return r2;
}
function I$1(r2, i2, a2, o2, s2) {
  if (r2.type === 3) return;
  if (r2.type === 2) {
    let e2 = r2.value ?? ``;
    e2 && o2.push(i$2({ text: e2, preset: i2?.span }));
    return;
  }
  if (r2.type === 0) {
    for (let e2 of r2.children) I$1(e2, i2, a2, o2, s2);
    return;
  }
  if (r2.type !== 1) return;
  let c2 = r2;
  if (c2.name === `style`) {
    let e2 = ``;
    for (let t2 of c2.children) t2.type === 2 && typeof t2.value == `string` && (e2 += t2.value);
    e2 && s2.push(e2);
    return;
  }
  let l2 = L$1(c2, i2, a2);
  if (c2.name === `br`) {
    o2.push(i$2({ text: `
`, preset: i2?.span, ...l2 }));
    return;
  }
  if (c2.name === `img`) {
    let t2 = c2.attributes?.src;
    if (!t2) throw Error(`Image element must have a 'src' prop.`);
    o2.push(a$2({ src: t2, width: W$1(c2.attributes?.width), height: W$1(c2.attributes?.height), ...l2 }));
    return;
  }
  if (w$1(c2.name)) return;
  if (c2.name === `svg`) {
    o2.push(a$2({ src: S$1(c2), width: W$1(c2.attributes?.width), height: W$1(c2.attributes?.height), ...l2 }));
    return;
  }
  let u2 = true, d2 = ``;
  for (let e2 of c2.children) if (e2.type !== 3) {
    if (e2.type !== 2) {
      u2 = false;
      break;
    }
    d2 += e2.value ?? ``;
  }
  if (u2 && d2) {
    o2.push(i$2({ text: d2, ...l2 }));
    return;
  }
  let f2 = [];
  for (let e2 of c2.children) I$1(e2, i2, a2, f2, s2);
  o2.push(r$3({ children: f2, ...l2 }));
}
function L$1(e2, t2, n2) {
  let r2 = e2.attributes ? R$1(e2.attributes) : {}, i2 = typeof r2.style == `string` ? H$1(r2.style) : void 0, o2 = a(r2, n2), s2 = typeof r2[n2] == `string` ? r2[n2] : void 0, c2 = t2 && e2.name in t2 ? t2[e2.name] : void 0;
  return { tagName: e2.name, className: r2.class, id: r2.id, dir: r2.dir, attributes: o2, tw: s2, style: i2, preset: c2 };
}
function R$1(e2) {
  let t2 = {};
  for (let n2 in e2) {
    let r2 = e2[n2];
    r2 !== void 0 && (t2[n2] = z$1(r2));
  }
  return t2;
}
function z$1(e2) {
  return e2.includes(`&`) ? e2.replace(/&(?:#(\d+)|#x([\da-fA-F]+)|([a-zA-Z][\w-]+));/g, (e3, t2, n2, r2) => t2 ? B$1(Number(t2)) ?? e3 : n2 ? B$1(Number.parseInt(n2, 16)) ?? e3 : V$1[r2] ?? e3) : e2;
}
function B$1(e2) {
  if (!(!Number.isInteger(e2) || e2 < 0 || e2 > 1114111)) try {
    return String.fromCodePoint(e2);
  } catch {
    return;
  }
}
const V$1 = { amp: `&`, apos: `'`, gt: `>`, lt: `<`, nbsp: ` `, quot: `"` };
function H$1(e2) {
  let t2 = {};
  for (let n2 of e2.split(`;`)) {
    let [e3, ...r2] = n2.split(`:`);
    if (!e3 || r2.length === 0) continue;
    let i2 = e3.trim(), a2 = r2.join(`:`).trim();
    !i2 || !a2 || (t2[U$1(i2)] = a2);
  }
  return Object.keys(t2).length > 0 ? t2 : void 0;
}
function U$1(e2) {
  return e2.startsWith(`--`) ? e2 : e2.replace(/-([a-z])/g, (e3, t2) => t2.toUpperCase());
}
function W$1(e2) {
  if (!e2) return;
  let t2 = Number(e2);
  return Number.isFinite(t2) ? t2 : void 0;
}
function g(e2) {
  return typeof e2 == `string` || typeof e2 == `number`;
}
function _(e2) {
  return e2.replace(/&/g, `&amp;`).replace(/"/g, `&quot;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
}
function v(e2) {
  let t2 = [];
  for (let n2 in e2) Object.hasOwn(e2, n2) && t2.push(`${E$1(n2)}:${String(e2[n2]).trim()}`);
  return t2.join(`;`);
}
const y = new Set(`stopColor.stopOpacity.strokeWidth.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.fillRule.clipRule.colorInterpolationFilters.floodColor.floodOpacity.accentHeight.alignmentBaseline.arabicForm.baselineShift.capHeight.clipPath.clipPathUnits.colorInterpolation.colorProfile.colorRendering.enableBackground.fillOpacity.fontFamily.fontSize.fontSizeAdjust.fontStretch.fontStyle.fontVariant.fontWeight.glyphName.glyphOrientationHorizontal.glyphOrientationVertical.horizAdvX.horizOriginX.imageRendering.letterSpacing.lightingColor.markerEnd.markerMid.markerStart.overlinePosition.overlineThickness.paintOrder.preserveAspectRatio.pointerEvents.shapeRendering.strokeMiterlimit.strokeOpacity.textAnchor.textDecoration.textRendering.transformOrigin.underlinePosition.underlineThickness.unicodeBidi.unicodeRange.unitsPerEm.vectorEffect.vertAdvY.vertOriginX.vertOriginY.vAlphabetic.vHanging.vIdeographic.vMathematical.wordSpacing.writingMode`.split(`.`));
function b(e2, t2) {
  if (e2 === `children` || t2 == null) return;
  let n2;
  if (n2 = e2 === `className` ? `class` : y.has(e2) ? E$1(e2) : e2, typeof t2 == `boolean`) return `${n2}="${String(t2)}"`;
  if (e2 === `style` && typeof t2 == `object`) {
    let e3 = v(t2);
    if (e3) return `style="${_(e3)}"`;
  }
  return `${n2}="${_(String(t2))}"`;
}
function x(e2, t2, n2) {
  let r2 = false;
  for (let n3 in e2) {
    if (!Object.hasOwn(e2, n3)) continue;
    let i2 = b(n3, e2[n3]);
    i2 !== void 0 && (t2.push(` `, i2), n3 === `xmlns` && (r2 = true));
  }
  n2 && !r2 && t2.push(` xmlns="http://www.w3.org/2000/svg"`);
}
const S = (e2, t2, n2) => {
  let r2 = e2.props || {};
  if (O$1(e2.type)) {
    C(e2.type(e2.props), t2, false);
    return;
  }
  if (typeof e2.type == `symbol` || typeof e2.type != `string`) return;
  t2.push(`<`, e2.type), x(r2, t2, n2 && e2.type === `svg`);
  let i2 = r2.children;
  t2.push(`>`), C(i2, t2, false), t2.push(`</`, e2.type, `>`);
};
function C(e2, t2, n2) {
  if (!(e2 == null || e2 === false)) {
    if (g(e2)) {
      t2.push(String(e2));
      return;
    }
    if (Array.isArray(e2)) {
      for (let n3 of e2) C(n3, t2, false);
      return;
    }
    D$1(e2) && S(e2, t2, n2);
  }
}
function w(e2) {
  let t2 = [];
  return C(e2, t2, true), t2.join(``);
}
function T() {
  return { nodes: [], stylesheets: [] };
}
const E = [/Invalid hook call\./, /Cannot read properties of null \(reading 'use[A-Z][A-Za-z]+'\)/, /null is not an object \(evaluating 'dispatcher\.use[A-Z][A-Za-z]+'\)/];
let D, O;
async function k(t2, n2) {
  let i$12 = { defaultStyles: j(n2), presets: i(n2?.defaultStyles), tailwindClassesProperty: n2?.tailwindClassesProperty ?? `tw` }, a2 = await A(t2, i$12).catch(async (e2) => {
    if (!N(e2)) throw e2;
    return await H(t2, i$12) || A(t2, i$12);
  }), s2 = a2.nodes, c2;
  return c2 = s2.length === 0 ? r$3({}) : s2.length === 1 && s2[0] !== void 0 ? s2[0] : r$3({ children: s2, style: { width: s$2(100), height: s$2(100) } }), { node: c2, stylesheets: a2.stylesheets };
}
async function A(e2, t2) {
  return e2 == null || e2 === false ? T() : e2 instanceof Promise ? A(await e2, t2) : typeof e2 == `object` && Symbol.iterator in e2 ? ee(e2, t2) : D$1(e2) ? await q(e2, t2) : { nodes: [i$2({ text: String(e2), preset: t2.presets?.span })], stylesheets: [] };
}
function j(e2) {
  return e2 && `defaultStyles` in e2 ? e2.defaultStyles ?? r$1 : r$1;
}
function M(e2) {
  return !D$1(e2) || typeof e2.type != `object` || e2.type === null || !(`$$typeof` in e2.type) ? false : e2.type.$$typeof === /* @__PURE__ */ Symbol.for(`react.context`) || e2.type.$$typeof === /* @__PURE__ */ Symbol.for(`react.provider`);
}
function N(e2) {
  return e2 instanceof Error ? E.some((t2) => t2.test(e2.message)) : false;
}
async function P(e2) {
  let t2 = console.error;
  console.error = (...e3) => {
    let [n2] = e3;
    typeof n2 == `string` && E.some((e4) => e4.test(n2)) || t2(...e3);
  };
  try {
    return await e2();
  } finally {
    console.error = t2;
  }
}
async function F(e2, t2, n2) {
  return P(() => A(e2(t2), n2));
}
function I(e2, t2) {
  if (!(typeof e2.type != `object` || e2.type === null)) {
    if (M$1(e2.type) && `render` in e2.type) {
      let n2 = e2.type;
      return F((e3) => n2.render(e3, null), e2.props, t2);
    }
    if (N$1(e2.type) && `type` in e2.type) {
      let n2 = e2.type.type;
      return O$1(n2) ? F(n2, e2.props, t2) : q({ ...e2, type: n2 }, t2);
    }
  }
}
function L(e2) {
  if (typeof e2.props == `object` && e2.props !== null && `children` in e2.props) return e2.props.children;
}
function R(e2) {
  return typeof e2 == `object` && !!e2 && `createElement` in e2 && typeof e2.createElement == `function`;
}
function z(e2) {
  return typeof e2 == `object` && !!e2 && `renderToStaticMarkup` in e2 && typeof e2.renderToStaticMarkup == `function`;
}
async function B() {
  return O ??= import("../react.mjs").then(function(n2) {
    return n2.R;
  }).then((e2) => {
    let t2 = e2.default ?? e2;
    return R(t2) ? t2 : null;
  }).catch(() => null), O;
}
async function V() {
  return D ??= import("../react-dom.mjs").then(function(n2) {
    return n2.s;
  }).then((e2) => {
    let t2 = e2.default ?? e2;
    return z(t2) ? t2 : null;
  }).catch(() => null), D;
}
async function H(e2, t2) {
  let [n2, r2] = await Promise.all([B(), V()]);
  return !n2 || !r2 ? null : F$1(r2.renderToStaticMarkup(n2.createElement(n2.Fragment ?? void 0, null, e2)), { defaultStyles: t2.defaultStyles, tailwindClassesProperty: t2.tailwindClassesProperty });
}
function U(e2) {
  if (!D$1(e2)) return;
  let t2 = L(e2);
  if (typeof t2 == `string`) return t2;
  if (typeof t2 == `number`) return String(t2);
  if (Array.isArray(t2) || typeof t2 == `object` && t2 && Symbol.iterator in t2) return K(t2);
  if (D$1(t2) && P$1(t2)) return U(t2);
}
function W(e2) {
  let t2 = [];
  for (let n2 of e2) {
    let e3 = G(n2);
    if (e3 === void 0) return;
    t2.push(e3);
  }
  return t2.join(``);
}
function G(e2) {
  if (typeof e2 == `string`) return e2;
  if (typeof e2 == `number`) return String(e2);
  if (e2 == null || typeof e2 == `boolean` || typeof e2 == `symbol`) return ``;
  if (typeof e2 == `object` && Symbol.iterator in e2) return W(e2);
  if (!D$1(e2)) return;
  if (P$1(e2)) return G(L(e2));
  let t2 = L(e2);
  return t2 === void 0 ? `` : typeof t2 == `object` && t2 && Symbol.iterator in t2 ? W(t2) : G(t2);
}
function K(e2) {
  let t2 = [];
  for (let n2 of e2) {
    if (D$1(n2)) return;
    if (typeof n2 == `string`) {
      t2.push(n2);
      continue;
    }
    if (typeof n2 == `number`) {
      t2.push(String(n2));
      continue;
    }
    return;
  }
  return t2.join(``);
}
async function q(e2, t2) {
  if (M(e2)) return await H(e2, t2) || $(e2, t2);
  if (O$1(e2.type)) return F(e2.type, e2.props, t2);
  let a2 = I(e2, t2);
  if (a2 !== void 0) return a2;
  if (P$1(e2)) return $(e2, t2);
  if (T$1(e2, `style`)) {
    let t3 = G(L(e2));
    return { nodes: [], stylesheets: t3 && t3.length > 0 ? [t3] : [] };
  }
  if (typeof e2.type != `string` || w$1(e2.type)) return T();
  let o2 = Q(e2, t2);
  if (T$1(e2, `br`)) return { nodes: [i$2({ text: `
`, preset: t2.presets?.span, ...o2 })], stylesheets: [] };
  if (T$1(e2, `img`)) return { nodes: [J(e2, t2)], stylesheets: [] };
  if (T$1(e2, `svg`)) return { nodes: [Y(e2, t2)], stylesheets: [] };
  let s2 = U(e2);
  if (s2 !== void 0) return { nodes: [i$2({ text: s2, ...o2 })], stylesheets: [] };
  let l2 = await $(e2, t2);
  return { nodes: [r$3({ children: l2.nodes, ...o2 })], stylesheets: l2.stylesheets };
}
function J(e2, n2) {
  if (!e2.props.src) throw Error(`Image element must have a 'src' prop.`);
  let r2 = Q(e2, n2), i2 = e2.props.width === void 0 ? void 0 : Number(e2.props.width), a2 = e2.props.height === void 0 ? void 0 : Number(e2.props.height);
  return a$2({ src: e2.props.src, width: i2, height: a2, ...r2 });
}
function Y(e2, n2) {
  let r2 = Q(e2, n2);
  return a$2({ src: w(e2), width: e2.props.width === void 0 ? void 0 : Number(e2.props.width), height: e2.props.height === void 0 ? void 0 : Number(e2.props.height), ...r2 });
}
function X(e2, t2) {
  let n2 = t2.presets, r2 = n2 && typeof e2.type == `string` && e2.type in n2 ? n2[e2.type] : void 0, i2 = typeof e2.props == `object` && e2.props !== null && `style` in e2.props && typeof e2.props.style == `object` && e2.props.style !== null ? e2.props.style : void 0;
  if (!i2) return { preset: r2 };
  for (let e3 in i2) if (Object.hasOwn(i2, e3)) return { preset: r2, style: i2 };
  return { preset: r2 };
}
function Z(e2, t2) {
  let n2 = t2.tailwindClassesProperty;
  if (typeof e2.props != `object` || e2.props === null || !(n2 in e2.props)) return;
  let r2 = e2.props[n2];
  if (typeof r2 == `string`) return r2;
}
function Q(e2, t2) {
  let n2 = e2.props, { preset: r2, style: i2 } = X(e2, t2), a$12 = Z(e2, t2), o2 = a(n2, t2.tailwindClassesProperty);
  return { tagName: typeof e2.type == `string` ? e2.type : void 0, className: n2.className ?? n2.class, id: n2.id, dir: n2.dir, attributes: o2, tw: a$12, style: i2, preset: r2 };
}
function $(e2, t2) {
  let n2 = L(e2);
  return n2 === void 0 ? Promise.resolve(T()) : A(n2, t2);
}
async function ee(e2, t2) {
  let n2 = [], r2 = /* @__PURE__ */ new Set(), i2 = 0;
  for (let a3 of e2) {
    let e3 = i2;
    i2 += 1;
    let o3 = A(a3, t2).then((t3) => {
      n2[e3] = t3;
    }).finally(() => r2.delete(o3));
    r2.add(o3), r2.size >= 8 && await Promise.race(r2);
  }
  await Promise.all(r2);
  let a2 = [], o2 = [];
  for (let e3 of n2) e3 && (a2.push(...e3.nodes), o2.push(...e3.stylesheets));
  return { nodes: a2, stylesheets: o2 };
}
function r(r2) {
  let { nodes: i2, stylesheets: a2 } = F$1(r2);
  return i2.length === 0 ? { node: r$3({}), stylesheets: a2 } : i2.length === 1 && i2[0] ? { node: i2[0], stylesheets: a2 } : { node: r$3({ style: { width: s$2(100), height: s$2(100) }, children: i2 }), stylesheets: a2 };
}
export {
  h$1 as a,
  h$2 as h,
  k,
  m$1 as m,
  r
};
