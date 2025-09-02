import { Paper, Text } from "@mantine/core";
import React from "react";

interface QuickQuestionProps {
  text: string;
}

const QuickQuestion: React.FC<QuickQuestionProps> = ({ text }) => {
  return (
    <Paper p="xs" radius="xl" withBorder>
      <Text c='dimmed' size="xs">{text}</Text>
    </Paper>
  );
};

export default QuickQuestion;
