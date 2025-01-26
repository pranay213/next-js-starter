import NoLayout from "@/components/Layouts/NoLayout";
import AuthGuard from "@/gaurd/auth-guard";
import React from "react";

interface ChildProps {
  children: React.ReactNode; // Adding this to type the children prop
}

const layout = ({ children }: ChildProps) => {
  return (
    <NoLayout>
      <AuthGuard>{children}</AuthGuard>
    </NoLayout>
  );
};

export default layout;
