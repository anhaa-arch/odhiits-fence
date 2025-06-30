import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import AnonymousReview from '../components/AnonymousReview';
import ProductReviews from '../components/ProductReviews';
import API_URL from '../api/config';

function GateDetail() {
  const { id } = useParams();
  const [gate, setGate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/gates/${id}`)
      .then(res => res.json())
      .then(data => {
        setGate(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Уншиж байна...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!gate) {
    return <div className="text-center py-8">Хаалга олдсонгүй</div>;
  }

  // Create a translation map for materials
  const materialTranslations = {
    frame: 'Хүрээ',
    panel: 'Самбар',
    support: 'Багана',
  };

  // Handle both single 'image' string and 'images' array
  const imageList = gate.images || (gate.image ? [gate.image] : []);
  const hasImages = imageList.length > 0;

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div>
              {hasImages ? (
                <>
                  {/* Main Image Display */}
                  <div className="aspect-w-4 aspect-h-3 mb-4">
                    <img
                      src={imageList[selectedImage]}
                      alt={gate.name || gate.type}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  {/* Thumbnail Gallery */}
                  {imageList.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {imageList.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                            selectedImage === index ? 'ring-2 ring-green-500' : ''
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${gate.name || gate.type} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Зураг олдсонгүй</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{gate.type}</h1>
              
              {/* Prices */}
              {gate.prices && (
                <div className="bg-green-50 rounded-lg shadow-inner p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-green-800">Үнийн мэдээлэл</h2>
                  <div className="space-y-3">
                    <p className="flex justify-between items-center text-lg">
                      <span>Суурилуулалтгүй:</span>
                      <span className="font-bold text-green-700">{gate.prices.no_installation.toLocaleString()}₮</span>
                    </p>
                    <p className="flex justify-between items-center text-lg">
                      <span>Суурилуулалттай:</span>
                      <span className="font-bold text-green-700">{gate.prices.with_installation.toLocaleString()}₮</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Materials & Size */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Материал</h2>
                <ul className="space-y-2">
                  {gate.size && (
                    <li className="flex justify-between">
                      <span>Хэмжээ:</span>
                      <span className="text-gray-700">{gate.size}</span>
                    </li>
                  )}
                  {gate.materials && Object.entries(gate.materials).map(([key, value]) => (
                    <li key={key} className="flex justify-between capitalize">
                      <span>{materialTranslations[key] || key}:</span>
                      <span className="text-gray-700">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              {gate.description && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Дэлгэрэнгүй мэдээлэл</h2>
                  <p className="whitespace-pre-line">{gate.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Сэтгэгдлүүд</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnonymousReview productId={id} productType="gate" />
              <ProductReviews productId={id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default GateDetail; 