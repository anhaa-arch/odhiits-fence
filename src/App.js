import React, { useEffect, useState } from 'react';

function App() {
  const [fences, setFences] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/fences')
      .then(res => res.json())
      .then(data => setFences(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Хашааны сонголтууд</h1>
      {fences.map(fence => (
        <div key={fence._id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{fence.name}</h2>
          <p>Суулгалтгүй үнэ: {fence.prices.no_installation.toLocaleString()}₮</p>
          <p>Суулгалттай үнэ: {fence.prices.with_installation.toLocaleString()}₮</p>
        </div>
      ))}
    </div>
  );
}

export default App;
