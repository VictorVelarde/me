const fs = require("fs");
const path = require("path");
const { isHome, isEnglish } = require("./_home");
const { fechaCorta } = require("./_fecha");

// Portada: a cada enlace de "Últimos posts" se le añade, debajo, una línea de
// gancho y la fecha en formato corto ("30 OCT 2026", según el idioma).
//
// La selección es la de Inicio.md / Home.md: la consulta Dataview del propio
// documento (posts con `starred`, orden y límite que ella defina). Aquí no se
// elige ni se ordena nada: se parte de la lista que Dataview ya ha generado y,
// para cada enlace, se busca la nota para sacar su fecha y su primer párrafo.
// Un enlace sin nota o sin fecha se deja tal cual. La lista pierde las viñetas.
//
// Va como transform y lee las notas del disco al arrancar, así no hay que
// tocar Inicio.md ni Home.md y sobrevive a las publicaciones desde Obsidian.
// Si el bloque no se encuentra, la portada queda como estaba.
const MAX_GANCHO = 170;
const NOTAS = path.join(__dirname, "..", "..", "..", "site", "notes", "Blog", "Articulos");

function ficheros(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? ficheros(p) : e.name.endsWith(".md") ? [p] : [];
  });
}

function limpiarMarkdown(t) {
  return t
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, "$2")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function gancho(cuerpo) {
  // Primer párrafo de texto: ni imágenes, ni encabezados, ni listas, ni citas.
  const parrafos = cuerpo.split(/\n\s*\n/).map((p) => p.trim());
  for (const p of parrafos) {
    if (!p || /^(!|#|>|[-*+]\s|\d+\.\s|```|\{)/.test(p)) continue;
    const t = limpiarMarkdown(p);
    if (t.length < 40) continue;
    if (t.length <= MAX_GANCHO) return t;
    const corte = t.slice(0, MAX_GANCHO).replace(/\s+\S*$/, "");
    return corte.replace(/[.,;:¿¡-]+$/, "") + "…";
  }
  return "";
}

const sinBarraFinal = (url) => String(url).replace(/\/+$/, "");

// Mapa url -> { fecha, gancho } de todas las notas publicadas con fecha.
function leerPosts() {
  const posts = new Map();
  for (const f of ficheros(NOTAS)) {
    const m = fs.readFileSync(f, "utf8").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) continue;
    let fm;
    try {
      fm = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const props = fm["dg-note-properties"] || {};
    if (fm["dg-publish"] !== true || !props.date || !fm.permalink) continue;
    posts.set(sinBarraFinal(fm.permalink), {
      fecha: String(props.date).slice(0, 10),
      gancho: gancho(m[2]),
    });
  }
  return posts;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ESTILOS = `<style>
.content ul.block-language-dataview { list-style: none; margin: .4rem 0 1.6rem; padding: 0; padding-inline-start: 0; }
.content ul.block-language-dataview > li { margin: 0 0 1.15rem; padding: 0; }
.latest-post-excerpt { display: block; margin-top: .15rem; color: var(--vm-muted); font-size: .95rem; line-height: 1.5; }
.latest-post-date {
  display: block; margin-top: .3rem; color: var(--vm-muted); font-size: .72rem; letter-spacing: .06em; text-transform: uppercase;
  font-family: var(--font-interface-override, system-ui, sans-serif);
}
</style>`;

// Heading "Últimos posts" / "Latest posts" (h2 o h3) + su <ul> de Dataview.
const BLOQUE = /(<h[23](?:\s[^>]*)?\sid="(?:ultimos-posts|latest-posts)"[^>]*>[\s\S]*?<\/h[23]>\s*<ul class="block-language-dataview">)([\s\S]*?)(<\/ul>)/;
const ITEM = /(<li>\s*<a [^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>)(\s*<\/li>)/g;

function enriquecerLista(html, posts, en) {
  if (!posts.size || !BLOQUE.test(html)) return html;
  let tocado = false;
  const nuevo = html.replace(BLOQUE, (_m, inicio, items, fin) => {
    const conMeta = items.replace(ITEM, (m, enlace, href, cierre) => {
      const p = posts.get(sinBarraFinal(href));
      if (!p) return m;
      tocado = true;
      return (
        enlace +
        (p.gancho ? `<span class="latest-post-excerpt">${esc(p.gancho)}</span>` : "") +
        `<time class="latest-post-date" datetime="${esc(p.fecha)}">${esc(fechaCorta(p.fecha, en))}</time>` +
        cierre
      );
    });
    return inicio + conMeta + fin;
  });
  return tocado ? nuevo.replace("</head>", `${ESTILOS}</head>`) : html;
}

module.exports = {
  setupEleventy(eleventyConfig) {
    const posts = leerPosts();
    eleventyConfig.addTransform("velardev-home-latest-posts", function (content, outputPath) {
      if (!isHome(outputPath)) return content;
      return enriquecerLista(content, posts, isEnglish(outputPath));
    });
  },
  leerPosts,
  gancho,
  enriquecerLista,
};
