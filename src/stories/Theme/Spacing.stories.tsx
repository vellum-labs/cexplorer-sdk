import { spacing } from "@/constants/spacing";
import type { Meta } from "@storybook/react/*";
import type { FC } from "react";

const Spacing: FC = () => {
  const getResolvedValue = (cssVar: string) => {
    const el = document.createElement("div");
    el.style.padding = cssVar;
    document.body.appendChild(el);
    const value = getComputedStyle(el).padding;
    document.body.removeChild(el);

    const pxValue = parseFloat(value);
    const remValue = (pxValue / 16).toFixed(3).replace(/\.?0+$/, "");

    return `${pxValue}px (${remValue}rem)`;
  };

  return (
    <section className='flex max-w-[1250px] flex-col gap-5 p-2'>
      <div>
        <h1 className='text-2xl pb-1 font-semibold text-gray-900'>Spacing</h1>
        <p className='text-text-sm text-gray-700'>
          Our spacing system is built on CSS custom properties for consistency
          and flexibility. All spacing values are defined in
          variables/spacings.css and available throughout the app via Tailwind
          classes or the spacing constant from constants/spacing. The system
          follows a predictable 0.25rem (4px) increment scale, where each step
          provides harmonious spacing for layouts. Use smaller values (0.5
          through 3) for tight spacing in components and UI elements, medium
          values (4 through 8) for general padding and margins, and larger
          values (10 through 24) for section spacing and layout composition that
          requires more breathing room.
        </p>
      </div>
      <div className='flex flex-wrap items-start gap-6'>
        {Object.entries(spacing)
          .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
          .map(([name, value]) => (
            <div key={name} className='flex flex-col items-center gap-2'>
              <div className='flex h-[180px] w-[180px] items-center justify-center rounded-xl border border-gray-300 bg-white'>
                <div
                  className='flex items-center justify-center rounded-lg border-2 border-brand-500 bg-brand-100'
                  style={{
                    width: value,
                    height: value,
                  }}
                >
                  <span className='text-sm font-semibold'>{name}</span>
                </div>
              </div>
              <p className='text-xs text-center text-gray-600'>
                {getResolvedValue(value)}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

const meta: Meta<typeof Spacing> = {
  title: "Theme/Spacing",
  component: Spacing,
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

export { Spacing };
