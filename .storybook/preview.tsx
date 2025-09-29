import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/stores/theme";
import { useEffect } from "react";
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

  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      const backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff";

      const ThemeWrapper = () => {
        useEffect(() => {
          document.documentElement.setAttribute("data-theme", theme);
        }, [theme]);

        return (
          <div
            style={{
              padding: "20px",
              backgroundColor,
            }}
          >
            <Story />
          </div>
        );
      };

      return (
        <ThemeProvider defaultTheme={theme} key={theme}>
          <ThemeWrapper />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
