/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#20aee3",
        "secondary-blue": "#cfecfe",
        "primary-purple": "#6772e5",
        "secondary-purple": "#f1effd",
        "primary-red": "#ff5c6c",
        "secondary-red": "#f5c0c7",
        "lighter-red": "#fbe3e6",
        "primary-gray": "#67757c",
        "secondary-gray": "#ebf2f5",
        "lighter-gray": "#f5f5f5",

        info: "#17a2b8",
        warning: "#ffc107",
        danger: "#dc3545",
        success: "#28a745",
      },
      fontFamily: {
        primary: "'Montserrat', sans-serif",
      },
      boxShadow: {
        box: "0px 0px 4px 0px #a5a5a5",
      },
    },
  },
  plugins: [],
};
