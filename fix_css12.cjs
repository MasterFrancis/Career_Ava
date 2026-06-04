const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace tagRisk
css = css.replace(/\.tagRisk\s*\{[^}]*\}/g, '');

const tagRiskCSS = `
.tagRisk {
  background: #fff1f2 !important;
  color: #be123c !important;
  /* Dangerous spiky feeling border */
  border: 4px solid transparent !important;
  border-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0L12 6L6 12Z' fill='%23be123c'/%3E%3C/svg%3E") 4 repeat !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 4px 8px !important;
}
`;

css += '\n' + tagRiskCSS;

fs.writeFileSync('src/index.css', css);
