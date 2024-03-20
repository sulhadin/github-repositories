import React, { useState } from "react";

interface RadioButtonProps {
  values: string[];
  initialValue?: string;
  onChange: (selectedValue: string) => void;
}

/**
 * A RadioButton component represents a group of radio buttons with a specified list of values.
 * This component allows the user to select one value from the list.
 *
 * @component
 *
 * @param {Object} props - The props for the RadioButton component.
 * @param {Array<string>} props.values - The list of values to be displayed as radio buttons.
 * @param {string} [props.initialValue=''] - The initial value for the radio button group.
 * @param {function} props.onChange - A callback function that will be called when the selected value changes.
 *
 * @returns {JSX.Element} The rendered RadioButton component.
 *
 * @example
 *
 * # Functional Component Usage
 *    <RadioButton
 *      initialValue={'javascript'}
 *      values={['javascript', 'scala', 'python']}
 *      onChange={handleRadioChange}
 *    />
 */
const RadioButton: React.FC<RadioButtonProps> = ({
  values,
  initialValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || "");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      {values.map((value) => (
        <label key={value} className="mr-4">
          <input
            type="radio"
            value={value}
            checked={value === selectedValue}
            onChange={handleRadioChange}
            className="mr-1"
          />
          {value}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
