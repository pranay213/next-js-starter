import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HRM ADMIN PANEL",
  description: "HRM ADMIN PANEL",
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}
