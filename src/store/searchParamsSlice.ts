import { createSlice } from "@reduxjs/toolkit";

interface SearchParamsState {
  selectParams: ReposApiParams;
}

const initialState: SearchParamsState = {
  selectParams: {
    keyword: "",
    language: "javascript",
    sortBy: "",
    sortOrder: "",
    currentPage: 1,
    perPage: 10,
  },
};

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    updateParams(
      state: SearchParamsState,
      action: { payload: Partial<ReposApiParams> },
    ) {
      state.selectParams = { ...state.selectParams, ...action.payload };
    },
  },
});

export const { updateParams } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
