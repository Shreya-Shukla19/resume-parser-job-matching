function cleanText(text) {
  return text
    .replace(/\r/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/[•▪■◆►]/g, " ")
    .trim();
}

function normalizeText(text) {
  return cleanText(text).toLowerCase();
}

module.exports = {
  cleanText,
  normalizeText
};
