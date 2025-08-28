import { useState } from "react";
import {
  getFlightAvailability
} from "../api/api";
import {
  addFlight,
  confirmBooking,
  getBookingSession,
} from "../api/apiService";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightResults from "../components/FlightResults";
import BookingForm from "../components/BookingForm";
import BookingConfirmation from "../components/BookingConfirmation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/booking.css";

interface Flight {
  airline: string;
  flightId: string | null;
  fareId: string | null;
  flightNumber: string;
  flightDate?: string;
  departure: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  duration?: string;
  aircraftType?: string;
  adultFare?: number;
  currency?: string;
  freeBaggage?: string;
  refundable?: string;
  price?: string;
  originCode?: string;
  destinationCode?: string;
}

export default function BookingPage() {
  const [searchParams, setSearchParams] = useState<any>(null);
  const [availableFlights, setAvailableFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: any) => {
    setError(null);
    try {
      setLoading(true);
      const result = await getFlightAvailability(params);
      setSearchParams(params);

      const yetiFlights = (result?.YETI_AVAILABILITY || []).map((flight: any) => ({
        airline: "Yeti",
        flightId: flight.flightId ?? null,
        fareId: flight.fareId ?? null,
        flightNumber: flight.flightNumber ?? "N/A",
        originCode: flight.originCode || flight.originName || "Unknown",
        destinationCode: flight.destinationCode || flight.destinationName || "Unknown",
        departureTime: flight.departureTime || "N/A",
        arrivalTime: flight.arrivalTime || "N/A",
        duration: flight.duration || "N/A",
        aircraftType: flight.aircraftType || "N/A",
        price: flight.totalAdultFare && flight.currency
          ? `${flight.totalAdultFare} ${flight.currency}`
          : "N/A",
      }));

      const taraFlights = (result?.TARA_AVAILABILITY || []).map((flight: any) => ({
        airline: flight.airline ?? "Tara",
        flightId: flight.flightId ?? null,
        fareId: flight.fareId ?? null,
        flightNumber: flight.flightNo ?? "N/A",
        flightDate: flight.flightDate ?? "N/A",
        originCode: flight.originCode ?? flight.departure ?? flight.originName ?? "Unknown",
        destinationCode: flight.destinationCode ?? flight.arrival ?? flight.destinationName ?? "Unknown",
        departureTime: flight.departureTime ?? "N/A",
        arrivalTime: flight.arrivalTime ?? "N/A",
        duration: flight.duration ?? "N/A",
        aircraftType: flight.aircraftType ?? "N/A",
        adultFare: flight.adultFare ?? 0,
        currency: flight.currency ?? "NPR",
        freeBaggage: flight.freeBaggage ?? "N/A",
        refundable: flight.refundable ?? "F",
        price: flight.adultFare && flight.currency
          ? `${parseFloat(flight.adultFare).toFixed(2)} ${flight.currency}`
          : "N/A",
      }));

      const allFlights = [...yetiFlights, ...taraFlights];
      setAvailableFlights(allFlights.sort(() => Math.random() - 0.5));
    } catch (err) {
      console.error("❌ Flight search failed:", err);
      setError("Failed to fetch flights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setError(null);
  };

  const handleBooking = async (passengerInfo: any) => {
    setError(null);
    try {
      setBookingInProgress(true);
      if (!selectedFlight) throw new Error("No flight selected");

      const session = await getBookingSession();
      if (!session || !session.BookingId) throw new Error("Invalid booking session");

      const addPayload = {
        BookingId: session.BookingId,
        Currency: selectedFlight.currency || "NPR",
        BookingNumber: session.BookingNumber || "",
        noOfAdults: 1,
        noOfChildren: 0,
        noOfInfants: 0,
        noOfOthers: 0,
        agencyCode: "TESTAPI",
        contactName: passengerInfo.FirstName + " " + passengerInfo.LastName,
        contactEmail: passengerInfo.Email,
        phoneMobile: passengerInfo.PhoneMobile,
        agencyName: "Test API",
        firstName: passengerInfo.FirstName,
        lastName: passengerInfo.LastName,
        origin: selectedFlight.originCode,
        destination: selectedFlight.destinationCode,
        bookingSegmentId: selectedFlight.flightId,
        segmentStatusRcd: "CNF",
        passengerId: "093e280f-0eba-4030-aa46-4f93be6a9a51",
        airlineRcd: selectedFlight.airline,
        flightNumber: selectedFlight.flightNumber,
        flightId: selectedFlight.flightId,
        departureTime: selectedFlight.departureTime,
        arrivalTime: selectedFlight.arrivalTime,
        ticketNumber: "",
        passengerStatusRcd: "CNF",
        baggageWeight: selectedFlight.freeBaggage || "15",
        netTotal: selectedFlight.price?.split(" ")[0] || "0",
      };

      await addFlight(addPayload);

      const confirmPayload = {
        BookingId: session.BookingId,
        PassengerList: [passengerInfo],
      };

      const confirmation = await confirmBooking(confirmPayload);

      setBookingDetails({
        confirmationId: confirmation?.confirmationId || "CONFIRMED",
        bookedAt: new Date().toISOString(),
        passenger: passengerInfo,
        flight: selectedFlight,
      });

      setBookingComplete(true);
    } catch (err: any) {
      console.error("Booking failed:", err);
      setError("Booking failed. Please try again.");
    } finally {
      setBookingInProgress(false);
    }
  };

  const resetBooking = () => {
    setSearchParams(null);
    setAvailableFlights([]);
    setSelectedFlight(null);
    setBookingComplete(false);
    setBookingDetails(null);
    setError(null);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />

        {error && <p className="error-message">⚠️ {error}</p>}
        {loading && <p>🔄 Loading flights...</p>}
        {bookingInProgress && !bookingComplete && <p>🛫 Booking in progress...</p>}

        {!searchParams && !loading && (
          <>
            <p className="intro-text">Book your flight with comfort and speed!</p>
            <FlightSearchForm onSearch={handleSearch} />
          </>
        )}

        {!loading && searchParams && !selectedFlight && (
          <FlightResults flights={availableFlights} onSelectFlight={handleFlightSelect} />
        )}

        {!loading && selectedFlight && !bookingComplete && (
          <BookingForm flight={selectedFlight} onBook={handleBooking} />
        )}

        {!loading && bookingComplete && (
          <>
            <BookingConfirmation details={bookingDetails} />
            <button onClick={resetBooking} className="btn-reset">
              Book Another Flight
            </button>
          </>
        )}
      </div>
    </div>
  );
}
