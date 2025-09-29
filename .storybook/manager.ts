import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",

  brandTitle: "Cexplorer UI",
  brandUrl: "https://beta.cexplorer.io",
  brandImage: "./logo.svg",
  brandTarget: "_self",

  colorPrimary: "#3b82f6",
  colorSecondary: "#64748b",

  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 6,

  textColor: "#1e293b",
  textInverseColor: "#ffffff",

  barTextColor: "#64748b",
  barSelectedColor: "#3b82f6",
  barBg: "#f8fafc",

  inputBg: "#ffffff",
  inputBorder: "#d1d5db",
  inputTextColor: "#374151",
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
  panelPosition: "right",
  selectedPanel: "controls",
});
