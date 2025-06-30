import Header from '../components/header';
import Footer from '../components/footer';
import FenceCard from '../components/FenceCard';
import { useEffect, useState } from 'react';
import { fetchGates } from '../api/fenceApi';

function Gates() {
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGates()
      .then(setGates)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">Хаалганы жагсаалт</h1>
        <p className="text-center text-gray-600 mb-8">Манайд байгаа бүх төрлийн хаалганы сонголтууд</p>
        {loading && <div className="text-center">Уншиж байна...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gates.map(gate => (
            <FenceCard key={gate._id} product={{...gate, productType: 'gate'}} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Gates; 