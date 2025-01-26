import React, { useState } from "react";

interface AppInputProps {
  label: string;
  type: "text" | "email" | "password" | "file"; // Updated to include 'file'
  value?: string; // Value not needed for file input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Optional error message for validation
  icon?: JSX.Element; // Optional custom icon
  toggleIcon?: JSX.Element;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  accept?: string;
  ref?: React.Ref<HTMLInputElement>; // Added ref type
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  icon,
  toggleIcon,
  name,
  disabled,
  required,
  accept,
  ref,
  ...other
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isError = !!error;

  // Determine the appropriate input type
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={`Enter ${label.toLowerCase()}`}
          onChange={onChange}
          name={name}
          disabled={disabled}
          required={required}
          accept={accept}
          value={value}
          className={`w-full rounded-lg border ${isError ? "border-red-500" : "border-stroke"} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
          {...other}
        />

        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
      {isError && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default AppInput;
