import { ActionIcon, Badge, Box, Card, Flex, Group, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { IProject } from "../interfaces";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { RiGithubFill } from "react-icons/ri";

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
    <Card mt="lg" withBorder>
      <Flex>
        <Image src={image} alt={name} width={190} height={120} priority />
        <Flex direction="column">
          <Box>
            <Flex align="center" justify="space-between">
              <Text className="ai-text" size="md" fw={500}>
                {name} · {year}
              </Text>
              <Box>
                <ActionIcon
                  size="md"
                  component="a"
                  href={repo}
                  mr={4}
                  target="_blank"
                  color="green"
                  variant="light"
                >
                  <RiGithubFill />
                </ActionIcon>
                <ActionIcon
                  size="md"
                  component="a"
                  href={demo}
                  target="_blank"
                  color="cyan"
                  variant="light"
                >
                  <FiArrowUpRight />
                </ActionIcon>
              </Box>
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
                fw={400}
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
