import Head from "next/head";
import "@mantine/core/styles.css";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ActionIcon,
  Affix,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  List,
  MantineProvider,
  Modal,
  Popover,
  SegmentedControl,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Transition,
} from "@mantine/core";
import {
  RiAddLargeLine,
  RiSubtractFill,
  RiArrowUpLine,
  RiArrowDownLine,
  RiStackedView,
  RiAddLargeFill,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certification from "../components/Certification";
import Project from "../components/Project";
import Socials from "../components/Socials";
import ModeSwitcher from "../components/ModeSwitcher";
import { AnimatePresence, motion } from "framer-motion";
import QuickQuestion from "../components/QuickQuestion";
import Navigator from "../components/Navigator";
import { ColorSchemeScript } from "@mantine/core";

import experience from "@/data/work";
import education from "@/data/education";
import certifications from "@/data/certifications";
import projects from "@/data/projects";
import questions from "@/data/questions";
import styles from "@/styles/Home.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import {
  useDisclosure,
  useViewportSize,
  useWindowScroll,
} from "@mantine/hooks";
import IntelligenceMenu from "../components/IntelligenceMenu";
import OrbBackground from "../components/OrbBackground";
import { FaCircleArrowUp, FaX } from "react-icons/fa6";
import { SiOpenai } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import Stats from "../components/Stats";
import CustomBadge from "@/components/CustomBadge";
import { technicalCompetencies, technologies, frameworks } from "@/data/about";
import Expand from "@/components/Expand";
import { ReduxProvider } from "@/store/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const theme = {
    colors: {
      dark: [
        "#e8e8e8", // 0
        "#f7f7f7", // 1
        "#ffffff", // 2
        "#aaaaaa", // 3
        "#323232", // 4
        "#2e2e2e", // 5
        "#000000", // 6
        "#000000", // 7
        "#161616", // 8
        "#d80073", // 9
        "#b4005a", // 10 - extra to ensure minimum required length
        "#a0004e", // 11
        "#8c0042", // 12
        "#780036", // 13
        "#64002a", // 14
      ],
    },
    defaultRadius: "lg",
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    lineHeights: {
      md: "1.8rem",
    },
  };

  const [colorScheme, setColorScheme] = useState<"light" | "dark" | "auto">(
    "light"
  );
  const sections = ["about", "experience", "projects"];
  const [activeSection, setActiveSection] = useState("about");
  const [opened, { open, close }] = useDisclosure(true);
  const [educationOpened, setEducationOpened] = useState(false);
  const [certificationsOpened, setCertificationsOpened] = useState(false);
  const [stackOpened, setStackOpened] = useState(true);
  const [showMoreStackOpened, setShowMoreStackOpened] = useState(false);
  const { height, width } = useViewportSize();

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [chatOpened, setChatOpened] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mantine-color-scheme");
    if (saved === "dark" || saved === "light") setColorScheme(saved);
    else setColorScheme("auto");
  }, []);

  const toggleScheme = () => {
    const next = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(next);
    localStorage.setItem("mantine-color-scheme", next);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it! You said: " + input },
      ]);
    }, 1000);

    setInput("");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, setActiveSection]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReduxProvider>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Container size={1200}>
            <Grid mt="xl">
              {/* Left Sidebar */}
              <Grid.Col
                component="header"
                span={{ xs: 12, sm: 4, md: 5, lg: 5, xl: 5 }}
                top={0}
                pos={width > 767 ? "sticky" : "unset"}
                h={width > 767 ? "100vh" : "40vh"}
              >
                <Flex justify="space-between" h="100%" direction="column">
                  <Box>
                    {/* <SegmentedControl  className="glassmorphism-container" data={["retro", "modern"]} /> */}
                    {/* <Text>{scroll.y}</Text> */}
                    <Text
                      className="ai-text"
                      c="#74c0fc"
                      size="2.4rem"
                      fw={400}
                    >
                      Vidarshan
                    </Text>
                    <Title mt="sm" c="gray" size="1.2rem" fw={400}>
                      Software Engineer — Web, Mobile, AI & Cloud
                    </Title>
                    <Socials />
                    {width > 767 ? (
                      <Flex direction="column">
                        <Box mt="4rem" component="nav">
                          <Box
                            py="xs"
                            w="70%"
                            component="a"
                            href="#about"
                            style={{ textDecoration: "none", display: "block" }}
                          >
                            About
                          </Box>
                          <Box
                            py="xs"
                            w="70%"
                            component="a"
                            href="#experience"
                            style={{ textDecoration: "none", display: "block" }}
                          >
                            Experience
                          </Box>
                          <Box
                            py="xs"
                            w="70%"
                            mb="xs"
                            component="a"
                            href="#projects"
                            style={{ textDecoration: "none", display: "block" }}
                          >
                            Projects
                          </Box>
                        </Box>
                      </Flex>
                    ) : (
                      <></>
                    )}
                  </Box>
                  <Stats width={width} />
                </Flex>
              </Grid.Col>

              {/* Right Main Content */}
              <Grid.Col
                span={{ xs: 12, sm: 8, md: 7, lg: 7, xl: 7 }}
                component="main"
              >
                <Box>
                  {/* About Section */}
                  <Box id="about" component="section">
                    <Text size="sm" style={{ lineHeight: "2rem" }}>
                      I design and build digital products that make work
                      simpler, smarter, and more enjoyable. With nearly four
                      years of software engineering experience, I create
                      solutions that elevate user experiences and drive real
                      results.
                    </Text>
                    <Text style={{ lineHeight: "2rem" }} size="sm" mt="lg">
                      Curious by nature and driven by impact, I explore emerging
                      tech in AI and cloud infrastructure to push products
                      beyond the expected outcomes through smarter automation,
                      personalization, or rock-solid scalability.
                    </Text>
                    <Group
                      mt="lg"
                      mb="xs"
                      justify="space-between"
                      onClick={() => setStackOpened(!stackOpened)}
                      style={{ cursor: "pointer" }}
                    >
                      <Text size="sm" c="gray" fw={500}>
                        Tech Stack
                      </Text>
                      <Expand
                        opened={stackOpened}
                        setOpened={() => {
                          setStackOpened(!stackOpened);
                          setShowMoreStackOpened(!stackOpened);
                        }}
                      />
                    </Group>
                    <AnimatePresence>
                      {stackOpened && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: "hidden" }}
                          transition={{ duration: 0.3 }}
                        >
                          <Group gap="md">
                            {technicalCompetencies.map((comp, index) => {
                              return (
                                <CustomBadge
                                  key={comp.name}
                                  title={comp.name}
                                  order={index}
                                />
                              );
                            })}
                            <ActionIcon
                              className="glassmorphism-container"
                              style={{
                                display: "inline-block",
                                cursor: "pointer",
                                transition: "transform .4s ease",
                                transform: showMoreStackOpened
                                  ? "rotate(180deg)"
                                  : "rotate(360deg)",
                              }}
                              onClick={() => {
                                setShowMoreStackOpened(!showMoreStackOpened);
                              }}
                            >
                              {showMoreStackOpened ? (
                                <RiSubtractFill />
                              ) : (
                                <RiAddLargeFill />
                              )}
                            </ActionIcon>
                          </Group>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {showMoreStackOpened && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: "hidden" }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box mt="xs">
                            <Divider
                              my="xs"
                              labelPosition="left"
                              label="Technologies"
                            />
                            <Group gap="md">
                              {technologies.map((comp, index) => {
                                return (
                                  <CustomBadge
                                    key={comp.name}
                                    title={comp.name}
                                    order={index}
                                  />
                                );
                              })}
                            </Group>
                            <Divider
                              my="xs"
                              labelPosition="left"
                              label="Frameworks"
                            />
                            <Group gap="md">
                              {frameworks.map((comp, index) => {
                                return (
                                  <CustomBadge
                                    key={comp.name}
                                    title={comp.name}
                                    order={index}
                                  />
                                );
                              })}
                            </Group>
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Group
                      mt="lg"
                      mb="xs"
                      justify="space-between"
                      align="center"
                      onClick={() =>
                        setCertificationsOpened(!certificationsOpened)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Text size="sm" c="gray" fw={500}>
                        Certifications
                      </Text>
                      <Expand
                        opened={certificationsOpened}
                        setOpened={setCertificationsOpened}
                      />
                    </Group>
                    <AnimatePresence>
                      {certificationsOpened && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: "hidden" }}
                          transition={{ duration: 0.3 }}
                        >
                          <Grid>
                            {certifications.map((cert, index) => (
                              <Certification
                                key={cert.title}
                                order={index}
                                {...cert}
                              />
                            ))}
                          </Grid>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Group
                      mt="lg"
                      mb="xs"
                      justify="space-between"
                      align="center"
                      onClick={() => setEducationOpened(!educationOpened)}
                      style={{ cursor: "pointer" }}
                    >
                      <Text size="sm" c="gray" fw={500}>
                        Academia
                      </Text>
                      <Expand
                        opened={educationOpened}
                        setOpened={setEducationOpened}
                      />
                    </Group>
                    <AnimatePresence>
                      {educationOpened && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: "hidden" }}
                          transition={{ duration: 0.3 }}
                        >
                          <Grid>
                            {education.map((edu, index) => (
                              <Education
                                key={index}
                                title={edu.title}
                                description={edu.description}
                              />
                            ))}
                          </Grid>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>

                  {/* Experience Section */}
                  <Box id="experience" component="section">
                    {experience.map(({ company, jobs, link }) => (
                      <Experience
                        key={company}
                        jobs={jobs}
                        company={company}
                        link={link}
                      />
                    ))}
                  </Box>
                  <Text>Projects</Text>
                  {/* Projects Section */}
                  <Box id="projects" component="section">
                    {projects.map((project) => (
                      <Project key={project.name} {...project} />
                    ))}
                  </Box>
                </Box>
              </Grid.Col>
            </Grid>
          </Container>

          <Affix
            position={{ bottom: 20, left: "50%" }}
            style={{
              transform: "translateX(-50%)",
            }}
          >
            <IntelligenceMenu />
          </Affix>
        </MantineProvider>
      </ReduxProvider>
    </>
  );
}
