const categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];

function getNavBar(isDashboard = false, user = null, currentCategory = '', currentPath = '') {
  const basePath = isDashboard ? '/dashboard' : '/products';

  const categoryLinks = categories.map(cat => {
    const isActive = currentCategory === cat;
    return `
      <a href="${basePath}?category=${encodeURIComponent(cat)}"
         class="${isActive ? 'active' : ''}">
        ${cat}
      </a>`;
  }).join('');

  const isInicioActive = currentPath === '/' || currentPath === '/dashboard';
  const isNuevoActive = currentPath === '/dashboard/new';

  return `
    <nav>
      <a href="${isDashboard ? '/dashboard' : '/'}" class="logo">🔥 Tienda Anime</a>
      <div class="categories">
        ${categoryLinks}
        ${isDashboard && user ? `
          <a href="/dashboard/new" class="${isNuevoActive ? 'active' : ''}">+ Nuevo</a>` : ''}
      </div>
      <div class="actions">
        ${
          user
            ? `
              <span class="user">👾 ${user.username}</span>
              <form action="/logout" method="POST" style="margin:0;">
                <button type="submit" class="logout">Salir</button>
              </form>`
            : `<a href="/login" class="login">Entrar</a>`
        }
      </div>
    </nav>
  `;
}

module.exports = getNavBar;
