"use client";
import {
  Box,
  Center,
  Group,
  Progress,
  SegmentedControl,
  Text,
  Tooltip,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { calculateScores } from "@/utils/calculateContributions";
import { FaMasksTheater, FaTerminal } from "react-icons/fa6";

const Github = () => {
  const [theme, setTheme] = useState("modern");

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

  const toggleColors = (theme: string) => {
    if (theme === "retro") {
      document.documentElement.style.setProperty("--bg-color-1", "#000000");
      document.documentElement.style.setProperty("--bg-color-2", "#000000");
      document.documentElement.style.setProperty("--text-color", "#19d300");
      document.documentElement.style.setProperty(
        "--font-family",
        "'DM Mono', monospace"
      );
      document.documentElement.style.setProperty(
        "--transparent-bg",
        "rgba(0, 0, 0, 0.6)"
      );
      document.documentElement.style.setProperty("--border-radius", "0");
      document.documentElement.style.setProperty("--word-spacing", "0.10em");
      document.documentElement.style.setProperty("--text-color-1", "#19d300");
      document.documentElement.style.setProperty("--text-color-2", "#19d300");
    } else {
      document.documentElement.style.setProperty(
        "--bg-color-1",
        "rgba(0, 150, 255, 0.3)"
      );
      document.documentElement.style.setProperty(
        "--bg-color-2",
        "rgba(255, 0, 200, 0.25)"
      );
      document.documentElement.style.setProperty(
        "--font-family",
        "'Geist', sans-serif"
      );
      document.documentElement.style.setProperty("--text-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--transparent-bg",
        "rgba(255, 255, 255, 0.15)"
      );
      document.documentElement.style.setProperty("--border-radius", "1rem");
      document.documentElement.style.setProperty("--word-spacing", "0.05em");
      document.documentElement.style.setProperty("--text-color-1", "#e8436f");
      document.documentElement.style.setProperty("--text-color-2", "#3f9fff");
    }
  };

  return (
    <Box>
      <Group mb="md" justify="space-between">
        <Text size="sm">Github Stats</Text>
        <SegmentedControl
          value={theme}
          className="glassmorphism-container"
          size="xs"
          onChange={(value) => {
            toggleColors(value);
            setTheme(value);
          }}
          data={[
            {
              value: "modern",
              label: (
                <Center style={{ gap: 10 }}>
                  <FaMasksTheater />
                  Modern
                </Center>
              ),
            },
            {
              value: "retro",
              label: (
                <Center style={{ gap: 10 }}>
                  <FaTerminal />
                  Retro
                </Center>
              ),
            },
          ]}
        />
      </Group>
      {/* <Progress.Root mt="xs" variant="light" size="xl">
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
      </Progress.Root> */}
    </Box>
  );
};

export default Github;
