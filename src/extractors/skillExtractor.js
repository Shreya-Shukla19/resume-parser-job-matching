const skills = require("../data/skills.json");
const skillSynonyms = require("../data/skillSynonyms.json");
const { normalizeText } = require("../utils/textCleaner");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function canonicalizeSkill(skill) {
  const value = skill.trim().toLowerCase();
  return skillSynonyms[value] || value;
}

function extractSkills(text) {
  const textToCheck = normalizeText(text);
  const matchedSkills = new Set();
  const allSkills = [...skills].sort((a, b) => b.length - a.length);

  for (const skill of allSkills) {
    const pattern = new RegExp(`\\b${escapeRegex(skill.toLowerCase())}\\b`, "i");
    if (pattern.test(textToCheck)) {
      matchedSkills.add(canonicalizeSkill(skill));
    }
  }

  for (const [alias, canonical] of Object.entries(skillSynonyms)) {
    const pattern = new RegExp(`\\b${escapeRegex(alias)}\\b`, "i");
    if (pattern.test(textToCheck)) {
      matchedSkills.add(canonical);
    }
  }

  if (matchedSkills.has("spring boot")) {
    matchedSkills.delete("spring");
  }

  return Array.from(matchedSkills).sort();
}

module.exports = {
  extractSkills,
  canonicalizeSkill
};
