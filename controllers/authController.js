const dotenv = require('dotenv');
dotenv.config();
const baseHtml = require('../helpers/baseHtml');
const getNavBar = require('../helpers/getNavBar');

const USERNAME = process.env.AUTH_USERNAME;
const PASSWORD = process.env.AUTH_PASSWORD;

exports.showLoginForm = (req, res) => {
  const isDashboard = false; // No es dashboard
  const html = baseHtml +
    getNavBar(isDashboard, req.session.user) +
    `
    <h1>Iniciar sesión</h1>
    <form method="POST" action="/login">
      <input name="username" placeholder="Usuario" required />
      <input name="password" placeholder="Contraseña" type="password" required />
      <button>Entrar</button>
    </form>
    </body></html>
  `;
  res.send(html);
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.user = { username };
    console.log('Sesión iniciada para:', username);
    return res.redirect('/dashboard');
  }

  res.send('<p>Credenciales inválidas. <a href="/login">Intenta de nuevo</a></p>');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
