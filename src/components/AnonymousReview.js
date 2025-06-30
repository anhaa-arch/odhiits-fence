import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AnonymousReview({ productId, productType, onReviewAdded }) {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim() || !name.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          content: review.trim(),
          rating,
          type: 'product',
          productId,
          productModel: productType.charAt(0).toUpperCase() + productType.slice(1),
          createdAt: new Date().toISOString()
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Сэтгэгдэл нэмэхэд алдаа гарлаа');
      }

      const savedReview = await res.json();
      setName('');
      setReview('');
      setRating(5);
      onReviewAdded?.(savedReview);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Сэтгэгдэл үлдээх</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Таны нэр
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="4"
            placeholder={`${productType === 'fence' ? 'Хашааны' : 'Хаалганы'} талаар сэтгэгдлээ бичнэ үү`}
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Илгээж байна...' : 'Сэтгэгдэл нэмэх'}
        </button>
      </form>
    </div>
  );
}

export default AnonymousReview; 