const { extractSalary } = require("../extractors/salaryExtractor");
const { extractExperience } = require("../extractors/experienceExtractor");
const { extractSkills } = require("../extractors/skillExtractor");

function extractRole(text) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

  return lines[0] || null;
}

function extractAboutRole(text) {
  const lines = text.split("\n").map((line) => line.trim());
  const contentLines = [];

  for (const line of lines.slice(1)) {
    if (!line) {
      continue;
    }

    if (/^(required skills?|optional skills?|experience|salary)\s*:/i.test(line)) {
      break;
    }

    contentLines.push(line);
  }

  return contentLines.join(" ") || null;
}

function extractOptionalSkills(text) {
  const match = text.match(/(?:nice to have|optional skills?)[:\s]+([\s\S]*?)(?:\n[A-Z][^\n]*:|\n\n|$)/i);
  if (!match) {
    return [];
  }

  return extractSkills(match[1]);
}

function parseJobDescription(text, jobId = "JD001") {
  const role = extractRole(text);
  const aboutRole = extractAboutRole(text);
  const salary = extractSalary(text);
  const yearOfExperience = extractExperience(text);
  const allSkills = extractSkills(text);
  const optionalSkills = extractOptionalSkills(text);
  const optionalSet = new Set(optionalSkills);
  const requiredSkills = allSkills.filter((skill) => !optionalSet.has(skill));

  return {
    jobId,
    role,
    aboutRole,
    salary,
    yearOfExperience,
    skills: allSkills,
    requiredSkills,
    optionalSkills
  };
}

module.exports = {
  parseJobDescription
};
