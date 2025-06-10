const { Product, categories, sizes } = require('../models/Product');

function getProductCards(products, isDashboard = false) {
  return `
    <div class="products-grid">
      ${products.map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p class="description">${product.description}</p>
          <p class="price">${product.price.toFixed(2)}€</p>
          <a href="${isDashboard ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
          ${isDashboard ? `
            <a href="/dashboard/${product._id}/edit" style="margin-top:8px; background:#28a745;">Editar</a>
            <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="margin-top:6px;">
              <button style="background:#dc3545;">Eliminar</button>
            </form>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}


function getNewProductForm(categories = [], sizes = []) {
  const categoryOptions = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
  const sizeOptions = sizes.map(size => `<option value="${size}">${size}</option>`).join('');

  return `
    <h1 style="text-align:center; color:#2874f0; margin-bottom: 1rem;">Nuevo Producto</h1>
    <form action="/dashboard" method="POST" enctype="multipart/form-data" style="
      max-width: 500px; 
      margin: 0 auto; 
      background: #fff; 
      padding: 2rem; 
      border-radius: 10px; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    ">
      <label style="font-weight: 600;">Nombre del producto</label>
      <input name="name" placeholder="Nombre" required style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />

      <label style="font-weight: 600;">Imagen (sube un archivo o pega una URL)</label>
      <input type="file" name="image" accept="image/*" style="padding: 0.25rem;" />
      <input type="text" name="imageUrl" placeholder="O pega aquí la URL de la imagen" style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />

      <label style="font-weight: 600;">Descripción</label>
      <textarea name="description" placeholder="Descripción" rows="3" style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;"></textarea>

      <label style="font-weight: 600;">Categoría</label>
      <select name="category" required style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;">
        <option value="" disabled selected>Selecciona una categoría</option>
        ${categoryOptions}
      </select>

      <label style="font-weight: 600;">Tamaño</label>
      <select name="size" required style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;">
        <option value="" disabled selected>Selecciona un tamaño</option>
        ${sizeOptions}
      </select>

      <label style="font-weight: 600;">Precio (€)</label>
      <input type="number" name="price" min="0" step="0.01" required placeholder="0.00" style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />

      <button type="submit" style="
        background-color: #2874f0; 
        color: white; 
        padding: 1rem; 
        border: none; 
        border-radius: 8px; 
        font-weight: 700; 
        font-size: 1.1rem; 
        cursor: pointer;
        transition: background-color 0.3s ease;
      " onmouseover="this.style.backgroundColor='#165dc8'" onmouseout="this.style.backgroundColor='#2874f0'">
        Crear
      </button>
    </form>
  `;
}

function getEditProductForm(product, categories = [], sizes = []) {
  const categoryOptions = categories.map(cat => 
  `<option value="${cat}" ${cat === product.category ? 'selected' : ''}>${cat}</option>`
).join('');

const sizeOptions = sizes.map(size => 
  `<option value="${size}" ${size === product.size ? 'selected' : ''}>${size}</option>`
).join('');

  return `
    <h1 style="text-align:center; color:#2874f0; margin-bottom: 1rem;">Editar Producto</h1>
    <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data" style="
      max-width: 500px; 
      margin: 0 auto; 
      background: #fff; 
      padding: 2rem; 
      border-radius: 10px; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    ">
      <label style="font-weight: 600;">Nombre del producto</label>
      <input name="name" value="${product.name}" required style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />

      <label style="font-weight: 600;">Imagen actual</label>
      <img src="${product.image}" alt="${product.name}" style="width: 150px; border-radius: 6px; margin-bottom: 0.5rem;" />
      <input type="hidden" name="existingImage" value="${product.image}" />

      <label style="font-weight: 600;">Reemplazar imagen (sube un archivo o deja vacío para mantener actual)</label>
      <input type="file" name="image" accept="image/*" style="padding: 0.25rem;" />

      <label style="font-weight: 600;">O pega aquí la URL de la nueva imagen</label>
      <input type="text" name="imageUrl" placeholder="URL de la imagen" style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />

      <label style="font-weight: 600;">Descripción</label>
      <textarea name="description" rows="3" style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;">${product.description || ''}</textarea>

      <label style="font-weight: 600;">Categoría</label>
      <select name="category" required style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;">
        <option value="" disabled selected>Selecciona una categoría</option>
        ${categoryOptions}
      </select>

      <label style="font-weight: 600;">Tamaño</label>
      <select name="size" required style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;">
        <option value="" disabled selected>Selecciona un tamaño</option>
        ${sizeOptions}
      </select>

      <label style="font-weight: 600;">Precio (€)</label>
      <input type="number" name="price" value="${product.price}" min="0" step="0.01" required style="padding: 0.75rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />

      <button type="submit" style="
        background-color: #28a745; 
        color: white; 
        padding: 1rem; 
        border: none; 
        border-radius: 8px; 
        font-weight: 700; 
        font-size: 1.1rem; 
        cursor: pointer;
        transition: background-color 0.3s ease;
      " onmouseover="this.style.backgroundColor='#1e7e34'" onmouseout="this.style.backgroundColor='#28a745'">
        Actualizar
      </button>
    </form>
  `;
}


function getProductDetail(product, isDashboard = false) {
  return `
    <div style="
      max-width: 600px; 
      margin: 2rem auto; 
      padding: 2rem; 
      background: #fff; 
      border-radius: 12px; 
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
    ">
      <h1 style="color: #2874f0; margin-bottom: 1rem;">${product.name}</h1><p>Tamaño: ${product.size}</p>

      <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;" />
      
      <p style="font-size: 1.1rem; color: #555; margin-bottom: 1rem;">${product.description || 'Sin descripción disponible.'}</p>
      
      <p style="font-size: 1.3rem; font-weight: 700; color: #222; margin-bottom: 2rem;">Precio: ${product.price.toFixed(2)} €</p>
      
      ${isDashboard ? `
        <div style="display: flex; justify-content: center; gap: 1rem;">
          <a href="/dashboard/${product._id}/edit" style="
            padding: 0.75rem 1.5rem;
            background-color: #2874f0;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease;
          " onmouseover="this.style.backgroundColor='#165dc8'" onmouseout="this.style.backgroundColor='#2874f0'">
            Editar
          </a>

          <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="display:inline;">
            <button type="submit" style="
              padding: 0.75rem 1.5rem;
              background-color: #dc3545;
              color: white;
              border: none;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.3s ease;
            " onmouseover="this.style.backgroundColor='#a71d2a'" onmouseout="this.style.backgroundColor='#dc3545'">
              Eliminar
            </button>
          </form>
        </div>
      ` : ''}
    </div>
  `;
}


module.exports = { getProductCards, getNewProductForm, getEditProductForm, getProductDetail };
