import { useEffect, useState } from "react";
import client from "../client";

/**
 * It is designed to handle github repositories requests. Not used. just a boilerplate.!!!
 * @param initialParams
 */
const useGithubRepositories = (initialParams: ReposApiParams) => {
  const [params, setParams] = useState<ReposApiParams>(initialParams);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      setIsLoading(!repositories?.length);
      const [data, error] = await client.getRepos(params);

      if (error) {
        console.error(error);
      } else {
        setRepositories(data?.items || []);
      }
      setIsLoading(false);
    };

    fetchRepositories();
  }, [params, repositories?.length]);

  const updateParams = (newParams: Partial<ReposApiParams>) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  return {
    repositories,
    isLoading,
    updateParams,
  };
};

export default useGithubRepositories;
