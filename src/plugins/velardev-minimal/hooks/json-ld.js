// Filtro para las plantillas: {{ objeto | velardevJsonLd | safe }}
//
// Serializa datos estructurados (schema.org) para un <script type="application/ld+json">:
// - quita los campos vacíos (cadenas vacías, null, listas vacías), para que un post
//   sin etiquetas no emita "keywords": "";
// - escapa "<" como <, para que un título o una descripción con "</script>"
//   no pueda cerrar el bloque (sigue siendo JSON válido).
function limpiar(valor) {
  if (Array.isArray(valor)) {
    const lista = valor.map(limpiar).filter((v) => v !== undefined);
    return lista.length ? lista : undefined;
  }
  if (valor && typeof valor === "object") {
    const objeto = {};
    for (const [clave, v] of Object.entries(valor)) {
      const limpio = limpiar(v);
      if (limpio !== undefined) objeto[clave] = limpio;
    }
    return Object.keys(objeto).length ? objeto : undefined;
  }
  if (valor === null || valor === undefined || valor === "") return undefined;
  return valor;
}

function jsonLd(datos) {
  return JSON.stringify(limpiar(datos) || {}).replace(/</g, "\\u003c");
}

module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addFilter("velardevJsonLd", jsonLd);
  },
  jsonLd,
};
