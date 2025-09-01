import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import React from "react";
import {
  RiDownloadLine,
  RiGithubFill,
  RiGithubLine,
  RiLinkedinBoxFill,
  RiLinkedinLine,
  RiStackOverflowFill,
  RiStackOverflowLine,
  RiTwitterXFill,
  RiTwitterXLine,
} from "react-icons/ri";

const Socials = () => {
  return (
    <Group mt="md">
      <Paper className="glassmorphism-container" w="fit-content" p="0.3rem">
        <Group>
          <ActionIcon
            size="md"
            className="glassmorphism-container"
            variant="light"
          >
            <RiGithubLine />
          </ActionIcon>
          <ActionIcon
            size="md"
            className="glassmorphism-container"
            variant="light"
          >
            <RiStackOverflowLine />
          </ActionIcon>
          <ActionIcon
            size="md"
            className="glassmorphism-container"
            variant="light"
          >
            <RiLinkedinBoxFill />
          </ActionIcon>
          <ActionIcon
            size="md"
            className="glassmorphism-container"
            variant="light"
          >
            <RiTwitterXLine />
          </ActionIcon>
        </Group>
      </Paper>
      <Paper
        className="glassmorphism-container"
        w="fit-content"
        bdrs="inherit"
        p="0.3rem"
      >
        <Group>
          <ActionIcon
            size="md"
            className="glassmorphism-container"
            variant="light"
          >
            <RiDownloadLine />
          </ActionIcon>
        </Group>
      </Paper>
    </Group>
  );
};

export default Socials;
