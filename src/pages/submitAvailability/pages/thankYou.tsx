import { FC } from "react";

interface ThankYouProps {}

const ThankYou: FC<ThankYouProps> = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Thank you</h1>
        <p className="text-gray-700 text-center mb-6">Dates have been noted</p>
        <blockquote className="italic text-gray-600 text-center text-sm">
          “Come, let us sing for joy to the Lord; let us shout aloud to the Rock
          of our salvation.”
          <br />
          <span className="font-bold">Psalm 95:1</span>
        </blockquote>
      </div>
    </div>
  );
};

export default ThankYou;
