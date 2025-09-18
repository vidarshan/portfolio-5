import {
  ActionIcon,
  Box,
  Center,
  Divider,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Text,
  Tooltip,
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
import { linkedInLink, githubLink, stackoverflowLink } from "@/data/links";
import { FaMasksTheater, FaTerminal } from "react-icons/fa6";

const Socials = () => {
  return (
    <Group mt="md">
      <Group>
        <Tooltip
          events={{ hover: true, focus: true, touch: false }}
          label="View Github Profile"
          position="bottom"
          withArrow
        >
          <Box
            className="glassmorphism-container"
            p="xs"
            component="a"
            href={githubLink}
            target="_blank"
          >
            <Center>
              <RiGithubLine />
            </Center>
          </Box>
        </Tooltip>
        <Tooltip
          events={{ hover: true, focus: true, touch: false }}
          label="View Stackoverflow Profile"
          position="bottom"
          withArrow
        >
          <Box
            className="glassmorphism-container"
            p="xs"
            component="a"
            href={stackoverflowLink}
            target="_blank"
          >
            <Center>
              <RiStackOverflowLine />
            </Center>
          </Box>
        </Tooltip>
        <Tooltip
          events={{ hover: true, focus: true, touch: false }}
          label="View LinkedIn Profile"
          position="bottom"
          withArrow
        >
          <Box
            className="glassmorphism-container"
            p="xs"
            component="a"
            href={linkedInLink}
            target="_blank"
          >
            <Center>
              <RiLinkedinBoxFill />
            </Center>
          </Box>
        </Tooltip>
      </Group>
      <Tooltip
        events={{ hover: true, focus: true, touch: false }}
        label="Download Resume"
        position="bottom"
        withArrow
      >
        <Box className="glassmorphism-container" p="xs">
          <Center>
            <RiDownloadLine />
          </Center>
        </Box>
      </Tooltip>
      
    </Group>
  );
};

export default Socials;
