const categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];

function getNavBar(isDashboard = false, user = null) {
  const basePath = isDashboard ? '/dashboard' : '/products';
  const categoryLinks = categories.map(cat =>
    `<a href="${basePath}?category=${encodeURIComponent(cat)}">${cat}</a>`
  ).join(' | ');

  return `
    <nav style="background:#f3f3f3;padding:10px;overflow:auto;">
      <div style="float:left;">
        <a href="${isDashboard ? '/dashboard' : '/'}">Inicio</a> |
        ${categoryLinks}
        ${isDashboard && user ? '| <a href="/dashboard/new">Nuevo Producto</a>' : ''}
      </div>
      <div style="float:right;">
        ${user ? `
          Bienvenido, ${user.username} |
          <form style="display:inline;" action="/logout" method="POST">
            <button>Logout</button>
          </form>
        ` : `
          <a href="/login">Login</a>
        `}
      </div>
    </nav>
    <hr/>
  `;
}

module.exports = getNavBar;
