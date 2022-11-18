"use client";

import { useScrollDown, useTheme } from "lib/hooks";
import Link from "next/link";
import React, { useState } from "react";
import { HiMenu, HiSun, HiMoon, HiX } from "react-icons/hi";
import { FaGithub, FaFacebook, FaLinkedin, FaBlogger } from "react-icons/fa";

interface NavType {
  title: string;
  path: string;
  icon?: React.ReactNode;
  target?: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isScrolledtoDown = useScrollDown(50);
  return (
    <header
      className={` sticky top-0 z-50 max-w-full bg-white py-5 px-5 dark:bg-gray-900  ${
        isScrolledtoDown && "shadow shadow-gray-50 dark:shadow-green-500"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between">
        <div id="brand">
          <h1 className="ml-2 text-2xl font-bold text-green-600">
            Abdi Zamed Mohamed
          </h1>
        </div>
        <nav id="nav-links" className="flex items-center">
          {desktopNav()}
          <div className="ml-4 flex items-center">
            <button
              className="rounded-md  p-1 text-green-600 outline outline-offset-2 outline-green-700 dark:bg-transparent dark:text-green-500 dark:outline-green-500"
              aria-label="toggle dark mode"
              onClick={() => toggleTheme()}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "light" ? (
                <HiMoon className="h-6 w-6" aria-label="toggle dark mode" />
              ) : (
                <HiSun className="h-6 w-6" aria-label="toggle light mode" />
              )}
            </button>
          </div>
          <div className="ml-4 inline-flex items-center lg:hidden">
            <button
              className="rounded-md p-2 text-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 hover:bg-green-500 hover:text-green-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <HiMenu className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiX className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>
      {isOpen && mobileNav({ open: isOpen })}
    </header>
  );
}

const RenderNav = ({ title, path, icon, target }: NavType) => {
  return (
    <li
      className={`text-md font-xl px-4 py-2 ${" text-gray-900 hover:text-gray-800 dark:text-green-100 dark:hover:text-green-600"}
    `}
    >
      <Link href={path} target={target} className="flex items-center gap-1">
        <> {icon}</>
        <>{title}</>
      </Link>
    </li>
  );
};

const desktopNav = () => {
  return (
    <ul className="hidden lg:flex lg:items-center">
      {navigation.map((nav: NavType) => (
        <RenderNav key={nav.title} {...nav} />
      ))}
    </ul>
  );
};

const mobileNav = ({ open }: { open: boolean }) => {
  return (
    <div className="block lg:hidden">
      <div
        className={`absolute inset-x-0 z-50 my-7 mr-6 ml-2 rounded-lg bg-white shadow-2xl dark:bg-gray-800  ${
          open && "translate-y-0"
        } transform p-2 transition duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-start p-5">
          {navigation.map((nav: NavType) => (
            <RenderNav key={nav.title} {...nav} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const navigation: NavType[] = [
  {
    title: "Blogs",
    path: "/blogs",
    icon: <FaBlogger className="h-5 w-5 text-gray-700 dark:text-green-500" />,
  },
  {
    title: "Github",
    path: "https://github.com/abdi-aaqyaar",
    icon: <FaGithub className="h-5 w-5 text-gray-700 dark:text-green-500" />,
    target: "_blank",
  },
  {
    title: "Linkedin",
    path: "https://www.linkedin.com/in/abdi-zamed-mohamed-aaqyaar/",
    icon: <FaLinkedin className="h-5 w-5 text-gray-700 dark:text-green-500" />,
    target: "_blank",
  },
  {
    title: "Facebook",
    path: "https://facebook.com/abdi_aaqaar",
    icon: <FaFacebook className="h-5 w-5 text-gray-700 dark:text-green-500" />,
    target: "_blank",
  },
];
