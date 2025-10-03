import { breakpoints } from "@/constants/breakpoints";
import type { Meta } from "@storybook/react/*";
import type { FC } from "react";

const Breakpoints: FC = () => {
  return (
    <section className='flex max-w-[1250px] flex-col gap-5 p-2'>
      <div>
        <h1 className='text-2xl pb-1 font-semibold text-gray-900'>
          Breakpoints
        </h1>
        <p className='text-text-sm text-gray-700'>
          Our responsive breakpoint system uses Tailwind's default breakpoints
          for consistency across projects. All breakpoint values are defined in
          constants/breakpoints and match Tailwind's mobile-first approach. Use
          'sm' (640px) for small devices like large phones, 'md' (768px) for
          tablets, 'lg' (1024px) for small laptops, 'xl' (1280px) for desktops,
          and '2xl' (1536px) for large screens. Apply these as prefixes in
          Tailwind classes (e.g., md:flex lg:grid) or reference them directly
          from the breakpoints constant for custom media queries.
        </p>
      </div>
      <div className='rounded-m overflow-hidden border border-gray-200'>
        {Object.entries(breakpoints).map(([name, value], index) => (
          <div
            key={name}
            className={`flex items-center justify-between px-3 py-2 ${
              index !== Object.keys(breakpoints).length - 1
                ? "border-b border-gray-200"
                : ""
            } bg-white transition-colors hover:bg-gray-50`}
          >
            <div className='flex items-center gap-2'>
              <div className='rounded-xs flex h-6 w-8 items-center justify-center bg-brand-100'>
                <span className='text-text-sm font-semibold text-brand-700'>
                  {name}
                </span>
              </div>
              <span className='text-text-sm font-medium text-gray-900'>
                min: {value}
              </span>
            </div>
            <span className='text-text-sm text-gray-500'>
              @media (min-width: {value})
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const meta: Meta<typeof Breakpoints> = {
  title: "Theme/Breakpoints",
  component: Breakpoints,
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

export { Breakpoints };
