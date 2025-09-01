import { Paper, Progress, Text } from "@mantine/core";
import React from "react";

const Stats = () => {
  return (
    <Paper w="70%" mb="xs" className="glassmorphism-container" p="xs">
      <Text>Github Statistics</Text>
      <Progress.Root variant="light" size="lg">
        <Progress.Section value={4} color="cyan">
          <Progress.Label>2019</Progress.Label>
        </Progress.Section>
        <Progress.Section value={28} variant="light" color="pink">
          <Progress.Label>2020</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="orange">
          <Progress.Label>2021</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="orange">
          <Progress.Label>2022</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="orange">
          <Progress.Label>2023</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="orange">
          <Progress.Label>2024</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="orange">
          <Progress.Label>2025</Progress.Label>
        </Progress.Section>
      </Progress.Root>
      <Text>Stackoverflow Statistics</Text>
      <Text>Badges</Text>
      <Progress.Root variant="light" size="lg">
        <Progress.Section value={4} color="cyan">
          <Progress.Label>2019</Progress.Label>
        </Progress.Section>
        <Progress.Section value={28} variant="light" color="pink">
          <Progress.Label>2020</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="orange">
          <Progress.Label>2021</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Paper>
  );
};

export default Stats;
