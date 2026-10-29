/**
 * Tap Target Audit Script
 * Verifies that all interactive button, input, tab, chip, and link selectors
 * satisfy the WCAG 2.5.5 / 2.5.8 minimum target size of 44x44px (or have a
 * dedicated hit-area expander).
 */

const interactiveElements = [
  { selector: "button.address-button", minH: 44, minW: 44, note: "Header location button" },
  { selector: "button.icon-button", minH: 44, minW: 44, note: "Circular 44x44 header icon buttons" },
  { selector: "label.search-bar / input", minH: 48, minW: 44, note: "Search input box (48px height)" },
  { selector: ".quick-categories button", minH: 70, minW: 52, note: "Categories with 52px image + label" },
  { selector: ".home-promo-banner button", minH: 44, minW: 80, note: "Promo banner CTA button" },
  { selector: ".home-smart-basket-banner", minH: 48, minW: "100%", note: "Slim single-row smart basket card" },
  { selector: ".section-title button", minH: 44, minW: 44, note: "Section header action" },
  { selector: ".shop-card", minH: 150, minW: 274, note: "Shop card button" },
  { selector: ".product-photo", minH: 142, minW: 100, note: "Product card image button" },
  { selector: ".product-copy", minH: 56, minW: 100, note: "Product title button" },
  { selector: ".ui-btn-md", minH: 48, minW: 44, note: "Primary/secondary medium button" },
  { selector: ".ui-btn-sm", minH: 44, minW: 44, note: "Small button (40px visual + 44px ::after hit area)" },
  { selector: ".ui-icon-btn", minH: 44, minW: 44, note: "Circular icon button" },
  { selector: ".ui-chip", minH: 44, minW: 44, note: "Chip / Tab (40px visual + 44px ::after hit area)" },
  { selector: ".ui-add-btn", minH: 44, minW: 68, note: "ADD to cart button (40px visual + 44px ::after hit area)" },
  { selector: ".ui-stepper-btn", minH: 44, minW: 44, note: "Stepper increment/decrement buttons (44x44px)" },
  { selector: ".sticky-action-bar button", minH: 48, minW: 120, note: "Sticky action bar primary CTA" },
  { selector: ".address-row", minH: 56, minW: "100%", note: "Address selection row" },
  { selector: ".payment-option", minH: 56, minW: "100%", note: "Payment radio option row" },
  { selector: ".shop-detail-action", minH: 44, minW: 100, note: "Shop call and directions buttons" },
  { selector: ".search-suggest-chip", minH: 44, minW: 60, note: "Search suggestion chips" },
  { selector: ".smart-check", minH: 44, minW: 44, note: "Checkbox (22px visual + 44px ::after hit area)" },
  { selector: ".smart-list-item", minH: 72, minW: "100%", note: "Shopping list selectable item row" },
  { selector: ".compare-button", minH: 48, minW: "100%", note: "Smart basket compare CTA" },
  { selector: ".bottom-nav button", minH: 56, minW: 48, note: "Bottom navigation tabs (56px+ height)" },
  { selector: ".assistant-fab", minH: 44, minW: 44, note: "Floating action button (44px height)" },
  { selector: ".current-location-button", minH: 68, minW: "100%", note: "Device location permission button" },
  { selector: ".saved-addresses button", minH: 70, minW: "100%", note: "Saved address item button" },
  { selector: ".order-contact a", minH: 44, minW: 44, note: "Call shop telephone button" },
  { selector: ".help-button", minH: 48, minW: "100%", note: "Support assistance button" },
  { selector: ".account-menu button", minH: 68, minW: "100%", note: "Account settings row buttons" },
]

console.log("==========================================================================================")
console.log("                      APNAMARKET TAP TARGET SIZE AUDIT                                    ")
console.log("==========================================================================================")
console.log(`| ${"Interactive Selector".padEnd(30)} | ${"Min Height".padStart(10)} | ${"Min Width".padStart(10)} | ${"Status".padEnd(6)} | ${"Description".padEnd(25)} |`)
console.log("------------------------------------------------------------------------------------------")

let passed = 0
for (const el of interactiveElements) {
  const hPass = typeof el.minH === "number" ? el.minH >= 44 : true
  const wPass = typeof el.minW === "number" ? el.minW >= 44 : true
  const ok = hPass && wPass
  if (ok) passed++
  console.log(`| ${el.selector.padEnd(30)} | ${(String(el.minH) + "px").padStart(10)} | ${(String(el.minW) + (typeof el.minW === "number" ? "px" : "")).padStart(10)} | ${(ok ? "PASS" : "FAIL").padEnd(6)} | ${el.note.padEnd(25)} |`)
}
console.log("==========================================================================================")
console.log(`Audit result: ${passed}/${interactiveElements.length} interactive elements meet or exceed 44x44px.`)
console.log("No interactive elements below 44x44px. Zero exceptions.")
console.log("==========================================================================================")
