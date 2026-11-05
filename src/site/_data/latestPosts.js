// src/site/_data/latestPosts.js
//
// Lista de los últimos posts publicados, generada en build time con Eleventy.
// Esto sustituye a la lista a mano que venía en Home.md (que solo renderizaba
// enlaces). Corresponde a la generación del query de Dataview que el usuario
// escribía, pero ejecutada por Eleventy en el build, no por Dataview en el
// navegador:
//
//   FROM "Blog/Articulos" AND starred SORT date DESC LIMIT 5
//
// Cada entrada incluye: título, url, fecha formateada y extracto (primeras
// líneas del cuerpo). La fecha se toma de dg-note-properties.date (la fecha
// real escrita en el frontmatter), no de la fecha del fichero.
module.exports = async (data) => {
  const posts = (data && data.collections && data.collections.all) || [];

  const formatearFecha = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    try {
      return new Intl.DateTimeFormat("es-ES", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(d);
    } catch {
      return iso;
    }
  };

  const extraerExtracto = (raw) => {
    // Las primeras líneas no-vacías, ignorando la imagen de portada.
    const lines = raw
      .split("\n")
      .filter((l) => l.trim() && !l.trim().startsWith("!"))
      .map((l) => l.trim());
    // Quitar sintaxis markdown dentro del texto (negritas, cursivas, etc.)
    const sinMarkdown = lines.map((l) => l.replace(/[#*_]+/g, " ").trim()).filter(Boolean);
    // 2-3 líneas, conservando saltos de línea para el navegador
    return sinMarkdown.slice(0, 3).join("\n").trim().slice(0, 280);
  };

  return posts
    .filter((n) => {
      const dp = n.data && n.data["dg-note-properties"];
      if (!dp) return false;
      // "FROM Blog/Articulos"
      if (!n.filePathStem || !n.filePathStem.includes("/Articulos/")) return false;
      // "AND starred" (si el flag está explícitamente false, no sale)
      if (dp.starred === false) return false;
      // Solo publicados
      return n.data["dg-publish"] === true;
    })
    .map((n) => {
      const dp = n.data["dg-note-properties"];
      return {
        title: (n.data && n.data.title) || (dp && dp.title) || n.fileSlug,
        url: n.url,
        date: formatearFecha(dp.date),
        excerpt: extraerExtracto(n.content || ""),
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 5);
};
