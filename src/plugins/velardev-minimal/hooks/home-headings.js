const { isHome } = require("./_home");

// Portada: un único <h1>, el del contenido.
//
// Inicio.md y Home.md se publican desde Obsidian con "# ..." como primer
// encabezado, pero la página saldría con otros dos <h1> por encima:
//  - el título del fichero ("Inicio", "Home"), que pinta la plantilla porque
//    dgShowInlineTitle=true es un ajuste global, sin opción por nota;
//  - el nombre del sitio de la barra superior.
// Aquí se quitan los dos, solo en la portada: el primero se borra y el segundo
// pasa a <div class="navbar-brand">, con el mismo aspecto (ver minimal.css).
// Va como transform para que sobreviva a las publicaciones desde Obsidian.
function arreglarEncabezados(html) {
  html = html.replace(/(<header>\s*)<h1(?:\s[^>]*)?>[^<]*<\/h1>/, "$1");
  return html.replace(
    /(<div class="navbar-inner">[\s\S]*?)<h1((?:\s[^>]*)?)>([^<]*)<\/h1>/,
    '$1<div class="navbar-brand"$2>$3</div>'
  );
}

module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addTransform("velardev-home-headings", function (content, outputPath) {
      if (!isHome(outputPath)) return content;
      return arreglarEncabezados(content);
    });
  },
  arreglarEncabezados,
};
