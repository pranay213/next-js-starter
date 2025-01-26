"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated,
  );
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect to a private route if authenticated
    }
  }, [isAuthenticated, router]);

  // Only render children if not authenticated
  if (isAuthenticated) return null; // Prevent rendering if redirecting

  return <>{children}</>;
};

export default AuthGuard;
