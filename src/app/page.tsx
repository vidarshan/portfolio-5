"use client";
import styles from "./page.module.css";
import { Geist } from "next/font/google";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { ThemeToggle } from "@/components/theme-toggle";
import AIInput from "@/components/AI/AIInput";
import {
  IoArrowDownCircleOutline,
  IoCloudDownload,
  IoDownload,
  IoDownloadOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
  IoMailOutline,
} from "react-icons/io5";
import { SiGmail } from "react-icons/si";
import { PiLetterCircleVBold } from "react-icons/pi";
import { TbHexagonLetterV, TbHexagonLetterVFilled } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Mail, Sun, Moon, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import LeftSideBar from "@/components/custom/LeftSideBar";
import RightSideBar from "@/components/custom/RightSideBar";
import ChatMenu from "@/components/custom/ChatMenu";

const geist = Geist({
  subsets: ["latin"],
});

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 lg:top-6 lg:right-6 z-50 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur px-3 py-2 shadow hover:scale-105 transition"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function Home() {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <main
      className={`${geist.className} min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-200 transition-colors`}
    >
      {/* background glow moved to inline style to avoid regex parsing issues */}
      <div
        className="pointer-events-none fixed inset-0"
        style={
          theme === "dark"
            ? {
                background:
                  "radial-gradient(700px circle at 70% 20%, rgba(34,211,238,0.14), transparent 45%), radial-gradient(500px circle at 20% 80%, rgba(168,85,247,0.12), transparent 45%)",
              }
            : undefined
        }
      />

      <ThemeToggle theme={theme} setTheme={setTheme} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <LeftSideBar />
          <RightSideBar />
        </div>
      </div>

      <ChatMenu />
    </main>
  );
}
