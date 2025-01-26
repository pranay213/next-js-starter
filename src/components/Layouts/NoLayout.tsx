import React from "react";

interface ChildProps {
  children: React.ReactNode;
}

const NoLayout = ({ children }: ChildProps) => {
  return <div className="p-5 ">{children}</div>;
};

export default NoLayout;
