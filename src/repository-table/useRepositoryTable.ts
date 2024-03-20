import { useListRepositoriesQuery } from "../services/githubApi.ts";
import { useDispatch } from "react-redux";
import { updateParams } from "../store/searchParamsSlice.ts";
import { useAppSelector } from "../store/store.ts";

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

  return {
    getSortedAs,
    handleSorting,
    repositories,
    isLoading,
    selectParams,
  };
};

export default useRepositoryTable;
