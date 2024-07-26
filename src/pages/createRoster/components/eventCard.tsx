import { FC, useState } from "react";
import { Event, Location } from "../../../interfaces/event";
import { AddEventFormInterface } from "../../../interfaces/roster";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";
import { EventSideDrawer } from "./eventSideDrawer";

interface EventCardProps {
  event: Event;
  allEvents: Event[];
  allLocations: Location[];
  removeEvent: (param1: Event) => void;
  updateEvent: (param1: Event) => void;
}

const EventCard: FC<EventCardProps> = ({
  event,
  allEvents,
  removeEvent,
  allLocations,
  updateEvent,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
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
    setSelectedEvent(allEvents.find((x) => x.eventName === event.eventName));
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleUpdate = () => {
    const newEvent = {
      eventDate: addEventForm.eventDate,
      eventName: selectedEvent?.eventName || "",
      minAge: selectedEvent?.minAge,
      maxAge: selectedEvent?.maxAge,
      isSunday: selectedEvent?.isSunday || false,
      sermonTopic: addEventForm.sermonTopic,
      sermonNote: addEventForm.sermonNote,
      location: addEventForm.location || [],
    };
    setAddEventForm({
      eventDate: "",
      isMultipleDays: false,
      sermonTopic: "",
      sermonNote: "",
      location: [],
    });
    updateEvent && updateEvent(newEvent);
    closeDrawer();
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
      </div>
      <EventSideDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        events={allEvents}
        handleClick={handleUpdate}
        isEdit={true}
        addEventForm={addEventForm}
        setAddEventForm={setAddEventForm}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        locations={allLocations}
        title="Any changes?"
      />
    </div>
  );
};

export default EventCard;
