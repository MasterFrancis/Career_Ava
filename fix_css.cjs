const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The user previously had a bunch of messy "border: 4px solid var(--stroke); box-shadow: var(--shadow);" added everywhere.
// Let's clean up ALL of them and restore sanity, then selectively add them to the buttons.

const classesToRemove = [
  '.card',
  '.brandMark',
  '.modal',
  '.dimRow',
  '.rankRow',
  '.roadPhase',
  '.matrixTh',
  '.matrixSelect',
  '.homeKicker',
  '.chip',
  '.homeStat',
  '.dimExplainCardScroll',
  '.dimExplainKey',
  '.dimKey',
  '.breakRow',
  '.noteArea',
  '.tag',
  '.tooltipContent'
];

// Helper to remove standard brutalist injections
css = css.replace(/border-radius: 0; box-shadow: var\(--shadow\);/g, '');
css = css.replace(/border: 4px solid var\(--stroke\);box-shadow: var\(--shadow\);/g, '');
css = css.replace(/background: var\(--paper\); box-shadow: var\(--shadow\); font-weight: 700; border: 4px solid var\(--stroke\); /g, 'background: var(--paper);');
css = css.replace(/background: var\(--paper\); box-shadow: var\(--shadow\); border: 4px solid var\(--stroke\); /g, 'background: var(--paper);');
css = css.replace(/background: var\(--accent\); border: 4px solid var\(--stroke\); \n  box-shadow: var\(--shadow\);/g, 'background: var(--accent);');
css = css.replace(/border: 4px solid var\(--stroke\);/g, 'border: 1px solid var(--stroke);');
css = css.replace(/box-shadow: var\(--shadow\);/g, '');

fs.writeFileSync('src/index.css', css);
