const fs = require("fs");
const path = require("path");

async function extractPdfText(buffer) {
  let pdfParse;

  try {
    pdfParse = require("pdf-parse");
  } catch (error) {
    throw new Error("PDF support requires 'npm install'.");
  }

  const result = await pdfParse(buffer);
  return result.text || "";
}

async function extractText(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }

  if (extension === ".pdf") {
    const buffer = fs.readFileSync(filePath);
    return extractPdfText(buffer);
  }

  throw new Error(`Unsupported file type: ${extension}`);
}

async function extractTextFromBuffer(fileBuffer, fileName) {
  const extension = path.extname(fileName || "").toLowerCase();

  if (extension === ".txt") {
    return fileBuffer.toString("utf8");
  }

  if (extension === ".pdf") {
    return extractPdfText(fileBuffer);
  }

  throw new Error(`Unsupported file type: ${extension}`);
}

module.exports = {
  extractText,
  extractTextFromBuffer
};
