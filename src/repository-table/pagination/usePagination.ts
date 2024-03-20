import { useDispatch } from "react-redux";
import { updateParams } from "../../store/searchParamsSlice.ts";
import { useAppSelector } from "../../store/store.ts";

const usePagination = () => {
  const { selectParams } = useAppSelector((state) => state.searchParams);
  const dispatch = useDispatch();

  const handlePaginationChange = (page: number) => {
    dispatch(
      updateParams({
        ...selectParams,
        currentPage: page,
      }),
    );
  };

  return {
    handlePaginationChange,
    perPage: selectParams.perPage,
    currentPage: selectParams.currentPage,
  };
};

export default usePagination;
