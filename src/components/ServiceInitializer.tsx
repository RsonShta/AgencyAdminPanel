// src/components/ServiceInitializer.tsx

import React, { useEffect } from 'react';
import axios from 'axios';

interface Props {
  onInitialized: () => void;
}

const ServiceInitializer: React.FC<Props> = ({ onInitialized }) => {
  useEffect(() => {
    const agency = {
      agencyCode: 'TESTAPI',
      userName: 'TESTAPI',
      password: 'APITEST@123NP@@',
    };

    axios.post('http://localhost:8446/api/flight/ServiceIntialize', {
      strAgencyCode: agency.agencyCode,
      strUserName: agency.userName,
      strPassword: agency.password,
      strLanguageCode: 'en',
    })
      .then(() => {
        console.log("Service initialized successfully");
        onInitialized();
      })
      .catch((err) => {
        console.error("Failed to initialize service:", err.response?.data || err.message || err);
        alert("Failed to initialize service. Please try again.");
      });
  }, [onInitialized]);

  return <p>Initializing service...</p>;
};

export default ServiceInitializer;
