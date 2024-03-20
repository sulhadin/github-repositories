import React from "react";

import UiPagination from "../../ui/pagination";
import usePagination from "./usePagination.ts";

interface Props {
  pageCount: number;
}

const Pagination: React.FC<Props> = ({ pageCount }) => {
  const { handlePaginationChange, perPage, currentPage } = usePagination();

  return (
    <UiPagination
      onPageChange={handlePaginationChange}
      pagination={{
        page: currentPage,
        pageCount: pageCount,
        perPage: perPage,
      }}
    />
  );
};

export default Pagination;
