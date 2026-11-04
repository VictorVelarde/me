const fs = require("fs");
const path = require("path");

// Cada mejora de la web vive en su propio fichero de hooks/ (un transform o un
// filtro de Eleventy). Este cargador es el mismo en todas ellas; las páginas
// de portada se reconocen con hooks/_home.js.
module.exports = {
  setupEleventy(eleventyConfig, context) {
    const dir = path.join(__dirname, "hooks");
    if (!fs.existsSync(dir)) return;
    const files = fs
      .readdirSync(dir)
      .filter((n) => n.endsWith(".js") && !n.startsWith("_"))
      .sort();
    for (const f of files) {
      const mod = require(path.join(dir, f));
      if (typeof mod.setupEleventy === "function") {
        mod.setupEleventy(eleventyConfig, context);
      }
    }
  },
};
