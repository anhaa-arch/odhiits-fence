// Fence detail screen

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import AnonymousReview from '../components/AnonymousReview';
import ProductReviews from '../components/ProductReviews';

function FenceDetail() {
  const { id } = useParams();
  const [fence, setFence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Create a translation map for materials
  const materialTranslations = {
    savx: 'Савх',
    dai: 'Дай',
    shon: 'Шон'
  };

  useEffect(() => {
    fetch(`http://localhost:5000/fences/${id}`)
      .then(res => res.json())
      .then(data => {
        setFence(data);
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

  if (!fence) {
    return <div className="text-center py-8">Хашаа олдсонгүй</div>;
  }

  // Handle both single 'image' string and 'images' array
  const imageList = fence.images || (fence.image ? [fence.image] : []);
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
                      alt={fence.name}
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
                            alt={`${fence.name} - ${index + 1}`}
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
              <h1 className="text-3xl font-bold mb-4">{fence.name}</h1>
              
              {/* Prices */}
              {fence.prices && (
                <div className="bg-green-50 rounded-lg shadow-inner p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-green-800">Үнийн мэдээлэл</h2>
                  <div className="space-y-3">
                    <p className="flex justify-between items-center text-lg">
                      <span>Суурилуулалтгүй:</span>
                      <span className="font-bold text-green-700">{fence.prices.no_installation.toLocaleString()}₮</span>
                    </p>
                    <p className="flex justify-between items-center text-lg">
                      <span>Суурилуулалттай:</span>
                      <span className="font-bold text-green-700">{fence.prices.with_installation.toLocaleString()}₮</span>
                    </p>
                    {fence.unit && <p className="text-sm text-gray-600 text-right">Нэгж: {fence.unit}</p>}
                  </div>
                </div>
              )}

              {/* Materials */}
              {fence.materials && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Материал</h2>
                  <ul className="space-y-2">
                    {Object.entries(fence.materials).map(([key, value]) => (
                      <li key={key} className="flex justify-between capitalize">
                        <span>{materialTranslations[key] || key}:</span>
                        <span className="text-gray-700">{value.size} (Зузаан: {value.thickness}мм)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              {fence.description && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Дэлгэрэнгүй мэдээлэл</h2>
                  <p className="whitespace-pre-line">{fence.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Сэтгэгдлүүд</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnonymousReview productId={id} productType="fence" />
              <ProductReviews productId={id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FenceDetail; 