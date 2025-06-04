import React, { useState } from 'react';

export type SearchInput = {
  strOrigin: string;
  strDestination: string;
  strDepartFrom: string;
  iAdult: number;
  iChild: number;
  iInfant: number;
};

const FlightSearchForm: React.FC<{ onSearch: (input: SearchInput) => void }> = ({ onSearch }) => {
  const [form, setForm] = useState<SearchInput>({
    strOrigin: 'KTM',
    strDestination: 'PKR',
    strDepartFrom: '20250606',
    iAdult: 1,
    iChild: 0,
    iInfant: 0,
  });

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSearch(form);
    }}>
      <input value={form.strOrigin} onChange={e => setForm({ ...form, strOrigin: e.target.value })} placeholder="Origin" />
      <input value={form.strDestination} onChange={e => setForm({ ...form, strDestination: e.target.value })} placeholder="Destination" />
      <input type="date" onChange={e => {
        const date = e.target.value.replace(/-/g, '');
        setForm({ ...form, strDepartFrom: date });
      }} />
      <input type="number" min={1} value={form.iAdult} onChange={e => setForm({ ...form, iAdult: parseInt(e.target.value) })} />
      <button type="submit">Search</button>
    </form>
  );
};

export default FlightSearchForm;
