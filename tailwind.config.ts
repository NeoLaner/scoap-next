import { blackA, bronzeDark, crimson } from "@radix-ui/colors";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const primaryColor = "red";
const primary = {};
for (let index = 0; index < 12; index++) {
  primary[`primary-${index + 1}`] = `var(--${primaryColor}-${index + 1})`;
}

// Object.keys(crimsonDark).forEach((key, index) => {
//   //eslint-disable-next-line
//   primary[`primary-${index + 1}`] = crimsonDark[key];
// });

const gray = {};

Object.keys(bronzeDark).forEach((key, index) => {
  //eslint-disable-next-line
  gray[`gray-${index + 1}`] = bronzeDark[key];
});

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      ...blackA,
      ...primary,
      ...gray,
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
