import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Group,
  Text,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import { IProject } from "../interfaces";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { RiGithubFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";

const Project = ({
  name,
  image,
  description,
  technologies,
  year,
  repo,
  demo,
}: IProject) => {
  return (
    <Card className="glassmorphism-container" mt="lg">
      <Flex>
        <Image src={image} alt={name} width={190} height={120} priority />
        <Flex direction="column">
          <Box>
            <Flex mb="xs" align="center" justify="space-between">
              <Text className="ai-text" size="md" fw={500}>
                {name} · {year}
              </Text>
              <Flex>
                <ActionIcon
                  variant="light"
                  color="white"
                  bg="#ffffff1d"
                  component="a"
                  target="_blank"
                  href={repo}
                  mr="xs"
                >
                  <FaGithub />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  color="white"
                  bg="#ffffff1d"
                  component="a"
                  target="_blank"
                  href={demo}
                >
                  <FiArrowUpRight />
                </ActionIcon>
              </Flex>
            </Flex>
            <Text c="gray" style={{ lineHeight: 1.8 }} size="sm">
              {description}
            </Text>
          </Box>
          <Group mt="sm" gap="sm">
            {technologies.map((tag) => (
              <Badge
                key={tag}
                size="md"
                tt="capitalize"
                variant="light"
                color="cyan"
              >
                {tag}
              </Badge>
            ))}
          </Group>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Project;
