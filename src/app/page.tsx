import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import AIInput from "@/components/AI/AIInput";
import {
  IoDownload,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
} from "react-icons/io5";
import { SiGmail } from "react-icons/si";
import { PiLetterCircleVBold } from "react-icons/pi";
import { TbHexagonLetterV, TbHexagonLetterVFilled } from "react-icons/tb";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="relative mx-auto w-full max-w-[1024px] px-4">
        <nav
          className="
            fixed z-50 top-4 left-1/2 -translate-x-1/2
            w-full max-w-[1024px]
            bg-white/20 backdrop-blur-xs border border-white/30
            flex items-center justify-between px-4 py-2
            rounded-xl shadow-lg
          "
          aria-label="Main Navigation"
        >
          <Link href="/" className="text-lg font-200">
            Vidarshan
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="default" className="px-4 py-2 rounded-lg">
              About
            </Button>
            <Button className="px-4 py-2 rounded-lg">Work</Button>
            <Button className="px-4 py-2 rounded-lg">Projects</Button>
            <ThemeToggle />
          </div>
        </nav>
        <main className="pt-24 pb-24">
          <div className="grid gap-8 md:grid-cols-[0.8fr_2fr]">
            <section className="flex flex-col  min-h-[80vh] md:sticky md:top-24 self-start">
              <div>
                <h1 className="text-4xl">Vidarshan</h1>
                <p className="text-lg text-muted-foreground mt-3">
                  Software Engineer. Developer. Creator.
                </p>
              </div>
              <div className="flex flex-row content-center mt-3">
                <IoLogoGithub size={"1.6rem"} className="mr-4" />
                <IoLogoLinkedin size={"1.6em"} className="mr-4" />
                <SiGmail size={"1.6rem"} className="mr-4" />
              </div>
              <Button className="mt-6" variant="outline">
                Download Resume
              </Button>

              {/* put your intro / profile / summary here */}
            </section>

            {/* COLUMN 2 – scrollable content */}
            <section className="space-y-6">
              <h2 className="text-4xl">About</h2>
              {Array.from({ length: 80 }).map((_, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda nobis provident quisquam expedita, nam officia
                  nesciunt praesentium aperiam dolorem labore dolor vel ducimus
                  incidunt iure doloribus veniam consequatur. Iste, consectetur.{" "}
                  {i + 1}
                </p>
              ))}
            </section>
          </div>
        </main>
        <div
          className="
    fixed bottom-4 left-4 z-40
    rounded-xl
    bg-white/40 dark:bg-white/10
    backdrop-blur-xl
    border border-black/10 dark:border-white/20
    shadow-xl
    p-2
    flex items-center justify-center
  "
        >
          <IoLogoGithub size="1.6rem" />
        </div>
        {/* AI INPUT – also centered to the same 1024px */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[1024px]">
          <AIInput />
        </div>
      </div>
    </div>
  );
}
