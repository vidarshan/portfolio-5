import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Flex,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import React, { useState, useRef, useEffect } from "react";
import { FaCircleArrowLeft, FaCircleArrowUp } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { SiOpenai } from "react-icons/si";
import { motion } from "framer-motion";

const IntelligenceMenu = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey there! I’m here to help you learn about Vidarshan’s work. Ask me anything about his projects, experience, or skills.",
      time: "06:27pm",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input, time: "11:45pm" },
    ];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it! You said: " + input, time: "05:45pm" },
      ]);
    }, 1000);

    setInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="notification-card" withBorder>
      <Paper
        h="5rem"
        radius="md"
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 10,
          padding: "1rem",
          backgroundColor: "rgba(255, 255, 255, 0.001)", // semi-transparent
          backdropFilter: "blur(12px)", // the blur effect
          WebkitBackdropFilter: "blur(12px)", // Safari
        }}
      >
        <Flex align="center" justify="space-between" gap="0.5rem">
          <Box>
            <Text className="ai-text" fw={500} size="lg">
              AI Overview
            </Text>
            <Text size="xs">5/20 questions remaining</Text>
          </Box>
        </Flex>
      </Paper>

      {/* Scrollable messages */}
      <Box
        ref={scrollRef}
        py="7.5rem"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          // custom thin scrollbar
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(255,255,255,0.5)",
          },
          // Firefox
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.3) transparent",
        }}
      >
        {messages.map((msg, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Box>
              <Flex
                direction="row"
                align="center"
                justify={msg.sender === "user" ? "flex-end" : "flex-start"}
              >
                <Box
                  style={{
                    maxWidth: "60%",
                    padding: "0.4rem 0.8rem",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    borderRadius: 20,
                    backgroundColor:
                      msg.sender === "user" ? "#3f9fff" : "#e0e0e0",
                    color: msg.sender === "user" ? "white" : "black",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: msg.sender === "user" ? 20 : 0,
                    borderBottomTopRadius: msg.sender === "user" ? 20 : 0,
                    borderBottomRightRadius: msg.sender === "bot" ? 20 : 0,
                  }}
                >
                  <Text size="sm">{msg.text}</Text>
                </Box>
              </Flex>
              <Text
                mt="xs"
                c="gray"
                ta={msg.sender === "user" ? "right" : "left"}
                size="0.8rem"
              >
                {msg.time}
              </Text>
            </Box>
          </motion.span>
        ))}
      </Box>

      {/* Input at bottom */}
      {/* <Box
        style={{
          position: "absolute",
          flexShrink: 0,
          width: "100%",
          bottom: 0,
          padding: "0.5rem 1rem",
          backgroundColor: "rgba(255, 255, 255, 0.089)", // semi-transparent
          backdropFilter: "blur(12px)", // the blur effect
          WebkitBackdropFilter: "blur(12px)", // Safari
        }}
      >
        <Text ta="right" size="xs">
          GPT 3.5 turbo
        </Text>
        <TextInput
          radius="xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything about me"
          size="sm"
          leftSection={
            <ThemeIcon color="gray" variant="transparent">
              <SiOpenai />
            </ThemeIcon>
          }
          rightSection={
            <ActionIcon
              onClick={handleSend}
              color="white"
              variant="transparent"
            >
              <FaCircleArrowUp size={20} />
            </ActionIcon>
          }
        />
      </Box> */}
    </Card>
  );
};

export default IntelligenceMenu;
