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

// Apply to .noteArea
css = css.replace(/\.noteArea\s*\{[^}]*\}/, `.noteArea {
  margin-top: 12px;
  width: 100%;
  min-height: 130px;
  resize: vertical;
  padding: 12px;
  background: var(--paper);
  color: var(--text);
  font: inherit;
  outline: none;
${buttonBase}
}`);

// Add hover/focus
css = css.replace(/\.noteArea:focus\s*\{[^}]*\}/, '');
css = css.replace(/\.noteArea:hover\s*\{[^}]*\}/, '');
css = css.replace('.noteArea {', `.noteArea:hover {\n${buttonHover}\n}\n\n.noteArea {`);
css = css.replace('.noteArea:hover {', `.noteArea:focus {\n${buttonActive}\n}\n\n.noteArea:hover {`);

fs.writeFileSync('src/index.css', css);
