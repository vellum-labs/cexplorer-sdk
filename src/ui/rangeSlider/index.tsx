import type { FC } from "react";

/**
 * Props for the RangeSlider component
 */
export interface RangeSliderProps {
  /**
   * Minimum value of the slider
   *
   * @example
   * <RangeSlider min={0} max={100} step={1} value={50} onChange={setValue} />
   */
  min: number;

  /**
   * Maximum value of the slider
   *
   * @example
   * <RangeSlider min={0} max={100} step={1} value={50} onChange={setValue} />
   */
  max: number;

  /**
   * Step increment for the slider values
   *
   * @example
   * // Slider with steps of 10
   * <RangeSlider min={0} max={100} step={10} value={50} onChange={setValue} />
   */
  step: number;

  /**
   * Current value of the slider
   *
   * @example
   * const [value, setValue] = useState(50);
   * <RangeSlider min={0} max={100} step={1} value={value} onChange={setValue} />
   */
  value: number;

  /**
   * Callback function invoked when the slider value changes
   *
   * @param value - The new slider value
   *
   * @example
   * <RangeSlider
   *   min={0}
   *   max={100}
   *   step={1}
   *   value={50}
   *   onChange={(newValue) => console.log(newValue)}
   * />
   */
  onChange: (value: number) => void;

  /**
   * Optional CSS class name for additional styling
   *
   * @example
   * <RangeSlider
   *   min={0}
   *   max={100}
   *   step={1}
   *   value={50}
   *   onChange={setValue}
   *   className="my-custom-class"
   * />
   */
  className?: string;
}

/**
 * RangeSlider is a customizable slider component for selecting numeric values within a range.
 *
 * The component displays a visual progress bar that fills from left to right based on the current value,
 * using CSS variables for theming (--primary for filled portion, --border for unfilled portion).
 * It's commonly used for filtering data by numeric ranges, adjusting settings, or selecting values
 * within blockchain contexts (e.g., epoch ranges, ADA amounts, block heights).
 *
 * **Common Use Cases:**
 * - Filtering blockchain data by numeric ranges (epochs, block numbers, amounts)
 * - Adjusting numeric settings or parameters
 * - Selecting values within a specific range with visual feedback
 * - Epoch selection for stake pool performance analysis
 * - Transaction amount filtering in wallet interfaces
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * const [value, setValue] = useState(50);
 * <RangeSlider min={0} max={100} step={1} value={value} onChange={setValue} />
 *
 * // Epoch range selector
 * const [epoch, setEpoch] = useState(450);
 * <RangeSlider min={200} max={500} step={1} value={epoch} onChange={setEpoch} />
 *
 * // ADA amount filter with decimal steps
 * const [amount, setAmount] = useState(1000);
 * <RangeSlider min={0} max={10000} step={100} value={amount} onChange={setAmount} />
 *
 * // Custom styling
 * <RangeSlider
 *   min={0}
 *   max={100}
 *   step={5}
 *   value={value}
 *   onChange={setValue}
 *   className="w-[400px]"
 * />
 * ```
 *
 * @param {RangeSliderProps} props - Component props
 * @param {number} props.min - Minimum value of the slider
 * @param {number} props.max - Maximum value of the slider
 * @param {number} props.step - Step increment for slider values
 * @param {number} props.value - Current value of the slider
 * @param {(value: number) => void} props.onChange - Callback invoked when value changes
 * @param {string} [props.className] - Optional CSS class name for additional styling
 * @returns {JSX.Element} A themed range slider input with visual progress indicator
 */
export const RangeSlider: FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  className = "",
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className='pointer-events-none absolute left-0 top-1/2 z-0 h-2 w-full -translate-y-1/2 rounded-s'
        style={{
          background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, var(--border) ${percentage}%, var(--border) 100%)`,
        }}
      />
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className='range-slider-input'
      />
    </div>
  );
};
