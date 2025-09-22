// 載入商品資料
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    window.allProducts = products;
    initCategorySelect(products);
    displayProducts(products);

    // 綁定搜尋與分類的事件
    document.getElementById('searchInput').addEventListener('input', () => {
      filterAndDisplay();
    });
    document.getElementById('categorySelect').addEventListener('change', () => {
      filterAndDisplay();
    });
  });

function initCategorySelect(products) {
  const cats = Array.from(new Set(products.map(p => p.category)));
  const sel = document.getElementById('categorySelect');
  cats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    sel.appendChild(opt);
  });
}

function displayProducts(products) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h2>${p.title}</h2>
      <p class="price">NT$ ${p.price}</p>
    `;
    grid.appendChild(card);
  });
}

function filterAndDisplay() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const cat = document.getElementById('categorySelect').value;
  let filtered = window.allProducts;
  if (q) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  }
  if (cat) {
    filtered = filtered.filter(p => p.category === cat);
  }
  displayProducts(filtered);
}
