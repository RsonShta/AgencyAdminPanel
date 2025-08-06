import { useState } from "react";

export default function FlightSearchForm({ onSearch }: { onSearch: (params: any) => void }) {
  const [form, setForm] = useState({
    strOrigin: "KTM",
    strDestination: "PKR",
    strDepartFrom: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    strDepartTo: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    strReturnFrom: "",
    strReturnTo: "",
    iAdult: 1,
    iChild: 0,
    iInfant: 0,
    strLanguageCode: "en",
    strCurrency: "NPR",
    strTripType: "O",
    strClientIP: "127.0.0.1",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      ...form,
      strDepartFrom: form.strDepartFrom.replace(/-/g, ""),
      strDepartTo: form.strDepartTo ? form.strDepartTo.replace(/-/g, "") : form.strDepartFrom.replace(/-/g, ""),
      strReturnFrom: form.strReturnFrom ? form.strReturnFrom.replace(/-/g, "") : "",
      strReturnTo: form.strReturnTo ? form.strReturnTo.replace(/-/g, "") : "",
      iInfant: form.iInfant || 0,
      strTripType: form.strReturnFrom ? "R" : "O",
      strPromoCode: "",
      strBookingClass: "",
      strBoardingClass: "",
      strOtherPassengerType: "",
    };
    onSearch(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flight-search-form">
      <label>
        From (IATA)
        <input name="strOrigin" value={form.strOrigin} onChange={handleChange} placeholder="From (IATA)" />
      </label>

      <label>
        To (IATA)
        <input name="strDestination" value={form.strDestination} onChange={handleChange} placeholder="To (IATA)" />
      </label>

      <label>
        Departure From
        <input type="date" name="strDepartFrom" value={form.strDepartFrom} onChange={handleChange} />
      </label>

      <label>
        Departure To
        <input type="date" name="strDepartTo" value={form.strDepartTo} onChange={handleChange} />
      </label>

      <label>
        Return From
        <input type="date" name="strReturnFrom" value={form.strReturnFrom} onChange={handleChange} />
      </label>

      <label>
        Return To
        <input type="date" name="strReturnTo" value={form.strReturnTo} onChange={handleChange} />
      </label>

      <label>
        Adults
        <input type="number" name="iAdult" value={form.iAdult} onChange={handleChange} placeholder="Adults" />
      </label>

      <label>
        Children
        <input type="number" name="iChild" value={form.iChild} onChange={handleChange} placeholder="Children" />
      </label>

      <label>
        Infants
        <input type="number" name="iInfant" value={form.iInfant} onChange={handleChange} placeholder="Infants" />
      </label>

      <button type="submit">Search Flights</button>
    </form>
  );
}
