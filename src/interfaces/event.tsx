export interface Event {
  _id: string;
  eventDate: string;
  eventName: string;
  minAge?: number;
  maxAge?: number;
  isSunday: boolean;
  sermonTopic?: string;
  sermonNote?: string;
  location: Location[];
}

export interface Location {
  name: string;
}
