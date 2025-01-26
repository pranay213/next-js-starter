import React from "react";
import { Metadata } from "next";
import NoLayout from "@/components/Layouts/NoLayout";
import "@/css/shining.css";
import Login from "@/views/auth/login/login";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

const SignIn: React.FC = () => {
  return <Login />;
};

export default SignIn;
