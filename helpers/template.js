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

function getNewProductForm() {
  const categoryOptions = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
  const sizeOptions = sizes.map(size => `<option value="${size}">${size}</option>`).join('');

  return `
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
}

module.exports = { getProductCards, getNewProductForm };
