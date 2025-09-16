import { ISong } from "@/interfaces";
import { Box, Flex, Image, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { RiSpotifyFill } from "react-icons/ri";

const Songs = () => {
  const [song, setSong] = useState<ISong>({
    album: "",
    artists: "",
    image: "https://picsum.photos/200",
    title: "",
    url: "",
    year: "",
  });

  useEffect(() => {
    fetch("/api/spotify/liked")
      .then((res) => res.json())
      .then((data) => setSong(data));
  }, []);

  return (
    <Box
      className="no-link-style"
      target="_blank"
      component="a"
      href={song.url}
    >
      <Flex justify="space-between" align="center">
        <Text size="sm">A song from my favorite playlist</Text>
        <RiSpotifyFill />
      </Flex>
      <Flex mt="xs" align="center">
        <Image
          radius="md"
          w="3rem"
          h="3rem"
          fit="contain"
          alt="album_art"
          src={song.image}
        ></Image>
        <Box ml="xs">
          <Text size="sm" fw={600}>
            {song.title}
          </Text>
          <Text size="xs" c="muted">
            {song.artists} · {song.year}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Songs;
