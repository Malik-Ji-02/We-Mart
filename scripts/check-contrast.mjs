/**
 * WCAG 2.1 Contrast Checker Script
 * Verifies that all token color pairs used for text and UI elements meet WCAG AA requirements:
 * - Normal text: >= 4.5:1
 * - Large/Bold text (>=18px or >=14px bold) & UI components/icons: >= 3.0:1
 */

function sRGBtoLin(colorChannel) {
  colorChannel = colorChannel / 255
  if (colorChannel <= 0.04045) {
    return colorChannel / 12.92
  } else {
    return Math.pow((colorChannel + 0.055) / 1.055, 2.4)
  }
}

function getLuminance(hex) {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b)
}

function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Token dictionary
const tokens = {
  primary: "#0c831f",
  primaryDark: "#086b18",
  primary10: "#e7f3e9",
  primary20: "#cfe7d2",
  text: "#1c1c1c",
  text2: "#666666",
  textDisabled: "#9a9a9a",
  background: "#ffffff",
  surface: "#f5f5f5",
  border: "#e8e8e8",
  borderStrong: "#d8d8d8",
  viewportBg: "#eeeeee",
  success: "#0e7a33",
  successIcon: "#1fa84f",
  warning: "#b45309",
  warningBg: "#f5a623",
  error: "#d3232f",
  accent: "#f8cb46",
  accentSoft: "#fff8e1",
  onAccent: "#4b3800",
  onPrimary: "#ffffff",
  mintOnDarkGreen: "#d7f0dc",
}

// Color pairs to test
const pairs = [
  { fg: "text", bg: "background", required: 4.5, role: "Primary text on white" },
  { fg: "text", bg: "surface", required: 4.5, role: "Primary text on surface" },
  { fg: "text", bg: "primary10", required: 4.5, role: "Primary text on tint background" },
  { fg: "text", bg: "accentSoft", required: 4.5, role: "Primary text on accent soft" },
  { fg: "text2", bg: "background", required: 4.5, role: "Secondary text on white" },
  { fg: "text2", bg: "surface", required: 4.5, role: "Secondary text on surface" },
  { fg: "text2", bg: "primary10", required: 4.5, role: "Secondary text on primary-10" },
  { fg: "onPrimary", bg: "primary", required: 4.5, role: "On-primary on primary green" },
  { fg: "onPrimary", bg: "primaryDark", required: 4.5, role: "On-primary on primary dark" },
  { fg: "mintOnDarkGreen", bg: "primaryDark", required: 4.5, role: "Mint text on primary dark green" },
  { fg: "onAccent", bg: "accent", required: 4.5, role: "On-accent on accent yellow" },
  { fg: "onAccent", bg: "accentSoft", required: 4.5, role: "On-accent on accent soft" },
  { fg: "error", bg: "background", required: 4.5, role: "Error text on white" },
  { fg: "error", bg: "surface", required: 4.5, role: "Error text on surface" },
  { fg: "success", bg: "background", required: 4.5, role: "Success text on white" },
  { fg: "success", bg: "surface", required: 4.5, role: "Success text on surface" },
  { fg: "warning", bg: "background", required: 4.5, role: "Warning text on white" },
  { fg: "text", bg: "warningBg", required: 4.5, role: "Dark text on warning chip" },
  { fg: "primary", bg: "background", required: 4.5, role: "Primary green link/button text on white" },
  { fg: "primaryDark", bg: "primary10", required: 4.5, role: "Primary dark on primary-10 background" },
  { fg: "successIcon", bg: "background", required: 3.0, role: "Rating star icon on white (UI icon standard)" },
]

console.log("==========================================================================================")
console.log("                      APNAMARKET WCAG 2.1 CONTRAST AUDIT REPORT                           ")
console.log("==========================================================================================")
console.log(
  `| ${"Foreground".padEnd(16)} | ${"Background".padEnd(14)} | ${"Ratio".padStart(7)} | ${"Required".padStart(8)} | ${"Status".padEnd(6)} | ${"Role".padEnd(35)} |`
)
console.log("------------------------------------------------------------------------------------------")

let failedCount = 0

for (const pair of pairs) {
  const fgHex = tokens[pair.fg]
  const bgHex = tokens[pair.bg]
  const ratio = getContrastRatio(fgHex, bgHex)
  const passed = ratio >= pair.required

  if (!passed) failedCount++

  const ratioStr = `${ratio.toFixed(2)}:1`
  const reqStr = `>= ${pair.required}:1`
  const statusStr = passed ? "PASS" : "FAIL"

  console.log(
    `| ${pair.fg.padEnd(16)} | ${pair.bg.padEnd(14)} | ${ratioStr.padStart(7)} | ${reqStr.padStart(8)} | ${statusStr.padEnd(6)} | ${pair.role.padEnd(35)} |`
  )
}

console.log("==========================================================================================")

if (failedCount > 0) {
  console.error(`\n❌ Contrast audit FAILED with ${failedCount} violation(s). Adjust tokens in src/styles/tokens.css.`)
  process.exit(1)
} else {
  console.log(`\n✅ All ${pairs.length} contrast checks PASSED successfully! (WCAG AA compliant)`)
  process.exit(0)
}
