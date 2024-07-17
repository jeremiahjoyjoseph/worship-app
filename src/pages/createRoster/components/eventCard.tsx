import { Modal, ModalInterface, ModalOptions } from "flowbite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../../util/helperFunctions";
import { Event, Location } from "../../../interfaces/event";
import AddEventModal from "./addEventModal";
import { AddEventFormInterface } from "../../../interfaces/roster";

interface EventCardProps {
  event: Event;
  allEvents: Event[];
  allLocations: Location[];
  removeEvent: (param1: Event) => void;
  updateEvent: (param1: Event) => void;
}

const modalOptions: ModalOptions = {
  placement: "center",
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-20",
  closable: true,
};

// instance options object
const modalInstanceOptions = {
  id: "create_event_modal",
  override: true,
};

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

  const modalRef = useRef(null);
  let modal: ModalInterface;
  useEffect(() => {
    if (modalRef.current) {
      modal = new Modal(modalRef.current, modalOptions, modalInstanceOptions);
      modal.hide();
    }
  }, [modalRef]);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modal.hide();
    }
  }, [modalRef]);

  const showModal = useCallback(() => {
    if (modalRef.current) {
      setAddEventForm({
        eventDate: event.eventDate,
        isMultipleDays: event.eventEndDate ? true : false,
        eventEndDate: event.eventEndDate,
        sermonTopic: event.sermonTopic,
        sermonNote: event.sermonNote,
        location: event.location,
      });
      setSelectedEvent(allEvents.find((x) => x.eventName === event.eventName));
      modal.show();
    }
  }, [modalRef]);

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
    closeModal();
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
      <div className="flex gap-2">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          onClick={showModal}
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
      <AddEventModal
        modalRef={modalRef}
        closeModal={closeModal}
        events={allEvents}
        handleAdd={handleUpdate}
        isEdit={true}
        addEventForm={addEventForm}
        setAddEventForm={setAddEventForm}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        locations={allLocations}
      />
    </div>
  );
};

export default EventCard;
