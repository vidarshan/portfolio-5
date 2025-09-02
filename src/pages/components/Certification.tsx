import {
  Badge,
  Card,
  Flex,
  Grid,
  Group,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core";
import React, { useEffect } from "react";
import { ICertificationProps } from "../../interfaces";
import { FiCheck, FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { PiSpinnerGapBold } from "react-icons/pi";
import { FaAws } from "react-icons/fa";

const Certification = ({
  title,
  year,
  organization,
  status,
  icon,
  order = 0,
}: ICertificationProps) => {
  const [educationOpened, setEducationOpened] = React.useState(false);
  useEffect(() => {
    setEducationOpened(true);
  }, []);

  return (
    <Grid.Col span={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 3 }}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: order * 0.1 }}
      >
        <Paper className="glassmorphism-container" p="xs" h="100%">
          {icon}
          <Flex h="100%" direction="column">
            <Text size="sm" fw={500}>
              {organization} · {year}
            </Text>
            <Text c="gray" style={{ lineHeight: 1.4 }} mt="xs" size="sm">
              {title}
            </Text>
          </Flex>
        </Paper>
      </motion.span>
    </Grid.Col>
  );
};

export default Certification;
