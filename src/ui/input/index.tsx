import React, { ChangeEvent, useState } from "react";

interface InputProps {
  initialValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Input component with controlled state.
 *
 * @remarks
 * This component is a functional component that renders an HTML input element.
 * It allows the user to enter text and notifies the parent component of any changes.
 *
 * @param initialValue - The initial value of the input element.
 * @param onChange - A callback function to be called when the input value changes.
 * @param placeholder - The placeholder text to be displayed in the input element.
 *
 * @returns The rendered input element.
 *
 * @example
 * ```tsx
 * const handleChange = (newValue: string) => {
 *   console.log(newValue);
 * };
 *
 * <Index
 *   initialValue="example"
 *   onChange={handleChange}
 *   placeholder="Enter text"
 * />
 * ```
 */
const Index: React.FC<InputProps> = ({
  initialValue,
  onChange,
  placeholder,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };
  return (
    <input
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
    />
  );
};

export default Index;
