const express = require("express");
const multer = require("multer");
const path = require("path");
const { runMatcherFromUploads } = require("./src/runMatcher");

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post(
  "/api/match",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jobs", maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      const resumeFile = req.files?.resume?.[0];
      const jobFiles = req.files?.jobs || [];

      if (!resumeFile || jobFiles.length === 0) {
        return res.status(400).json({
          error: "Please upload 1 resume file and at least 1 JD file."
        });
      }

      const result = await runMatcherFromUploads(resumeFile, jobFiles);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        error: error.message || "Something went wrong."
      });
    }
  }
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
