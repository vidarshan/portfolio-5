import { Card, Grid, Text } from "@mantine/core";
import React from "react";
import { IEducationProps } from "../../interfaces";

const Education = ({ title, description }: IEducationProps) => {
  return (
    <Grid.Col span={{ xs: 3, sm: 3, md: 6, lg: 6, xl: 6 }}>
      <Card h="100%" withBorder>
        <Text className="ai-text" size="sm" fw={500} c="teal">
          {title}
        </Text>
        <Text c="gray" style={{ lineHeight: 1.8 }} mt="sm" size="sm">
          {description}
        </Text>
      </Card>
    </Grid.Col>
  );
};

export default Education;
