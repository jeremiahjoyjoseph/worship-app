import { FC, useEffect, useRef } from "react";

interface MyDatepickerProps {
  onSelect: (param1: string) => void;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
}

const MyDatepicker: FC<MyDatepickerProps> = ({
  onSelect,
  placeholder,
  disabled,
  value,
}) => {
  const datepickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let datepickerInstance: DatepickerInstance | null = null;

    if (datepickerRef.current) {
      // Initialize the datepicker with the autoHide option set to true
      datepickerInstance = new window.Datepicker(datepickerRef.current, {
        format: "dd-mm-yyyy",
        autohide: true, // This option hides the datepicker after selecting a date
      });

      // Optional: Handle the date selection event if needed
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      datepickerRef.current.addEventListener("changeDate", (event: any) => {
        onSelect(event.detail.date);
        // Perform any additional actions here
      });
    }

    // Clean up the datepicker instance on component unmount
    return () => {
      if (datepickerInstance) {
        datepickerInstance.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          type="text"
          className="ps-10 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder || "Select a date"}
          ref={datepickerRef}
          disabled={disabled}
          value={value}
        />
      </div>
    </div>
  );
};

export default MyDatepicker;
