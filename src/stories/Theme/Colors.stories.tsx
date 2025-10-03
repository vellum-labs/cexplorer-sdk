import type { Meta } from "@storybook/react";
import type { FC } from "react";

import { colors } from "../../constants/colors";

const Colors: FC = () => {
  const colorsArray = Object.entries(colors).map(
    ([colorGroup, colorValues]) => [
      colorGroup,
      typeof colorValues === "string"
        ? [[colorGroup, colorValues]]
        : Object.entries(colorValues),
    ],
  );

  const getResolvedColor = (cssVar: string) => {
    const el = document.createElement("div");
    el.style.color = cssVar;
    document.body.appendChild(el);
    const color = getComputedStyle(el).color;
    document.body.removeChild(el);

    if (color.startsWith("#")) return color.toUpperCase();

    const values = color.match(/\d+/g);
    if (!values) return color;

    const [r, g, b] = values.map(Number);
    return (
      "#" +
      [r, g, b]
        .map(x => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  };

  return (
    <section className='flex max-w-[1250px] flex-col gap-5 p-5'>
      <div>
        <h1 className='text-2xl pb-1 font-semibold text-gray-900'>Colors</h1>
        <p className='text-text-sm text-gray-700'>
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
      {colorsArray.map(([colorGroup, colorValues], i) => (
        <div key={i} className='flex flex-col gap-3'>
          <h2 className='text-lg font-semibold leading-[18px] text-gray-900'>
            {colorGroup}
          </h2>
          <div className='flex flex-wrap gap-8'>
            {(colorValues as any[]).map(([name, value]) => (
              <div
                key={`${name}_${value}`}
                className='h-[160px] w-[160px] cursor-pointer rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl'
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(getResolvedColor(value));
                  alert("Copied!");
                }}
              >
                <div
                  className='h-[80px] rounded-t-xl'
                  style={{
                    backgroundColor: value,
                    borderBottom:
                      name === "White" ? "1px solid rgba(0,0,0,0.1)" : "none",
                  }}
                ></div>
                <div className='h-[80px] p-3'>
                  <p className='text-lg font-medium leading-7 text-gray-900'>
                    {name}
                  </p>
                  <p className='text-base font-normal leading-7 text-gray-600'>
                    {getResolvedColor(value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
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
