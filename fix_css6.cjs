const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

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

// Apply to .matrixSelect
css = css.replace(/\.matrixSelect\s*\{[^}]*\}/, `.matrixSelect {
  width: 100%;
  padding: 9px 10px;
  background: var(--paper);
  color: var(--text);
  font: inherit;
  outline: none;
  cursor: pointer;
${buttonBase}
}`);

css = css.replace(/\.matrixSelect:hover\s*\{[^}]*\}/, '');
css = css.replace('.matrixSelect {', `.matrixSelect:hover {\n${buttonHover}\n}\n\n.matrixSelect {`);
css = css.replace('.matrixSelect:hover {', `.matrixSelect:active, .matrixSelect:focus {\n${buttonActive}\n}\n\n.matrixSelect:hover {`);

fs.writeFileSync('src/index.css', css);
