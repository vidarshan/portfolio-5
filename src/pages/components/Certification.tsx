import { Badge, Card, Flex, Grid, Group, Text, ThemeIcon } from "@mantine/core";
import React from "react";
import { ICertificationProps } from "../interfaces";
import { FiCheck, FiMinus } from "react-icons/fi";
import { PiSpinnerGapBold } from "react-icons/pi";

const Certification = ({
  title,
  year,
  organization,
  status,
}: ICertificationProps) => {
  return (
    <Grid.Col span={{ xs: 3, sm: 3, md: 12, lg: 6, xl: 6 }}>
      <Card h="100%" p="sm" withBorder>
        <Flex align="center" justify="space-between">
          <Text className="ai-text" size="sm" fw={600} >
            {organization} · {year}
          </Text>
          {status === "In Progress" ? (
            <ThemeIcon size="sm" variant="light" color="gray">
              <FiMinus />
            </ThemeIcon>
          ) : (
            <ThemeIcon size="sm" variant="light" color="green">
              <FiCheck />
            </ThemeIcon>
          )}
        </Flex>
        <Text mt="sm" size="sm"></Text>
        <Text size="md"> {title}</Text>
      </Card>
    </Grid.Col>
  );
};

export default Certification;
