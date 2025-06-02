const express = require('express');
const request = require('supertest');
const productController = require('../controllers/productController');
const Product = require('../models/Product');

// Mock de modelo
jest.mock('../models/Product');

// App express para test
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas simuladas del dashboard
app.get('/dashboard', productController.showProducts);
app.get('/dashboard/new', productController.showNewProduct);  
app.get('/dashboard/:id', productController.showProductById);
app.get('/dashboard/:id/edit', productController.showEditProduct);
app.post('/dashboard', productController.createProduct);
app.put('/dashboard/:id', productController.updateProduct);
app.delete('/dashboard/:id/delete', productController.deleteProduct);

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /dashboard → muestra productos', async () => {
    const fakeProducts = [{ name: 'Camisa' }, { name: 'Zapato' }];
    Product.find.mockResolvedValue(fakeProducts);

    const res = await request(app).get('/dashboard');

    expect(res.status).toBe(200);
    expect(res.text).toContain('Camisa');
    expect(res.text).toContain('Zapato');
  });

  test('GET /dashboard/:id → muestra producto por id', async () => {
    const fakeProduct = {
      _id: '1',
      name: 'Camiseta',
      image: 'img.jpg',
      description: 'Bonita camiseta',
      price: 10.99,
    };

    Product.findById.mockResolvedValue(fakeProduct);

    const res = await request(app).get('/dashboard/1');

    expect(res.status).toBe(200);
    expect(res.text).toContain('Camiseta');
    expect(res.text).toContain('10.99');
  });

  test('GET /dashboard/new → muestra formulario nuevo', async () => {
    const res = await request(app).get('/dashboard/new');

    expect(res.status).toBe(200);
    expect(res.text).toContain('Nuevo Producto');
    expect(res.text).toContain('<form');
  });

  test('POST /dashboard → crea un producto', async () => {
    const body = {
      name: 'Pantalón',
      image: 'img.jpg',
      description: 'Cómodo',
      category: 'Pantalones',
      size: 'L',
      price: 29.99,
    };

    Product.create.mockResolvedValue({ _id: 'abc123', ...body });

    const res = await request(app)
      .post('/dashboard')
      .send(body);

    expect(Product.create).toHaveBeenCalledWith(body);
    expect(res.status).toBe(302); // redirección
    expect(res.headers.location).toBe('/dashboard');
  });

  test('GET /dashboard/:id/edit → muestra formulario edición', async () => {
    const fakeProduct = {
      _id: '1',
      name: 'Camisa',
      image: 'img.jpg',
      description: 'Bonita camisa',
      category: 'Camisetas',
      size: 'M',
      price: 25,
    };

    Product.findById.mockResolvedValue(fakeProduct);

    const res = await request(app).get('/dashboard/1/edit');

    expect(res.status).toBe(200);
    expect(res.text).toContain('Editar Producto');
    expect(res.text).toContain('Camisa');
  });

  test('PUT /dashboard/:id → actualiza un producto', async () => {
    Product.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .put('/dashboard/1')
      .send({ name: 'Camisa actualizada' });

    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { name: 'Camisa actualizada' }
    );
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/dashboard');
  });

  test('DELETE /dashboard/:id/delete → elimina un producto', async () => {
    Product.findByIdAndDelete.mockResolvedValue({});

    const res = await request(app).delete('/dashboard/1/delete');

    expect(Product.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/dashboard');
  });
});
