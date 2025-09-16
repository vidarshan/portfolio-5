import { Badge, Box, Paper, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { JSX } from "react";

interface CustomBadgeProps {
  title: string;
  color?: string;
  size?: string;
  variant?: string;
  order?: number;
  leftSection?: JSX.Element;
  cursor?: string;
  onClick?: () => void;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({
  title,
  color = "gray",
  size = "md",
  variant = "light",
  order = 0,
  leftSection,
  cursor = "default",
  onClick,
}) => {
  return (
    <>
      <Box
        style={{ cursor: cursor }}
        onClick={onClick}
        p="xs"
        className="glassmorphism-container"
      >
        <Text c="gray" style={{ lineHeight: 1.8 }} size="sm">
          {title}
        </Text>
      </Box>
    </>
  );
};

export default CustomBadge;
