const { isHome } = require("./_home");

// Portada: una imagen de cabecera distinta para cada tema.
//
// Inicio.md y Home.md (publicadas desde Obsidian) llevan la imagen del mapa de
// viento como <img src=".../Fondo.png">. Esa imagen es una sola, con el fondo del
// mapa casi negro, y se ve igual en el tema claro y en el oscuro. Aquí se
// sustituye por un <p class="hero-tema"> vacío, y minimal.css pinta como fondo la
// variante de cada tema (assets/hero/hero-claro.png y hero-oscuro.png).
//
// Va como fondo CSS y no como dos <img> para que el navegador descargue solo la
// variante del tema activo. Es decorativa, así que no lleva texto alternativo.
// Va como transform para que sobreviva a las publicaciones desde Obsidian. Si la
// portada deja de llevar Fondo.png, no se toca nada.
const IMG_FONDO = /<p>\s*<img\b[^>]*\bsrc="[^"]*\/Fondo\.png"[^>]*>\s*<\/p>/;

function heroPorTema(html) {
  return html.replace(IMG_FONDO, '<p class="hero-tema" aria-hidden="true"></p>');
}

module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addTransform("velardev-home-hero", function (content, outputPath) {
      if (!isHome(outputPath)) return content;
      return heroPorTema(content);
    });
  },
  heroPorTema,
};
