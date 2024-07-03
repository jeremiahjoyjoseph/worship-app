import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../interfaces/user";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";

interface SearchProps {
  options: User[];
  placeholder?: string;
  rosterId: string | undefined;
}

const Search: React.FC<SearchProps> = ({ options, placeholder, rosterId }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<User[]>(options);

  useEffect(() => {
    const filteredOptions = options.filter((option) =>
      option.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  }, [searchTerm]);

  const handleSelect = (option: User) => {
    setSearchTerm("");
    navigate(`/submit/dates/${rosterId}/${option._id}`);
  };

  return (
    <>
      <div className="relative">
        <input
          type={"text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchTerm && (
        <div className="z-10 w-full bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 mt-2">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  onClick={() => handleSelect(option)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {`${capitalizeFirstLetter(
                    option.firstName
                  )} ${capitalizeFirstLetter(option.lastName)}`}
                </li>
              ))
            ) : (
              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
