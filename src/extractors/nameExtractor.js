function extractName(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return null;
  }

  const firstLine = lines[0];
  if (/^[A-Za-z]+(?: [A-Za-z]+){1,3}$/.test(firstLine)) {
    return firstLine;
  }

  return null;
}

module.exports = {
  extractName
};
