import moment from "moment";
import CustomButton from "../../../components/atom/CustomButton";
import { CustomDrawer } from "../../../components/organism/CustomDrawer";
import { Event, Location } from "../../../interfaces/event";
import { AddEventFormInterface } from "../../../interfaces/roster";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";
import { useDeviceQueries } from "../../../util/useDeviceQueries";
import Datepicker from "./datepicker";
import MultiSelect from "./multiSelect";
import Search from "./search";

interface EventSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;

  events: Event[];
  selectedEvent: Event | undefined;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | undefined>>;
  isEdit?: boolean;
  handleClick?: (param1: Event) => void;
  addEventForm: AddEventFormInterface;
  setAddEventForm: React.Dispatch<React.SetStateAction<AddEventFormInterface>>;
  locations: Location[];
  title: string;
}

export function EventSideDrawer({
  isOpen,
  onClose,
  events,

  handleClick,
  addEventForm,
  setAddEventForm,
  isEdit,
  selectedEvent,
  setSelectedEvent,
  locations,
  title,
}: EventSideDrawerProps) {
  const { isMobile } = useDeviceQueries();
  const handleIsMultipleDaysChange = () => {
    setAddEventForm({
      ...addEventForm,
      isMultipleDays: !addEventForm.isMultipleDays,
    });
  };

  const onSearchSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleDateSelect = (date: string) => {
    setAddEventForm((form) => ({
      ...form,
      eventDate: moment(date).format("DD/MM/YYYY"),
    }));
  };

  const handleEndDateSelect = (date: string) => {
    setAddEventForm((form) => ({
      ...form,
      eventEndDate: moment(date).format("DD/MM/YYYY"),
    }));
  };

  const handleSermonTopicChange = (topic: string) => {
    setAddEventForm((form) => ({
      ...form,
      sermonTopic: topic,
    }));
  };

  const handleSermonNoteChange = (note: string) => {
    setAddEventForm((form) => ({
      ...form,
      sermonNote: note,
    }));
  };

  const handleLocationSelect = (checkedLocation: Location) => {
    let selectedLocations = [];
    if (addEventForm.location?.find((x) => x._id === checkedLocation._id)) {
      selectedLocations = addEventForm.location.filter(
        (x) => x._id !== checkedLocation._id
      );
    } else {
      selectedLocations = addEventForm?.location || [];
      selectedLocations?.push(checkedLocation);
    }
    setAddEventForm({ ...addEventForm, location: selectedLocations });
  };

  const handleEventClick = () => {
    const event: Event = {
      eventDate: addEventForm.eventDate,
      eventName: selectedEvent?.eventName || "",
      minAge: selectedEvent?.minAge,
      maxAge: selectedEvent?.maxAge,
      isSunday: selectedEvent?.isSunday || false,
      sermonTopic: addEventForm.sermonTopic,
      sermonNote: addEventForm.sermonNote,
      location: addEventForm.location || [],
    };
    handleClick && handleClick(event);
  };

  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      position={isMobile ? "bottom" : "right"}
      title={title}
    >
      <div className="mt-10">
        {events.length > 0 && (
          <div>
            <Search
              placeholder={selectedEvent?.eventName || "Event name"}
              list={events}
              onSelect={onSearchSelect}
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <Datepicker
          onSelect={handleDateSelect}
          placeholder={addEventForm.eventDate || ""}
          disabled={isEdit ? true : false}
        />
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

      {selectedEvent?.isSunday && (
        <div className="mt-6">
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

      {selectedEvent && (
        <div className="mt-6">
          <MultiSelect
            value={
              addEventForm?.location
                ?.map((x) => `${capitalizeFirstLetter(x.name)}`)
                .join(", ") || ""
            }
            placeholder="Select Locations"
            data={locations || []}
            selectedData={addEventForm.location}
            onCheckboxClick={handleLocationSelect}
          />
        </div>
      )}

      <div className="mt-10">
        <CustomButton onClick={handleEventClick}>{title}</CustomButton>
      </div>
    </CustomDrawer>
  );
}
