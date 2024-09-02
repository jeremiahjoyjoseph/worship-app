export interface Event {
  _id?: string;
  eventDate: string;
  eventEndDate?: string;
  eventName: string;
  minAge?: number;
  maxAge?: number;
  isSunday: boolean;
  sermonTopic?: string;
  sermonNote?: string;
  location: Location[];
}
