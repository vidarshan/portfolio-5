import { Card, Grid, Text } from "@mantine/core";
import React from "react";
import { IEducationProps } from "../interfaces";
import { motion } from "framer-motion";

const Education = ({ title, description, key }: IEducationProps) => {
  return (
    <Grid.Col span={{ xs: 3, sm: 3, md: 6, lg: 6, xl: 6 }}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: key * 0.1 }}
      >
        <Card className="glassmorphism-container" h="100%">
          <Text size="sm" fw={500}>
            {title}
          </Text>
          <Text c="gray" style={{ lineHeight: 1.8 }} mt="sm" size="sm">
            {description}
          </Text>
        </Card>
      </motion.span>
    </Grid.Col>
  );
};

export default Education;
