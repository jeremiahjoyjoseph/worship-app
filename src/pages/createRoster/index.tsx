import { Modal, ModalInterface, ModalOptions } from "flowbite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Event } from "../../interfaces/event";
import { getEventsApi } from "../../services/createRoster";
import { capitalizeFirstLetter } from "../../util/helperFunctions";
import AddEventModal from "./components/addEventModal";

interface CreateRosterProps {}

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

const CreateRoster: FC<CreateRosterProps> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  const modalRef = useRef(null);
  let modal: ModalInterface;

  useEffect(() => {
    getEvents();
  }, []);

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
      modal.show();
    }
  }, [modalRef]);

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
    closeModal();
  };

  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
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

      <div className="text-left mt-8">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={showModal}
        >
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
        </button>
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-4 mt-8">
          {selectedEvents &&
            selectedEvents.map((event) => (
              <div
                className="flex items-center gap-6 ps-4 border border-gray-200 rounded dark:border-gray-700 p-4"
                key={event._id}
              >
                <div>
                  <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {capitalizeFirstLetter(event.eventName)}
                  </h5>
                </div>
              </div>
            ))}
        </div>
      </div>

      <button
        type="button"
        className="h-[50px] text-white bg-blue-700 hover:bg-blue-800 font-medium text-md px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 fixed bottom-0 left-0 w-full"
      >
        Create Roster
      </button>

      <AddEventModal
        modalRef={modalRef}
        closeModal={closeModal}
        events={events}
        handleAdd={onAddEvent}
      />
    </div>
  );
};

export default CreateRoster;
