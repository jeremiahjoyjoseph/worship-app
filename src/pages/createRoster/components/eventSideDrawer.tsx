import moment from "moment";
import { CustomDrawer } from "../../../components/organism/CustomDrawer";
import { Event } from "../../../interfaces/event";
import { AddEventFormInterface } from "../../../interfaces/roster";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";
import { useDeviceQueries } from "../../../util/useDeviceQueries";
// import Datepicker from "./datepicker";
import PrimaryButton from "../../../components/molecule/PrimaryButton";
import MultiSelect from "./multiSelect";
import MyDatepicker from "../../../components/organism/Datepicker";
import { Location } from "../../../interfaces/location";
import TextArea from "../../../components/atom/TextArea";
import TextInput from "../../../components/atom/TextInput";
import Search from "../../../components/organism/Search";

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

  const handleDateSelect = (date: string | null) => {
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

  const handleIsAllLocationsChange = () => {
    let selectedLocations: Location[] = [];
    if (addEventForm.location?.length) {
      selectedLocations = [];
    } else {
      selectedLocations = locations;
    }
    setAddEventForm({
      ...addEventForm,
      location: selectedLocations,
      isAllLocations: !addEventForm.isAllLocations,
    });
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
      height="90%"
      title={title}
    >
      <div className="mt-10">
        {events.length > 0 && (
          <div>
            <Search
              placeholder={"Event name"}
              defaultSelected={selectedEvent}
              list={events}
              onSelect={onSearchSelect}
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <MyDatepicker
          onSelect={handleDateSelect}
          value={addEventForm.eventDate || ""}
          placeholder="Pick the day"
          disabled={isEdit ? true : false}
        />
        {addEventForm.isMultipleDays && (
          <div className="mt-4">
            <MyDatepicker
              // value={addEventForm.eventEndDate || ""}
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
          <TextInput
            placeholder="Sermon Topic"
            value={addEventForm.sermonTopic || ""}
            onChange={handleSermonTopicChange}
          />
          <div>
            <div className="mt-4">
              <TextArea
                placeholder="Sermon Notes"
                value={addEventForm.sermonNote || ""}
                onChange={handleSermonNoteChange}
              />
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

          <label className="inline-flex items-center cursor-pointer mt-4">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={addEventForm.isAllLocations}
              onChange={handleIsAllLocationsChange}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              All Locations
            </span>
          </label>
        </div>
      )}

      <div className="mt-10">
        <PrimaryButton onClick={handleEventClick} rounded={true}>
          {isEdit ? "Update Event" : "Add Event"}
        </PrimaryButton>
      </div>
    </CustomDrawer>
  );
}
