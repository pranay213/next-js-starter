export const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: null,
        label: "Modules",
        route: "/modules",
      },
      {
        icon: null,
        label: "Dashboard",
        route: "#",
        children: [{ label: "eCommerce", route: "/" }],
      },
      {
        icon: null,
        label: "Company",
        route: "#",
        children: [{ label: "Company List", route: "/company" }],
      },
      {
        icon: null,
        label: "Roles",
        route: "/roles",
      },

      {
        icon: null,
        label: "Calendar",
        route: "/calendar",
      },
      {
        icon: null,
        label: "Profile",
        route: "/profile",
      },
      {
        icon: null,
        label: "Forms",
        route: "#",
        children: [
          { label: "Form Elements", route: "/forms/form-elements" },
          { label: "Form Layout", route: "/forms/form-layout" },
        ],
      },
      {
        icon: null,
        label: "Tables",
        route: "/tables",
      },
      {
        icon: null,
        label: "Settings",
        route: "/settings",
      },
    ],
  },
  {
    name: "OTHERS",
    menuItems: [
      {
        icon: null,
        label: "Chart",
        route: "/chart",
      },
      {
        icon: null,
        label: "UI Elements",
        route: "#",
        children: [
          { label: "Alerts", route: "/ui/alerts" },
          { label: "Buttons", route: "/ui/buttons" },
        ],
      },
      {
        icon: null,
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
