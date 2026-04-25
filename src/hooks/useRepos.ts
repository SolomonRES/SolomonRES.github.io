import { useEffect, useState } from "react";
import type { GitHubRepo } from "../types";

type RepoState = {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
};

const API_HEADERS = {
  Accept: "application/vnd.github+json"
};

export function useRepos(username: string, featuredRepos: readonly string[]) {
  const [state, setState] = useState<RepoState>({
    repos: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepos() {
      setState((current) => ({ ...current, loading: true, error: null }));

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          {
            headers: API_HEADERS,
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub request failed with status ${response.status}.`);
        }

        const data = (await response.json()) as GitHubRepo[];
        const publicRepos = data.filter((repo) => !repo.fork);
        const featuredSet = new Set(featuredRepos);

        const sortedRepos = [...publicRepos].sort((left, right) => {
          const leftFeatured = featuredSet.has(left.name);
          const rightFeatured = featuredSet.has(right.name);

          if (leftFeatured !== rightFeatured) {
            return leftFeatured ? -1 : 1;
          }

          return (
            new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime()
          );
        });

        setState({
          repos: sortedRepos.slice(0, 12),
          loading: false,
          error: null
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          repos: [],
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "GitHub repositories could not be loaded."
        });
      }
    }

    void loadRepos();

    return () => controller.abort();
  }, [featuredRepos, username]);

  return state;
}
