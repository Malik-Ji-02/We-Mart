import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const srcDir = path.resolve(__dirname, "../src")

const violations = []

const allowedFiles = new Set(["tokens.css"])

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      scanDir(fullPath)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name)
      if (
        (ext === ".css" || ext === ".tsx" || ext === ".ts") &&
        !allowedFiles.has(entry.name) &&
        !entry.name.endsWith(".d.ts")
      ) {
        checkFile(fullPath)
      }
    }
  }
}

function checkFile(filePath) {
  const relPath = path.relative(srcDir, filePath).replace(/\\/g, "/")
  const content = fs.readFileSync(filePath, "utf-8")
  const lines = content.split(/\r?\n/)

  lines.forEach((line, idx) => {
    const lineNum = idx + 1

    // Strip comments
    const stripped = line.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/, "")

    // 1. Hex color literals: #[0-9a-fA-F]{3,8}
    const hexMatch = stripped.match(/#[0-9a-fA-F]{3,8}/)
    if (hexMatch) {
      violations.push({
        file: relPath,
        line: lineNum,
        type: "HEX Color Literal",
        match: hexMatch[0],
        snippet: line.trim(),
      })
    }

    // CSS-specific checks
    if (filePath.endsWith(".css")) {
      // 2. Raw font-size literals in CSS: font-size: 14px
      const fsMatch = stripped.match(/font-size:\s*(\d+px)/i)
      if (fsMatch) {
        violations.push({
          file: relPath,
          line: lineNum,
          type: "Raw font-size",
          match: fsMatch[1],
          snippet: line.trim(),
        })
      }

      // 3. Raw border-radius literals in CSS: border-radius: 8px (except 50%)
      const rMatch = stripped.match(/border-radius:\s*([^;]+)/i)
      if (rMatch && !rMatch[1].includes("var(--r-") && !rMatch[1].includes("50%")) {
        violations.push({
          file: relPath,
          line: lineNum,
          type: "Raw border-radius",
          match: rMatch[1].trim(),
          snippet: line.trim(),
        })
      }

      // 4. Raw z-index literals in CSS: z-index: 10
      const zMatch = stripped.match(/z-index:\s*(\d+)/i)
      if (zMatch) {
        violations.push({
          file: relPath,
          line: lineNum,
          type: "Raw z-index",
          match: zMatch[1],
          snippet: line.trim(),
        })
      }
    }
  })
}

console.log("==========================================================================================")
console.log("                         DESIGN TOKEN ENFORCEMENT AUDIT                                   ")
console.log("==========================================================================================")

scanDir(srcDir)

if (violations.length > 0) {
  console.log(`Found ${violations.length} design token violation(s):\n`)
  violations.forEach((v) => {
    console.log(`  [${v.type}] ${v.file}:${v.line} -> "${v.match}" in: ${v.snippet}`)
  })
  console.log("==========================================================================================")
  console.error(`\n❌ Token check FAILED. Replace hardcoded literals with tokens from src/styles/tokens.css.`)
  process.exit(1)
} else {
  console.log("✅ Zero hardcoded design tokens found in src/ (outside tokens.css)! Perfect compliance.")
  console.log("==========================================================================================")
  process.exit(0)
}
