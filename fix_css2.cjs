const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Define interactive button styles
const buttonBase = `
  border: 4px solid var(--stroke) !important;
  box-shadow: 4px 4px 0px var(--stroke) !important;
  border-radius: 8px !important;
  transition: all 120ms ease !important;
`;

const buttonHover = `
  transform: translate(4px, 4px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
  background: var(--accent2) !important; /* light pink */
  color: var(--text) !important;
`;

const buttonActive = `
  background: var(--accent) !important; /* deep pink */
  color: #fff !important;
`;

const clickCardHover = `
  transform: translate(4px, 4px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
  background: var(--accent2) !important;
`;

// Replace .btn definitions
css = css.replace(/\.btn\s*\{[^}]*\}/, `.btn {
  appearance: none;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: 800;
  letter-spacing: 0.3px;
  font-size: 18px;
  background: var(--paper);
  color: var(--text);
  text-transform: uppercase;
${buttonBase}
}`);

css = css.replace(/\.btn:hover\s*\{[^}]*\}/, `.btn:hover {
${buttonHover}
}`);

// Add .btn:active
if (!css.includes('.btn:active')) {
  css = css.replace('.btn:hover {', `.btn:active {\n${buttonActive}\n}\n\n.btn:hover {`);
}

// .btnPrimary base
css = css.replace(/\.btnPrimary\s*\{[^}]*\}/, `.btnPrimary {
  background: var(--accent);
  color: rgba(255, 255, 255, 0.95);
}`);
// Remove .btnPrimary:hover since .btn:hover covers it, but we need to override if .btnPrimary has specific hover? No, user says ALL interactive items should hover light pink, active deep pink.
css = css.replace(/\.btnPrimary:hover\s*\{[^}]*\}/, '');

// .quizScaleBtn
css = css.replace(/\.quizScaleBtn\s*\{[^}]*\}/, `.quizScaleBtn {
  padding: 14px 10px;
  background: var(--paper);
  color: var(--text);
  font-weight: 820;
  font-size: 18px;
  cursor: pointer;
${buttonBase}
}`);

css = css.replace(/\.quizScaleBtn:hover\s*\{[^}]*\}/, `.quizScaleBtn:hover {
${buttonHover}
}`);

if (!css.includes('.quizScaleBtn:active')) {
  css = css.replace('.quizScaleBtn:hover {', `.quizScaleBtn:active {\n${buttonActive}\n}\n\n.quizScaleBtn:hover {`);
}

// .pill
css = css.replace(/\.pill\s*\{[^}]*\}/, `.pill {
  padding: 8px 16px;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted);
  background: var(--paper);
  font-size: 16px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
${buttonBase}
}`);

css = css.replace(/\.pill:hover\s*\{[^}]*\}/, `.pill:hover {
${buttonHover}
}`);

if (!css.includes('.pill:active')) {
  css = css.replace('.pill:hover {', `.pill:active {\n${buttonActive}\n}\n\n.pill:hover {`);
}

// .sectionLink
css = css.replace(/\.sectionLink\s*\{[^}]*\}/, `.sectionLink {
  text-decoration: none;
  padding: 6px 10px;
  font-size: 18px;
  color: var(--muted);
  background: var(--paper);
  font-weight: 700;
  width: fit-content;
${buttonBase}
}`);

css = css.replace(/\.sectionLink:hover\s*\{[^}]*\}/, `.sectionLink:hover {
${buttonHover}
}`);

if (!css.includes('.sectionLink:active')) {
  css = css.replace('.sectionLink:hover {', `.sectionLink:active {\n${buttonActive}\n}\n\n.sectionLink:hover {`);
}

// .segmentBtn
// Let's make segmentBtn also follow this
css = css.replace(/\.segmentBtn\s*\{[^}]*\}/, `.segmentBtn {
  appearance: none;
  background: transparent;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  color: #2e1065;
  text-shadow: none;
${buttonBase}
}`);

css = css.replace(/\.segmentBtn:hover\s*\{[^}]*\}/, `.segmentBtn:hover {
${buttonHover}
}`);

if (!css.includes('.segmentBtn:active')) {
  css = css.replace('.segmentBtn:hover {', `.segmentBtn:active {\n${buttonActive}\n}\n\n.segmentBtn:hover {`);
}

// .clickCard
css = css.replace(/\.clickCard\s*\{[^}]*\}/, `.clickCard {
${buttonBase}
  background: var(--paper);
}`);

css = css.replace(/\.clickCard:hover\s*\{[^}]*\}/, `.clickCard:hover {
${clickCardHover}
}`);

// Fix .card so it doesn't have thick border or shadow, but 1px solid
css = css.replace(/\.card\s*\{\s*border:\s*1px solid var\(--stroke\);\s*border-radius:\s*var\(--radius-lg\);\s*background:\s*var\(--paper\);\s*transition:\s*transform 0\.2s,\s*box-shadow 0\.2s;\s*overflow:\s*visible;\s*\}/, `.card {
  border: 1px solid rgba(14,38,61,0.15);
  border-radius: var(--radius-lg);
  background: var(--paper);
  overflow: visible;
}`);

// Write back
fs.writeFileSync('src/index.css', css);
