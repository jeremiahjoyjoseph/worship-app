import axios, { AxiosResponse } from "axios";
import { Event } from "../interfaces/event";
import axiosInstance from "./instance";

// Define the function to get all users
export async function getEventsApi(): Promise<{
  data: Event[];
  success: boolean;
}> {
  try {
    const response: AxiosResponse<{ data: Event[]; success: boolean }> =
      await axiosInstance.get("/event/all");
    return response.data;
  } catch (error) {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      // Handle AxiosError (you can access error response, config, etc.)
      throw new Error(
        error.message ||
          "An error occurred while fetching vehicle notifications."
      );
    } else if (error instanceof Error) {
      // Handle other errors (regular JavaScript errors)
      throw new Error(error.message);
    } else {
      // Handle unexpected errors that don't match AxiosError or Error
      throw new Error("An unexpected error occurred.");
    }
  }
}
