import { type FC } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: FC = function () {
  const navigate = useNavigate();
  return (
    <div className="px-4 pt-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
        Dashboard
      </h1>
      <div className="flex flex-col gap-2">
        <button onClick={() => navigate("/roster/create")}>
          Create Roster
        </button>
        <button onClick={() => navigate("/roster/all")}>
          Show All Rosters
        </button>
        <button>Submit Availability</button>
      </div>
    </div>
  );
};

export default DashboardPage;
