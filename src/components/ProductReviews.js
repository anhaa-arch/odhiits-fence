import { useState, useEffect } from 'react';

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=";

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/reviews?type=product&productId=${productId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div className="text-center text-gray-600 py-8">Уншиж байна...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          Одоогоор сэтгэгдэл алга байна.
        </div>
      ) : (
        reviews.map((review, index) => (
          <div key={review._id || index} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <img
                src={`${DEFAULT_AVATAR}${review.name}`}
                alt={review.name}
                className="w-12 h-12 rounded-full bg-gray-200"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{review.name}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('mn-MN')}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 whitespace-pre-line">{review.content}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductReviews; 