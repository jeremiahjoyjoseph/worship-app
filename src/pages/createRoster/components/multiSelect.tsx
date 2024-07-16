import { FC, useState } from "react";
import { LocationSelect } from "./addEventModal";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";
import { Location } from "../../../interfaces/event";

interface MultiSelectProps {
  value: string;
  placeholder: string;
  data: Location[];
  selectedData?: Location[];
  onCheckboxClick: (param1: LocationSelect) => void;
}

const MultiSelect: FC<MultiSelectProps> = ({
  value,
  placeholder,
  data,
  selectedData,
  onCheckboxClick,
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
      >
        {value || placeholder}
      </button>
      {dropdownIsOpen ? (
        <div className="absolute z-10 w-full bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 mt-2 border border-gray-300 rounded-lg shadow-lg">
          <ul className="px-2 py-4 text-sm text-gray-700 dark:text-gray-200 align-left flex flex-col gap-4">
            {data &&
              data.map((item) => (
                <li onClick={() => onCheckboxClick(item)}>
                  <div className="flex items-center">
                    <input
                      id="checkbox-item-1"
                      type="checkbox"
                      checked={
                        selectedData?.find((x) => x._id === item._id)
                          ? true
                          : false
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      id="checkbox-item-1"
                      className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >
                      {capitalizeFirstLetter(item.name)}
                    </label>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelect;
