module.exports = function getLoginForm(errorMessage = '') {
  const errorHtml = errorMessage
    ? `<p style="color: #dc3545; text-align: center; font-weight: 700;">${errorMessage}</p>`
    : '';

  return `
    <main style="
      max-width: 400px;
      margin: 2rem auto;
      padding: 1.5rem;
      background: #121212;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(255, 69, 0, 0.6);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #eee;
    ">
      <h1 style="text-align: center; color: #ffcc00;">Iniciar sesión</h1>
      ${errorHtml}
      <form method="POST" action="/login" style="display: flex; flex-direction: column; gap: 1rem;">
        <input name="username" placeholder="Usuario" required
          style="
            padding: 0.6rem;
            font-size: 1rem;
            border: 1px solid #444;
            border-radius: 6px;
            background-color: #222;
            color: #eee;
          " />
        <input name="password" type="password" placeholder="Contraseña" required
          style="
            padding: 0.6rem;
            font-size: 1rem;
            border: 1px solid #444;
            border-radius: 6px;
            background-color: #222;
            color: #eee;
          " />
        <button type="submit" style="
          padding: 0.8rem;
          font-size: 1rem;
          background-color: #ff3300;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 700;
          transition: background-color 0.3s ease;
        " onmouseover="this.style.backgroundColor='#cc2900';" onmouseout="this.style.backgroundColor='#ff3300';">
          Entrar
        </button>
      </form>
    </main>
  `;
};
