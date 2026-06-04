const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/\.breakKey\s*\{[^}]*\}/, `.breakKey {
  font-weight: 900;
  color: var(--accent) !important;
}`);

// Also just globally ensure lucide-box or similar when used in these contexts are accent colored if requested.
// The user selected `<svg class="lucide lucide-box">` so they want all of these to be pink.
// In the screenshot from earlier context, there might be other places.
// Let's just set `.breakKey` to accent.

fs.writeFileSync('src/index.css', css);
