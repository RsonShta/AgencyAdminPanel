import axios from "axios";

// Replace baseURL with your actual API base
const baseURL = "https://your-api-server.com/api"; // or use local path if mocking locally

export type FlightAvailabilityParams = {
  strOrigin: string;
  strDestination: string;
  strDepartFrom: string;
  strDepartTo: string;
  iAdult: number;
  iChild: number;
  iInfant: number;
  strLanguageCode: string;
  strCurrency: string;
  strTripType: string;
  strClientIP: string;
};

// 1. Get Available Flights (Mocked for now)
export const getFlightAvailability = async (params: FlightAvailabilityParams) => {
  // Replace this mock with actual Axios if needed
  return Promise.resolve({
    results: [
      {
        flightId: "12345-abcde",
        fareId: "fare-67890",
        originCode: params.strOrigin,
        destinationCode: params.strDestination,
      },
    ],
  });
};

// 2. Initialize Service
export const initializeService = async () => {
  try {
    const response = await axios.post(`${baseURL}/initialize-service`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to initialize service.");
  }
};

// 3. Add Flight
export const addFlight = async ({ flightId, fareId }: { flightId: string; fareId: string }) => {
  try {
    const response = await axios.post(`${baseURL}/add-flight`, {
      flightId,
      fareId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add flight.");
  }
};

// 4. Get Booking Session
export const getBookingSession = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-booking-session`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch booking session.");
  }
};

// 5. Confirm Booking
export const confirmBooking = async (form: any) => {
  try {
    const response = await axios.post(`${baseURL}/confirm-booking`, form);
    return response.data;
  } catch (error) {
    throw new Error("Failed to confirm booking.");
  }
};
