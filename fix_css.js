const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Remove ALL occurrences of `border: 4px solid var(--stroke);` and `box-shadow: var(--shadow);` from NON-INTERACTIVE classes.
// Wait, it's easier to just remove them globally, and then re-add them ONLY to the interactive classes.
// Let's remove them globally first.
css = css.replace(/border-radius: 0; box-shadow: var\(--shadow\);/g, 'border-radius: 8px;');
css = css.replace(/border: 4px solid var\(--stroke\);box-shadow: var\(--shadow\);/g, '');
css = css.replace(/box-shadow: var\(--shadow\);/g, '');
css = css.replace(/border: 4px solid var\(--stroke\);/g, 'border: 1px solid rgba(14, 38, 61, 0.12);');
// Fix some weird duplicates
css = css.replace(/border: 1px solid rgba\(14, 38, 61, 0.12\); /g, '');
css = css.replace(/background: var\(--paper\);  font-weight: 700; /g, 'background: var(--paper); font-weight: 700; ');

// Let's just do targeted replacements for the interactive classes.
