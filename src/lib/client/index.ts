import GithubApiClient from "src/lib/client/GithubApiClient.ts";

/**
 * This http client is an alternative solution to RTK.
 *
 * If you don't like RTK feel free to get this sweetness.
 */
const client = new GithubApiClient(
  "https://api.github.com/search/repositories",
);

export default client;
