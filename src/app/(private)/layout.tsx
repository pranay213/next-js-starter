import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PrivateGuard from "@/gaurd/private-guard";
import React from "react";
import "@/css/style.css";

interface ChildProps {
  children: React.ReactNode; // Adding this to type the children prop
}

const layout = ({ children }: ChildProps) => {
  return (
    <DefaultLayout>
      <PrivateGuard>{children}</PrivateGuard>
    </DefaultLayout>
  );
};

export default layout;
