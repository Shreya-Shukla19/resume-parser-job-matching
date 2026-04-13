function extractSalary(text) {
  const patterns = [
    /\b\d{1,2}\s?LPA\b/i,
    /\b\d[\d,]*(?:\.\d+)?\s?(?:per annum|annual|yearly)\b/i,
    /\bCTC\s*:\s*[^\n]+/i,
    /\bSalary\s*:\s*[^\n]+/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].replace(/\s+/g, " ").trim();
    }
  }

  return null;
}

module.exports = {
  extractSalary
};
