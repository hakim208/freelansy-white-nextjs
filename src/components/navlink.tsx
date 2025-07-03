"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinkProps {
  href: string;
  children: ReactNode;
}

const Navlink: React.FC<NavlinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`pb-1 border-b-2 ${
        isActive ? "border-purple-400 text-[#7c3aed]" : "border-transparent text-gray-700"
      } hover:border-blue-400 hover:text-blue-500 transition-colors`}
    >
      {children}
    </Link>
  );
};

export default Navlink;
