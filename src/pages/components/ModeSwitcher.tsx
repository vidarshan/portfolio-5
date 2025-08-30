import { Box, Center, SegmentedControl } from "@mantine/core";
import React from "react";
import { RiGlobeLine, RiSparklingLine } from "react-icons/ri";

interface ModeSwitcherProps {
  mode: string;
  setMode: (mode: string) => void;
}

const ModeSwitcher = ({ mode, setMode }: ModeSwitcherProps) => {
  return (
    <Box mt="4rem">
      <SegmentedControl
        radius="xl"
        value={mode}
        size="xs"
        onChange={setMode}
        data={[
          {
            value: "web",
            label: "Web View",
          },
          {
            value: "ai",
            label: "Intelligence",
          },
        ]}
      />
    </Box>
  );
};

export default ModeSwitcher;
