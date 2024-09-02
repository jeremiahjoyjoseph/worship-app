import axios, { AxiosResponse } from "axios";
import axiosInstance from "./instance";
import { Location } from "../interfaces/location";

export async function getLocationsApi(): Promise<{
  data: Location[];
  success: boolean;
}> {
  try {
    const response: AxiosResponse<{ data: Location[]; success: boolean }> =
      await axiosInstance.get("/location/all");
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
