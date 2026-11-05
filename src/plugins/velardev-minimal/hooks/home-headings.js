const { isHome } = require("./_home");

// Un único <h1> por página.
//
// La marca de la barra superior ("velardev") se pinta como <h1> en la plantilla.
// Como cada página ya tiene su propio <h1> (el título del post, de la lista...),
// la marca pasa a <div class="navbar-brand"> en TODAS las páginas, con el mismo
// aspecto (ver minimal.css). Si un post lleva "# ..." en el cuerpo, esos encabezados
// se bajan un nivel (ver bajarEncabezadosDelCuerpo).
//
// Además, en la portada Inicio.md y Home.md se publican desde Obsidian con
// "# ..." como primer encabezado, pero la página saldría con otro <h1> por
// encima: el título del fichero ("Inicio", "Home"), que pinta la plantilla porque
// dgShowInlineTitle=true es un ajuste global, sin opción por nota. Ese se borra
// solo en la portada.
// Va como transform para que sobreviva a las publicaciones desde Obsidian.
function arreglarMarca(html) {
  return html.replace(
    /(<div class="navbar-inner">[\s\S]*?)<h1((?:\s[^>]*)?)>([^<]*)<\/h1>/,
    '$1<div class="navbar-brand"$2>$3</div>'
  );
}

// Algunos posts llevan secciones escritas con "# ..." en el cuerpo (convención de
// las notas), que salen como <h1> junto al título. Si pasa, se baja un nivel todos
// los encabezados del cuerpo (h1→h2, h2→h3...) para conservar la jerarquía y que
// el título sea el único <h1>. Solo toca lo que hay entre </header> y </main>.
function bajarEncabezadosDelCuerpo(html) {
  const main = html.indexOf("<main");
  if (main === -1) return html;
  const ini = html.indexOf("</header>", main);
  const fin = html.indexOf("</main>", main);
  if (ini === -1 || fin === -1 || fin < ini) return html;
  const cuerpo = html.slice(ini, fin);
  if (!/<h1[\s>]/.test(cuerpo)) return html;
  const bajado = cuerpo.replace(/<(\/?)h([1-5])(?=[\s>])/g, (_, barra, n) => `<${barra}h${Number(n) + 1}`);
  return html.slice(0, ini) + bajado + html.slice(fin);
}

function arreglarEncabezados(html) {
  html = html.replace(/(<header>\s*)<h1(?:\s[^>]*)?>[^<]*<\/h1>/, "$1");
  return arreglarMarca(html);
}

module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addTransform("velardev-home-headings", function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith(".html")) return content;
      return isHome(outputPath)
        ? arreglarEncabezados(content)
        : bajarEncabezadosDelCuerpo(arreglarMarca(content));
    });
  },
  arreglarEncabezados,
  arreglarMarca,
  bajarEncabezadosDelCuerpo,
};
