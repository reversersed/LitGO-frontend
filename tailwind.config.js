export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        body: "rgb(var(--color-bodybackground) / <alpha-value>)",
        mainblack: "rgb(var(--color-mainblack) / <alpha-value>)",
        mainwhite: "rgb(var(--color-mainwhite) / <alpha-value>)",
        mainbg: "rgb(var(--color-mainbg) / <alpha-value>)",
        mainshadow: "rgb(var(--color-mainshadow) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-light": "rgb(var(--color-accent-light) / <alpha-value>)",
        contrast: "rgb(var(--color-contrast) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        overlay: "rgb(var(--color-overlay) / <alpha-value>)",
      },
      fontFamily: {
        main: ["ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "media", // 'media' or 'class'
  variants: {
    extend: {},
  },
};
