import { ActionIcon, Flex, Group } from "@mantine/core";
import React from "react";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiStackOverflowFill,
  RiTwitterXFill,
} from "react-icons/ri";

const Socials = () => {
  return (
    <Flex gap="xs" mt="xs">
      <RiGithubFill size="1.4rem" />
      <RiStackOverflowFill size="1.4rem" />
      <RiLinkedinBoxFill size="1.4rem" />
      <RiTwitterXFill size="1.4rem" />
    </Flex>
  );
};

export default Socials;
