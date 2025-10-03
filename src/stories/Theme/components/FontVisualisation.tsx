import type { FC } from "react";

interface FontVisualisationProps {
  title: string;
  description: string;
  className?: string;
}

export const FontVisualisation: FC<FontVisualisationProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className='rounded-m inline-flex items-center gap-3 border border-gray-200 bg-gray-50 px-3 py-2'>
      <span className={`text-2xl text-gray-900 ${className ? className : ""}`}>
        Aa
      </span>
      <div>
        <p className='text-sm font-semibold text-gray-900'>{title}</p>
        <p className='text-xs text-gray-600'>{description}</p>
      </div>
    </div>
  );
};
