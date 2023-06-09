import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [numbers, setNumbers] = useState(null);
  const url = 'http://localhost:8008/numbers?url=http://104.211.219.98/numbers/prime&url=http://104.211.219.98/numbers/fibo&url=http://104.211.219.98/numbers/odd';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setNumbers(response.data);
      } catch (error) {
        console.error('An error occurred while retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Number Management Service</h1>
      {numbers ? (
        <div>
          <h2>Primes:</h2>
          <ul>
            {numbers.primes.map((prime, index) => (
              <li key={index}>{prime}</li>
            ))}
          </ul>
          <h2>Odds:</h2>
          <ul>
            {numbers.odds.map((odd, index) => (
              <li key={index}>{odd}</li>
            ))}
          </ul>
          <h2>Fibonacci Numbers:</h2>
          <ul>
            {numbers.fibos.map((fib, index) => (
              <li key={index}>{fib}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
