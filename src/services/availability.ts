import axios, { AxiosResponse } from "axios";
import { Roster } from "../interfaces/roster";
import { User } from "../interfaces/user";
import axiosInstance from "./instance";
import { Event } from "../interfaces/event";

// Define the function to get all users
export async function getAllUsers(): Promise<{
  data: User[];
  success: boolean;
}> {
  try {
    const response: AxiosResponse<{ data: User[]; success: boolean }> =
      await axiosInstance.get("/user/all");
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

// Define the function to get all users
export async function getRoster(params: { [key: string]: string }): Promise<{
  data: Roster;
  message: string;
  success: boolean;
}> {
  try {
    const response: AxiosResponse<{
      data: Roster;
      message: string;
      success: boolean;
    }> = await axiosInstance.get(`/roster`, { params });
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

// Define the function to get all users
export async function submitAvailabilityApi(
  params: { [key: string]: string },
  body: Event[]
): Promise<{
  data: Event[];
  message: string;
  success: boolean;
}> {
  try {
    const response: AxiosResponse<{
      data: Event[];
      message: string;
      success: boolean;
    }> = await axiosInstance.post(
      `/roster/availability/${params.rosterId}/${params.userId}`,
      body
    );
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
