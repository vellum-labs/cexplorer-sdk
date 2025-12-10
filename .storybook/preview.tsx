import type { Decorator, Preview } from "@storybook/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useThemeStore, type Theme } from "../src/stores/themeStore";
import "../src/styles/style.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    const currentStoreTheme = useThemeStore.getState().theme;
    if (currentStoreTheme !== theme) {
      useThemeStore.setState({ theme: theme as Theme });
    }
  }, [theme]);

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            toast: "bg-background text-text border relative border-border",
            content: "relative",
          },
        }}
      />
      <Story />
    </>
  );
};

const withRouter: Decorator = Story => {
  const rootRoute = createRootRoute({
    component: Story,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({
      initialEntries: ["/"],
    }),
  });

  return <RouterProvider router={router} />;
};

const preview: Preview = {
  decorators: [withTheme, withRouter],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Getting Started", "Theme", "*", "Components"],
      },
    },
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
          styles: { width: "360px", height: "667px" },
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
};

export default preview;
