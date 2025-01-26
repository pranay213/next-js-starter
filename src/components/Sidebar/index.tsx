"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LS_ACCOUNT } from "@/constants";
import { loadFromLocalStorage } from "@/redux/slices/authSlice";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface MenuItem {
  icon?: React.ReactNode;
  label: string;
  route: string;
  children?: MenuItem[];
}

interface MenuGroup {
  name: string;
  menuItems: MenuItem[];
}

interface Permission {
  id: string; // Assuming permission has an id
  name: string; // Name of the permission
}

interface Account {
  isAuthenticated: boolean;
  user?: {
    permissions: Permission[];
  };
}

const menuGroups: MenuGroup[] = [
  {
    name: "MENU",
    menuItems: [
      { icon: <></>, label: "Module", route: "/modules" },
      {
        icon: <></>,
        label: "Dashboard",
        route: "#",
        children: [
          {
            label: "eCommerce",
            route: "/",
            icon: <></>,
          },
        ],
      },
      {
        icon: <></>,
        label: "Company",
        route: "#",
        children: [
          {
            label: "Company",
            route: "/company",
            icon: <></>,
          },
        ],
      },
      { icon: <></>, label: "Role", route: "/roles" },
      { icon: <></>, label: "Calendar", route: "/calendar" },
      { icon: <></>, label: "Profile", route: "/profile" },
      {
        icon: <></>,
        label: "Forms",
        route: "#",
        children: [
          { label: "Form Elements", route: "/forms/form-elements" },
          { label: "Form Layout", route: "/forms/form-layout" },
        ],
      },
      { icon: <></>, label: "Tables", route: "/tables" },
      { icon: <></>, label: "Settings", route: "/settings" },
    ],
  },
  {
    name: "OTHERS",
    menuItems: [
      { icon: <></>, label: "Chart", route: "/chart" },
      {
        icon: <></>,
        label: "UI Elements",
        route: "#",
        children: [
          { label: "Alerts", route: "/ui/alerts" },
          { label: "Buttons", route: "/ui/buttons" },
        ],
      },
      {
        icon: <></>,
        label: "Authentication",
        route: "#",
        children: [
          { label: "Sign In", route: "/auth/signin" },
          { label: "Sign Up", route: "/auth/signup" },
        ],
      },
    ],
  },
];

const account: any = loadFromLocalStorage();
const userPermissions: Permission[] = account?.isAuthenticated
  ? account?.user?.permissions || []
  : [];

const filteredMenuGroups = menuGroups.map((group) => {
  const filteredMenuItems = group.menuItems
    .map((menuItem) => {
      if (menuItem.children) {
        const validChildren = menuItem.children.filter((child) =>
          userPermissions.some(
            (permission) =>
              permission.name.toLowerCase() === child.label.toLowerCase(),
          ),
        );

        return validChildren.length > 0
          ? { ...menuItem, children: validChildren }
          : null;
      }

      return userPermissions.some(
        (permission) =>
          permission.name.toLowerCase() === menuItem.label.toLowerCase(),
      )
        ? menuItem
        : null;
    })
    .filter(Boolean);

  return { ...group, menuItems: filteredMenuItems };
});

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={176}
              height={32}
              src={"/images/logo/logo.svg"}
              alt="Logo"
              priority
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {filteredMenuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
