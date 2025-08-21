import { Center, SegmentedControl } from "@mantine/core";
import React from "react";

const ModeSwitcher = () => {
  return (
    <SegmentedControl
      radius="xl"
      data={[
        {
          value: "web",
          label: (
            <Center style={{ gap: 10 }}>
              <span className="apple-text">Web view</span>
            </Center>
          ),
        },
        {
          value: "ai",
          label: (
            <Center style={{ gap: 10 }}>
              <span>Intelligence</span>
            </Center>
          ),
        },
      ]}
    />
  );
};

export default ModeSwitcher;
