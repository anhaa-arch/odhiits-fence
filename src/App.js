import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

function App() {
  const [fences, setFences] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/fences')
      .then(res => res.json())
      .then(data => setFences(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <h1>Хашааны сонголтууд</h1>
      {fences.map(fence => (
        <div key={fence._id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{fence.name}</h2>
          <p>Суулгалтгүй үнэ: {fence.prices.no_installation.toLocaleString()}₮</p>
          <p>Суулгалттай үнэ: {fence.prices.with_installation.toLocaleString()}₮</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default App;
