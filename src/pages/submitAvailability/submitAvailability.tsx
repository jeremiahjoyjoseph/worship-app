import { AxiosResponse } from "axios";
import { useEffect, type FC } from "react";
import axiosInstance from "../../services/instance";

// Define the type for user data
interface User {
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

const SubmitAvailability: FC = function () {
  useEffect(() => {
    getAllUsersOnLoad();
  }, []);

  // Define the function to get all users
  async function getAllUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await axiosInstance.get(
        "/user/all"
      );
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching user data:", error);
      throw error; // Rethrow error if needed
    }
  }

  const getAllUsersOnLoad = () => {
    // Call the function and log the users
    getAllUsers()
      .then((users) => {
        console.log("User data:", users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="px-4 pt-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
        Submit Availability
      </h1>
    </div>
  );
};

export default SubmitAvailability;
