const { Product, categories, sizes } = require('../models/Product');

function getProductCards(products, isDashboard = false) {
  return `
    <div style="display:grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 1rem; background:#f5f7fa; padding:1.5rem; border-radius:12px;">
      ${products.map(product => `
        <div style="
          background: #fff;
          padding: 1.25rem; 
          border-radius: 12px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
          transition: transform 0.3s ease;
        " onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;" />
          <h2 style="color:#2563eb; font-size: 1.3rem; margin-bottom: 0.5rem;">${product.name}</h2>
          <p style="font-size: 1rem; color:#555; margin-bottom: 0.7rem;">${product.description}</p>
          <p style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">${product.price.toFixed(2)} €</p>
          <a href="${isDashboard ? `/dashboard/${product._id}` : `/products/${product._id}`}" style="
            text-decoration: none; 
            color: white; 
            background-color: #2563eb; 
            padding: 0.6rem 1.2rem; 
            border-radius: 8px;
            font-weight: 700;
            box-shadow: 0 4px 10px rgba(37,99,235,0.3);
            transition: background-color 0.3s ease;
            margin-bottom: 0.8rem;
            display: inline-block;
          " onmouseover="this.style.backgroundColor='#1e40af'; this.style.boxShadow='0 6px 14px rgba(30,64,175,0.5)'" onmouseout="this.style.backgroundColor='#2563eb'; this.style.boxShadow='0 4px 10px rgba(37,99,235,0.3)'">Ver detalle</a>
          ${isDashboard ? `
            <a href="/dashboard/${product._id}/edit" style="
              margin-top: 8px; 
              background: #10b981; 
              color: white; 
              padding: 0.6rem 1.2rem; 
              border-radius: 8px;
              text-decoration: none;
              font-weight: 700;
              box-shadow: 0 4px 10px rgba(16,185,129,0.3);
              display: inline-block;
              transition: background-color 0.3s ease;
            " onmouseover="this.style.backgroundColor='#047857'; this.style.boxShadow='0 6px 14px rgba(4,120,87,0.5)'" onmouseout="this.style.backgroundColor='#10b981'; this.style.boxShadow='0 4px 10px rgba(16,185,129,0.3)'">Editar</a>
            <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="margin-top: 6px;">
              <button style="
                background: #ef4444; 
                color: white; 
                padding: 0.6rem 1.2rem; 
                border: none; 
                border-radius: 8px; 
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(239,68,68,0.3);
                transition: background-color 0.3s ease;
              " onmouseover="this.style.backgroundColor='#b91c1c'; this.style.boxShadow='0 6px 14px rgba(185,28,28,0.5)'" onmouseout="this.style.backgroundColor='#ef4444'; this.style.boxShadow='0 4px 10px rgba(239,68,68,0.3)'">Eliminar</button>
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
    <h1 style="text-align:center; color:#2563eb; margin-bottom: 1.5rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 700;">Nuevo Producto</h1>
    <form action="/dashboard" method="POST" enctype="multipart/form-data" style="
      max-width: 520px; 
      margin: 0 auto; 
      background: #fff; 
      padding: 2rem 2.5rem; 
      border-radius: 12px; 
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #222;
    ">
      <label style="font-weight: 700;">Nombre del producto</label>
      <input name="name" placeholder="Nombre" required style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;" />

      <label style="font-weight: 700;">Imagen (pega una URL)</label>
      <input type="text" name="imageUrl" placeholder="pega aquí la URL de la imagen" style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;" />

      <label style="font-weight: 700;">Descripción</label>
      <textarea name="description" placeholder="Descripción" rows="4" style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white; resize: vertical;"></textarea>

      <label style="font-weight: 700;">Categoría</label>
      <select name="category" required style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;">
        <option value="" disabled selected>Selecciona una categoría</option>
        ${categoryOptions}
      </select>

      <label style="font-weight: 700;">Tamaño</label>
      <select name="size" required style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;">
        <option value="" disabled selected>Selecciona un tamaño</option>
        ${sizeOptions}
      </select>

      <label style="font-weight: 700;">Precio (€)</label>
      <input type="number" name="price" min="0" step="0.01" required placeholder="0.00" style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;" />

      <button type="submit" style="
        background-color: #2563eb; 
        color: white; 
        padding: 1rem 0; 
        border: none; 
        border-radius: 10px; 
        font-weight: 700; 
        font-size: 1.2rem; 
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
        transition: background-color 0.3s ease;
      " onmouseover="this.style.backgroundColor='#1e40af'; this.style.boxShadow='0 7px 18px rgba(30, 64, 175, 0.6)'" onmouseout="this.style.backgroundColor='#2563eb'; this.style.boxShadow='0 5px 15px rgba(37, 99, 235, 0.4)'">
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
    <h1 style="text-align:center; color:#2563eb; margin-bottom: 1.5rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 700;">Editar Producto</h1>
    <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data" style="
      max-width: 520px; 
      margin: 0 auto; 
      background: #fff; 
      padding: 2rem 2.5rem; 
      border-radius: 12px; 
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #222;
    ">
      <label style="font-weight: 700;">Nombre del producto</label>
      <input name="name" value="${product.name}" required style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;" />

      <label style="font-weight: 700;">Imagen actual</label>
      <img src="${product.image}" alt="${product.name}" style="width: 150px; border-radius: 10px; margin-bottom: 0.75rem;" />
      <input type="hidden" name="existingImage" value="${product.image}" />

      <label style="font-weight: 700;">pega aquí la URL de la nueva imagen</label>
      <input type="text" name="imageUrl" placeholder="URL de la imagen" style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;" />

      <label style="font-weight: 700;">Descripción</label>
      <textarea name="description" rows="4" style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white; resize: vertical;">${product.description || ''}</textarea>

      <label style="font-weight: 700;">Categoría</label>
      <select name="category" required style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;">
        <option value="" disabled>Selecciona una categoría</option>
        ${categoryOptions}
      </select>

      <label style="font-weight: 700;">Tamaño</label>
      <select name="size" required style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;">
        <option value="" disabled>Selecciona un tamaño</option>
        ${sizeOptions}
      </select>

      <label style="font-weight: 700;">Precio (€)</label>
      <input type="number" name="price" value="${product.price}" min="0" step="0.01" required style="padding: 0.85rem; border-radius: 8px; border: 1.5px solid #ccc; font-size: 1rem; color: #222; background-color: white;" />

      <button type="submit" style="
        background-color: #10b981; 
        color: white; 
        padding: 1rem 0; 
        border: none; 
        border-radius: 10px; 
        font-weight: 700; 
        font-size: 1.2rem; 
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
        transition: background-color 0.3s ease;
      " onmouseover="this.style.backgroundColor='#047857'; this.style.boxShadow='0 7px 18px rgba(4, 120, 87, 0.6)'" onmouseout="this.style.backgroundColor='#10b981'; this.style.boxShadow='0 5px 15px rgba(16, 185, 129, 0.4)'">
        Actualizar
      </button>
    </form>
  `;
}


function getProductDetail(product, isDashboard = false) {
  return `
    <div style="
      max-width: 620px; 
      margin: 2.5rem auto; 
      padding: 2.5rem 3rem; 
      background: #fff; 
      border-radius: 14px; 
      box-shadow: 0 8px 25px rgba(0,0,0,0.09);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      color: #222;
    ">
      <h1 style="color: #2563eb; margin-bottom: 1.5rem; font-weight: 700;">${product.name}</h1>
      <p style="font-size: 1.1rem; margin-bottom: 1.2rem; font-weight: 600;">Tamaño: ${product.size}</p>

      <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto; border-radius: 14px; margin-bottom: 2rem;" />
      
      <p style="font-size: 1rem; margin-bottom: 2rem; color: #555;">${product.description}</p>

      <p style="font-size: 1.5rem; font-weight: 700; margin-bottom: 2rem;">Precio: ${product.price.toFixed(2)} €</p>

      <a href="javascript:history.back()" style="
        text-decoration: none;
        background-color: #2563eb;
        color: white;
        padding: 0.8rem 1.8rem;
        border-radius: 10px;
        font-weight: 700;
        box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
        transition: background-color 0.3s ease;
        margin-right: 1rem;
        display: inline-block;
      " onmouseover="this.style.backgroundColor='#1e40af'; this.style.boxShadow='0 7px 18px rgba(30, 64, 175, 0.6)'" onmouseout="this.style.backgroundColor='#2563eb'; this.style.boxShadow='0 5px 15px rgba(37, 99, 235, 0.4)'">Volver</a>

      ${isDashboard ? `
        <a href="/dashboard/${product._id}/edit" style="
          background-color: #10b981;
          color: white;
          padding: 0.8rem 1.8rem;
          border-radius: 10px;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
          transition: background-color 0.3s ease;
          margin-right: 1rem;
          display: inline-block;
        " onmouseover="this.style.backgroundColor='#047857'; this.style.boxShadow='0 7px 18px rgba(4, 120, 87, 0.6)'" onmouseout="this.style.backgroundColor='#10b981'; this.style.boxShadow='0 5px 15px rgba(16, 185, 129, 0.4)'">Editar</a>
        <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="display:inline-block;">
          <button style="
            background-color: #ef4444;
            color: white;
            padding: 0.8rem 1.8rem;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
            transition: background-color 0.3s ease;
          " onmouseover="this.style.backgroundColor='#b91c1c'; this.style.boxShadow='0 7px 18px rgba(185, 28, 28, 0.6)'" onmouseout="this.style.backgroundColor='#ef4444'; this.style.boxShadow='0 5px 15px rgba(239, 68, 68, 0.4)'">Eliminar</button>
        </form>
      ` : ''}
    </div>
  `;
}


module.exports = { getProductCards, getNewProductForm, getEditProductForm, getProductDetail };
