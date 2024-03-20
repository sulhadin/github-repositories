import React from "react";

import useRepositoryTable from "./useRepositoryTable.ts";
import Search from "./search/Search.tsx";
import Pagination from "./pagination/Pagination.tsx";
import Filter from "./filter/Filter.tsx";
import Table from "../ui/table/index.tsx";

const RepositoryTable: React.FC = () => {
  const { getSortedAs, handleSorting, repositories, isLoading } =
    useRepositoryTable();

  return (
    <div className={"flex flex-col gap-4 p-5"}>
      <div className={"flex gap-4"}>
        <Search />
        <Filter />
      </div>
      <Table<Repository>
        isLoading={isLoading}
        data={repositories?.items}
        columns={[
          { key: "id", label: "id", render: (item) => item.id },
          {
            key: "owner",
            label: "Username",
            render: (item) => item.owner.login,
          },
          {
            key: "description",
            label: "Repo Description",
            render: (item) => item.description,
          },
          {
            key: "stargazers_count",
            label: "Stars",
            render: (item) => item.stargazers_count,
            sortable: true,
            sortedAs: getSortedAs("stargazers_count"),
          },
          {
            key: "forks",
            label: "Forks",
            render: (item) => item.forks,
            sortable: true,
            sortedAs: getSortedAs("forks"),
          },
          {
            key: "updated_at",
            label: "Last Update Date",
            render: (item) => item.updated_at,
          },
        ]}
        onSorting={handleSorting}
      />

      <Pagination pageCount={repositories?.total_count || 0} />
    </div>
  );
};

export default RepositoryTable;
