import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",

  brandTitle: "Cexplorer UI",
  brandUrl: "https://beta.cexplorer.io",
  brandImage: "./logo.svg",
  brandTarget: "_self",

  colorPrimary: "#0094d4",

  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Inter", "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
});

addons.setConfig({
  theme,
  panelPosition: "right",
  selectedPanel: "controls",
  showPanel: true,
  showNav: true,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
    renderLabel: (item: any) => {
      if (item.type === "group") {
        return item.name;
      }
      return item.name;
    },
  },
});
