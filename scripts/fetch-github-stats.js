
const fs = require('fs');
const path = require('path');

async function fetchGitHubStats() {
  try {
    console.log('Fetching GitHub stats...');
    
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

    const repo = await repoResponse.json();
    const releases = await releasesResponse.json();

    const totalDownloads = releases.reduce((total, release) => {
      return (
        total +
        release.assets.reduce((assetTotal, asset) => {
          return assetTotal + asset.download_count;
        }, 0)
      );
    }, 0);

    const latestVersion = releases.length > 0 ? releases[0].tag_name : "v1.0.0";

    const stats = {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      downloads: totalDownloads,
      version: latestVersion,
      issues: repo.open_issues_count,
      lastUpdated: new Date().toISOString(),
    };

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(publicDir, 'github-stats.json'),
      JSON.stringify(stats, null, 2)
    );

    console.log('GitHub stats fetched successfully:', stats);
    return stats;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    
    const fallbackStats = {
      stars: 0,
      forks: 0,
      downloads: 0,
      version: "v2.0.0",
      issues: 0,
      lastUpdated: new Date().toISOString(),
    };
    
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(publicDir, 'github-stats.json'),
      JSON.stringify(fallbackStats, null, 2)
    );
    
    return fallbackStats;
  }
}

fetchGitHubStats();
