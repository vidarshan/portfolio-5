import { Card, Grid, Text } from "@mantine/core";
import React from "react";
import { IEducationProps } from "../interfaces";

const Education = ({ title, description }: IEducationProps) => {
  return (
    <Grid.Col span={{ xs: 3, sm: 3, md: 12, lg: 6, xl: 12 }}>
      <Card withBorder>
        <Text className="ai-text" w={600} c="teal">
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
