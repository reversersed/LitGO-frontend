export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        body: "rgb(var(--color-bodybackground) / <alpha-value>)",
        maintext: "rgb(var(--color-maintext) / <alpha-value>)",
        mainblack: "rgb(var(--color-mainblack) / <alpha-value>)",
        mainwhite: "rgb(var(--color-mainwhite) / <alpha-value>)",
        mainbg: "rgb(var(--color-mainbg) / <alpha-value>)",
        mainshadow: "rgb(var(--color-mainshadow) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-light": "rgb(var(--color-accent-light) / <alpha-value>)",
        contrast: "rgb(var(--color-contrast) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        blacktext: "rgb(var(--color-blacktext) / <alpha-value>)",
      },
      fontFamily: {
        main: ["ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
  darkMode: "media", // 'media' or 'class'
  variants: {
    extend: {},
  },
};
