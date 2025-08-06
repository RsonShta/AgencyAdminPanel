import React, { useState } from "react";
import "../styles/api-test.css";
import { getFlightAvailability } from "../api/api";

const getDatePlusDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

type ApiPayload = {
  strOrigin: string;
  strDestination: string;
  strDepartFrom: string;
  strDepartTo: string;
  strReturnFrom: string;
  strReturnTo: string;
  iAdult: number;
  iChild: number;
  iInfant: number;
  iOther: number;
  strBookingClass: string;
  strBoardingClass: string;
  strPromoCode: string;
  strLanguageCode: string;
  strOtherPassengerType: string;
  strCurrency: string;
  strTripType: string;
  strClientIP: string;
};

type ApiTestResult = {
  id: number;
  timestamp: string;
  payload: ApiPayload;
  status: "pending" | "success" | "error";
  response?: any;
  errorMessage?: string;
};

export default function ApiManagement() {
  const [form, setForm] = useState<ApiPayload>({
    strOrigin: "KTM",
    strDestination: "PKR",
    strDepartFrom: getDatePlusDays(2),
    strDepartTo: getDatePlusDays(2),
    strReturnFrom: "",
    strReturnTo: "",
    iAdult: 1,
    iChild: 0,
    iInfant: 0,
    iOther: 0,
    strBookingClass: "",
    strBoardingClass: "",
    strPromoCode: "",
    strLanguageCode: "en",
    strOtherPassengerType: "",
    strCurrency: "NPR",
    strTripType: "O",
    strClientIP: "127.0.0.1",
  });

  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);

  const formatDate = (dateStr: string) => dateStr.replace(/-/g, "");

  const formatTime = (timeNum: number) => {
    const hours = Math.floor(timeNum / 100);
    const minutes = timeNum % 100;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        ["iAdult", "iChild", "iInfant", "iOther"].includes(name)
          ? Number(value)
          : value,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ApiPayload = {
      ...form,
      strDepartFrom: formatDate(form.strDepartFrom),
      strDepartTo: formatDate(form.strDepartTo),
      strReturnFrom: form.strReturnFrom ? formatDate(form.strReturnFrom) : "",
      strReturnTo: form.strReturnTo ? formatDate(form.strReturnTo) : "",
    };

    const newTest: ApiTestResult = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      payload,
      status: "pending",
    };

    setTestResults((prev) => [newTest, ...prev]);

    try {
      const data = await getFlightAvailability(payload);

      setTestResults((prev) =>
        prev.map((test) =>
          test.id === newTest.id
            ? { ...test, status: "success", response: data }
            : test
        )
      );
    } catch (error: any) {
      setTestResults((prev) =>
        prev.map((test) =>
          test.id === newTest.id
            ? { ...test, status: "error", errorMessage: error.message }
            : test
        )
      );
    }
  };

  return (
    <div className="api-management">
      <h1>Testing API</h1>

      <form onSubmit={handleSubmit} className="api-form">
        <label>
          Origin (IATA):
          <input
            type="text"
            name="strOrigin"
            value={form.strOrigin}
            onChange={handleChange}
            maxLength={3}
            required
          />
        </label>

        <label>
          Destination (IATA):
          <input
            type="text"
            name="strDestination"
            value={form.strDestination}
            onChange={handleChange}
            maxLength={3}
            required
          />
        </label>

        <label>
          Depart From:
          <input
            type="date"
            name="strDepartFrom"
            value={form.strDepartFrom}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Depart To:
          <input
            type="date"
            name="strDepartTo"
            value={form.strDepartTo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Return From:
          <input
            type="date"
            name="strReturnFrom"
            value={form.strReturnFrom}
            onChange={handleChange}
          />
        </label>

        <label>
          Return To:
          <input
            type="date"
            name="strReturnTo"
            value={form.strReturnTo}
            onChange={handleChange}
          />
        </label>

        <label>
          Adults:
          <input
            type="number"
            name="iAdult"
            value={form.iAdult}
            onChange={handleChange}
            min={0}
            required
          />
        </label>

        <label>
          Children:
          <input
            type="number"
            name="iChild"
            value={form.iChild}
            onChange={handleChange}
            min={0}
          />
        </label>

        <label>
          Infants:
          <input
            type="number"
            name="iInfant"
            value={form.iInfant}
            onChange={handleChange}
            min={0}
          />
        </label>

        <label>
          Other Passengers:
          <input
            type="number"
            name="iOther"
            value={form.iOther}
            onChange={handleChange}
            min={0}
          />
        </label>

        <label>
          Booking Class:
          <input
            type="text"
            name="strBookingClass"
            value={form.strBookingClass}
            onChange={handleChange}
            maxLength={3}
          />
        </label>

        <label>
          Boarding Class:
          <input
            type="text"
            name="strBoardingClass"
            value={form.strBoardingClass}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Promo Code:
          <input
            type="text"
            name="strPromoCode"
            value={form.strPromoCode}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Language Code:
          <input
            type="text"
            name="strLanguageCode"
            value={form.strLanguageCode}
            onChange={handleChange}
            maxLength={5}
            required
          />
        </label>

        <label>
          Other Passenger Type:
          <input
            type="text"
            name="strOtherPassengerType"
            value={form.strOtherPassengerType}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Currency:
          <input
            type="text"
            name="strCurrency"
            value={form.strCurrency}
            onChange={handleChange}
            maxLength={5}
            required
          />
        </label>

        <label>
          Trip Type:
          <select
            name="strTripType"
            value={form.strTripType}
            onChange={handleChange}
          >
            <option value="O">One-way</option>
            <option value="R">Round-trip</option>
          </select>
        </label>

        <label>
          Client IP:
          <input
            type="text"
            name="strClientIP"
            value={form.strClientIP}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-test">
          Test API
        </button>
      </form>

      <section className="test-results">
        <h2>Test Results</h2>
        {testResults.length === 0 ? (
          <p>No tests run yet.</p>
        ) : (
          testResults.map(
            ({ id, timestamp, payload, status, response, errorMessage }) => (
              <div key={id} className={`test-result status-${status}`}>
                <h3>
                  {timestamp} — {payload.strOrigin} → {payload.strDestination} (
                  {payload.strTripType === "O" ? "One-way" : "Round-trip"})
                </h3>
                <p>
                  Passengers (A/C/I/O): {payload.iAdult} / {payload.iChild} /{" "}
                  {payload.iInfant} / {payload.iOther} | Status: {status}
                </p>

                {status === "pending" && <em>Loading...</em>}

                {status === "error" && (
                  <p className="error">Error: {errorMessage}</p>
                )}

                {status === "success" && (
                  <>
                    {/* TARA_AVAILABILITY Table */}
                    {response.TARA_AVAILABILITY &&
                      response.TARA_AVAILABILITY.length > 0 && (
                        <>
                          <h4>TARA Availability</h4>
                          <table className="availability-table">
                            <thead>
                              <tr>
                                <th>Airline</th>
                                <th>Flight No</th>
                                <th>Date</th>
                                <th>Departure</th>
                                <th>Dep. Time</th>
                                <th>Arrival</th>
                                <th>Arr. Time</th>
                                <th>Adult Fare</th>
                                <th>Currency</th>
                                <th>Baggage (kg)</th>
                                <th>Refundable</th>
                              </tr>
                            </thead>
                            <tbody>
                              {response.TARA_AVAILABILITY.map(
                                (flight: any, idx: number) => (
                                  <tr key={`tara-${idx}`}>
                                    <td>{flight.airline}</td>
                                    <td>{flight.flightNo}</td>
                                    <td>{flight.flightDate}</td>
                                    <td>{flight.departure}</td>
                                    <td>{flight.departureTime}</td>
                                    <td>{flight.arrival}</td>
                                    <td>{flight.arrivalTime}</td>
                                    <td>{flight.adultFare.toFixed(2)}</td>
                                    <td>{flight.currency}</td>
                                    <td>{flight.freeBaggage}</td>
                                    <td>{flight.refundable === "T" ? "Yes" : "No"}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </>
                      )}

                    {/* YETI_AVAILABILITY Table */}
                    {response.YETI_AVAILABILITY &&
                      response.YETI_AVAILABILITY.length > 0 && (
                        <>
                          <h4>YETI Availability</h4>
                          <table className="availability-table">
                            <thead>
                              <tr>
                                <th>Airline</th>
                                <th>Flight No</th>
                                <th>Departure</th>
                                <th>Dep. Time</th>
                                <th>Arrival</th>
                                <th>Arr. Time</th>
                                <th>Fare</th>
                                <th>Currency</th>
                                <th>Booking Class</th>
                                <th>Flight Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {response.YETI_AVAILABILITY.map(
                                (flight: any, idx: number) => (
                                  <tr key={`yeti-${idx}`}>
                                    <td>{flight.airline}</td>
                                    <td>{flight.flightNumber}</td>
                                    <td>{flight.originName}</td>
                                    <td>{flight.departureTime}</td>
                                    <td>{flight.destinationName}</td>
                                    <td>{flight.arrivalTime}</td>
                                    <td>{flight.totalAdultFare.toFixed(2)}</td>
                                    <td>{flight.currency}</td>
                                    <td>{flight.bookingClass}</td>
                                    <td>{flight.flightStatus}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </>
                      )}
                  </>
                )}
              </div>
            )
          )
        )}
      </section>
    </div>
  );
}
