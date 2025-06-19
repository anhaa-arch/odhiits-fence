const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Fence = require('./models/fence');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB холбогдлоо'))
  .catch(err => console.error(err));

app.get('/fences', async (req, res) => {
  try {
    const fences = await Fence.find();
    res.json(fences);
  } catch (error) {
    res.status(500).json({ message: 'Алдаа гарлаа' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер ${PORT} дээр ажиллаж байна`));
