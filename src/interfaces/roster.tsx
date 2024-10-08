import { Event } from "./event";
import { Location } from "./location";

// Define the type for user data inside submissions
export interface UserData {
  allLocations: boolean;
  _id: string;
  firstName: string;
  middleName?: string; // middleName is optional as not all entries have it
  lastName: string;
  nickname?: string; // nickname is optional as not all entries have it
  email: string;
  phone: string;
  username: string;
  role: string;
  gender: string;
  dob: string;
  md: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  status: string;
  locationPrimary: string;
  locationSecondary?: string; // locationSecondary is optional as not all entries have it
  locationSpare?: string; // locationSpare is optional as not all entries have it
  wtRolePrimary: string;
  wtRoleSecondary?: string; // wtRoleSecondary is optional as not all entries have it
  wtRoleSpare?: string; // wtRoleSpare is optional as not all entries have it
}

// Define the type for individual submission items
export interface Submission {
  userId: string;
  userData: UserData;
  hasSubmittedDates: boolean;
  submittedDates: Event[]; // Array of strings representing dates
  _id: string;
}

// Define the main type for the provided JSON structure
export interface Roster {
  _id: string;
  requiredDates: Event[];
  submissions: Submission[];
  roster: [
    {
      location: Location;
      worshipTeam: Member;
    }
  ]; // Assuming roster can be an array of any type, could be refined based on additional details
  createdAt: string;
  updatedAt: string;
  __v: number;
  rosterUrl: string;
}

export interface AddEventFormInterface {
  eventDate: string;
  isMultipleDays?: boolean;
  isAllLocations?: boolean;
  eventEndDate?: string;
  sermonTopic?: string;
  sermonNote?: string;
  location?: Location[];
}

export interface Member {
  id: string;
  name: string;
  wtPrimaryRole: string;
  wtSecondaryRole: string;
  isMd: boolean;
}
