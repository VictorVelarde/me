const { isHome, isEnglish } = require("./_home");

// Portada: llamada a la acción justo bajo la presentación.
//
// Antes, lo único que se podía hacer en la portada era leer una lista de
// enlaces; el contacto estaba al final de todo. Se añaden dos botones bajo el
// subtítulo: ver los posts y escribir por correo. El correo se toma del propio
// texto de contacto de la página (no se repite en el código); si no hay
// ningún mailto, solo sale el primer botón.
const ESTILOS = `<style>
.home-cta { display: flex; flex-wrap: wrap; gap: .6rem; margin: 1.1rem 0 1.6rem; }
.home-cta a {
  display: inline-block; padding: .55rem 1.05rem; border-radius: 999px;
  font-family: var(--font-interface-override, system-ui, sans-serif); font-size: .92rem; font-weight: 600;
  text-decoration: none; border: 1px solid var(--vm-accent);
}
.home-cta .home-cta-primary { background: var(--vm-accent); color: var(--vm-bg); }
.home-cta .home-cta-primary:hover { background: var(--vm-accent-hover); border-color: var(--vm-accent-hover); color: var(--vm-bg); }
.home-cta .home-cta-secondary { color: var(--vm-accent); }
.home-cta .home-cta-secondary:hover { color: var(--vm-accent-hover); border-color: var(--vm-accent-hover); }
</style>`;

function anadirCta(html, en) {
  const correo = (html.match(/href="mailto:([^"]+)"/) || [])[1];
  const textos = en
    ? { posts: "Read the posts", correo: "Get in touch" }
    : { posts: "Leer los posts", correo: "Escríbeme" };
  const botones =
    `<p class="home-cta"><a class="home-cta-primary" href="/posts/">${textos.posts}</a>` +
    (correo ? `<a class="home-cta-secondary" href="mailto:${correo}">${textos.correo}</a>` : "") +
    `</p>`;

  // Tras el primer párrafo que sigue al primer encabezado del contenido
  // (el subtítulo "Product Engineer ...").
  const re = /(<h[123](?:\s[^>]*)?>[\s\S]*?<\/h[123]>\s*<p>[\s\S]*?<\/p>)/;
  if (!re.test(html)) return html;
  return html.replace(re, `$1${botones}`).replace("</head>", `${ESTILOS}</head>`);
}

module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addTransform("velardev-home-cta", function (content, outputPath) {
      if (!isHome(outputPath)) return content;
      return anadirCta(content, isEnglish(outputPath));
    });
  },
  anadirCta,
};
