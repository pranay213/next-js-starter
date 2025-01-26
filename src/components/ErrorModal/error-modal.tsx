import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearError } from "@/redux/slices/errorSlice";
import React from "react";

const ErrorModal = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.error.errorMessage);

  const handleClose = () => {
    dispatch(clearError());
  };

  if (!error) return null; // If there's no error, don't render anything

  return (
    <form onSubmit={handleClose}>
      <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-red-600">Error</h3>
          <p className="mt-4 text-gray-700">{error}</p>
          <button
            onClick={handleClose}
            className="mt-6 rounded-md bg-red-500 px-4 py-2 text-white shadow-md transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
};

export default ErrorModal;
