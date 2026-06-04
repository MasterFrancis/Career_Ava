const fs = require('fs');

const cssPath = '/workspace/src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Fix static stars in body
css = css.replace(
  `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='20' y='30' width='3' height='3' fill='white' opacity='0.8'/%3E%3Crect x='150' y='80' width='3' height='3' fill='white' opacity='0.6'/%3E%3Crect x='80' y='260' width='3' height='3' fill='white' opacity='0.9'/%3E%3Crect x='250' y='190' width='3' height='3' fill='white' opacity='0.5'/%3E%3Cpath d='M100 40 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.9'/%3E%3Cpath d='M220 220 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.7'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='20' y='30' width='3' height='3' fill='white' opacity='0.8'/%3E%3Crect x='150' y='80' width='3' height='3' fill='white' opacity='0.6'/%3E%3Crect x='80' y='60' width='3' height='3' fill='white' opacity='0.9'/%3E%3Crect x='250' y='90' width='3' height='3' fill='white' opacity='0.5'/%3E%3Cpath d='M100 40 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.9'/%3E%3Cpath d='M220 120 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.7'/%3E%3C/svg%3E")`
);

// 2. Fix twinkling stars in body::before
css = css.replace(
  `url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='40' y='120' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.1;1;0.1' dur='3s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='180' y='40' width='4' height='4' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='4.5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='280' y='180' width='2' height='2' fill='white'%3E%3Canimate attributeName='opacity' values='0;0.8;0' dur='2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='80' y='280' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.3;1;0.3' dur='3.2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='350' y='90' width='5' height='5' fill='white'%3E%3Canimate attributeName='opacity' values='0.5;1;0.5' dur='5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Cpath d='M150 150 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white'%3E%3Canimate attributeName='opacity' values='0;1;0' dur='2.8s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M250 260 h4 v-4 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 z' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.3;1' dur='6s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M50 350 h2 v-2 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 z' fill='white'%3E%3Canimate attributeName='opacity' values='0.2;0.9;0.2' dur='4s' repeatCount='indefinite' /%3E%3C/path%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='40' y='120' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.1;1;0.1' dur='3s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='180' y='40' width='4' height='4' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='4.5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='280' y='180' width='2' height='2' fill='white'%3E%3Canimate attributeName='opacity' values='0;0.8;0' dur='2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='80' y='110' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.3;1;0.3' dur='3.2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='350' y='90' width='5' height='5' fill='white'%3E%3Canimate attributeName='opacity' values='0.5;1;0.5' dur='5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Cpath d='M150 150 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white'%3E%3Canimate attributeName='opacity' values='0;1;0' dur='2.8s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M250 160 h4 v-4 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 z' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.3;1' dur='6s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M50 70 h2 v-2 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 z' fill='white'%3E%3Canimate attributeName='opacity' values='0.2;0.9;0.2' dur='4s' repeatCount='indefinite' /%3E%3C/path%3E%3C/svg%3E")`
);

// 3. Read clouds
const cloudsTxt = fs.readFileSync('/workspace/clouds.txt', 'utf8').trim();
const clouds = cloudsTxt.split(',\\n');
// Because Node console.log joins with ',\n', let's just split by comma and newline
const cloudArray = cloudsTxt.split(',\\n').length > 1 ? cloudsTxt.split(',\\n') : cloudsTxt.split(',\\n');
// Wait, my JS wrote svgs.join(',\\n'), which is actually literal comma and newline.
const c = cloudsTxt.split(/,\\n|\\n|,\\s*\\n/);
// Actually, in gen_clouds.cjs I did: console.log(svgs.join(',\\n'));
const allClouds = cloudsTxt.split(/,\\s*\\n?/);

// Get the 8 cloud URLs
const c1 = allClouds[0].trim();
const c2 = allClouds[1].trim();
const c3 = allClouds[2].trim();
const c4 = allClouds[3].trim();
const c5 = allClouds[4].trim();
const c6 = allClouds[5].trim();
const c7 = allClouds[6].trim();
const c8 = allClouds[7].trim();

const newCloudsCSS = \`
#root::before {
  z-index: -1;
  background-image: 
    \${c1},
    \${c3},
    \${c5},
    \${c7};
  background-size: 
    800px 400px,
    600px 300px,
    900px 400px,
    1100px 300px;
  animation: clouds-fg 70s linear infinite;
  opacity: 0.95;
}

#root::after {
  z-index: -2;
  background-image: 
    \${c2},
    \${c4},
    \${c6},
    \${c8};
  background-size: 
    1200px 350px,
    1400px 300px,
    1000px 350px,
    1300px 350px;
  animation: clouds-bg 110s linear infinite;
  opacity: 0.8;
}

@keyframes clouds-fg {
  0% {
    background-position:
      0px 95%,
      600px 85%,
      0px 75%,
      1100px 65%;
  }
  100% {
    background-position:
      800px 95%,
      0px 85%,
      900px 75%,
      0px 65%;
  }
}

@keyframes clouds-bg {
  0% {
    background-position:
      1200px 80%,
      0px 70%,
      1000px 60%,
      0px 50%;
  }
  100% {
    background-position:
      0px 80%,
      1400px 70%,
      0px 60%,
      1300px 50%;
  }
}
\`;

// Replace the old clouds section
const oldCloudsSection = /#root::before[\\s\\S]*?@keyframes cloud-scroll-slow[\\s\\S]*?\\}/;
css = css.replace(oldCloudsSection, newCloudsCSS);

fs.writeFileSync(cssPath, css);
console.log('CSS updated successfully');
