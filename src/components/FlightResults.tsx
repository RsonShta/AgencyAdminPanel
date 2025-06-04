import React from 'react';

export type FlightOption = {
  flightId: string;
  fareId: string;
  originCode: string;
  destinationCode: string;
};

const FlightResults: React.FC<{
  results: FlightOption[];
  onSelect: (flight: FlightOption) => void;
}> = ({ results, onSelect }) => {
  return (
    <div>
      <h3>Select a Flight</h3>
      <ul>
        {results.map((flight, idx) => (
          <li key={idx}>
            {flight.originCode} → {flight.destinationCode}
            <button onClick={() => onSelect(flight)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightResults;
