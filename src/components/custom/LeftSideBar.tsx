import React from "react";
import NavItem from "./NavItem";
import {
  IoArrowDownCircleOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
} from "react-icons/io5";

const LeftSideBar = () => {
  return (
    <aside className="lg:col-span-4">
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center gap-16 py-16 lg:py-20">
        <div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-none">
            Vidarshan
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xs">
            Full stack engineer focused on clarity, performance, and accessible
            systems.
          </p>
        </div>

        <nav className="hidden lg:block space-y-6">
          <NavItem label="ABOUT" />
          <NavItem label="EXPERIENCE" />
          <NavItem label="PROJECTS" />
        </nav>

        <div className="flex flex-row items-center gap-4 text-neutral-500">
          <IoLogoGithub className="h-5 w-5 hover:text-neutral-900 dark:hover:text-neutral-200 transition" />
          <IoLogoLinkedin className="h-5 w-5 hover:text-neutral-900 dark:hover:text-neutral-200 transition" />
          <IoArrowDownCircleOutline className="h-5 w-5 hover:text-neutral-900 dark:hover:text-neutral-200 transition" />
          <IoMailOutline className="h-5 w-5 hover:text-neutral-900 dark:hover:text-neutral-200 transition" />
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
