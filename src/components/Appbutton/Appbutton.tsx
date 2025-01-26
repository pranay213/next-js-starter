"use client";

import React, { useState, MouseEvent, CSSProperties } from "react";

interface AppbuttonProps {
  label: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  rippleColor?: string;
  animation?: boolean;
  additionalStyles?: CSSProperties;
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}

const Appbutton: React.FC<AppbuttonProps> = ({
  label,
  onClick,
  bgColor = "#69F67F",
  textColor = "#FFFFFF",
  rippleColor = "rgba(255, 255, 255, 0.5)",
  animation = true,
  additionalStyles = {},
  disabled = false,
  type,
}) => {
  const [rippleEffect, setRippleEffect] = useState<null | {
    x: number;
    y: number;
    size: number;
  }>(null);

  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (!animation) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(button.clientWidth, button.clientHeight);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    setRippleEffect({ x, y, size });

    setTimeout(() => setRippleEffect(null), 600);
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handleRipple}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: bgColor,
        color: textColor,
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "background-color 0.3s, transform 0.2s",
        ...additionalStyles,
      }}
      disabled={disabled}
      type={type || "button"}
    >
      {label}

      {rippleEffect && (
        <span
          style={{
            position: "absolute",
            top: rippleEffect.y,
            left: rippleEffect.x,
            width: rippleEffect.size,
            height: rippleEffect.size,
            backgroundColor: rippleColor,
            borderRadius: "50%",
            transform: "scale(0)",
            animation: "ripple-animation 0.6s linear",
          }}
        ></span>
      )}

      <style>
        {`
          @keyframes ripple-animation {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `}
      </style>
    </button>
  );
};

export default Appbutton;
