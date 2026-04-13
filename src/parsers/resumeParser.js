const { extractName } = require("../extractors/nameExtractor");
const { extractSalary } = require("../extractors/salaryExtractor");
const { extractExperience } = require("../extractors/experienceExtractor");
const { extractSkills } = require("../extractors/skillExtractor");

function parseResume(text) {
  const name = extractName(text);
  const salary = extractSalary(text);
  const yearOfExperience = extractExperience(text);
  const resumeSkills = extractSkills(text);

  return { name, salary, yearOfExperience, resumeSkills };
}

module.exports = {
  parseResume
};
