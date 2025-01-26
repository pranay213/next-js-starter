import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface IconifyProps {
  icon?: string;
  color?: string;
  size?: number;
}

const Iconify = ({ icon, color, size }: IconifyProps) => {
  return <Icon icon={`${icon}`} fontSize={size ? size : 25} color={color} />;
};

export default Iconify;
