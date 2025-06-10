const { Product, categories, sizes } = require('../models/Product');
const renderPage = require('../helpers/baseHtml');
const { getProductCards, getNewProductForm, getEditProductForm, getProductDetail } = require('../helpers/template');
const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');

exports.showProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send('Producto no encontrado');

  const isDashboard = req.originalUrl.startsWith('/dashboard');
  const content = getProductDetail(product, isDashboard);

  res.send(renderPage(content, req));
};

exports.showNewProduct = (req, res) => {
  const content = getNewProductForm(categories, sizes);
  res.send(renderPage(content, req));
};

exports.createProduct = async (req, res) => {
  try {
    let imageUrl = '';

    if (req.body.imageUrl && req.body.imageUrl.trim() !== '') {
      // Si se pasa URL, usarla directamente
      imageUrl = req.body.imageUrl.trim();
    } else if (req.file) {
      // Si hay archivo, subirlo a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      // Eliminar archivo temporal local si usas multer con almacenamiento local
      // Si usas multer-storage-cloudinary, no hace falta borrar archivo local
      // fs.unlinkSync(req.file.path);
    }

    const newProductData = {
      ...req.body,
      image: imageUrl,
    };

    const newProduct = new Product(newProductData);
    await newProduct.save();

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creando producto');
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).send('Error eliminando producto');
  }
};

exports.showProducts = async (req, res) => {
  const isDashboard = req.originalUrl.startsWith('/dashboard');
  const filter = req.query.category ? { category: req.query.category } : {};
  const products = await Product.find(filter);

  const content = getProductCards(products, isDashboard);

  res.send(renderPage(content, req));
};

exports.showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send('Producto no encontrado');

    const content = getEditProductForm(product, categories, sizes); // ← AQUÍ el cambio
    res.send(renderPage(content, req));
  } catch (error) {
    console.error('Error al mostrar formulario de edición:', error);
    res.status(500).send('Error interno al cargar el formulario');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    let imageUrl = req.body.existingImage; // imagen por defecto (la actual)

    if (req.file) {
      // Si suben archivo, subimos a Cloudinary y usamos esa imagen
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } else if (req.body.imageUrl && req.body.imageUrl.trim() !== '') {
      // Si ponen URL, la usamos
      imageUrl = req.body.imageUrl.trim();
    }
    // Sino mantenemos existingImage

    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      size: req.body.size,
      price: req.body.price,
      image: imageUrl,
    };

    await Product.findByIdAndUpdate(productId, updatedData);

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).send('Error actualizando producto');
  }
};

