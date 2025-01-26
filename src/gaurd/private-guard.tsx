"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface PrivateGuardProps {
  children: ReactNode;
}

const PrivateGuard = ({ children }: PrivateGuardProps) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated,
  );
  console.log("isAuthenticated", isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Prevent rendering if redirecting

  return <>{children}</>;
};

export default PrivateGuard;
