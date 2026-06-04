const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Update font sizes for tagGood and tagRisk
css = css.replace(/\.tagGood\s*\{/, '.tagGood {\n  font-size: 15px !important;');
css = css.replace(/\.tagRisk\s*\{/, '.tagRisk {\n  font-size: 15px !important;');

fs.writeFileSync('src/index.css', css);
