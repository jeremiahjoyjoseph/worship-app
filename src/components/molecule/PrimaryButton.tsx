import React from "react";
import CustomButton from "../atom/CustomButton";

interface PrimaryButtonProps {
  onClick: () => void;
  additionalClasses?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  additionalClasses = "",
  children,
  fullWidth = true,
  rounded = false,
}) => {
  return (
    <CustomButton
      style={`flex gap-2 items-center justify-center h-[50px] text-white bg-blue-700 hover:bg-blue-800 font-medium text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
        fullWidth ? "w-full" : "rounded-lg w-auto"
      } ${rounded ? "rounded-lg" : ""} ${additionalClasses}`}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

export default PrimaryButton;
