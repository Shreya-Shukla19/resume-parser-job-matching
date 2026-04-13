const path = require("path");
const { extractText, extractTextFromBuffer } = require("./extractors/textExtractor");
const { parseResume } = require("./parsers/resumeParser");
const { parseJobDescription } = require("./parsers/jdParser");
const { matchResumeWithJob } = require("./matchers/jobMatcher");

function buildFinalData(parsedResume, jobs) {
  return {
    ...parsedResume,
    matchingJobs: jobs
  };
}

async function runMatcherFromPaths(resumeFile, jobFiles) {
  const resumeFullPath = path.resolve(resumeFile);
  const resumeRawText = await extractText(resumeFullPath);
  const parsedResume = parseResume(resumeRawText);
  const jobs = [];

  for (let i = 0; i < jobFiles.length; i += 1) {
    const currentJobPath = path.resolve(jobFiles[i]);
    const currentJobText = await extractText(currentJobPath);
    const currentJob = parseJobDescription(currentJobText, `JD${String(i + 1).padStart(3, "0")}`);
    const currentMatch = matchResumeWithJob(parsedResume, currentJob);
    jobs.push(currentMatch);
  }

  return buildFinalData(parsedResume, jobs);
}

async function runMatcherFromUploads(resumeFile, jobFiles) {
  const resumeRawText = await extractTextFromBuffer(resumeFile.buffer, resumeFile.originalname);
  const parsedResume = parseResume(resumeRawText);
  const jobs = [];

  for (let i = 0; i < jobFiles.length; i += 1) {
    const currentJobFile = jobFiles[i];
    const currentJobText = await extractTextFromBuffer(currentJobFile.buffer, currentJobFile.originalname);
    const currentJob = parseJobDescription(currentJobText, `JD${String(i + 1).padStart(3, "0")}`);
    const currentMatch = matchResumeWithJob(parsedResume, currentJob);
    jobs.push(currentMatch);
  }

  return buildFinalData(parsedResume, jobs);
}

module.exports = {
  runMatcherFromPaths,
  runMatcherFromUploads
};
