// src/custom.d.ts

declare module "flowbite-datepicker";

interface DatepickerOptions {
  format?: string;
  autohide?: boolean;
  format?: string;
  maxDate?: Date | null;
  minDate?: Date | null;
  orientation?: "top" | "auto" | "bottom";
  buttons?: boolean;
  autoSelectToday?: number;
  title?: string | null;
  rangePicker?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  // Add more options here as needed
}

// Extend the Window interface to include Datepicker
interface Window {
  Datepicker: {
    new (
      element: HTMLInputElement,
      options?: DatepickerOptions
    ): DatepickerInstance;
  };
}

interface DatepickerInstance {
  destroy: () => void;
  // Add more methods if needed
}

interface DatepickerEventDetail {
  date: Date; // The selected date as a JavaScript Date object
}

interface DatepickerChangeEvent extends Event {
  detail: DatepickerEventDetail; // The detail property carries the date information
}
