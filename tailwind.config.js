/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        pentagon: "url('/images/bg-pentagon.svg')",
        triangle: "url('/images/bg-triangle.svg')",
      },
      colors: {
        scissors: `hsl(39, 89%, 49%)`,
        darkScissors : `hsl(40, 84%, 53%)`,
        paper: `hsl(230, 89%, 62%)`,
        darkPaper : `hsl(230, 89%, 65%)`,
        rock: `hsl(349, 71%, 52%)`,
        darkRock : `hsl(349, 70%, 56%)`,
        lizard: `hsl(261, 73%, 60%)`,
        darkLizard  : `hsl(261, 72%, 63%)`,
        cyan: `hsl(189, 59%, 53%)`,
        darkCyan :`hsl(189, 58%, 57%)`,
        darkText: `hsl(229, 25%, 31%)`,
        scoreText: `hsl(229, 64%, 46%)`,
        headerOutline: `hsl(217, 16%, 45%)`,
        darkInnerBackground : `#bfbfbf`,
        lightInnerBackground: `#ddd`,
        background: `hsl(214, 47%, 23%)`,
      },
    },
  },
  plugins: [],
};
