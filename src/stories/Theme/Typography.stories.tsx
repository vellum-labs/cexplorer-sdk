import { Meta } from "@storybook/react";
import type { FC } from "react";

const Typography: FC = () => {
  return (
    <section className='flex flex-col gap-5 p-5'>
      <div>
        <h2 className='pb-1 text-2xl font-semibold text-gray-900'>
          Typography
        </h2>
        <p className='text-sm font-medium leading-6 text-gray-700'>
          Our color palette is built on CSS custom properties for consistency
          and flexibility. All colors are defined in globals.css and available
          throughout the app via Tailwind classes or the colors constant from
          constants/colors. Each color group includes 12 shades ranging from 25
          (lightest) to 950 (darkest), providing a comprehensive range for all
          design needs. The system includes neutral grays, brand colors,
          semantic colors for error/warning/success states, and additional
          accent colors like blue, indigo, purple, yellow, and orange.
        </p>
      </div>
    </section>
  );
};

const meta: Meta<typeof Typography> = {
  title: "Theme/Colors",
  component: Typography,
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

export { Typography };
