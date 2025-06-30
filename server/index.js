const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const Fence = require('./models/fence');
const Gate = require('./models/gate');
const Order = require('./models/order');
const Review = require('./models/review');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const dbURI = process.env.MONGO_URI;


mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

app.get('/fences', async (req, res) => {
  try {
    const fences = await Fence.find();
    // Map data to the format expected by the frontend
    const formattedFences = fences.map(f => ({
      _id: f._id,
      name: f.name,
      image: f.image,
      prices: f.prices, // Send both prices
      unit: f.unit,
      productType: 'fence'
    }));
    res.json(formattedFences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/fences/:id', async (req, res) => {
  try {
    const fence = await Fence.findById(req.params.id);
    if (!fence) {
      return res.status(404).json({ message: 'Fence not found' });
    }
    res.json(fence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/gates', async (req, res) => {
  try {
    const gates = await Gate.find();
    // Map data to the format expected by the frontend
    const formattedGates = gates.map(g => ({
      _id: g._id,
      name: g.type, // Use 'type' as name for gates
      image: g.image,
      prices: g.prices, // Send both prices
      productType: 'gate'
    }));
    res.json(formattedGates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/gates/:id', async (req, res) => {
  try {
    const gate = await Gate.findById(req.params.id);
    if (!gate) {
      return res.status(404).json({ message: 'Gate not found' });
    }
    res.json(gate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generic Product CRUD endpoints
// CREATE
app.post('/products', async (req, res) => {
  const { productType, ...data } = req.body;
  const Model = productType === 'fence' ? Fence : Gate;
  try {
    const newProduct = new Model(data);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Бүтээгдэхүүн үүсгэхэд алдаа гарлаа', error });
  }
});

// UPDATE
app.patch('/products/:id', async (req, res) => {
  const { productType, ...data } = req.body;
  const Model = productType === 'fence' ? Fence : Gate;
  try {
    const updatedProduct = await Model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Бүтээгдэхүүн олдсонгүй' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Бүтээгдэхүүн засахад алдаа гарлаа', error });
  }
});

// DELETE
app.delete('/products/:id', async (req, res) => {
  const { productType } = req.query; 
  if (!productType || !['fence', 'gate'].includes(productType)) {
    return res.status(400).json({ message: 'Invalid or missing productType' });
  }
  const Model = productType === 'fence' ? Fence : Gate;
  try {
    const deletedProduct = await Model.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      // Try finding in the other model as a fallback
      const OtherModel = productType === 'fence' ? Gate : Fence;
      const foundInOther = await OtherModel.findById(req.params.id);
      if (foundInOther) {
        return res.status(400).json({ message: `Product found in wrong collection (${productType})` });
      }
      return res.status(404).json({ message: 'Бүтээгдэхүүн олдсонгүй' });
    }
    res.json({ message: 'Бүтээгдэхүүн амжилттай устгагдлаа' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Бүтээгдэхүүн устгахад алдаа гарлаа', error: error.message });
  }
});

// Orders API
app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Захиалга үүсгэхэд алдаа гарлаа', error });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Захиалгуудыг авахад алдаа гарлаа' });
  }
});

app.patch('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Захиалгыг засахад алдаа гарлаа' });
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Захиалга устгагдлаа' });
  } catch (error) {
    res.status(400).json({ message: 'Захиалгыг устгахад алдаа гарлаа' });
  }
});

// Reviews API
app.get('/reviews', async (req, res) => {
  try {
    const { type, productId } = req.query;
    const query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (productId) {
      query.productId = productId;
    }
    
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/reviews', async (req, res) => {
  try {
    const { name, content, rating, type, productId, productModel } = req.body;
    let reviewData;

    if (type === 'public') {
      reviewData = { name, content, rating, type };
    } else if (type === 'product') {
      reviewData = { name, content, rating, type, productId, productModel };
    } else {
      return res.status(400).json({ message: "Invalid review type specified." });
    }

    const review = new Review(reviewData);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(400).json({ message: `Review save failed: ${err.message}` });
  }
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ filename: req.file.filename });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер ${PORT} дээр ажиллаж байна`));
