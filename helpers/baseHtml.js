const getNavBar = require('./getNavBar');

const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Tienda Anime</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0f0f0f;
      margin: 0; padding: 0;
      color: #e0e0e0;
      line-height: 1.6;
    }

    main {
      max-width: 1100px;
      margin: 30px auto;
      padding: 20px;
      background: #1a1a1a;
      border-radius: 10px;
      box-shadow: 0 10px 20px rgba(255,255,255,0.05);
    }

    h1 {
      font-weight: 700;
      color: #ffcc00;
      margin-bottom: 20px;
      font-size: 2.2rem;
      text-align: center;
    }

    a {
      color: #00b4ff;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    a:hover {
      color: #0090cc;
      text-decoration: underline;
    }

    input, select, button, textarea {
      font-family: inherit;
      font-size: 1rem;
      padding: 12px 15px;
      margin: 8px 0;
      border-radius: 8px;
      border: 1px solid #444;
      background: #222;
      color: #eee;
      width: 100%;
      transition: border-color 0.3s ease;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #00b4ff;
      box-shadow: 0 0 5px rgba(0, 180, 255, 0.5);
    }

    button {
      background-color: #e50914;
      color: white;
      border: none;
      font-weight: 700;
      cursor: pointer;
      border-radius: 8px;
      padding: 14px;
      width: auto;
      min-width: 120px;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #b0060f;
    }

    form {
      max-width: 450px;
      margin: 0 auto;
    }

    nav {
      background: #1a1a1a;
      padding: 1rem 2rem;
      box-shadow: 0 2px 8px rgba(255,255,255,0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 999;
    }

    nav .logo {
      font-weight: 900;
      font-size: 1.5rem;
      color: #ffcc00;
      user-select: none;
      text-decoration: none;
    }

    nav .categories {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
      flex: 2;
    }

    nav .categories a {
      padding: 8px 16px;
      border-radius: 30px;
      background-color: #1e1e2f;
      color: #00b4ff;
      font-weight: 600;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    nav .categories a.active,
    nav .categories a:hover {
      background-color: #00b4ff;
      color: #0f0f0f;
    }

    nav .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
      justify-content: flex-end;
    }

    nav .actions span.user {
      font-weight: 600;
      color: #ccc;
      user-select: none;
    }

    nav .actions a,
    nav .actions form button {
      padding: 8px 18px;
      border-radius: 30px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      text-decoration: none;
      display: inline-block;
      transition: background-color 0.3s ease;
    }

    nav .actions a.login {
      background-color: #00b4ff;
      color: #0f0f0f;
    }
    nav .actions a.login:hover {
      background-color: #0090cc;
    }

    nav .actions form button.logout {
      background-color: #e50914;
      color: white;
    }
    nav .actions form button.logout:hover {
      background-color: #b0060f;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .product-card {
      background: #222;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(255,255,255,0.05);
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.3s ease;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(255,255,255,0.08);
    }

    .product-card img {
      max-width: 160px;
      border-radius: 10px;
      margin-bottom: 12px;
      object-fit: cover;
    }

    .product-card h2 {
      font-size: 1.2rem;
      margin: 8px 0;
      color: #ffcc00;
    }

    .product-card p.description {
      font-size: 0.9rem;
      color: #aaa;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .product-card p.price {
      font-weight: 700;
      color: #00b4ff;
      margin: 10px 0;
      font-size: 1.1rem;
    }

    .product-card a, .product-card button {
      margin-top: auto;
      padding: 10px 14px;
      border-radius: 30px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      background-color: #e50914;
      color: white;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .product-card a:hover, .product-card button:hover {
      background-color: #b0060f;
    }

    @media (max-width: 600px) {
      nav {
        flex-direction: column;
        align-items: flex-start;
      }
      nav .categories {
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: 8px;
        flex: unset;
      }
      nav .actions {
        justify-content: flex-start;
        margin-top: 10px;
        width: 100%;
      }
      form {
        max-width: 100%;
        padding: 0 10px;
      }
    }
  </style>
</head>
<body>
`;

const baseFooter = `
</body>
</html>
`;

function renderPage(content, req) {
  const isDashboard = req.originalUrl.startsWith('/dashboard');
  return baseHtml + getNavBar(isDashboard, req.session.user) + `<main>` + content + `</main>` + baseFooter;
}

module.exports = renderPage;
