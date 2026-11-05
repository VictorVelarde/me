const { fechaCorta } = require("./_fecha");

// /posts/: la lista sale de Posts.md (Dataview) como "<a>Título</a>: 2026-10-14".
// Aquí cada fecha ISO pasa al formato natural de toda la web ("14 OCT 2026") y
// se pinta como <time> discreto tras el enlace (ver .post-list-date en
// minimal.css). Se hace al generar la página, así no hay que tocar Posts.md y
// sobrevive a las publicaciones desde Obsidian.
const POSTS_OUTPUT = /(^|\/)dist\/posts\/index\.html$/;
const ITEM = /(<\/a>)\s*:\s*(\d{4}-\d{2}-\d{2})(<\/li>)/g;

function fechasNaturales(html) {
  return html.replace(
    ITEM,
    (_m, cierre, iso, li) => `${cierre}<time class="post-list-date" datetime="${iso}">${fechaCorta(iso, false)}</time>${li}`
  );
}

module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addTransform("velardev-posts-list-dates", function (content, outputPath) {
      if (typeof outputPath !== "string" || !POSTS_OUTPUT.test(outputPath)) return content;
      return fechasNaturales(content);
    });
  },
  fechasNaturales,
};
