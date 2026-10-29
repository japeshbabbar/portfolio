// Vercel serverless function: GitHub profile, repos, languages and (with GITHUB_TOKEN) the contribution graph.
const USER = process.env.GITHUB_USER || "japeshbabbar";
const H = { "User-Agent": "portfolio", Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) H.Authorization = "Bearer " + process.env.GITHUB_TOKEN;

module.exports = async (req, res) => {
  try {
    const [u, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, { headers: H }).then((r) => r.json()),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers: H }).then((r) => r.json()),
    ]);
    if (!u.login || !Array.isArray(repos)) throw new Error("GitHub error");
    const own = repos.filter((r) => !r.fork);
    const langs = {};
    own.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1));
    let contributions = null;
    if (process.env.GITHUB_TOKEN) {
      const g = await fetch("https://api.github.com/graphql", {
        method: "POST", headers: H,
        body: JSON.stringify({ query: `{user(login:"${USER}"){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}` }),
      }).then((r) => r.json());
      const cal = g.data && g.data.user.contributionsCollection.contributionCalendar;
      if (cal) {
        const days = {};
        cal.weeks.forEach((w) => w.contributionDays.forEach((d) => (days[d.date] = d.contributionCount)));
        contributions = { total: cal.totalContributions, days };
      }
    }
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");
    res.status(200).json({
      repos: u.public_repos, followers: u.followers, langs, contributions,
      top: own.slice(0, 6).map((r) => ({ name: r.name, desc: r.description, stars: r.stargazers_count, lang: r.language, url: r.html_url, pushed: r.pushed_at })),
    });
  } catch (e) {
    res.status(502).json({ error: "GitHub unavailable" });
  }
};
