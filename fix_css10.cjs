const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the end part that I just added
css = css.replace(/\/\* Lighter visual weight[\s\S]*$/, `
/* Lighter visual weight for matrix score buttons when unselected */
.matrixScoreBtn:not(.segmentBtnActive) {
  border: 2px solid rgba(46, 16, 101, 0.3) !important;
  box-shadow: 2px 2px 0px rgba(46, 16, 101, 0.15) !important;
  color: rgba(46, 16, 101, 0.5) !important;
}

.matrixScoreBtn.segmentBtnActive {
  border: 2px solid var(--stroke) !important;
  box-shadow: 2px 2px 0px var(--stroke) !important;
  transform: none !important; 
}

.matrixScoreBtn:hover {
  transform: translate(2px, 2px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
}

.matrixScoreBtn:active {
  transform: translate(2px, 2px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
}
`);

fs.writeFileSync('src/index.css', css);
