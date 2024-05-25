import { blackA, mauveDark, crimson } from "@radix-ui/colors";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const primaryColor = "red-dark";
const primary = {};
for (let index = 0; index < 12; index++) {
  primary[`primary-${index + 1}`] = `var(--${primaryColor}-${index + 1})`;
}

// Object.keys(crimsonDark).forEach((key, index) => {
//   //eslint-disable-next-line
//   primary[`primary-${index + 1}`] = crimsonDark[key];
// });

const gray = {};

Object.keys(mauveDark).forEach((key, index) => {
  //eslint-disable-next-line
  gray[`gray-${index + 1}`] = mauveDark[key];
});

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      ...blackA,
      ...primary,
      ...gray,
      "app-color-primary-1": "var(--bg-primary-app-1)",
      "app-color-primary-2": "var(--bg-primary-app-2)",
      "app-color-gray-1": "var(--bg-gray-app-1)",
      "app-color-gray-2": "var(--bg-gray-app-2)",

      "component-color-normal": "var(--bg-component-normal)",
      "component-color-hover-in-transparent": "var(--bg-component-normal)",
      "component-color-hover": "var(--bg-component-hover)",
      "component-color-selected": "var(--bg-component-selected)",

      "border-color-non-interactive": "var(--border-color-non-interactive)",
      "border-color-interactive": "var(--border-color-interactive)",
      "border-color-stronger-focus": "var(--border-color-stronger-focus)",

      "solid-primary-1": "var(--bg-solid-primary-app-1)",
      "solid-primary-2": "var(--bg-solid-primary-app-2)",
      "solid-gray-1": "var(--bg-solid-gray-app-1)",
      "solid-gray-2": "var(--bg-solid-gray-app-2)",
      "solid-green-1": "var(--bg-solid-green-app-1)",
      "solid-green-2": "var(--bg-solid-green-app-2)",

      "text-primary-1": "var(--text-primary-low-contrast)",
      "text-primary-2": "var(--text-primary-high-contrast)",
      "text-gray-1": "var(--text-gray-low-contrast)",
      "text-gray-2": "var(--text-gray-high-contrast)",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
