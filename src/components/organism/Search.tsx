import React, { useEffect, useRef, useState } from "react";
import { Event } from "../../interfaces/event";
import { capitalizeFirstLetter } from "../../util/helperFunctions";

interface SearchProps {
  list: Event[];
  placeholder?: string;
  onSelect: (param1: Event) => void;
  defaultSelected?: Event;
}

const Search: React.FC<SearchProps> = ({
  list,
  placeholder,
  onSelect,
  defaultSelected,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Event[]>(list);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredOptions = list.sort((a, b) => {
      const aName = a.eventName.toLowerCase();
      const bName = b.eventName.toLowerCase();

      // Define relevance score
      const aScore = getRelevanceScore(aName, lowerCaseSearchTerm);
      const bScore = getRelevanceScore(bName, lowerCaseSearchTerm);

      // Sort by relevance score in descending order
      return bScore - aScore;
    });
    setFilteredOptions(filteredOptions);
  }, [searchTerm]);

  const getRelevanceScore = (itemName: string, searchTerm: string) => {
    // Exact match
    if (itemName === searchTerm) return 3;

    // Starts with search term
    if (itemName.startsWith(searchTerm)) return 2;

    // Contains search term
    if (itemName.includes(searchTerm)) return 1;

    // No match
    return 0;
  };

  const handleSelect = (listItem: Event) => {
    onSelect(listItem);
    setSearchTerm(listItem.eventName);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          type={"text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          value={
            capitalizeFirstLetter(searchTerm) || defaultSelected?.eventName
          }
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
        />
      </div>
      {isFocused ? (
        <div className="absolute z-10 w-full bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 mt-2 border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 align-left">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((listItem) => (
                <li
                  onClick={() => handleSelect(listItem)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  key={listItem._id}
                >
                  {capitalizeFirstLetter(listItem.eventName)}
                </li>
              ))
            ) : (
              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                No options found
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
