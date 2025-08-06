import React, { useState } from "react";
import {
  initializeService,
  addFlight,
  getBookingSession,
} from "../api/apiService";

interface Flight {
  airline: string;
  flightId: string | null;
  fareId: string | null;
  flightNumber: string;
  originCode?: string;
  destinationCode?: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  aircraftType?: string;
  price?: string | number;
}

interface FlightResultsProps {
  flights: Flight[];
  onSelectFlight: (flight: Flight) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, onSelectFlight }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleBookFlight = async (flight: Flight) => {
    setBookingError(null);
    setIsBooking(true);

    try {
      // Initialize service
      console.log("Starting booking process...");
      const serviceInit = await initializeService();
      if (!serviceInit) {
        throw new Error("Could not initialize service");
      }

      // Add flight
      console.log("Adding flight to booking...");
      await addFlight({
        flightId: flight.flightId!,
        fareId: flight.fareId!,
        originCode: flight.originCode || "",
        destinationCode: flight.destinationCode || "",
        transitFlightId: "",
        transitAirportCode: "",
        adult: 1,
        child: 0,
        infant: 0,
      });

      // Get session
      console.log("Getting booking session...");
      const session = await getBookingSession();
      
      console.log("✅ Booking setup complete");
      onSelectFlight(flight);
    } catch (err: any) {
      console.error("❌ Booking setup failed:", err.message);
      setBookingError(`⚠️ ${err.message}`);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="flights-section">
      {bookingError && (
        <p style={{ color: "red", marginBottom: "1rem" }}>
          {bookingError}
        </p>
      )}
      {isBooking && <p>🛠️ Preparing booking... please wait.</p>}

      {!isBooking && (
        <>
          {flights.length === 0 ? (
            <p>No flights found.</p>
          ) : (
            <ul className="flight-list">
              {flights.map((flight, index) => (
                <li key={flight.flightId || index} className="flight-item">
                  <div>
                    <strong>Airline:</strong>{" "}
                    <span style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}>
                      {flight.airline}
                    </span>
                  </div>
                  <div><strong>Flight:</strong> {flight.flightNumber}</div>
                  <div><strong>Route:</strong> {flight.originCode} → {flight.destinationCode}</div>
                  <div><strong>Departure:</strong> {flight.departureTime}</div>
                  <div><strong>Arrival:</strong> {flight.arrivalTime}</div>
                  <div><strong>Duration:</strong> {flight.duration}</div>
                  <div><strong>Aircraft:</strong> {flight.aircraftType}</div>
                  <div><strong>Price:</strong> {flight.price} NPR</div>
                  <button
                    className="search-button"
                    disabled={isBooking}
                    onClick={() => handleBookFlight(flight)}
                  >
                    Book This Flight
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FlightResults;
