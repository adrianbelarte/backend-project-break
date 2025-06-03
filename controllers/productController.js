const { Product, categories, sizes } = require('../models/Product');
const baseHtml = require('../helpers/baseHtml');
const getNavBar = require('../helpers/getNavBar');
const { getProductCards } = require('../helpers/template');

exports.showProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send('Producto no encontrado');

  const isDashboard = req.originalUrl.startsWith('/dashboard');

  const html = baseHtml +
    getNavBar(isDashboard, req.session.user) +  `
    <h1>${product.name}</h1>
    <img src="${product.image}" />
    <p>${product.description}</p>
    <p>${product.price}€</p>
    ${isDashboard ? `
      <a href="/dashboard/${product._id}/edit">Editar</a>
      <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
        <button>Eliminar</button>
      </form>
    ` : ''}
  `;
  res.send(html);
};

exports.showNewProduct = (req, res) => {
  const isDashboard = req.originalUrl.startsWith('/dashboard');  

  const categoryOptions = categories.map(cat => `<option>${cat}</option>`).join('');
  const sizeOptions = sizes.map(size => `<option>${size}</option>`).join('');

  const html = baseHtml +
    getNavBar(isDashboard, req.session.user) +    
    `
    <h1>Nuevo Producto</h1>
    <form action="/dashboard" method="POST">
      <input name="name" placeholder="Nombre" required />
      <input name="image" placeholder="URL de imagen" />
      <input name="description" placeholder="Descripción" />
      
      <select name="category" required>
        ${categoryOptions}
      </select>
      
      <select name="size" required>
        ${sizeOptions}
      </select>
      
      <input type="number" name="price" min="0" step="0.01" required />
      <button>Crear</button>
    </form>
    `;

  res.send(html);
};


exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    const products = await Product.find();
    const html = baseHtml +
      getNavBar(true, req.session.user) +
      `<p style="color:green;">Producto creado correctamente</p>` +
      getProductCards(products, true) +
      getNewProductForm() +
      `</body></html>`;

    res.send(html);
  } catch (error) {
    res.status(500).send('Error creando producto');
  }
};


exports.showEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);

  const categoryOptions = categories
    .map(cat => `<option${cat === product.category ? ' selected' : ''}>${cat}</option>`)
    .join('');
  const sizeOptions = sizes
    .map(size => `<option${size === product.size ? ' selected' : ''}>${size}</option>`)
    .join('');

  const html = baseHtml +
    getNavBar(true, req.session.user) +  
    `
    <h1>Editar Producto</h1>
    <form action="/dashboard/${product._id}?_method=PUT" method="POST">
      <input name="name" value="${product.name}" />
      <input name="image" value="${product.image}" />
      <input name="description" value="${product.description}" />
      
      <select name="category" required>
        ${categoryOptions}
      </select>
      
      <select name="size" required>
        ${sizeOptions}
      </select>
      
      <input name="price" value="${product.price}" />
      <button>Actualizar</button>
    </form>
    `;

  res.send(html);
};


exports.updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.productId, req.body);
  res.redirect(`/dashboard/${req.params.productId}`);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.redirect('/dashboard');
};

exports.showProducts = async (req, res) => {
  const isDashboard = req.originalUrl.startsWith('/dashboard');
  const filter = req.query.category ? { category: req.query.category } : {};
  const products = await Product.find(filter);

  const html = baseHtml +
    getNavBar(isDashboard, req.session.user) +
    getProductCards(products, isDashboard);

  res.send(html);
};
