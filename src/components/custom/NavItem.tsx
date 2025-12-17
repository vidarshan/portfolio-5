import React from "react";

const NavItem = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
      <span className="text-sm tracking-wide text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition">
        {label}
      </span>
    </div>
  );
};

export default NavItem;
