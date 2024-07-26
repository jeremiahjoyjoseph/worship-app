import { FC, useEffect } from "react";
import { getAllRosters } from "../../services/roster";

interface AllRostersProps {}

const AllRosters: FC<AllRostersProps> = () => {
  useEffect(() => {
    getRostersOnLoad();
  }, []);

  const getRostersOnLoad = () => {
    getAllRosters()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
      <div className="mt-6">
        <h2 className="text-4xl font-extrabold dark:text-white">All Rosters</h2>
      </div>
    </div>
  );
};

export default AllRosters;
