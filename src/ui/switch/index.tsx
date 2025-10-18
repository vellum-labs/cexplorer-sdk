import type { FC } from "react";

import { useEffect, useState } from "react";

/**
 * Props for the Switch component
 */
export interface SwitchProps {
  /**
   * Callback function triggered when the switch is clicked
   *
   * @example
   * <Switch onClick={() => console.log('Switch clicked')} />
   */
  onClick?: () => void;

  /**
   * Controls the active/inactive state of the switch
   *
   * @default false
   * @example
   * <Switch active={true} />
   */
  active?: boolean;

  /**
   * Additional CSS classes to apply to the switch container
   *
   * @example
   * <Switch className="my-4" />
   */
  className?: string;

  /**
   * Callback function triggered when the switch state changes
   * Receives the new checked state as a boolean parameter
   *
   * @param checked - The new state of the switch (true for on, false for off)
   * @example
   * <Switch onChange={(checked) => console.log('Switch is now:', checked)} />
   */
  onChange?: (checked: boolean) => void;
}

/**
 * Switch is a toggle component for binary on/off states.
 *
 * This component provides a visual toggle switch that users can click to change between
 * active (on) and inactive (off) states. It's commonly used for settings, preferences,
 * or any feature that requires a simple boolean choice.
 *
 * **Common Use Cases:**
 * - Enable/disable features or settings
 * - Toggle between two states (e.g., public/private, visible/hidden)
 * - Control boolean preferences in forms
 * - Filter toggles in data tables or search interfaces
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage (uncontrolled)
 * <Switch />
 *
 * // Controlled with active state
 * <Switch active={isEnabled} onChange={(checked) => setIsEnabled(checked)} />
 *
 * // With click handler and styling
 * <Switch
 *   active={showDetails}
 *   onChange={(checked) => setShowDetails(checked)}
 *   onClick={() => console.log('Switch toggled')}
 *   className="my-4"
 * />
 * ```
 *
 * @param {SwitchProps} props - Component props
 * @param {boolean} [props.active=false] - Controls the active/inactive state of the switch
 * @param {(checked: boolean) => void} [props.onChange] - Callback when switch state changes
 * @param {() => void} [props.onClick] - Callback when switch is clicked
 * @param {string} [props.className] - Additional CSS classes for the container
 * @returns {JSX.Element} A toggle switch component with smooth transitions
 */
export const Switch: FC<SwitchProps> = ({
  onClick,
  onChange,
  active = false,
  className,
}) => {
  const [isOn, setIsOn] = useState(active);

  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(open => !open);
    onChange?.(newState);

    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    setIsOn(active);
  }, [active]);

  return (
    <label
      className={`relative inline-flex cursor-pointer items-center ${className ? className : ""}`}
    >
      <input
        type='checkbox'
        checked={isOn}
        onChange={toggleSwitch}
        className='sr-only'
      />
      <div
        className={`shadow-inner h-[20px] w-[35px] rounded-max transition-colors duration-300 ease-in-out ${
          isOn ? "bg-darkBlue" : "bg-border"
        }`}
      >
        <div
          className={`absolute left-[2px] aspect-square w-[16px] translate-y-[2px] transform rounded-max bg-white shadow-md transition-transform duration-300 ease-in-out ${
            isOn ? "translate-x-[15px]" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};
