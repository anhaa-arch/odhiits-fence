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
    const loadGates = async () => {
      try {
        setLoading(true);
        const data = await fetchGates();
        if (Array.isArray(data) && data.length > 0) {
          setGates(data);
        } else {
          setError('Хаалганы мэдээлэл олдсонгүй');
        }
      } catch (err) {
        console.error('Failed to fetch gates:', err);
        setError('Хаалганы мэдээлэл ачаалахад алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    loadGates();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">Хаалганы жагсаалт</h1>
        <p className="text-center text-gray-600 mb-8">Манайд байгаа бүх төрлийн хаалганы сонголтууд</p>
        
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center text-red-500 py-4 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        
        {!loading && !error && gates.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Одоогоор хаалганы мэдээлэл оруулаагүй байна
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gates.map(gate => (
            <FenceCard 
              key={gate._id} 
              product={{
                ...gate,
                name: gate.type || gate.name, // Use type if name is not available
                productType: 'gate',
                image: gate.image || '/images/gate1.jpg' // Fallback image if none provided
              }} 
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Gates; 