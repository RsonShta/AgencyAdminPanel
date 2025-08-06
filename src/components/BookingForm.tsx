import React, { useState } from "react";

interface BookingFormProps {
  flight: any;
  onBook: (passengerInfo: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ flight, onBook }) => {
  const [formData, setFormData] = useState({
    TitleRcd: "Mr",
    FirstName: "",
    LastName: "",
    Gender: "M",
    Nationality: "NP",
    Email: "",
    PhoneMobile: "",
    City: "",
    AddressLine1: "",
    AddressLine2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("BookingForm handleSubmit payload:", formData);
    const payload = {
      ...formData,
      PassengerType: "ADULT",
      DocumentNumber: "",
      DocumentType: "",
      PassportNumber: "",
      PassengerId: "093e280f-0eba-4030-aa46-4f93be6a9a51",
      BookingId: "d0d6615a-8cd2-4132-bf92-0826130c1121",
      CurrencyRcd: "NPR",
      NumberOfAdults: 1,
      NumberOfChildren: 0,
      NumberOfInfants: 0,
      LanguageRcd: "en",
      ContactName: formData.FirstName,
      PhoneHome: "IT",
      PhoneBusiness: "yETIiT",
      CreateName: "Website",
      CountryRcd: "NP",
      FormofPayment: "CRAGT",
      FormofPayment_SubType: "",
    };

    onBook(payload);
  };

  return (
    <div className="booking-form">
      <div className="selected-flight-details">
        <h3>Selected Flight</h3>
        <p>
          <strong>Flight Number:</strong> {flight.flightNumber || "N/A"}
        </p>
        <p>
          <strong>From:</strong> {flight.from || flight.originCode} &nbsp;
          <strong>To:</strong> {flight.to || flight.destinationCode}
        </p>
        <p>
          <strong>Price:</strong> {flight.price || "N/A"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Passenger Information</h2>

        <label>
          Title:
          <select name="TitleRcd" value={formData.TitleRcd} onChange={handleChange}>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
        </label>

        <label>
          First Name:
          <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} required />
        </label>

        <label>
          Last Name:
          <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
        </label>

        <label>
          Phone:
          <input type="text" name="PhoneMobile" value={formData.PhoneMobile} onChange={handleChange} required />
        </label>

        <label>
          Nationality:
          <input type="text" name="Nationality" value={formData.Nationality} onChange={handleChange} required />
        </label>

        <label>
          City:
          <input type="text" name="City" value={formData.City} onChange={handleChange} required />
        </label>

        <label>
          Address Line 1:
          <input type="text" name="AddressLine1" value={formData.AddressLine1} onChange={handleChange} required />
        </label>

        <label>
          Address Line 2:
          <input type="text" name="AddressLine2" value={formData.AddressLine2} onChange={handleChange} required />
        </label>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
