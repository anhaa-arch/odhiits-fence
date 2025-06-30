import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=";

function PublicReview() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/reviews?type=public`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim() || !name.trim()) return;

    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          content: newReview.trim(),
          rating,
          type: 'public',
          createdAt: new Date().toISOString()
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Сэтгэгдэл нэмэхэд алдаа гарлаа');
      }

      const savedReview = await res.json();
      setReviews([savedReview, ...reviews]);
      setNewReview('');
      setName('');
      setRating(5);
    } catch (err) {
      setError(err.message);
    }
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className={`text-2xl ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Хэрэглэгчдийн сэтгэгдэл</h2>
      
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Таны нэр
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Нэрээ оруулна уу"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Үнэлгээ
          </label>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <div className="mb-4">
          <label htmlFor="review" className="block text-gray-700 font-medium mb-2">
            Таны сэтгэгдэл
          </label>
          <textarea
            id="review"
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="4"
            placeholder="Манай үйлчилгээний талаар сэтгэгдлээ бичнэ үү"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition duration-300"
        >
          Сэтгэгдэл нэмэх
        </button>
      </form>
      
      {error && (
        <div className="mb-4 text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="text-center text-gray-600">Уншиж байна...</div>
      ) : reviews.length === 0 && !error ? (
        <div className="text-center text-gray-600">Одоогоор сэтгэгдэл алга байна.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicReview; 