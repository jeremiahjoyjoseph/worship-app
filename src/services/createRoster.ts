import axios, { AxiosResponse } from "axios";
import { Event, Location } from "../interfaces/event";
import axiosInstance from "./instance";
import { Roster } from "../interfaces/roster";

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

export async function createRosterApi(requiredDates: Event[]): Promise<{
  data: Roster;
  success: boolean;
  message: string;
}> {
  try {
    const response: AxiosResponse<{
      data: Roster;
      success: boolean;
      message: string;
    }> = await axiosInstance.post("/roster/generate", {
      requiredDates,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.message ||
          "An error occurred while fetching vehicle notifications."
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}
