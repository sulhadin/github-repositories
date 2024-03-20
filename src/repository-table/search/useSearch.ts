import debounce from "lodash.debounce";

import { useDispatch } from "react-redux";
import { updateParams } from "../../store/searchParamsSlice.ts";
import { useAppSelector } from "../../store/store.ts";

const useSearch = () => {
  const { selectParams } = useAppSelector((state) => state.searchParams);
  const dispatch = useDispatch();

  const handleSearch = debounce((value: string) => {
    dispatch(
      updateParams({
        ...selectParams,
        keyword: value,
      }),
    );
  }, 1000);

  return {
    handleSearch,
    value: selectParams.keyword,
  };
};

export default useSearch;
