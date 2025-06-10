const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const productController = require('../controllers/productController');

jest.mock('../models/Product', () => {
  const mockSave = jest.fn();

  const ProductMock = function (data) {
    return { ...data, save: mockSave };
  };

  ProductMock.find = jest.fn();
  ProductMock.findById = jest.fn();
  ProductMock.create = jest.fn();
  ProductMock.findByIdAndUpdate = jest.fn();
  ProductMock.findByIdAndDelete = jest.fn();

  return {
    Product: ProductMock,
    categories: ['Camisetas', 'Pantalones'],
    sizes: ['S', 'M', 'L'],
    __esModule: true,
  };
});

const { Product, categories, sizes } = require('../models/Product');

// Aquí mockeamos los helpers para que Jest pueda detectar llamadas a sus funciones
jest.mock('../helpers/baseHtml', () => jest.fn(() => '<html></html>'));

jest.mock('../helpers/template', () => ({
  getProductCards: jest.fn(() => '<div>Cards</div>'),
  getNewProductForm: jest.fn(() => '<form>New</form>'),
  getEditProductForm: jest.fn(() => '<form>Edit</form>'),
  getProductDetail: jest.fn(() => '<div>Detail</div>'),
}));

const renderPage = require('../helpers/baseHtml');
const {
  getProductCards,
  getNewProductForm,
  getEditProductForm,
  getProductDetail,
} = require('../helpers/template');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para simular sesión de usuario en req.session
app.use((req, res, next) => {
  req.session = { user: { name: 'TestUser', id: '123' } };
  next();
});

app.get('/dashboard', productController.showProducts);
app.get('/dashboard/new', productController.showNewProduct);
app.get('/dashboard/:productId', productController.showProductById);
app.get('/dashboard/:productId/edit', productController.showEditProduct);
app.post('/dashboard', productController.createProduct);
app.put('/dashboard/:productId', productController.updateProduct);
app.delete('/dashboard/:productId/delete', productController.deleteProduct);

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /dashboard → muestra productos', async () => {
    Product.find.mockResolvedValue([{ name: 'Camisa' }, { name: 'Zapato' }]);

    const res = await request(app).get('/dashboard');

    expect(res.status).toBe(200);
    expect(getProductCards).toHaveBeenCalled();
    expect(renderPage).toHaveBeenCalled();
  });

  test('GET /dashboard/:id → muestra producto por id', async () => {
    Product.findById.mockResolvedValue({ _id: '1', name: 'Camiseta' });

    const res = await request(app).get('/dashboard/1');

    expect(res.status).toBe(200);
    expect(getProductDetail).toHaveBeenCalled();
    expect(renderPage).toHaveBeenCalled();
  });

  test('GET /dashboard/:id → 404 si no existe', async () => {
    Product.findById.mockResolvedValue(null);

    const res = await request(app).get('/dashboard/999');

    expect(res.status).toBe(404);
    expect(res.text).toContain('Producto no encontrado');
  });

  test('GET /dashboard/new → muestra formulario nuevo', async () => {
    const res = await request(app).get('/dashboard/new');

    expect(res.status).toBe(200);
    expect(getNewProductForm).toHaveBeenCalled();
    expect(renderPage).toHaveBeenCalled();
  });

  test('POST /dashboard → crea un producto (url)', async () => {
    const productInstance = new Product({
      name: 'Pantalón',
      imageUrl: 'https://img.com/img.jpg',
      description: 'Cómodo',
      category: 'Pantalones',
      size: 'L',
      price: 29.99,
    });

    productInstance.save.mockResolvedValueOnce();

    const res = await request(app).post('/dashboard').send({
      name: 'Pantalón',
      imageUrl: 'https://img.com/img.jpg',
      description: 'Cómodo',
      category: 'Pantalones',
      size: 'L',
      price: 29.99,
    });

    expect(productInstance.save).toHaveBeenCalled();
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/dashboard');
  });

  test('GET /dashboard/:id/edit → muestra edición', async () => {
    Product.findById.mockResolvedValue({ _id: '1', name: 'Camisa', category: 'Camisetas', size: 'M' });

    const res = await request(app).get('/dashboard/1/edit');

    expect(res.status).toBe(200);
    expect(getEditProductForm).toHaveBeenCalled();
    expect(renderPage).toHaveBeenCalled();
  });

  test('PUT /dashboard/:id → actualiza un producto', async () => {
    Product.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app).put('/dashboard/1').send({
      name: 'Actualizado',
      description: 'Desc',
      category: 'Camisetas',
      size: 'L',
      price: 10,
      imageUrl: 'https://img.com/img.jpg',
    });

    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('1', expect.objectContaining({ name: 'Actualizado' }));
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/dashboard');
  });

  test('DELETE /dashboard/:id/delete → elimina un producto', async () => {
    Product.findByIdAndDelete.mockResolvedValue({});

    const res = await request(app).delete('/dashboard/1/delete');

    expect(Product.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toBe(302);
  });
});
