import { ActionIcon } from "@mantine/core";
import React from "react";
import { RiAddLargeFill } from "react-icons/ri";

interface ExpandProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const Expand: React.FC<ExpandProps> = ({ opened, setOpened }) => {
  return (
    <ActionIcon
      className="glassmorphism-container"
      onClick={() => setOpened(!opened)}
      style={{
        display: "inline-block",
        cursor: "pointer",
        transition: "transform .4s ease",
        transform: opened ? "rotate(45deg)" : "rotate(360deg)",
      }}
    >
      <RiAddLargeFill />
    </ActionIcon>
  );
};

export default Expand;
