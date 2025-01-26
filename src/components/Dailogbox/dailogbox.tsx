import React, { ReactNode } from "react";

// Props interface for Dialog
interface DialogProps {
  isOpen: boolean; // Controls if Dialog is open or closed
  onClose: () => void; // Close handler
  title?: string; // Optional title for the Dialog
  children: ReactNode; // Dialog content
  overlayBackground?: string; // Background color of the overlay
  additionalStyles?: React.CSSProperties; // Additional custom styles
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  overlayBackground = "rgba(0, 0, 0, 0.5)", // Default overlay background
  additionalStyles = {},
}) => {
  if (!isOpen) return null; // Return null if Dialog is closed

  return (
    <div
      className="fixed inset-0 left-50 z-[1000] flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-lg"
      style={{ backgroundColor: overlayBackground, ...additionalStyles }}
    >
      <div
        className="relative w-full max-w-3xl scale-100 transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ease-in-out md:scale-95 lg:max-w-4xl xl:max-w-5xl"
        style={{
          animation: isOpen
            ? "slideInDown 0.3s forwards"
            : "slideOutUp 0.3s forwards",
          maxHeight: "calc(100vh - 2rem)", // Set a max height based on viewport height
          overflowY: "auto", // Enables scroll if content exceeds max height
          zIndex: 9999, // Ensure modal is at the top
        }}
      >
        {title && (
          <div className="mb-4 border-b pb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-600 hover:text-gray-900"
        >
          &times; {/* Close icon */}
        </button>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
