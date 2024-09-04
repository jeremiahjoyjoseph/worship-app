import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/atom/TextInput";
import PrimaryButton from "../../components/molecule/PrimaryButton";
import SecondaryButton from "../../components/molecule/SecondaryButton";
import { Event } from "../../interfaces/event";
import { Location } from "../../interfaces/location";
import { AddEventFormInterface } from "../../interfaces/roster";
import { getLocationsApi } from "../../services/location";
import { createRosterApi, getEventsApi } from "../../services/roster";
import EventCard from "./components/eventCard";
import { EventSideDrawer } from "./components/eventSideDrawer";

interface CreateRosterProps {}

const CreateRoster: FC<CreateRosterProps> = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<Event>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [addEventForm, setAddEventForm] = useState<AddEventFormInterface>({
    eventDate: "",
    isAllLocations: false,
    isMultipleDays: false,
    sermonTopic: "",
    sermonNote: "",
    location: [],
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rosterName, setRosterName] = useState<string>("");

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = () => {
    // Call the function and log the users
    getLocationsApi()
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getEvents = () => {
    // Call the function and log the users
    getEventsApi()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onAddEvent = (event: Event) => {
    setSelectedEvents([...selectedEvents, event]);
    setAddEventForm({
      eventDate: "",
      isMultipleDays: false,
      isAllLocations: false,
      sermonTopic: "",
      sermonNote: "",
      location: [],
    });
    closeDrawer();
  };

  const removeEvent = (event: Event) => {
    const updatedEvents = selectedEvents.filter(
      (x) => x.uniqueId !== event.uniqueId
    );
    setSelectedEvents(updatedEvents);
  };

  const updateEvent = (event: Event) => {
    const newSelectedEvents = selectedEvents;
    newSelectedEvents.forEach((x) => {
      if (x.uniqueId === event.uniqueId) {
        Object.assign(x, event);
      }
    });
    setSelectedEvents(newSelectedEvents);
  };

  const duplicateEvent = (event: Event) => {
    setSelectedEvents([...selectedEvents, event]);
  };

  const handleCreateRoster = () => {
    createRosterApi(selectedEvents)
      .then(() => {
        navigate("/roster/all");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRosterNameChange = (name: string) => {
    setRosterName(name);
  };

  return (
    <div className="overflow-y-scroll pb-[100px] px-6 pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
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
                  viewBox="0 0 32 32"
                  className="mr-1"
                >
                  <path
                    fill="currentColor"
                    d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z"
                  />
                </svg>
                Create Roster
              </a>
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
                  Add Events
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="mt-6">
        <h2 className="text-4xl font-extrabold dark:text-white">
          Create Roster
        </h2>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-2">
          Set the dates and give the roster a name to get started!
        </p>
      </div>

      <div className="text-left mt-8">
        <TextInput
          placeholder="Roster Name"
          value={rosterName || ""}
          onChange={handleRosterNameChange}
        />
      </div>

      <div className="text-left mt-4">
        <SecondaryButton onClick={openDrawer} fullWidth={false}>
          <svg
            className="w-6 h-6 text-white-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
          Add Event
        </SecondaryButton>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-4 mt-8">
          {selectedEvents &&
            selectedEvents.map((event) => (
              <EventCard
                key={event.uniqueId}
                event={event}
                allEvents={events}
                allLocations={locations}
                removeEvent={removeEvent}
                updateEvent={updateEvent}
                duplicateEvent={duplicateEvent}
              />
            ))}
        </div>
      </div>

      <PrimaryButton
        additionalClasses="fixed bottom-0 left-0 w-full"
        onClick={handleCreateRoster}
      >
        Let's get going!
      </PrimaryButton>

      {locations && events && (
        <EventSideDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          events={events}
          handleClick={onAddEvent}
          addEventForm={addEventForm}
          setAddEventForm={setAddEventForm}
          selectedEventType={selectedEventType}
          setSelectedEventType={setSelectedEventType}
          locations={locations}
          title="With passion and purpose"
        />
      )}
    </div>
  );
};

export default CreateRoster;
