/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.css', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/forms')],
};
