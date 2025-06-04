import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { getFlightAvailability } from "../api/apiService";
import "../styles/booking.css";

const BookingPage: React.FC = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setFlights([]);

    const params = {
      strOrigin: "KTM",
      strDestination: "PKR",
      strDepartFrom: "20250606",
      strDepartTo: "20250606",
      iAdult: 1,
      iChild: 0,
      iInfant: 0,
      strLanguageCode: "en",
      strCurrency: "NPR",
      strTripType: "O",
      strClientIP: "127.0.0.1",
    };

    try {
      const data = await getFlightAvailability(params);
      setFlights(data?.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch flight data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="booking-main">
          <h2 className="booking-title">🛫 Flight Booking Demo</h2>
          <p className="booking-description">
            This is a demo page to test flight search via API (no real-time booking yet).
          </p>
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search Flights"}
          </button>

          {error && <p className="error-text">{error}</p>}

          {flights.length > 0 && (
            <div className="flights-section">
              <h3>Available Flights</h3>
              <ul className="flight-list">
                {flights.map((flight, index) => (
                  <li key={index} className="flight-item">
                    <div><strong>Flight:</strong> {flight.flightNumber || "YT 671"}</div>
                    <div><strong>From:</strong> {flight.origin || "KTM"} → {flight.destination || "PKR"}</div>
                    <div><strong>Time:</strong> {flight.departureTime || "07:20"} - {flight.arrivalTime || "07:45"}</div>
                    <div><strong>Price:</strong> NPR {flight.netTotal || "4800"}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookingPage;
