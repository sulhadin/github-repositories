/**
 * Represents a client for interacting with the GitHub API.
 */
class GithubApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getRepos(
    params: ReposApiParams,
  ): Promise<[GitHubResponse | null, Error | null]> {
    const searchParams = new URLSearchParams({
      q: `language:${params.language}${params.keyword ? ` ${params.keyword}` : ""}`,
      sort: params.sortBy,
      order: params.sortOrder,
      page: params.currentPage.toString(),
      per_page: params.perPage.toString(),
    });

    const url = `${this.baseUrl}?${searchParams.toString()}`; // Construct complete URL

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching repositories: ${response.status}`);
      }
      const data: GitHubResponse = await response.json();
      return [data, null];
    } catch (error) {
      if (error instanceof Error) {
        return [null, error];
      }
      return [null, new Error("An unknown error occurred.")];
    }
  }
}

export default GithubApiClient;
