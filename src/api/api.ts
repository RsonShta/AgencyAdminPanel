import axios from "axios";



const FLIGHT_API_BASE_URL = import.meta.env.VITE_FLIGHT_API_BASE_URL || "http://localhost:8446/api/flight";


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
    const response = await axios.post(`${FLIGHT_API_BASE_URL}/Availibility`, params);
    return response.data;
  } catch (error) {
    console.error("Flight availability error:", error);
    throw error;
  }
};
