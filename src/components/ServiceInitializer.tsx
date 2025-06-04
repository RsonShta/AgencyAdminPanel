import React, { useEffect } from 'react';
import axios from 'axios';

const ServiceInitializer: React.FC<{ onInitialized: () => void }> = ({ onInitialized }) => {
  useEffect(() => {
    axios.post('/api/service/initialize', {
      strAgencyCode: "TESTAPI",
      strUserName: "TESTAPI",
      strPassword: "APITEST@123NP@@",
      strLanguageCode: "en"
    }).then(() => {
      onInitialized();
    }).catch(console.error);
  }, []);

  return <p>Initializing service...</p>;
};

export default ServiceInitializer;
