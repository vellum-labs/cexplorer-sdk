import type { Meta } from "@storybook/react/*";
import type { FC } from "react";

import { shadows } from "../../constants/shadows";

const Shadows: FC = () => {
  return (
    <section className='flex max-w-[1250px] flex-col gap-5 p-2'>
      <div>
        <h1 className='text-2xl pb-1 font-semibold text-gray-900'>Shadows</h1>
        <p className='text-text-sm text-gray-700'>
          Our shadow system is built on CSS custom properties for consistency
          and flexibility. All shadow values are defined in
          variables/shadows.css and available throughout the app via Tailwind
          classes or the shadows constant from constants/shadows. The system
          includes six elevation levels (xs through 3xl) carefully designed to
          create visual depth and hierarchy. Smaller shadows (xs, sm) provide
          subtle elevation for cards and buttons, medium shadows (md, lg) work
          well for dropdowns and floating panels, while larger shadows (xl, 2xl,
          3xl) are reserved for modals, popovers, and prominent UI elements that
          need to stand out from the content layer.
        </p>
      </div>
      <div className='flex flex-wrap items-center gap-4'>
        {Object.entries(shadows).map(([name, value]) => (
          <div
            className='rounded-m flex min-h-[90px] min-w-[192px] items-center justify-center border border-gray-300 bg-white p-1'
            style={{
              boxShadow: value,
            }}
          >
            <span className='text-text-sm font-medium text-gray-900'>
              shadow-{name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const meta: Meta<typeof Shadows> = {
  title: "Theme/Shadows",
  component: Shadows,
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

export { Shadows };
