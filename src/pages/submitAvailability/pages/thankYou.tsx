import { FC } from "react";
import ThankYouBlock from "../../../components/organism/ThankYouBlock";

interface ThankYouProps {}

const ThankYou: FC<ThankYouProps> = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <ThankYouBlock
        title={"Thank you for serving!"}
        subtitle="Dates have been noted"
        quote="Come, let us sing for joy to the Lord; let us shout aloud to the Rock of our salvation."
        subQuote="Psalm 95:1"
      />
    </div>
  );
};

export default ThankYou;
