// Grayscale syntax themes for code in posts, one per color scheme (see global.css).
export const grayTheme = {
  name: "paper",
  type: "light",
  colors: { "editor.background": "#efefed", "editor.foreground": "#3d3d3a" },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#6b6b66", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "markup.heading"], settings: { foreground: "#1b1b1a", fontStyle: "bold" } },
    { scope: ["string", "markup.underline.link"], settings: { foreground: "#55554f" } },
    { scope: ["entity.name.function", "support.function"], settings: { foreground: "#1b1b1a" } },
  ],
};

export const grayThemeDark = {
  name: "paper-dark",
  type: "dark",
  colors: { "editor.background": "#1e1e1c", "editor.foreground": "#c9c8c3" },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#94938e", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "markup.heading"], settings: { foreground: "#ecebe7", fontStyle: "bold" } },
    { scope: ["string", "markup.underline.link"], settings: { foreground: "#b3b2ac" } },
    { scope: ["entity.name.function", "support.function"], settings: { foreground: "#ecebe7" } },
  ],
};
