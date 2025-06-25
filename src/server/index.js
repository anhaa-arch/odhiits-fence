app.post('/reviews', async (req, res) => {
  try {
    const { name, content, rating, type, productId, productModel } = req.body;
    let reviewData;

    if (type === 'public') {
      // For public reviews, only save essential fields
      reviewData = { name, content, rating, type };
    } else if (type === 'product' && productId && productModel) {
      // For product reviews, save all relevant fields
      reviewData = { name, content, rating, type, productId, productModel };
    } else {
      // If the type is invalid or missing required fields for product review
      return res.status(400).json({ message: "Invalid review type or missing product information." });
    }

    const review = new Review(reviewData);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(400).json({ message: `Review save failed: ${err.message}` });
  }
});

// Fences API
// ... rest of the file ... 