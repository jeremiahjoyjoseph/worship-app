import React from "react";

interface TextAreaProps {
  rows?: number;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  rows = 4,
  className = "",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <textarea
      rows={rows}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
};

export default TextArea;
