import type { Meta } from "@storybook/react";
import type { FC } from "react";

import { typography } from "../../constants/typography";
import { FontVisualisation } from "./components/FontVisualisation";

const Typography: FC = () => {
  const getResolvedCSSValue = (property: string, cssVar: string) => {
    const el = document.createElement("div");
    (el.style as any)[property] = cssVar;
    document.body.appendChild(el);
    const value = getComputedStyle(el)[property as any];
    document.body.removeChild(el);
    return value;
  };

  return (
    <section className='flex max-w-[1250px] flex-col gap-5 p-5'>
      <div>
        <h1 className='pb-1 text-2xl font-semibold text-gray-900'>
          Typography
        </h1>
        <p className='text-text-sm text-gray-700'>
          Our typography system is built on CSS custom properties for
          consistency and flexibility. All typography values are defined in
          variables/typography.css and available throughout the app via Tailwind
          classes or the typography constant from constants/typography. The
          system includes Display sizes (2xl to xs) for large headings with
          optimized letter spacing, Text sizes (xl to xs) for body content and
          UI elements, and four font weights (regular, medium, semibold, bold)
          to establish clear visual hierarchy across all design needs.
        </p>
      </div>
      <div>
        <h2 className='pb-1 text-lg font-semibold text-gray-900'>
          Font Family
        </h2>
        <p className='text-text-sm pb-3 text-gray-700'>
          We use Inter as our primary typeface across the entire design system.
          Inter is a carefully crafted variable font designed for user
          interfaces with excellent readability at all sizes. Designed by{" "}
          <a
            href='https://rsms.me/inter/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-brand-600 underline hover:text-brand-700'
          >
            Rasmus Andersson
          </a>
          .
        </p>
        <FontVisualisation
          description='font-family: Inter, sans-serif'
          title='Inter'
          className='font-medium'
        />
      </div>
      <div>
        <h2 className='pb-1 text-lg font-semibold text-gray-900'>
          Font Weights
        </h2>
        <p className='text-text-sm pb-3 text-gray-700'>
          We use four carefully selected font weights to create clear visual
          hierarchy and emphasis. Regular (400) serves as the default weight for
          body text, Medium (500) adds subtle emphasis for labels and secondary
          headings, Semibold (600) provides stronger emphasis for subheadings
          and important UI elements, and Bold (700) is reserved for primary
          headings and high-impact text that demands attention.
        </p>
        <div className='flex flex-wrap items-center justify-between gap-5 py-1'>
          <FontVisualisation
            description='Font weight: 400'
            title='Regular'
            className='font-regular'
          />
          <FontVisualisation
            description='Font weight: 500'
            title='Medium'
            className='font-medium'
          />
          <FontVisualisation
            description='Font weight: 600'
            title='Semibold'
            className='font-semibold'
          />
          <FontVisualisation
            description='Font weight: 700'
            title='Bold'
            className='font-bold'
          />
        </div>
      </div>
      <div>
        <h2 className='pb-1 text-lg font-semibold text-gray-900'>Font Sizes</h2>
        <p className='text-text-sm pb-3 text-gray-700'>
          We provide a comprehensive scale of font sizes optimized for different
          use cases. Display sizes (2xl through xs) are designed for large,
          attention-grabbing headings and hero sections, featuring tighter
          letter spacing (-2%) for improved visual balance at larger scales.
          Text sizes (xl through xs) cover all body content, UI components, and
          smaller text elements, with carefully tuned line heights that ensure
          optimal readability across different screen sizes and contexts.
        </p>
        <div className='flex flex-col gap-3'>
          {Object.entries(typography["Font/Size"]).map(([name, styles]) => (
            <div
              key={name}
              className='flex items-center justify-between border-b pb-3'
            >
              <div className='flex items-baseline gap-4'>
                <p
                  className='w-[100px] font-semibold'
                  style={{
                    fontSize: styles.fontSize,
                  }}
                >
                  Aa
                </p>
                <div>
                  <p className='text-sm font-semibold'>{name}</p>
                  <p className='text-xs text-gray-600'>
                    Font size:{" "}
                    {getResolvedCSSValue("fontSize", styles.fontSize)} / Line
                    height:{" "}
                    {getResolvedCSSValue("lineHeight", styles.lineHeight)}
                    {(styles as any)?.letterSpacing &&
                      ` / Letter spacing: ${getResolvedCSSValue("letterSpacing", (styles as any).letterSpacing)}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const meta: Meta<typeof Typography> = {
  title: "Theme/Typography",
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
