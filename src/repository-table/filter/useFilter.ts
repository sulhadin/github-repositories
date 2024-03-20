import { useDispatch } from "react-redux";
import { updateParams } from "../../store/searchParamsSlice.ts";
import { useAppSelector } from "../../store/store.ts";

const useFilter = () => {
  const { selectParams } = useAppSelector((state) => state.searchParams);
  const dispatch = useDispatch();

  const handleRadioChange = (value: string) => {
    dispatch(
      updateParams({
        ...selectParams,
        language: value,
      }),
    );
  };

  return {
    handleRadioChange,
    value: selectParams.language,
  };
};

export default useFilter;
