import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { link } from "fs";
import React from "react";
import { IExperienceProps, IWork } from "../interfaces";
import { FiArrowUpRight } from "react-icons/fi";

const Experience: React.FC<IWork> = ({ company, jobs, link }) => {
  return (
    <Card mt="1rem" p={20} withBorder>
      <Group justify="space-between" align="center">
        <Text size="lg" fw={500}>
          {company}
        </Text>
        {link !== "null" && (
          <ActionIcon
            variant="light"
            color="cyan"
            component="a"
            target="_blank"
            href={link}
          >
            <FiArrowUpRight />
          </ActionIcon>
        )}
      </Group>
      {jobs.map((job: IExperienceProps, index: number) => {
        return (
          <Box key={job.date} mt="1rem">
            <Text className="ai-text" size="md" fw={500}>
              {job.title} · {job.date}
            </Text>
            <Text c="gray" style={{ lineHeight: 1.8 }} mt="sm" size="sm">
              {job.description}
            </Text>

            <Group mt={8}>
              {job.skills.map((tech: string) => {
                return (
                  <Badge
                    key={tech}
                    size="md"
                    fw={400}
                    color="cyan"
                    tt="capitalize"
                    variant="light"
                  >
                    {tech}
                  </Badge>
                );
              })}
            </Group>
            {jobs?.length > 1 && index !== jobs?.length - 1 && (
              <Divider mt="xs" />
            )}
          </Box>
        );
      })}
    </Card>
  );
};

export default Experience;
