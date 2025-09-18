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
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: order * 0.1 }}
    >
      <Box
        style={{ cursor: cursor }}
        onClick={onClick}
        p="0.4rem 0.4rem"
        className="glassmorphism-container"
      >
        <Text c="gray" size="sm">
          {title}
        </Text>
      </Box>
    </motion.span>
  );
};

export default CustomBadge;
