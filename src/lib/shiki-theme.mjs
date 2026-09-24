// Grayscale syntax theme on the paper surface, shared by markdown code fences.
export const grayTheme = {
  name: "paper",
  type: "light",
  colors: { "editor.background": "#ede9e0", "editor.foreground": "#34322d" },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#69655c", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "markup.heading"], settings: { foreground: "#1c1b18", fontStyle: "bold" } },
    { scope: ["string", "markup.underline.link"], settings: { foreground: "#58554e" } },
    { scope: ["entity.name.function", "support.function"], settings: { foreground: "#1c1b18" } },
  ],
};
