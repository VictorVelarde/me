// Fecha corta y natural, la misma en toda la web: "30 oct 2026" (el CSS la
// pone en mayúsculas pequeñas). Meses abreviados según el idioma.
const MESES = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
};

// "2026-10-30" -> "30 oct 2026". Si no se entiende la fecha, se devuelve tal cual.
function fechaCorta(fecha, en) {
  const iso = String(fecha).slice(0, 10);
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return String(fecha);
  return `${d} ${MESES[en ? "en" : "es"][m - 1]} ${y}`;
}

module.exports = { fechaCorta };
