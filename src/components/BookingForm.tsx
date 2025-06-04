import React, { useState } from 'react';

const BookingForm: React.FC<{
  session: any;
  onSubmitBooking: (form: any) => void;
}> = ({ session, onSubmitBooking }) => {
  const [form, setForm] = useState({
    TitleRcd: "Mr",
    FirstName: "Test",
    LastName: "Test",
    MiddleName: "Test",
    Gender: "M",
    Nationality: "IN",
    ContactName: "APPLE",
    Email: "sksdf@gmail.com",
    PhoneMobile: "9745948214",
    CountryRcd: "NP",
    AddressLine1: "KTM",
    FormofPayment: "CRAGT",
    PassengerId: session.passengerId,
    BookingId: session.bookingId,
    CurrencyRcd: "NPR",
    NumberOfAdults: session.noOfAdults,
    NumberOfChildren: session.noOfChildren,
    NumberOfInfants: session.noOfInfants,
    LanguageRcd: "en",
    PhoneHome: "IT",
    PhoneBusiness: "yETIiT",
    City: "66444D051416c",
    CreateName: "Website",
    AddressLine2: "KTM",
    FormofPayment_SubType: ""
  });

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmitBooking(form);
    }}>
      <input placeholder="First Name" value={form.FirstName} onChange={e => setForm({ ...form, FirstName: e.target.value })} />
      <input placeholder="Last Name" value={form.LastName} onChange={e => setForm({ ...form, LastName: e.target.value })} />
      <input placeholder="Email" value={form.Email} onChange={e => setForm({ ...form, Email: e.target.value })} />
      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
