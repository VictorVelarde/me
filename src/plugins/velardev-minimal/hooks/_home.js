// Páginas de portada: "/" y "/inicio/" (es) y "/home/" (en).
const HOME_OUTPUTS = /(^|\/)dist\/(inicio\/|home\/)?index\.html$/;

function isHome(outputPath) {
  return typeof outputPath === "string" && HOME_OUTPUTS.test(outputPath);
}

function isEnglish(outputPath) {
  return typeof outputPath === "string" && /(^|\/)dist\/home\/index\.html$/.test(outputPath);
}

module.exports = { isHome, isEnglish };
