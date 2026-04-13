const { monthDifference, parseMonthYear } = require("../utils/dateUtils");

function extractExperience(text) {
  const directMatch = text.match(/(\d+(?:\.\d+)?)\+?\s+years?(?:\s+of)?\s+experience/i);
  if (directMatch) {
    return Number(directMatch[1]);
  }

  if (/\bfresher\b|\bentry[- ]level\b/i.test(text)) {
    return 0;
  }

  const ranges = [...text.matchAll(/([A-Za-z]{3,9}\s+\d{4})\s*[-–]\s*(Present|Current|[A-Za-z]{3,9}\s+\d{4})/gi)];
  if (ranges.length === 0) {
    return null;
  }

  let totalMonths = 0;

  for (const range of ranges) {
    const start = parseMonthYear(range[1]);
    const end =
      /present|current/i.test(range[2]) ? new Date() : parseMonthYear(range[2]);

    if (!start || !end) {
      continue;
    }

    const diff = monthDifference(start, end);
    if (diff > 0) {
      totalMonths += diff;
    }
  }

  if (totalMonths === 0) {
    return null;
  }

  return Number((totalMonths / 12).toFixed(1));
}

module.exports = {
  extractExperience
};
