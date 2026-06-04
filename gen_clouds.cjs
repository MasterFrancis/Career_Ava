const fs = require('fs');

const grids = [
  // Cloud 1: Classic Fluffy (Large)
  [
    "      LLLLLL      ",
    "    LLLLMMMMLL    ",
    "  LLLLMMMMMMMMLL  ",
    " LLLLMMMMDDDDMMMLL",
    "LLMMMMMDDDDDDDDMMLL",
    "LMMMDDDDDDDDDDDDMML",
    " LMDDDDDDDDDDDDDML",
    "  DDDDDDDDDDDDDD  "
  ],
  // Cloud 2: Long Stratus
  [
    "          LLLL            ",
    "      LLLLLLMMLLLL        ",
    "   LLLLLMMMMMMMMMMLLLL    ",
    " LLLLMMMMDDDDDDDDMMMMMLL  ",
    "LLMMMMDDDDDDDDDDDDDDMMMLL ",
    "LMMMDDDDDDDDDDDDDDDDDDMMLL",
    " LDDDDDDDDDDDDDDDDDDDDDD  "
  ],
  // Cloud 3: Small Puffy
  [
    "    LLLL    ",
    "  LLLLMMLL  ",
    " LLLMMDDMML ",
    "LLMMDDDDDDML",
    "LMDDDDDDDDML",
    " DDDDDDDDDD "
  ],
  // Cloud 4: Double Peak
  [
    "    LLLL      LLLL    ",
    "  LLLLMMLL  LLLLMMLL  ",
    " LLLLMMMMMLLLLMMMMMLL ",
    "LLMMMMDDDDMMMMDDDDMMLL",
    "LMMMDDDDDDDDDDDDDDDMML",
    " LDDDDDDDDDDDDDDDDDD  "
  ],
  // Cloud 5: Anvil (Tall)
  [
    "      LLLL      ",
    "    LLLLMMLL    ",
    "   LLLMMMMMMLL  ",
    "  LLLMMDDDDMML  ",
    " LLLMMDDDDDDMMLL",
    "LLMMMDDDDDDDDDML",
    "LMMDDDDDDDDDDDDL",
    " DDDDDDDDDDDDDD "
  ],
  // Cloud 6: Wispy tail
  [
    "       LLLLLL        ",
    "    LLLLLMMMMLLLL    ",
    "  LLLLMMMMDDDDMMMLL  ",
    " LLLLMMMDDDDDDDDMMMLL",
    "LLLMMMDDDDDDDDDDDDMML",
    "LLMMDDDDDDDDDDDDDDDML",
    " LDDDDDDDDDDDDDDDDD  "
  ],
  // Cloud 7: Disconnected feel
  [
    "   LLLL        LLLL   ",
    " LLLLMMLL    LLLLMMLL ",
    "LLLMMDDMMLL LLLMMDDMML",
    "LLMMDDDDMMMLLLMMDDDDML",
    "LMDDDDDDDMMMMMDDDDDDML",
    " DDDDDDDDDDDDDDDDDDDD "
  ],
  // Cloud 8: Asymmetric right-heavy
  [
    "            LLLL  ",
    "        LLLLLLMML ",
    "    LLLLLLMMMMDMML",
    "  LLLLMMMMDDDDDDML",
    " LLLMMMDDDDDDDDDML",
    "LLMMDDDDDDDDDDDDML",
    " DDDDDDDDDDDDDDDD "
  ]
];

const colors = {
  'L': '#ffd1eb',
  'M': '#ff9ed2',
  'D': '#c261a0'
};

let svgs = grids.map(grid => {
  let width = grid[0].length * 10;
  let height = grid.length * 10;
  let svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>`;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let char = grid[y][x];
      if (colors[char]) {
        svg += `<rect x='${x*10}' y='${y*10}' width='10' height='10' fill='${colors[char]}'/>`;
      }
    }
  }
  svg += `</svg>`;
  return "url(\"data:image/svg+xml," + encodeURIComponent(svg) + "\")";
});

console.log(svgs.join(',\n'));
