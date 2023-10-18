import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Axios() {
  const [userData, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://api.weatherapi.com/v1/current.json?key=528b3cad4f4042fc9c7200522231809&q=India&aqi=yes'
      )
      .then((response) => {
        console.log(response);
        setData([response.data]);
      })
      .catch((error) => {
        console.error('Axios Error:', error);
      });
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  };

  const locationStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const temperatureStyle = {
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>Weather Information</h1>
      {userData.length > 0 ? (
        userData.map((data) => (
          <div key={data.location.name} style={{ marginBottom: '20px' }}>
            <h2 style={locationStyle}>{data.location.name}</h2>
            <p style={temperatureStyle}>
              Current Temp: {data.current.temp_c}°C
            </p>
            <p>Condition: {data.current.condition.text}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Axios;
