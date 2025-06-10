const dotenv = require('dotenv');
dotenv.config();
const renderPage = require('../helpers/baseHtml');
const getLoginForm = require('../helpers/getLoginForm');

const USERNAME = process.env.AUTH_USERNAME;
const PASSWORD = process.env.AUTH_PASSWORD;

exports.showLoginForm = (req, res) => {
  const html = renderPage(getLoginForm(), req);
  res.send(html);
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    req.session.user = { username };
    console.log('Sesión iniciada para:', username);
    return res.redirect('/dashboard');
  }

  const html = renderPage(getLoginForm('Credenciales inválidas'), req);
  res.send(html);
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
