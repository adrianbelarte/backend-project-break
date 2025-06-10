const categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];

function getNavBar(isDashboard = false, user = null, currentCategory = '', currentPath = '') {
  const basePath = isDashboard ? '/dashboard' : '/products';

  const categoryLinks = categories.map(cat => {
    const isActive = currentCategory === cat;
    return `
      <a href="${basePath}?category=${encodeURIComponent(cat)}"
         style="
           margin: 0 0.4rem;
           padding: 0.4rem 0.8rem;
           border-radius: 20px;
           text-decoration: none;
           background-color: ${isActive ? '#007BFF' : '#e0e0e0'};
           color: ${isActive ? 'white' : '#333'};
           font-weight: ${isActive ? 'bold' : 'normal'};
           transition: background-color 0.3s ease;
         ">
        ${cat}
      </a>`;
  }).join('');

  const isInicioActive = currentPath === '/' || currentPath === '/dashboard';
  const isNuevoActive = currentPath === '/dashboard/new';

  return `
    <nav style="
      background: #ffffff;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Segoe UI', sans-serif;
      border-bottom: 1px solid #ddd;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    ">
      <div style="flex: 1; text-align: left;">
        <a href="${isDashboard ? '/dashboard' : '/'}" style="
          font-size: 1.3rem;
          font-weight: bold;
          color: ${isInicioActive ? '#007BFF' : '#222'};
          text-decoration: none;
        ">🛍️ Tienda Moda</a>
      </div>

      <div style="flex: 2; text-align: center;">
        ${categoryLinks}
        ${isDashboard && user ? `
          <a href="/dashboard/new" style="
            margin-left: 1rem;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            background-color: ${isNuevoActive ? '#28a745' : '#e0e0e0'};
            color: ${isNuevoActive ? 'white' : '#333'};
            font-weight: bold;
            text-decoration: none;
          ">+ Nuevo</a>` : ''}
      </div>

      <div style="flex: 1; text-align: right;">
        ${
          user
            ? `👤 ${user.username}
               <form action="/logout" method="POST" style="display:inline;">
                 <button style="
                   background: #dc3545;
                   color: white;
                   border: none;
                   padding: 0.4rem 0.8rem;
                   border-radius: 20px;
                   cursor: pointer;
                   margin-left: 1rem;
                 ">Salir</button>
               </form>`
            : `<a href="/login" style="
                 background: #007BFF;
                 color: white;
                 padding: 0.4rem 0.8rem;
                 border-radius: 20px;
                 text-decoration: none;
                 font-weight: bold;
               ">Entrar</a>`
        }
      </div>
    </nav>
  `;
}

module.exports = getNavBar;
