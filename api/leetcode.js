// Vercel serverless function: proxies LeetCode's GraphQL (browsers can't call it directly).
const USER = process.env.LEETCODE_USER || "japeshbabbar";
const QUERY = `query($u:String!){
  matchedUser(username:$u){
    submitStatsGlobal{acSubmissionNum{difficulty count}}
    userCalendar{submissionCalendar streak totalActiveDays}
  }
  userContestRanking(username:$u){rating attendedContestsCount}
}`;

module.exports = async (req, res) => {
  try {
    const r = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com", "User-Agent": "Mozilla/5.0" },
      body: JSON.stringify({ query: QUERY, variables: { u: USER } }),
    });
    const { data } = await r.json();
    const m = data && data.matchedUser;
    if (!m) throw new Error("User not found");
    const solved = {};
    m.submitStatsGlobal.acSubmissionNum.forEach((x) => (solved[x.difficulty] = x.count));
    const cal = {};
    const raw = JSON.parse(m.userCalendar.submissionCalendar || "{}");
    for (const ts in raw) cal[new Date(ts * 1000).toISOString().slice(0, 10)] = raw[ts];
    const c = data.userContestRanking;
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({
      solved, calendar: cal, streak: m.userCalendar.streak, activeDays: m.userCalendar.totalActiveDays,
      rating: c ? Math.round(c.rating) : null, contests: c ? c.attendedContestsCount : 0,
    });
  } catch (e) {
    res.status(502).json({ error: "LeetCode unavailable" });
  }
};
