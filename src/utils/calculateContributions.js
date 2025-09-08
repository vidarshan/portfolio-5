export function calculateScores(contributions) {
  if (!contributions || typeof contributions !== "object") return [];

  // 7 colors palette (cycled if >7 years)
  const colors = [
    "#FF6384", // red
    "#36A2EB", // blue
    "#FFCE56", // yellow
    "#4BC0C0", // teal
    "#9966FF", // purple
    "#FF9F40", // orange
    "#2ECC71", // green
  ];

  // extract {year, total}
  let years = Object.keys(contributions).map((key) => ({
    year: key.slice(1),
    total: contributions[key]?.contributionCalendar?.totalContributions || 0,
  }));

  // keep only last 5 years
  years = years.sort((a, b) => a.year - b.year).slice(-6);

  const grandTotal = years.reduce((sum, y) => sum + y.total, 0);
  if (grandTotal === 0) return [];

  // raw percents
  const withPercents = years.map((y, idx) => ({
    ...y,
    percent: (y.total / grandTotal) * 100,
    color: colors[idx % colors.length], // assign color cyclically
  }));

  // round but force sum = 100
  let rounded = withPercents.map((y) => ({
    ...y,
    percent: Math.floor(y.percent),
  }));

  let diff = 100 - rounded.reduce((s, y) => s + y.percent, 0);

  withPercents
    .map((y, i) => ({ i, frac: y.percent % 1 }))
    .sort((a, b) => b.frac - a.frac)
    .slice(0, diff)
    .forEach(({ i }) => (rounded[i].percent += 1));

  return rounded;
}
