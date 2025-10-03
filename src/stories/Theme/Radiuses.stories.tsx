import { radiuses } from "@/constants/radiuses";
import type { Meta } from "@storybook/react/*";
import type { FC } from "react";

const Radiuses: FC = () => {
  const getResolvedValue = (cssVar: string) => {
    const el = document.createElement("div");
    el.style.borderRadius = cssVar;
    document.body.appendChild(el);
    const value = getComputedStyle(el).borderRadius;
    document.body.removeChild(el);

    const pxValue = parseFloat(value);
    const remValue = (pxValue / 16).toFixed(3).replace(/\.?0+$/, "");

    return `${pxValue}px (${remValue}rem)`;
  };

  return (
    <section className='flex max-w-[1250px] flex-col gap-5 p-2'>
      <div>
        <h1 className='text-2xl pb-1 font-semibold text-gray-900'>Radiuses</h1>
        <p className='text-text-sm text-gray-700'>
          Our border radius system is built on CSS custom properties for
          consistency and flexibility. All radius values are defined in
          variables/radiuses.css and available throughout the app via Tailwind
          classes or the radiuses constant from constants/radiuses. The system
          provides a comprehensive scale from sharp edges to fully rounded
          corners. Use 'none' for completely sharp corners, smaller values (xs,
          s) for subtle rounded corners on buttons and inputs, medium values (m,
          l) for cards and containers, 'xl' for prominent rounded elements, and
          'max' for pill-shaped buttons or fully circular avatars.
        </p>
      </div>
      <div className='flex flex-wrap items-start gap-6'>
        {Object.entries(radiuses).map(([name, value]) => (
          <div key={name} className='flex flex-col items-center gap-2'>
            <div
              className='flex h-[150px] w-[150px] items-center justify-center border border-gray-300 bg-white'
              style={{
                borderRadius: value,
              }}
            >
              <span className='text-sm font-semibold'>{name}</span>
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

const meta: Meta<typeof Radiuses> = {
  title: "Theme/Radiuses",
  component: Radiuses,
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

export { Radiuses };
