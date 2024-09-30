import React, { FC, useEffect, useState } from "react";
import { Location } from "../../interfaces/location";
import { getLocationsApi } from "../../services/location";
import Tabs from "../../components/organism/tabs";

interface ScheduleRosterProps {}

const ScheduleRoster: FC<ScheduleRosterProps> = ({}) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    getLocations();
  }, []);

  const TabConfig = [];

  const getLocations = () => {
    // Call the function and log the users
    getLocationsApi()
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="overflow-y-scroll pb-[100px] px-6 pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
      <div className="mt-6">
        <h2 className="text-4xl font-extrabold dark:text-white">
          Schedule Roster
        </h2>
      </div>
      {/* <Tabs tabs={TabConfig} /> */}
    </div>
  );
};

export default ScheduleRoster;
