const { fechaCorta } = require("./_fecha");

// Filtro para las plantillas: {{ noteProps.date | velardevFechaCorta(en) }}
module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addFilter("velardevFechaCorta", (fecha, en) => (fecha ? fechaCorta(fecha, !!en) : ""));
  },
};
