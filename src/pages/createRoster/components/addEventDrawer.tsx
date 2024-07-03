import { FC, RefObject, useState } from "react";
import { Event } from "../../../interfaces/event";
import Search from "./search";

interface AddEventDrawerProps {
  modalRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  events: Event[];
}

const AddEventDrawer: FC<AddEventDrawerProps> = ({ modalRef, events }) => {
  const [selEvent, setSelEvent] = useState<Event>();

  const onSearchSelect = (event: Event) => {
    // setSelectedEvents([...selectedEvents, event]);
    setSelEvent(event);
  };
  return (
    <div
      ref={modalRef}
      id="create_event_modal"
      tabIndex={-1}
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
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
        </div>
      </div>
    </div>
  );
};

export default AddEventDrawer;
