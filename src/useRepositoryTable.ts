import debounce from "lodash.debounce";

import { useListRepositoriesQuery } from "./services/githubApi.ts";
import { useDispatch } from "react-redux";
import { updateParams } from "./store/searchParamsSlice.ts";
import { useAppSelector } from "./store/store.ts";

const useRepositoryTable = () => {
  const { selectParams } = useAppSelector((state) => state.searchParams);
  const dispatch = useDispatch();

  const { data: repositories, isLoading } =
    useListRepositoriesQuery(selectParams);

  const handleSorting = (columnKey: keyof Repository, isAscending: boolean) => {
    dispatch(
      updateParams({
        ...selectParams,
        sortBy: columnKey,
        sortOrder: isAscending ? "asc" : "desc",
      }),
    );
  };

  const getSortedAs = (sortBy: string) => {
    if (sortBy !== selectParams.sortBy) {
      return undefined;
    }
    return selectParams.sortOrder === "asc";
  };

  const handleChange = debounce((value: string) => {
    dispatch(
      updateParams({
        ...selectParams,
        keyword: value,
      }),
    );
  }, 1000);

  const handleRadioChange = (value: string) => {
    dispatch(
      updateParams({
        ...selectParams,
        language: value,
      }),
    );
  };

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
    handleRadioChange,
    handleChange,
    getSortedAs,
    handleSorting,
    repositories,
    isLoading,
    selectParams,
  };
};

export default useRepositoryTable;
