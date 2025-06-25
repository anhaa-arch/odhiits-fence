// Fences list screen

import Header from '../components/header';
import Footer from '../components/footer';
import FenceCard from '../components/FenceCard';
import { useEffect, useState } from 'react';
import { getFences } from '../api/fenceApi';

function Fences() {
  const [fences, setFences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFences()
      .then(setFences)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">Хашааны жагсаалт</h1>
        <p className="text-center text-gray-600 mb-8">Манайд байгаа бүх төрлийн хашааны сонголтууд</p>
        {loading && <div className="text-center">Уншиж байна...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fences.map(fence => (
            <FenceCard key={fence._id} product={{...fence, productType: 'fence'}} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Fences; 