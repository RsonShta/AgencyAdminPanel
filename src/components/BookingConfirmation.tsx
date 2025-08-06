import React from "react";

export default function BookingConfirmation({ details }: { details: any }) {
  if (!details) {
    console.log("BookingConfirmation: no details provided");
    return <p>Booking details not available.</p>;
  }

  return (
    <div className="booking-confirmation">
      <h2>🎉 Booking Confirmed!</h2>
      <p><strong>Confirmation ID:</strong> {details.confirmationId || "MOCK-ID-12345"}</p>
      <p>
        <strong>Passenger:</strong>{" "}
        {(details.passenger?.FirstName ?? details.FirstName ?? "N/A") + " " + (details.passenger?.LastName ?? details.LastName ?? "")}
      </p>
      <p>
        <strong>Flight:</strong>{" "}
        {(details.flight?.originCode ?? details.originCode ?? "N/A")} → {(details.flight?.destinationCode ?? details.destinationCode ?? "N/A")}
      </p>
      <p>
        <strong>Booked At:</strong>{" "}
        {details.bookedAt ? new Date(details.bookedAt).toLocaleString() : "N/A"}
      </p>
      <p>Thank you for booking with us. Safe travels!</p>
    </div>
  );
}
