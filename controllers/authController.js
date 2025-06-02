// controllers/authController.js
require('dotenv').config();

// Mostrar el formulario de login
exports.showLoginForm = (req, res) => {
  const error = req.query.error || '';
  const html = `
    <h1>Login administrador</h1>
    ${error ? `<p style="color:red;">${error}</p>` : ''}
    <form method="POST" action="/login">
      <label>Usuario: <input type="text" name="username" /></label><br/>
      <label>Contraseña: <input type="password" name="password" /></label><br/>
      <button type="submit">Entrar</button>
    </form>
  `;
  res.send(html);
};

// Procesar el login
exports.login = (req, res) => {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (username === adminUser && password === adminPass) {
    // Almacena un usuario en la sesión (clave usada por el middleware)
    req.session.user = { username };
    res.redirect('/dashboard');
  } else {
    res.redirect('/login?error=Credenciales+incorrectas');
  }
};

// Logout (destruye la sesión)
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
