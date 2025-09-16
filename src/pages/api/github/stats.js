import { calculateScores } from "../../../utils/calculateContributions";

export default async function handler(req, res) {
  const gitQuery = `
query {
  user(login: "vidarshan") {
    y2019: contributionsCollection(from: "2019-01-01T00:00:00Z", to: "2019-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
      }
    }
    y2020: contributionsCollection(from: "2020-01-01T00:00:00Z", to: "2020-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
      }
    }
    y2021: contributionsCollection(from: "2021-01-01T00:00:00Z", to: "2021-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
      }
    }
    y2022: contributionsCollection(from: "2022-01-01T00:00:00Z", to: "2022-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
      }
    }
    y2023: contributionsCollection(from: "2023-01-01T00:00:00Z", to: "2023-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
      }
    }
    y2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
      }
    }
    y2025: contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
      }
    }
  }
}`;

  try {
    const token = process.env.GITHUB_PAT;
    console.log(token);
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: gitQuery }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error(data.errors);
      return res.status(500).json({ error: data.errors });
    }

    res.status(200).json(data.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch github stats" });
  }
}
