import React, { useState, useEffect } from 'react';

function AllData() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace with your backend API endpoint
        const response = await fetch('https://aqueous-lowlands-43473-b4c6f58d4156.herokuapp.com/account/all');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const accounts = await response.json();
        setData(JSON.stringify(accounts, null, 2)); // Format data for better readability
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
        console.error('Error fetching data: ', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h5>All Data in Store:</h5>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <pre>{data}</pre>}
    </>
  );
}

export default AllData;


