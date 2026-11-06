// Logo de la barra superior: SVG en línea, un solo dibujo para los dos temas.
//
// La plantilla pinta un <img class="site-logo" src="/logo.svg">. Como <img> el
// navegador lo rasteriza (en Safari/iOS se ve dentado) y además no puede reaccionar
// al tema, que solo cambia data-theme en <html>. Aquí se sustituye por el mismo
// SVG pegado en el HTML: se renderiza como vector y sus colores salen de
// --vm-logo-tinta / --vm-logo-acento (minimal.css), que cambian con el tema.
//
// La fuente del dibujo es assets/brand/velardev-logo-claro.svg; sus dos colores
// se sustituyen por clases (.logo-tinta, .logo-acento).
//
// El subrayado rosa NO se queda en el SVG: mide ~1,15px y, dibujado como trazo,
// cae entre dos filas de píxeles y sale pálido y borroso (shape-rendering no lo
// arregla). Se saca como <span class="logo-subrayado"> hijo de un contenedor que
// mide lo mismo que el SVG; una caja HTML el navegador la ajusta a píxeles enteros.
const fs = require("fs");
const path = require("path");

const SVG_FUENTE = path.join(__dirname, "..", "assets", "brand", "velardev-logo-claro.svg");
const TINTA = "#181715";
const ACENTO = "#b52550";

const IMG_LOGO = /<img class="site-logo" src="[^"]+" alt="([^"]*)"\s*\/?>/;

let svgBase;
function svgEnLinea() {
  if (svgBase) return svgBase;
  svgBase = fs
    .readFileSync(SVG_FUENTE, "utf8")
    .trim()
    // se dimensiona por CSS; el título y la descripción pasan a aria-label (sus id se repetirían)
    .replace(/<svg[^>]*>/, '<svg class="site-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7775 2775" role="img" aria-label="__ALT__">')
    .replace(/<title[\s\S]*?<\/title>/, "")
    .replace(/<desc[\s\S]*?<\/desc>/, "")
    .replace(/<path d="M4438 2290[^>]*\/>/, "")
    .replace(new RegExp(`fill="${ACENTO}"`, "g"), 'class="logo-acento"')
    .replace(new RegExp(`fill="${TINTA}"`, "g"), 'class="logo-tinta"');
  return svgBase;
}

function logoPorTema(html) {
  return html.replace(
    IMG_LOGO,
    (_, alt) =>
      `<span class="site-logo-wrap">${svgEnLinea().replace("__ALT__", alt)}<span class="logo-subrayado"></span></span>`
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
