module.exports = function getLoginForm(errorMessage = '') {
  const errorHtml = errorMessage
    ? `<p style="color: red; text-align: center;">${errorMessage}</p>`
    : '';

  return `
    <main style="
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      background: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
    ">
      <h1 style="text-align: center; color: #333;">Iniciar sesión</h1>
      ${errorHtml}
      <form method="POST" action="/login" style="display: flex; flex-direction: column; gap: 1rem;">
        <input name="username" placeholder="Usuario" required
          style="padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 4px;" />
        <input name="password" type="password" placeholder="Contraseña" required
          style="padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 4px;" />
        <button type="submit" style="
          padding: 0.7rem;
          font-size: 1rem;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">
          Entrar
        </button>
      </form>
    </main>
  `;
};
