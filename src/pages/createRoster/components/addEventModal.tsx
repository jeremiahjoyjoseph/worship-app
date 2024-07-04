import { FC, RefObject, useEffect, useState } from "react";
import { Event, Location } from "../../../interfaces/event";
import Search from "./search";
import Datepicker from "./datepicker";
import moment from "moment";
import MultiSelect from "./multiSelect";
import { getLocationsApi } from "../../../services/createRoster";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";

interface AddEventModalProps {
  modalRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  events: Event[];
  handleAdd: (param1: Event) => void;
}

export interface LocationSelect extends Location {
  isChecked?: boolean;
}

interface AddEventFormInterface {
  eventDate: string;
  isMultipleDays?: boolean;
  eventEndDate?: string;
  sermonTopic?: string;
  sermonNote?: string;
  location?: LocationSelect[];
}

const AddEventModal: FC<AddEventModalProps> = ({
  modalRef,
  events,
  closeModal,
}) => {
  const [selEvent, setSelEvent] = useState<Event>();
  const [addEventForm, setAddEventForm] = useState<AddEventFormInterface>({
    eventDate: "",
    isMultipleDays: false,
    sermonTopic: "",
    sermonNote: "",
    location: [],
  });

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = () => {
    // Call the function and log the users
    getLocationsApi()
      .then((response) => {
        const locations: LocationSelect[] = response.data;
        locations.forEach((item) => {
          item.isChecked = false;
        });
        setAddEventForm({ ...addEventForm, location: locations });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleIsMultipleDaysChange = () => {
    setAddEventForm({
      ...addEventForm,
      isMultipleDays: !addEventForm.isMultipleDays,
    });
  };

  const onSearchSelect = (event: Event) => {
    // setSelectedEvents([...selectedEvents, event]);
    setSelEvent(event);
  };

  const handleDateSelect = (date: string) => {
    console.log("date", moment(date).format("DD/MM/YYYY"));
    setAddEventForm({
      ...addEventForm,
      eventDate: moment(date).format("DD/MM/YYYY"),
    });
  };

  const handleEndDateSelect = (date: string) => {
    setAddEventForm({
      ...addEventForm,
      eventEndDate: moment(date).format("DD/MM/YYYY"),
    });
  };

  const handleSermonTopicChange = (topic: string) => {
    setAddEventForm({
      ...addEventForm,
      sermonTopic: topic,
    });
  };

  const handleSermonNoteChange = (note: string) => {
    setAddEventForm({
      ...addEventForm,
      sermonNote: note,
    });
  };

  const handleLocationSelect = (location: LocationSelect) => {
    const locations = addEventForm.location;

    if (locations) {
      const indexToUpdate = locations?.findIndex((x) => x._id === location._id);

      if (indexToUpdate !== -1) {
        locations[indexToUpdate].isChecked =
          !locations[indexToUpdate].isChecked;
      }

      setAddEventForm({ ...addEventForm, location: locations });
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div
      ref={modalRef}
      id="create_event_modal"
      tabIndex={-1}
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pb-8">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Event
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="px-4 md:px-5 mt-6">
            {events.length > 0 && (
              <div>
                <Search
                  placeholder="Add event"
                  list={events}
                  onSelect={onSearchSelect}
                />
              </div>
            )}
          </div>

          <div className="px-4 md:px-5 mt-6">
            <Datepicker onSelect={handleDateSelect} />
            {addEventForm.isMultipleDays && (
              <div className="mt-4">
                <Datepicker
                  onSelect={handleEndDateSelect}
                  placeholder="Select end date"
                />
              </div>
            )}
            <label className="inline-flex items-center cursor-pointer mt-4">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={addEventForm.isMultipleDays}
                onChange={handleIsMultipleDaysChange}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Multiple Days
              </span>
            </label>
          </div>

          {selEvent?.isSunday && (
            <div className="px-4 md:px-5 mt-6">
              <input
                type={"text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={"Sermon Topic"}
                value={addEventForm.sermonTopic}
                onChange={(e) => handleSermonTopicChange(e.target.value)}
              />
              <div>
                <div className="mt-4">
                  <textarea
                    rows={4}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Sermon Notes"
                    value={addEventForm.sermonNote}
                    onChange={(e) => handleSermonNoteChange(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 md:px-5 mt-6">
            <MultiSelect
              value={
                addEventForm?.location
                  ?.filter((x) => x.isChecked)
                  .map((x) => `${capitalizeFirstLetter(x.name)}`)
                  .join(", ") || ""
              }
              placeholder="Select Locations"
              data={addEventForm?.location || []}
              onCheckboxClick={handleLocationSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
