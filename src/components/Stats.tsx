import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Image,
  Paper,
  Progress,
  SegmentedControl,
  Text,
} from "@mantine/core";
import React, { FC } from "react";
import { RiAppleFill, RiPlayFill, RiSpotifyFill } from "react-icons/ri";
import LikedSongs from "./LikedSongs";
import Songs from "./Songs";
import Github from "./Github";

interface StatsProps {
  width: number;
}

const Stats: FC<StatsProps> = ({ width }) => {
  const uri1 = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_CODE;
  console.log(uri1);

  const token = process.env.GITHUB_PAT;
  const username = process.env.GITHUB_USERNAME;

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
    <Paper
      w={width > 767 ? "70%" : "100%"}
      mb="xl"
      className="glassmorphism-container"
      p="xs"
    >
      <Github />
      <Divider my="xs" />
      <Songs />
    </Paper>
  );
};

export default Stats;
