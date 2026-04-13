const { runMatcherFromPaths } = require("./runMatcher");

async function main() {
  const resumeFile = process.argv[2];
  const jobFiles = process.argv.slice(3);

  if (!resumeFile || jobFiles.length === 0) {
    console.log("Usage: node src/index.js <resume-file> <jd-file-1> [jd-file-2] [jd-file-3]");
    console.log("Example: npm run sample");
    process.exit(1);
  }

  const finalData = await runMatcherFromPaths(resumeFile, jobFiles);

  console.log(JSON.stringify(finalData, null, 2));
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
