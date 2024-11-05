/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGrey: "#FCFCFC",
        darkBrown: "#070605",
        lavender: "#CFC1D6",
        beige: "#837A59",
        oliveGreen: "#42492D",
      },
      backgroundImage: {
        "background-image": "url('logo.png')",
      },
      keyframes: {
        slidein: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { slidein: "slidein 1s ease forwards" },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0476D0",
          secondary: "#FC2E20",
          accent: "#FFBF00",
          neutral: "#0D1117",
          "base-100": "#F5F5F5",
          info: "#89CFF0",
          success: "#5CFF5C",
          warning: "#F8CF50",
          error: "#FF2E2E",
        },
      },
      {
        dark: {
          primary: "#0476D0",
          secondary: "#FC2E20",
          accent: "#FFBF00",
          neutral: "#F5F5F5",
          "base-100": "#0D1117",
          info: "#89CFF0",
          success: "#5CFF5C",
          warning: "#F8CF50",
          error: "#FF2E2E",
        },
      },
    ],
  },
};
