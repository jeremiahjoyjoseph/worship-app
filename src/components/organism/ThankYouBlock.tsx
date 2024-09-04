import { FC } from "react";

interface ThankYouBlockProps {
  title?: string;
  subtitle?: string;
  quote?: string;
  subQuote?: string;
  footerText?: string;
}

const ThankYouBlock: FC<ThankYouBlockProps> = ({
  title,
  subtitle,
  quote,
  subQuote,
  footerText,
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      <p className="text-gray-700 text-center mb-6">{subtitle}</p>
      <blockquote className="italic text-gray-600 text-center text-sm">
        {quote}
        <br />
        <span className="font-bold">{subQuote}</span>
      </blockquote>
      <p className="text-gray-600 text-center text-sm mt-4">{footerText}</p>
    </div>
  );
};

export default ThankYouBlock;
