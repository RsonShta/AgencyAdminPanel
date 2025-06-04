import React from 'react';

const BookingConfirmation: React.FC<{ bookingNumber: string }> = ({ bookingNumber }) => {
  return (
    <div>
      <h2>Booking Confirmed!</h2>
      <p>Your booking number is: <strong>{bookingNumber}</strong></p>
    </div>
  );
};

export default BookingConfirmation;
