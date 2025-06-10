const getNavBar = require('./getNavBar');

function renderPage(content, req, currentCategory = '') {
  const isDashboard = req.originalUrl.startsWith('/dashboard');
  const currentPath = req.path;
  const user = req.session ? req.session.user : null; // <-- aquí evitamos error

  return baseHtml +
    getNavBar(isDashboard, user, currentCategory, currentPath) +
    content;
}


module.exports = renderPage;
