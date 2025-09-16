import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import React, { useState, useRef, useEffect } from "react";
import { FaCircleArrowLeft, FaCircleArrowUp } from "react-icons/fa6";
import { IoClose, IoSparkles } from "react-icons/io5";
import { SiOpenai } from "react-icons/si";
import { motion } from "framer-motion";
import { AiOutlineOpenAI } from "react-icons/ai";

const IntelligenceMenu = () => {
  const [open, setOpen] = useState(false);
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
    <>
      {open && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Card
            mah="70vh"
            mb="xs"
            style={{
              width: 350,
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
              color: "#fff",
            }}
          >
            <Group mb="xs" justify="space-between">
              <Box>
                <Text className="ai-text" fw={500} size="lg">
                  AI Overview
                </Text>
                <Text size="xs">5/20 questions remaining · gpt 5o mini</Text>
              </Box>
              <ActionIcon
                color="white"
                variant="transparent"
                size="md"
                onClick={() => setOpen(false)}
              >
                <IoClose />
              </ActionIcon>
            </Group>
            <Box
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: "auto",

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
                      justify={
                        msg.sender === "user" ? "flex-end" : "flex-start"
                      }
                    >
                      <Box
                        style={{
                          maxWidth: "60%",
                          padding: "0.4rem 0.8rem",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          borderRadius: 20,
                          backgroundColor:
                            msg.sender === "user" ? "#3f9fff" : "#4e4e4e",
                          color: msg.sender === "user" ? "white" : "white",
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: msg.sender === "user" ? 20 : 0,
                          borderBottomTopRadius: msg.sender === "user" ? 20 : 0,
                          borderBottomRightRadius:
                            msg.sender === "bot" ? 20 : 0,
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
          </Card>
        </motion.div>
      )}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <TextInput
          radius="xl"
          // onClick={() => setChatOpened((o) => !o)}
          size="md"
          value={input}
          onFocus={() => setOpen(true)}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
            color: "#fff",
            borderRadius: 30,
          }}
          id="transparent-input"
          placeholder="Ask ChatGPT"
          leftSection={<AiOutlineOpenAI />}
          rightSection={<FaCircleArrowUp color="lime" />}
          bg="transparent"
        />
      </motion.div>
    </>
  );
};

export default IntelligenceMenu;
