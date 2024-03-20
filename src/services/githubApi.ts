import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Creates a GitHub API object for interacting with the GitHub API.
 *
 * @param {Object} options - The options for creating the GitHub API.
 * @param {Object} options.baseQuery - The base query for making requests to the GitHub API.
 * @param {string} options.baseQuery.baseUrl - The base URL for the GitHub API.
 * @param {Array} options.tagTypes - The types of tags for caching data.
 * @param {Function} options.endpoints - The function for defining the endpoints of the GitHub API.
 * @returns {Object} The GitHub API object.
 */
export const githubApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/search/repositories",
  }),
  tagTypes: ["Repositories"],
  endpoints: (builder) => ({
    listRepositories: builder.query<GitHubResponse, ReposApiParams>({
      providesTags: ["Repositories"],
      query: (params: ReposApiParams) => {
        const searchParams = new URLSearchParams({
          q: `language:${params.language}${params.keyword ? ` ${params.keyword}` : ""}`,
          sort: params.sortBy,
          order: params.sortOrder,
          page: params.currentPage.toString(),
          per_page: params.perPage.toString(),
        });
        return `?${searchParams.toString()}`; // Construct complete URL
      },
    }),
  }),
});

export const { useListRepositoriesQuery } = githubApi;
