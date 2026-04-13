const { calculateMatchingScore } = require("./scoreCalculator");

function matchResumeWithJob(resume, job) {
  const resumeSet = new Set(resume.resumeSkills);

  const skillsAnalysis = job.skills.map((skill) => ({
    skill,
    presentInResume: resumeSet.has(skill)
  }));

  return {
    jobId: job.jobId,
    role: job.role,
    aboutRole: job.aboutRole,
    salary: job.salary,
    yearOfExperience: job.yearOfExperience,
    requiredSkills: job.requiredSkills,
    optionalSkills: job.optionalSkills,
    skillsAnalysis,
    matchingScore: calculateMatchingScore(resume.resumeSkills, job.skills)
  };
}

module.exports = {
  matchResumeWithJob
};
