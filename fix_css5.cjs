const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/\.stepDot:hover\s*\{[^}]*\}/, `.stepDot:hover {
  background: var(--accent2);
  border-color: var(--stroke);
}`);

css = css.replace(/\.stepDotDone\s*\{[^}]*\}/, `.stepDotDone {
  background: var(--faint);
  border-color: var(--stroke);
}`);

css = css.replace(/\.stepDotActive\s*\{[^}]*\}/, `.stepDotActive {
  background: var(--accent);
  border-color: var(--stroke);
}`);

fs.writeFileSync('src/index.css', css);
