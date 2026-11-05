// Logo de la barra superior: una variante por tema.
//
// La plantilla pinta un único <img class="site-logo" src="/logo.svg"> (el logo
// oscuro, que es el de src/site/logo.svg). El selector de tema solo cambia
// data-theme en <html>, y un <img> no puede reaccionar a eso, así que aquí se
// duplica: el logo oscuro (/logo.svg) y el claro (assets/brand/). Un par de
// reglas de minimal.css muestran el que toca (.site-logo-dark / .site-logo-light).
const LOGO_CLARO = "/plugins/velardev-minimal/assets/brand/velardev-logo-claro.svg";

const IMG_LOGO = /<img class="site-logo" src="([^"]+)" alt="([^"]*)"\s*\/?>/;

function logoPorTema(html) {
  return html.replace(
    IMG_LOGO,
    (_, src, alt) =>
      `<img class="site-logo site-logo-dark" src="${src}" alt="${alt}">` +
      `<img class="site-logo site-logo-light" src="${LOGO_CLARO}" alt="${alt}">`
  );
}

module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addTransform("velardev-logo-tema", function (content, outputPath) {
      if (typeof outputPath !== "string" || !outputPath.endsWith(".html")) return content;
      return logoPorTema(content);
    });
  },
  logoPorTema,
};
