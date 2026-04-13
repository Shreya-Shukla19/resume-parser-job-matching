# Resume Parser and Job Matcher

This project was developed as part of my Software Developer Internship assignment where the task was to build a simple Resume Parsing and Job Matching System without using any LLM or AI based parsing service.

The system uses a simple rule-based approach to ensure clarity and ease of understanding.

The project now supports both:

- CLI usage
- a lightweight web deployment for demo and submission purposes

## What this project does

This project takes:

- one resume file
- one or more job description files

Then it:

- reads the resume
- extracts basic details like name, salary, experience and skills
- reads the job description
- extracts role, salary, experience, required skills and optional skills
- checks which JD skills are present in the resume
- gives a matching score

At the end it prints the final result in JSON format in the terminal.

## Important assignment rule followed

This project does **not** use:

- ChatGPT API
- OpenAI API
- Gemini
- Claude
- any AI resume parser
- any LLM based SaaS

Only simple rule-based logic, regex, keyword matching and a PDF parser library are used.

## Tech used

- Node.js
- pdf-parse
- plain JavaScript

## What you need before running

You should have these things installed:

- Node.js
- npm

You can check with:

```bash
node -v
npm -v
```

If `npm` does not work in PowerShell because of script policy, then use `npm.cmd` instead.

## Project folder structure

```text
src/
  data/
  extractors/
  matchers/
  parsers/
  utils/
samples/
  resumes/
  jds/
```

## Install steps

Open terminal inside the project folder and run:

```bash
npm.cmd install
```

If your system allows normal npm, then this also works:

```bash
npm install
```

## Local web run

Start the deployable web server:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

You can upload:

- 1 resume file
- 1 or more JD files

Supported formats remain:

- `.txt`
- `.pdf`

## How to run

### 1. Run with sample files

```bash
npm.cmd run sample
```

If `npm.cmd run sample` does not work for any reason, then run direct command:

```bash
node src/index.js samples/resumes/resume1.txt samples/jds/jd1.txt
```

If you want to run the CLI explicitly after the web server changes:

```bash
npm.cmd run cli -- samples/resumes/resume1.txt samples/jds/jd1.txt
```

### 2. Run with your own files

Syntax:

```bash
node src/index.js "resume-file-path" "jd-file-path"
```

Example:

```bash
node src/index.js 
"resume-file-path" "jd-file-path"
```

### 3. Run one resume against multiple JDs

```bash
node src/index.js "resume-file-path" "jd1-file-path" "jd2-file-path" "jd3-file-path"
```

Example:

```bash
node src/index.js 
 "samples/jds/assignment-jd.txt"
```

## Which file formats work

This project supports:

- `.txt`
- `.pdf`

For PDF files, `pdf-parse` package is used after install.

## Deployment suggestion

For a public deployment link, use **Render**.

This repo now includes a `render.yaml` file, so Render can detect the service settings automatically.

### Render settings

- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`

### Deploy steps

1. Push this project to GitHub
2. Create a new **Blueprint** or **Web Service** on Render
3. Connect the GitHub repo
4. If Render detects `render.yaml`, keep the detected settings
5. Deploy

After deploy, Render will provide a public URL where the upload form and API are available.

## Input example

### Resume input

Resume can contain things like:

- name
- skills
- salary
- experience
- education

### JD input

JD can contain things like:

- role
- required skills
- optional skills
- salary
- experience
- short role description

## Output format

Output comes in JSON format like this:

```json
{
  "name": "shrutika",
  "salary": "12 LPA",
  "yearOfExperience": 4.5,
  "resumeSkills": ["java", "mysql", "spring boot"],
  "matchingJobs": [
    {
      "jobId": "JD001",
      "role": "Backend Developer",
      "aboutRole": "Responsible for backend development.",
      "salary": "12 LPA",
      "yearOfExperience": 4,
      "requiredSkills": ["java", "mysql", "spring boot"],
      "optionalSkills": ["docker", "aws"],
      "skillsAnalysis": [
        { "skill": "java", "presentInResume": true },
        { "skill": "docker", "presentInResume": false }
      ],
      "matchingScore": 67
    }
  ]
}
```

## How matching score is calculated

Formula used:

```text
(Matched JD Skills / Total JD Skills) * 100
```

Example:

- total JD skills = 6
- matched skills = 4
- score = 66.67

In the project output it is rounded.

## Files you will mainly use

- `src/index.js` -> main file
- `server.js` -> deployable web server
- `public/index.html` -> simple web UI
- `src/parsers/resumeParser.js` -> resume parsing
- `src/parsers/jdParser.js` -> job description parsing
- `src/matchers/jobMatcher.js` -> matching logic
- `samples/` -> sample resume and JD files

## If you get error while running

### 1. npm is blocked in PowerShell

Use:

```bash
npm.cmd install
npm.cmd run sample
```

### 2. Only resume path was given

This project needs:

- 1 resume file
- at least 1 JD file

Wrong:

```bash
node src/index.js "resume.pdf"
```

Correct:

```bash
node src/index.js "resume.pdf" "jd.pdf"
```

### 3. File path issue

If file path has spaces, always use quotes:

```bash
node src/index.js "C:\Users\shrey\Downloads\My Resume.pdf" "C:\Users\shrey\Downloads\My JD.pdf"
```

## Notes

- This is a basic rule-based project
- It is not meant to be a production-level parser
- Extraction depends on text available inside the PDF or text file
- Some resumes may give partial extraction because resume formats are different

## Author

**Shreya Shukla**  
**Full Stack Developer**
