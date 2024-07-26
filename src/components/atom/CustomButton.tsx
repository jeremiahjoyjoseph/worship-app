import React from "react";

interface CustomButtonProps {
  onClick: () => void;

  style?: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  style = "",
  children,
}) => {
  return (
    <button type="button" className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
