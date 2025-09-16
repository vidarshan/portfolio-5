export const gitQuery = `
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
