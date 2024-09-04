import { FC, useState } from "react";
import { Event } from "../../../interfaces/event";
import { AddEventFormInterface } from "../../../interfaces/roster";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";
import { EventSideDrawer } from "./eventSideDrawer";
import { Location } from "../../../interfaces/location";

interface EventCardProps {
  event: Event;
  allEvents: Event[];
  allLocations: Location[];
  removeEvent: (param1: Event) => void;
  updateEvent: (param1: Event) => void;
  duplicateEvent: (param1: Event) => void;
}

const EventCard: FC<EventCardProps> = ({
  event,
  allEvents,
  removeEvent,
  allLocations,
  updateEvent,
  duplicateEvent,
}) => {
  const [selectedEventType, setSelectedEventType] = useState<Event>();
  const [addEventForm, setAddEventForm] = useState<AddEventFormInterface>({
    eventDate: "",
    eventEndDate: "",
    isMultipleDays: false,
    sermonTopic: "",
    sermonNote: "",
    location: [],
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setAddEventForm({
      eventDate: event.eventDate,
      isMultipleDays: event.eventEndDate ? true : false,
      eventEndDate: event.eventEndDate,
      sermonTopic: event.sermonTopic,
      sermonNote: event.sermonNote,
      location: event.location,
    });
    setSelectedEventType(
      allEvents.find((x) => x.eventName === event.eventName)
    );
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleUpdate = (event: Event) => {
    updateEvent && updateEvent(event);
    setAddEventForm({
      eventDate: "",
      isMultipleDays: false,
      sermonTopic: "",
      sermonNote: "",
      location: [],
    });
    closeDrawer();
  };

  const handleDupEvent = (event: Event) => {
    const newEvent = { ...event, uniqueId: Date.now().toString() };
    duplicateEvent(newEvent);
  };

  return (
    <div className="flex flex-col items-left gap-6 ps-4 border border-gray-200 rounded dark:border-gray-700 p-4">
      <div>
        <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          {capitalizeFirstLetter(event.eventName)}
        </h5>
        {event.sermonTopic && (
          <p className="text-sm text-gray-700 dark:text-gray-400 ">
            {capitalizeFirstLetter(event.sermonTopic)}
          </p>
        )}
        <p className="w-full mt-2 text-1xl font-medium text-gray-900 dark:text-gray-300">
          {event.eventDate}
        </p>
      </div>
      <div className="flex gap-4">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          onClick={openDrawer}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => removeEvent(event)}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => handleDupEvent(event)}
        >
          <path
            fill="currentColor"
            d="M4 9.05H3v2h1v-2Zm16 2h1v-2h-1v2ZM10 14a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm-3 1a1 1 0 1 0 2 0h-2Zm2-4a1 1 0 1 0-2 0h2Zm-2-5.95a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-7 3a1 1 0 0 0 2 0H6Zm2-3a1 1 0 1 0-2 0h2Zm8 3a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-13 3h14v-2H5v2Zm14 0v12h2v-12h-2Zm0 12H5v2h14v-2Zm-14 0v-12H3v12h2Zm0 0H3a2 2 0 0 0 2 2v-2Zm14 0v2a2 2 0 0 0 2-2h-2Zm0-12h2a2 2 0 0 0-2-2v2Zm-14-2a2 2 0 0 0-2 2h2v-2Zm-1 6h16v-2H4v2ZM10 16h4v-2h-4v2Zm3 1v-4h-2v4h2Zm0-9.95v-3h-2v3h2Zm-5 0v-3H6v3h2Zm10 0v-3h-2v3h2Z"
          />
        </svg>
      </div>
      <EventSideDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        events={allEvents}
        handleClick={handleUpdate}
        isEdit={true}
        editEvent={event}
        addEventForm={addEventForm}
        setAddEventForm={setAddEventForm}
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
        locations={allLocations}
        title="Any changes?"
      />
    </div>
  );
};

export default EventCard;
