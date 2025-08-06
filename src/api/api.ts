import axios from "axios";
import { storage } from "../utils/storage";

const ADMIN_API_BASE_URL = "http://localhost:8442";
const FLIGHT_API_BASE_URL = "http://localhost:8446";

export const loginUser = async (userId: string, username: string, password: string) => {
  try {
    const response = await axios.post(`${ADMIN_API_BASE_URL}/api/user/login`, { userId, username, password });
    const data = response.data as { token: string };
    storage.set("token", data.token, 60); 
    storage.set("userId", userId, 60);
    storage.set("username", username, 60);
    storage.set("password", password, 60);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

interface FlightAvailabilityParams {
  strOrigin: string;
  strDestination: string;
  strDepartFrom: string;
  strDepartTo: string;
  strReturnFrom?: string;
  strReturnTo?: string;
  iAdult: number;
  iChild: number;
  iInfant: number;
  iOther?: number;
  strBookingClass?: string;
  strBoardingClass?: string;
  strPromoCode?: string;
  strLanguageCode: string;
  strOtherPassengerType?: string;
  strCurrency: string;
  strTripType: string;
  strClientIP: string;
}

export const getFlightAvailability = async (params: FlightAvailabilityParams) => {
  try {
    const response = await axios.post(`${FLIGHT_API_BASE_URL}/api/flight/Availibility`, params);
    return response.data;
  } catch (error) {
    console.error("Flight availability error:", error);
    throw error;
  }
};
