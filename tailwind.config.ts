import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      fade: "fadeIn .6s ease-in-out",
      delay: "delay .8s ease-in-out",
      rtl: "rtl .6s ease-in-out",
      ltr: "ltr .6s ease-in-out",
      floating: "floating 3s ease-in-out infinite",
    },
    keyframes: (): any => ({
      fadeIn: {
        "0%": { opacity: 0, transform: "translateY(16px)" },
        "100%": { opacity: 1, transform: "translateY(0px)" },
      },
      delay: {
        "0%": { opacity: 0, transform: "translateY(16px)" },
        "50%": { opacity: 0, transform: "translateY(8px)" },
        "100%": { opacity: 1, transform: "translateY(0px)" },
      },
      rtl: {
        "0%": { opacity: 0, transform: "translateX(5%)" },
        "100%": { opacity: 1, transform: "translateX(0)" },
      },
      ltr: {
        "0%": { opacity: 0, transform: "translateX(-5%)" },
        "100%": { opacity: 1, transform: "translateX(0)" },
      },
      floating: {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-5px)" },
        "100%": { transform: "translateY(0px)" },
      },
    }),
  },
  plugins: [require("daisyui")],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light", "dark"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
