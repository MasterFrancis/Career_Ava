const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove dimExplainCardScroll hover effects completely
css = css.replace(/\.dimExplainCardScroll:hover\s*\{[^}]*\}/, `.dimExplainCardScroll:hover {
  /* No interactive effects for non-interactive elements */
}`);

fs.writeFileSync('src/index.css', css);
