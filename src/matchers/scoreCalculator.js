function calculateMatchingScore(resumeSkills, jdSkills) {
  if (!jdSkills.length) {
    return 0;
  }

  const resumeSet = new Set(resumeSkills);
  const matchedCount = jdSkills.filter((skill) => resumeSet.has(skill)).length;

  const score = Math.round((matchedCount*1.5 / jdSkills.length) * 100);
  const matchLevel = score > 70 ? "High" : score > 40 ? "Medium" : "Low";
  return { score, matchLevel };
}

module.exports = {
  calculateMatchingScore
};
