/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      margin: {
        coba: "6px",
      },
      maxWidth: {
        inputWidth: "55px",
      },
      screens: {
        mobile: "320px",
        // => @media (min-width: 640px) { ... }

        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
