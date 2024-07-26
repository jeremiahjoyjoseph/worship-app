import React from "react";

interface CustomButtonProps {
  onClick: () => void;

  additionalClasses?: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  additionalClasses = "",
  children,
}) => {
  return (
    <button
      type="button"
      className={`h-[50px] text-white bg-blue-700 hover:bg-blue-800 font-medium text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full ${additionalClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
