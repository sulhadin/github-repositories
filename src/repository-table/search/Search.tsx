import React from "react";

import Input from "../../ui/input";

import useSearch from "./useSearch.ts";

const RepoTable: React.FC = () => {
  const { handleSearch, value } = useSearch();

  return (
    <Input
      placeholder={"Search some github repository"}
      initialValue={value}
      onChange={handleSearch}
    />
  );
};

export default RepoTable;
