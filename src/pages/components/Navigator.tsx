import { Box, Button } from "@mantine/core";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";

const Navigator = () => {
  return <Button variant="light" size="xs" radius='xl' leftSection={<RiArrowLeftLine />}>Back to Webview</Button>;
};

export default Navigator;
