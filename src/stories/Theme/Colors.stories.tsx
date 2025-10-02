import type { Meta } from "@storybook/react";
import type { FC } from "react";

const Colors: FC = () => {
  return <section className='h-full border border-border'>Hello</section>;
};

const meta: Meta<typeof Colors> = {
  title: "Theme/Colors",
  component: Colors,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
    docs: { disable: true },
    options: {
      showPanel: false,
      showTabs: false,
    },
  },
};

export default meta;

export { Colors };
