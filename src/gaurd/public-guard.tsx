"use client";

import { useAppSelector } from "@/redux/hooks";
import React, { ReactNode } from "react";

interface PublicGuardProps {
  children: ReactNode;
}

const PublicGuard = ({ children }: PublicGuardProps) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated,
  );

  return <>{children}</>;
};

export default PublicGuard;
