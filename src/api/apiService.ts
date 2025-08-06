import axios from "axios";

const BASE_URL = "http://localhost:8446/api/flight";

let sessionCookie: string | null = null;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ THIS is critical
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  transformResponse: [(data) => {
    if (typeof data === 'string' && (data.includes('<?xml') || data.includes('<error>'))) {
      throw new Error('Received XML response when JSON was expected');
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }]
});


// Add interceptor to manage session
axiosInstance.interceptors.response.use(response => {
  const setCookie = response.headers['set-cookie'];
  if (setCookie) {
    const jsessionid = setCookie.find(cookie => cookie.startsWith('JSESSIONID='));
    if (jsessionid) {
      sessionCookie = jsessionid;
      axiosInstance.defaults.headers.common['Cookie'] = sessionCookie;
      console.log('🔑 Session cookie updated:', sessionCookie);
    }
  }
  return response;
});

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

// 1. Get Flight Availability (Mocked for now)
export const getFlightAvailability = async (params: FlightAvailabilityParams) => {
  return Promise.resolve({
    YETI_AVAILABILITY: [],
    TARA_AVAILABILITY: [],
  });
};

// 2. Initialize Service
export const initializeService = async (force = false) => {
  try {
    // Only initialize if no session exists or force is true
    if (sessionCookie && !force) {
      console.log("✅ Using existing session:", sessionCookie);
      return true;
    }

    console.log("🔄 Initializing service...");
    const res = await axiosInstance.post(`/ServiceIntialize`, {
      strAgencyCode: "TESTAPI",
      strUserName: "TESTAPI",
      strPassword: "APITEST@123NP@@",
      strLanguageCode: "en",
    });

    if (Array.isArray(res.data) && res.data[0]?.serviceIntializeResult === "true") {
      console.log("✅ Service initialized");
      return true;
    } else {
      console.error("❌ Invalid response from service init:", res.data);
      throw new Error("Service initialization failed");
    }
  } catch (err: any) {
    console.error("❌ Service init error:", err?.response?.data || err.message);
    throw new Error("Service initialization failed");
  }
};

// 3. Add Flight
export const addFlight = async (flight: {
  adult: number;
  child: number;
  infant: number;
  flightId: string;
  fareId: string;
  originCode: string;
  destinationCode: string;
  transitFlightId?: string;
  transitAirportCode?: string;
}) => {
  try {
    await initializeService(); // Will use existing session if available
    console.log("🛫 Adding flight...", flight);
    const res = await axiosInstance.post(`/FlightAdd`, flight);
    console.log("✅ Flight added:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("❌ FlightAdd error:", err?.response?.data || err.message);
    throw new Error("Failed to add flight");
  }
};

// 4. Get Booking Session
export const getBookingSession = async () => {
  try {
    await initializeService(); // Will use existing session if available
    console.log("📡 Getting booking session...");
    const res = await axiosInstance.get(`/BookingGetSession`, {
      params: { format: 'json' }
    });
    if (!res.data) {
      throw new Error("Invalid response format");
    }
    console.log("✅ Booking session:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("❌ Booking session error:", err?.response?.data || err.message);
    throw new Error("Failed to get booking session");
  }
};

// 5. Confirm Booking
export const confirmBooking = async (form: any) => {
  try {
    const res = await axiosInstance.post(`/BookingConfirm`, form);
    console.log("✅ Booking confirmed:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("❌ Booking confirm failed:", err?.response?.data || err.message);
    throw new Error("Booking confirmation failed");
  }
};
