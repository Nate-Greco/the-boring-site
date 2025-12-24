"use client";

import { useEffect, useState } from "react";

interface GitHubStats {
  stars: number;
  forks: number;
  downloads: number;
  version: string;
  issues: number;
}

interface GitHubRelease {
  tag_name: string;
  assets: Array<{
    download_count: number;
  }>;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

const fallbackStats: GitHubStats = {
  stars: 2500,
  forks: 150,
  downloads: 50000,
  version: "v2.0.0",
  issues: 10,
};

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats>(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [repoResponse, releasesResponse] = await Promise.all([
          fetch("https://api.github.com/repos/TheBoredTeam/boring.notch", {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }),
          fetch("https://api.github.com/repos/TheBoredTeam/boring.notch/releases", {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }),
        ]);

        if (!repoResponse.ok || !releasesResponse.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const repo: GitHubRepo = await repoResponse.json();
        const releases: GitHubRelease[] = await releasesResponse.json();

        const totalDownloads = releases.reduce((total, release) => {
          return (
            total +
            release.assets.reduce((assetTotal, asset) => {
              return assetTotal + asset.download_count;
            }, 0)
          );
        }, 0);

        const latestVersion = releases.length > 0 ? releases[0].tag_name : "v2.0.0";

        setStats({
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          downloads: totalDownloads,
          version: latestVersion,
          issues: repo.open_issues_count,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
