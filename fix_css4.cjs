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

// Apply to pathTab
css = css.replace(/\.pathTab\s*\{[^}]*\}/, `.pathTab {
  flex: 0 0 auto;
  text-decoration: none;
  padding: 8px 16px;
  white-space: nowrap;
  background: var(--paper);
  color: var(--text);
  font-weight: 720;
${buttonBase}
}`);

css = css.replace(/\.pathTab:hover\s*\{[^}]*\}/, `.pathTab:hover {
${buttonHover}
}`);

// Add active state if it doesn't exist
if (!css.includes('.pathTab:active')) {
  css = css.replace('.pathTab:hover {', `.pathTab:active {\n${buttonActive}\n}\n\n.pathTab:hover {`);
}

// .pathTabActive should look pressed
css = css.replace(/\.pathTabActive\s*\{[^}]*\}/, `.pathTabActive {
  transform: translate(4px, 4px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
  background: var(--accent) !important;
  color: #fff !important;
  border-color: var(--stroke) !important;
}`);

// Remove weird overrides for pathTab at bottom
css = css.replace(/\.pathTab\s*\{\s*color:\s*#e9d5ff\s*!important;\s*\}/, '');
css = css.replace(/\.pathTabActive\s*\{\s*color:\s*#ffffff\s*!important;\s*border-bottom-color:\s*#ffffff\s*!important;\s*\}/, '');

fs.writeFileSync('src/index.css', css);
