/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark", "lofi", "autumn"],
  }
};