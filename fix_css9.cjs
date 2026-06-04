const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const matrixScoreBtnCSS = `
/* Lighter visual weight for matrix score buttons when unselected */
.matrixScoreBtn:not(.segmentBtnActive) {
  border: 2px solid rgba(46, 16, 101, 0.3) !important;
  box-shadow: 2px 2px 0px rgba(46, 16, 101, 0.15) !important;
  color: rgba(46, 16, 101, 0.5) !important;
}

.matrixScoreBtn:hover {
  transform: translate(2px, 2px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
}

.matrixScoreBtn.segmentBtnActive {
  /* Make sure the active button still has 2px translation and shadow logic if needed, 
     or just let it use the original 4px. 
     Wait, if it's active, it's deep pink, does it need to match the 2px offset of hover? 
     Original segmentBtnActive has transform: translate(4px, 4px). Let's keep it 2px to be consistent with the lighter shadow. */
  border: 2px solid var(--stroke) !important;
  box-shadow: 2px 2px 0px var(--stroke) !important;
  transform: none !important; /* Not pressed by default */
}

.matrixScoreBtn.segmentBtnActive:active {
  transform: translate(2px, 2px) !important;
  box-shadow: 0px 0px 0px var(--stroke) !important;
}
`;

css += '\n' + matrixScoreBtnCSS;

fs.writeFileSync('src/index.css', css);
