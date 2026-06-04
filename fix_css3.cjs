const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Remove modal shadow
css = css.replace(/box-shadow: 12px 12px 0 var\(--stroke\); border: 1px solid var\(--stroke\);/g, 'border: 1px solid rgba(14,38,61,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4);');

// 2. Fix .brandMark
css = css.replace(/border: 4px solid var\(--text\);/g, 'border: 2px solid var(--text);');

// 3. Fix .segmentBtnActive to match the pressed state
css = css.replace(/\.segmentBtnActive\s*\{[^}]*\}/, `.segmentBtnActive {
  transform: translate(4px, 4px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
  background: var(--accent) !important; /* deep pink */
  color: #fff !important;
  border-color: var(--stroke) !important;
  text-shadow: none;
}`);

// 4. Remove .btnPrimary animation if it adds shadow
css = css.replace(/\.btnPrimary\s*\{\s*animation: pulse-shadow 3s infinite;\s*\}/, '');

fs.writeFileSync('src/index.css', css);
