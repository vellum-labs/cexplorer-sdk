import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/stores/theme";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a1a1a",
        },
        {
          name: "gray",
          value: "#f5f5f5",
        },
      ],
    },

    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1200px", height: "800px" },
        },
      },
    },
  },

  decorators: [
    Story => (
      <ThemeProvider defaultTheme='dark'>
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
