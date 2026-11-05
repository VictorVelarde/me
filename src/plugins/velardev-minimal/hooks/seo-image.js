// Filtro para las etiquetas Open Graph (templates/head.njk): devuelve el src
// de la primera imagen del contenido renderizado (la portada de un post, por
// ejemplo), o cadena vacía si no hay ninguna.
module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addFilter("velardevFirstImage", function (html) {
      const m = typeof html === "string" ? html.match(/<img[^>]+src="([^"]+)"/) : null;
      return m ? m[1] : "";
    });
  },
};
