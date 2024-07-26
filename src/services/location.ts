import axios, { AxiosResponse } from "axios";
import axiosInstance from "./instance";
import { Location } from "../interfaces/event";

export async function getLocationsApi(): Promise<{
  data: Location[];
  success: boolean;
}> {
  try {
    const response: AxiosResponse<{ data: Location[]; success: boolean }> =
      await axiosInstance.get("/location/all");
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
