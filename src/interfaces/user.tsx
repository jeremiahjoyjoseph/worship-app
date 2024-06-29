export interface User {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  role: string;
  wtRolePrimary: string;
  wtRoleSecondary: string;
  wtRoleSpare: string;
  gender: string;
  dob: string;
  md: boolean;
  status: string;
  locationPrimary: string;
  locationSecondary: string;
  locationSpare: string;
  allLocations: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
