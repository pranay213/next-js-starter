import { useState, useEffect } from "react";
import clsx from "clsx";

interface SnakbarProps {
  message?: string;
  onClose?: any;
}

export default function Snackbar({ message, onClose }: SnakbarProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div
      className={clsx(
        "fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg bg-green-500 p-4 text-white shadow-lg",
        !message && "hidden",
      )}
    >
      <div className="flex items-center">
        <svg
          className="mr-2 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2m0 0l4-4m-4 4l4-4m-4 4H5a1 1 0 110-2h7m4-4a1 1 0 112 0v1a1 1 0 11-2 0v-1z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}
