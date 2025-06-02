// models/Product.js

const mongoose = require('mongoose');

const categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  category: { type: String, enum: categories },
  size: { type: String, enum: sizes },
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, categories, sizes };
