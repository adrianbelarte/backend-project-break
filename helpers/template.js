const { categories, sizes } = require('../models/Product');

function getProductCards(products, isDashboard = false) {
  return products.map(product => `
    <div class="product-card" style="border:1px solid #ccc; padding:10px; margin:10px;">
      <img src="${product.image}" alt="${product.name}" style="width:100px;height:auto;" />
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>${product.price}€</p>
      <a href="${isDashboard ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
      ${isDashboard ? `
        <br/>
        <a href="/dashboard/${product._id}/edit">Editar</a>
        <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="display:inline;">
          <button>Eliminar</button>
        </form>
      ` : ''}
    </div>
  `).join('');
}

function getNewProductForm(categories = [], sizes = []) {
  const categoryOptions = categories.map(cat => `<option>${cat}</option>`).join('');
  const sizeOptions = sizes.map(size => `<option>${size}</option>`).join('');

  return `
    <h1>Nuevo Producto</h1>
    <form action="/dashboard" method="POST" enctype="multipart/form-data">
      <input name="name" placeholder="Nombre" required />
      
      <label>Imagen (sube un archivo o pega una URL):</label>
      <input type="file" name="image" accept="image/*" />
      <input type="text" name="imageUrl" placeholder="O pega aquí la URL de la imagen" />

      <input name="description" placeholder="Descripción" />
      <select name="category" required>${categoryOptions}</select>
      <select name="size" required>${sizeOptions}</select>
      <input type="number" name="price" min="0" step="0.01" required />
      <button>Crear</button>
    </form>
  `;
}


function getEditProductForm(product) {
  const categoryOptions = categories.map(cat =>
    `<option value="${cat}" ${cat === product.category ? 'selected' : ''}>${cat}</option>`
  ).join('');

  const sizeOptions = sizes.map(size =>
    `<option value="${size}" ${size === product.size ? 'selected' : ''}>${size}</option>`
  ).join('');

  return `
    <h1>Editar Producto</h1>
    <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data">
      <input name="name" value="${product.name}" required />
      <label>Imagen actual:</label>
      <img src="${product.image}" alt="${product.name}" width="150" />
      <input type="hidden" name="existingImage" value="${product.image}" />
      <label>Reemplazar imagen:</label>
      <input type="file" name="image" accept="image/*" />
      <input name="description" value="${product.description}" />
      <select name="category">${categoryOptions}</select>
      <select name="size">${sizeOptions}</select>
      <input type="number" name="price" value="${product.price}" min="0" step="0.01" required />
      <button>Actualizar</button>
    </form>
  `;
}


function getProductDetail(product, isDashboard = false) {
  return `
    <h1>${product.name}</h1>
    <img src="${product.image}" alt="${product.name}" />
    <p>${product.description}</p>
    <p>${product.price}€</p>
    ${isDashboard ? `
      <a href="/dashboard/${product._id}/edit">Editar</a>
      <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
        <button>Eliminar</button>
      </form>
    ` : ''}
  `;
}



module.exports = { getProductCards, getNewProductForm, getEditProductForm, getProductDetail };
