const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/\.tagRisk\s*\{[^}]*\}/g, '');

const tagRiskCSS = `
.tagRisk {
  background: #fff1f2 !important;
  color: #be123c !important;
  border: 4px solid transparent !important;
  border-image: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4L4 0L8 4L4 8Z' fill='%23be123c'/%3E%3C/svg%3E") 3 repeat !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 4px 8px !important;
  margin: 2px !important;
}
`;

css += '\n' + tagRiskCSS;

fs.writeFileSync('src/index.css', css);
