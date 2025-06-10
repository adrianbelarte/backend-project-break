const getNavBar = require('./getNavBar');

function renderPage(content, req, currentCategory = '') {
  const isDashboard = req.originalUrl.startsWith('/dashboard');
  const currentPath = req.path;

  return baseHtml +
    getNavBar(isDashboard, req.session.user, currentCategory, currentPath) +
    content;
}

module.exports = renderPage;
