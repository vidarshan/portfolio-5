import {
  ActionIcon,
  Box,
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
import LikedSongs from "./LikedSongs";
import Songs from "./Songs";

const Stats = () => {
  const uri1 = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_CODE;
  console.log(uri1);

  // const scopes = [
  //   "user-library-read", // read liked songs
  // ].join(" ");

  // const authUrl = `https://accounts.spotify.com/authorize?client_id=${
  //   process.env.SPOTIFY_CLIENT_ID
  // }&response_type=code&redirect_uri=${encodeURIComponent(
  //   process.env.SPOTIFY_REDIRECT_URI
  // )}&scope=${encodeURIComponent(scopes)}`;
  // console.log(authUrl);

  return (
    <Paper w="70%" mb="xs" className="glassmorphism-container" p="xs">
      <Text size="sm">Github Stats</Text>
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
      <Songs />
    </Paper>
  );
};

export default Stats;
