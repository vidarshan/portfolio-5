import React from "react";
import Experience from "./Experience";
import About from "./About";
import Projects from "./Projects";

const RightSideBar = () => {
  return (
    <section className="lg:col-span-8">
      <div className="py-20 lg:py-28 lg:pr-6 space-y-32 lg:space-y-40">
        <About />
        <Experience
          date="2024 — PRESENT"
          title="Senior Frontend Engineer · Accessibility"
          tech={["TypeScript", "React", "Design Systems"]}
        />
        <Experience
          date="2021 — 2024"
          title="Frontend Engineer · Product"
          tech={["Next.js", "Performance", "UX"]}
        />
        <Projects />
      </div>
    </section>
  );
};

export default RightSideBar;
