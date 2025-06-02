function getProductCards(products) {
  return `
    <div class="products">
      ${products.map(p => `
        <div>
          <img src="${p.image}" width="150"/>
          <h2>${p.name}</h2>
          <p>${p.price}€</p>
          <a href="/products/${p._id}">Ver más</a>
        </div>
      `).join('')}
    </div>
  `;
}

module.exports = { getProductCards };
