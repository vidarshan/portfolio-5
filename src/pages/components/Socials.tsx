import { ActionIcon, Flex } from "@mantine/core";
import React from "react";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiStackOverflowFill,
  RiTwitterXFill,
} from "react-icons/ri";

const Socials = () => {
  return (
    <Flex>
      <ActionIcon>
        <RiGithubFill />
      </ActionIcon>
      <ActionIcon>
        <RiStackOverflowFill />
      </ActionIcon>
      <ActionIcon>
        <RiLinkedinBoxFill />
      </ActionIcon>
      <ActionIcon>
        <RiTwitterXFill />
      </ActionIcon>
    </Flex>
  );
};

export default Socials;
