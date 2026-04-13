function monthNameToNumber(value) {
  const months = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11
  };

  return months[value.toLowerCase()];
}

function parseMonthYear(value) {
  const match = value.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!match) {
    return null;
  }

  const month = monthNameToNumber(match[1]);
  const year = Number(match[2]);

  if (month === undefined || Number.isNaN(year)) {
    return null;
  }

  return new Date(year, month, 1);
}

function monthDifference(start, end) {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

module.exports = {
  parseMonthYear,
  monthDifference
};
