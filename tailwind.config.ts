const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'primary': '#0A0118',
        'primary-dark': '#A33FF8',
        'primary-light': '#19022D',
        'secondary': '#FF00F5',
        'customCard': '#A33FF8',
        'customCard2': '#C400FE',
        'white-light': '#F9F8FC',
        'white': '#FFFFFF',
        'black': '#000000',
        'primary-orange': '#ED642B',
        'cream': '#EAD1FF',
        'cream-light': '#F0DEFF',
        'violet': '#A33FF8',
        'dark-violet': '#0A0118',
        'secondaryCard': '#A33FF8'
      },
    },
  },
  plugins: [
    // rest of the code
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}


