import { FC, useEffect, useState } from "react";
import { getAllRosters } from "../../services/roster";
import { Roster } from "../../interfaces/roster";
import { Link } from "react-router-dom";

interface AllRostersProps {}

const AllRosters: FC<AllRostersProps> = () => {
  const [rosters, setRosters] = useState<Roster[]>([]);
  useEffect(() => {
    getRostersOnLoad();
  }, []);

  const getRostersOnLoad = () => {
    getAllRosters()
      .then((response) => {
        console.log(response);
        setRosters(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
      <div className="mt-6">
        <h2 className="text-4xl font-extrabold dark:text-white">All Rosters</h2>
        <div className="mt-8">
          {rosters.map((roster) => (
            <Link to={`/submit/availability/${roster._id}`}>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap flex flex-col items-left gap-6 ps-4 border border-gray-200 rounded dark:border-gray-700 p-4 ">
                <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {roster.rosterUrl}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRosters;
