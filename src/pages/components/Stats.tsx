import {
  ActionIcon,
  Center,
  Divider,
  Flex,
  Image,
  Paper,
  Progress,
  SegmentedControl,
  Text,
} from "@mantine/core";
import React from "react";
import { RiAppleFill, RiPlayFill, RiSpotifyFill } from "react-icons/ri";

const Stats = () => {
  return (
    <Paper w="70%" mb="xs" className="glassmorphism-container" p="xs">
      <Text size="sm" fw={600}>
        Github Statistics
      </Text>
      <Progress.Root mt="xs" variant="light" size="lg">
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
      <Divider my="xs" />

      <Flex justify="space-between" align="center">
        <Text size="sm" fw={600}>
          My favorite playlist
        </Text>
        <SegmentedControl
          size="sm"
          data={[
            {
              value: "preview",
              label: (
                <Center style={{ gap: 10 }}>
                  <RiAppleFill />
                </Center>
              ),
            },
            {
              value: "code",
              label: (
                <Center style={{ gap: 10 }}>
                  <RiSpotifyFill />
                </Center>
              ),
            },
          ]}
        />
      </Flex>
      <Image></Image>
      <Text>I got 5 on it </Text>
      <Text>Some Artist · 1985</Text>
    </Paper>
  );
};

export default Stats;
