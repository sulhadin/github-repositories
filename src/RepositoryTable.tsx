import React from "react";

import Table from "./components/table";
import Index from "./components/input";
import RadioButton from "./components/radio";
import Pagination from "./components/pagination";
import useRepositoryTable from "./useRepositoryTable.ts";

const RepoTable: React.FC = () => {
  const {
    handlePaginationChange,
    handleRadioChange,
    handleChange,
    getSortedAs,
    handleSorting,
    repositories,
    isLoading,
    selectParams,
  } = useRepositoryTable();

  return (
    <div className={"flex flex-col gap-4 p-5"}>
      <div className={"flex gap-4"}>
        <Index
          placeholder={"Search some github repository"}
          initialValue={selectParams.keyword}
          onChange={handleChange}
        />
        <RadioButton
          initialValue={selectParams.language}
          values={["javascript", "scala", "python"]}
          onChange={handleRadioChange}
        />
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

      <Pagination
        onPageChange={handlePaginationChange}
        pagination={{
          page: selectParams.currentPage,
          pageCount: repositories?.total_count || 0,
          perPage: selectParams.perPage,
        }}
      />
    </div>
  );
};

export default RepoTable;
