import React from "react";
import CustomButton from "../atom/CustomButton";

interface SecondaryButtonProps {
  onClick: () => void;
  additionalClasses?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  additionalClasses = "",
  children,
  fullWidth = true,
}) => {
  return (
    <CustomButton
      style={`flex gap-2 items-center justify-center h-[50px] font-medium text-md px-5 py-2.5 focus:outline-none text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
        fullWidth ? "w-full" : "rounded-lg w-auto"
      } ${additionalClasses}`}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

export default SecondaryButton;
