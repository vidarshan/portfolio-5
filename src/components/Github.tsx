import { Box, Progress, Text, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { calculateScores } from "@/utils/calculateContributions";

const Github = () => {
  //   const years = useMemo(() => [2019, 2020, 2021, 2022, 2023, 2024, 2025], []);
  const [data, setData] = useState([
    {
      year: "",
      total: 0,
      percent: 0,
      color: "",
    },
  ]);
  useEffect(() => {
    fetch("/api/github/stats")
      .then((res) => res.json())
      .then((data) => {
        setData(calculateScores(data.user));
      });
  }, []);

  return (
    <Box>
      <Text size="sm">Github Stats</Text>
      <Progress.Root mt="xs" variant="light" size="lg">
        {data.map((d) => {
          return (
            <Progress.Section
              key={d.year}
              value={d.percent}
              variant="light"
              color={d.color}
            >
              <Tooltip
                label={`${d.total} contributions in ${d.year}`}
                withArrow
              >
                <Progress.Label style={{ cursor: "pointer" }}>
                  {d.year}
                </Progress.Label>
              </Tooltip>
            </Progress.Section>
          );
        })}
      </Progress.Root>
    </Box>
  );
};

export default Github;
