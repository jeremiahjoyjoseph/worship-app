import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRoster,
  submitAvailabilityApi,
} from "../../../services/submitAvailability";
import { RequiredDate } from "../../../interfaces/roster";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";

interface SelectDatesProps {}

const SelectDates: FC<SelectDatesProps> = () => {
  const navigate = useNavigate();
  const params = useParams<{ rosterId: string; userId: string }>();
  const [dates, setDates] = useState<RequiredDate[]>([]);
  const [selectedDates, setSelectedDates] = useState<RequiredDate[]>([]);

  useEffect(() => {
    getDates();
  }, []);

  const getDates = () => {
    // Call the function and log the users
    const id = params.rosterId || "";
    getRoster({ id })
      .then((response) => {
        setDates(response.data.requiredDates);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCheckboxClick = (date: RequiredDate) => {
    if (selectedDates.find((item) => item._id === date._id)) {
      const newDates = selectedDates.filter((item) => item._id !== date._id);
      setSelectedDates(newDates);
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSubmit = () => {
    const apiParams = {
      rosterId: params.rosterId || "",
      userId: params.userId || "",
    };

    submitAvailabilityApi(apiParams, selectedDates)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10 max-w-[768] mx-auto">
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
            <li
              onClick={() =>
                navigate(`/submit-availability/${params.rosterId}`)
              }
            >
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
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Name
                </a>
              </div>
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
                  Dates
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {dates &&
          dates.map((date) => (
            <div
              className="flex items-center gap-6 ps-4 border border-gray-200 rounded dark:border-gray-700 p-4"
              key={date._id}
              onClick={() => handleCheckboxClick(date)}
            >
              <input
                // defaultChecked={false}
                checked={
                  selectedDates.find((item) => item._id === date._id)
                    ? true
                    : false
                }
                id="bordered-checkbox-2"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                onChange={() => handleCheckboxClick(date)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div>
                <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {capitalizeFirstLetter(date.eventName)}
                </h5>
                {date.sermonTopic && (
                  <p className="text-sm text-gray-700 dark:text-gray-400 ">
                    {capitalizeFirstLetter(date.sermonTopic)}
                  </p>
                )}
                <p className="w-full mt-2 text-1xl font-medium text-gray-900 dark:text-gray-300">
                  {date.eventDate}
                </p>
              </div>
            </div>
          ))}
      </div>
      <button
        type="button"
        onClick={() => handleSubmit()}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 fixed bottom-0 left-0 w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default SelectDates;
