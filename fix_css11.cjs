const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// First, clean up duplicate definitions of .tagGood, .tagRisk, .textAdvantage, .textRisk
// Actually it's easier to just strip them all and append at the end.
css = css.replace(/\.tagGood\s*\{[^}]*\}/g, '');
css = css.replace(/\.tagRisk\s*\{[^}]*\}/g, '');
css = css.replace(/\.textAdvantage\s*\{[^}]*\}/g, '');
css = css.replace(/\.textRisk\s*\{[^}]*\}/g, '');

const newCSS = `
.tagGood {
  background: #f0fdfa !important; /* light teal */
  color: #0f766e !important;      /* deep teal */
  border: 1px solid #0f766e !important;
  border-radius: 99px !important; /* Badge / pill */
  box-shadow: none !important;
}

.tagRisk {
  background: #fff1f2 !important; /* light rose */
  color: #be123c !important;      /* deep rose */
  /* Spiky/dangerous border using a repeating linear gradient for a hazard tape look, or just dashed */
  border: 2px dashed #be123c !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.textAdvantage {
  color: #0f766e !important; 
  text-shadow: none !important;
  font-size: 0.9em !important; /* Reduce font size */
}

.textRisk {
  color: #be123c !important;
  text-shadow: none !important;
  font-size: 0.9em !important; /* Reduce font size */
}
`;

css += '\n' + newCSS;

fs.writeFileSync('src/index.css', css);
