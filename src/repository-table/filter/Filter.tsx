import React from "react";

import RadioButton from "../../ui/radio";
import useFilter from "./useFilter.ts";

const Filter: React.FC = () => {
  const { value, handleRadioChange } = useFilter();

  return (
    <RadioButton
      initialValue={value}
      values={["javascript", "scala", "python"]}
      onChange={handleRadioChange}
    />
  );
};

export default Filter;
