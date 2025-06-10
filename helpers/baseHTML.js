const getNavBar = require('./getNavBar');

const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Mi Tienda</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f8f8;
      margin: 0; padding: 0;
    }
    main {
      max-width: 1000px;
      margin: 20px auto;
      padding: 20px;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    h1 {
      color: #222;
      font-weight: 700;
      margin-bottom: 20px;
    }
    img {
      max-width: 100%;
      border-radius: 6px;
      margin-bottom: 15px;
    }
    p {
      font-size: 16px;
      color: #555;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    input, select, button {
      font-size: 16px;
      padding: 8px 12px;
      margin: 6px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 100%;
      box-sizing: border-box;
    }
    button {
      background-color: #2874f0;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: 700;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #165dc8;
    }
    form {
      max-width: 400px;
    }
    a {
      color: #2874f0;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    /* Más estilos que quieras para navbar, tarjetas, etc */
  </style>
</head>
<body>
`;

const baseFooter = `
</body>
</html>
`;

/**
 * @param {string} content HTML del contenido principal (dentro de <main>)
 * @param {object} req Objeto request para obtener sesión y URL
 * @returns HTML completo renderizado con navbar y estructura completa
 */
function renderPage(content, req) {
  const isDashboard = req.originalUrl.startsWith('/dashboard');
  return baseHtml + getNavBar(isDashboard, req.session.user) + `<main>` + content + `</main>` + baseFooter;
}

module.exports = renderPage;
