const mongoose = require('mongoose');

const validCategories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL'];

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String, required: true },
  category:    { type: String, enum: validCategories, required: true },
  size:        { type: String, enum: validSizes, required: true },
  price:       { type: Number, required: true, min: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
