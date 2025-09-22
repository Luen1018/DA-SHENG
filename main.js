const ADMIN_PASSWORD = '123456';
const productListEl = document.getElementById('productList');
const addProductSection = document.getElementById('addProductSection');
const adminLoginBtn = document.getElementById('adminLoginBtn');

// 檢查 localStorage 中的商品資料
function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  renderProducts(products);
}

// 渲染商品列表
function renderProducts(products) {
  productListEl.innerHTML = '';
  products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.classList.add('product');
    productEl.innerHTML = `
      <h3>${product.title}</h3>
      <p>價格：NT$ ${product.price}</p>
      <p>分類：${product.category}</p>
      <img src="${product.image}" alt="${product.title}">
    `;
    productListEl.appendChild(productEl);
  });
}

// 篩選商品
function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const filtered = category ? products.filter(p => p.category === category) : products;
  renderProducts(filtered);
}

// 初始化
function init() {
  loadProducts();

  // 管理員登入按鈕點擊事件
  adminLoginBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  // 商品分類篩選
  const filterSelect = document.createElement('select');
  filterSelect.innerHTML = `
    <option value="">所有分類</option>
    <option value="汽車">汽車</option>
    <option value="機車">機車</option>
    <option value="精品">精品</option>
    <option value="手錶">手錶</option>
    <option value="藝品">藝品</option>
    <option value="珠寶">珠寶</option>
  `;
  filterSelect.addEventListener('change', () => {
    filterProducts(filterSelect.value);
  });
  document.body.insertBefore(filterSelect, productListEl);
}

init();
