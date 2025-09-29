import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",

  brandTitle: "Cexplorer UI",
  brandUrl: "https://beta.cexplorer.io",
  brandImage: "./logo.svg",
  brandTarget: "_self",

  colorPrimary: "#0094d4",
  colorSecondary: "#546175",

  appBg: "#fdfdfd",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#d0d5dd",
  appBorderRadius: 8,

  textColor: "#101828",
  textInverseColor: "#fdfdfd",
  textMutedColor: "#3e4959",

  barTextColor: "#546175",
  barSelectedColor: "#0094d4",
  barBg: "#ffffff",
  barHoverColor: "#f8f9fc",

  inputBg: "#ffffff",
  inputBorder: "#d0d5dd",
  inputTextColor: "#101828",
  inputBorderRadius: 6,

  buttonBg: "#0094d4",
  buttonBorder: "#0094d4",

  booleanBg: "#f8f9fc",
  booleanSelectedBg: "#0094d4",
});

addons.setConfig({
  theme,
  panelPosition: "right",
  selectedPanel: "controls",
  showPanel: true,
  showNav: true,
  sidebar: {
    showRoots: false,
    collapsedRoots: ["other"],
  },
});
