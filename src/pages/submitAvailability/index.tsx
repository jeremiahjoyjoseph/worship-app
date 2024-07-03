import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../interfaces/user";
import { getAllUsers } from "../../services/submitAvailability";
import Search from "./components/search";

const SubmitAvailability: FC = function () {
  const [allMembers, setAllMembers] = useState<User[]>();
  const { rosterId } = useParams();

  useEffect(() => {
    getAllUsersOnLoad();
  }, []);

  const getAllUsersOnLoad = () => {
    // Call the function and log the users
    getAllUsers()
      .then((response) => {
        setAllMembers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
      <div className="mt-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center" aria-current="page">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  className="mr-1"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="m9 11l3 3l8-8" />
                    <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
                  </g>
                </svg>
                Availability
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Name
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div>
          {allMembers && (
            <Search
              options={allMembers}
              placeholder="Enter name"
              rosterId={rosterId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitAvailability;
