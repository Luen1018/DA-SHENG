// 密碼（請你自己更改這個值為你理解的密碼）
const ADMIN_PASSWORD = 'admin123';

// 先從 localStorage 拿商品資料
let products = JSON.parse(localStorage.getItem('products')) || [];
const productListEl = document.getElementById('productList');
const addSectionEl = document.getElementById('add-product-section');
const loginSectionEl = document.getElementById('login-section');
const loginForm = document.getElementById('loginForm');
const filterSelect = document.getElementById('filterCategory');

// 登入表單處理
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const pw = document.getElementById('adminPassword').value;
  if (pw === ADMIN_PASSWORD) {
    // 登入成功
    loginSectionEl.style.display = 'none';
    addSectionEl.style.display = 'block';
  } else {
    alert('密碼錯誤');
  }
});

// 篩選事件
filterSelect.addEventListener('change', () => {
  renderProducts();
});

// 刊登表單處理
const form = document.getElementById('addProductForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('productTitle').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const category = document.getElementById('productCategory').value;
  const image = document.getElementById('productImage').value.trim() || ('https://picsum.photos/seed/' + Math.floor(Math.random()*1000) + '/400/300');

  if (!title || isNaN(price) || !category) {
    alert('請正確填寫商品名稱、價格與分類');
    return;
  }

  const newProduct = {
    id: Date.now(),
    title,
    price,
    category,
    image
  };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  form.reset();
  renderProducts();
});

// 渲染商品函式
function renderProducts() {
  productListEl.innerHTML = '';
  const filterCat = filterSelect.value;
  const filtered = products.filter(p => {
    if (!filterCat) return true;
    return p.category === filterCat;
  });

  filtered.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3';

    const card = document.createElement('div');
    card.className = 'card product-card h-100 shadow-sm';

    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title;
    img.className = 'card-img-top';

    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column';

    const titleEl = document.createElement('h5');
    titleEl.className = 'card-title';
    titleEl.textContent = p.title;

    const priceEl = document.createElement('p');
    priceEl.className = 'price mt-auto';
    priceEl.textContent = 'NT$ ' + p.price;

    const footer = document.createElement('div');
    footer.className = 'card-footer bg-white border-top-0';
    footer.innerHTML = `<small class="text-muted">${p.category}</small>`;

    card.appendChild(img);
    card.appendChild(body);
    body.appendChild(titleEl);
    body.appendChild(priceEl);
    card.appendChild(footer);
    col.appendChild(card);
    productListEl.appendChild(col);
  });
}

// 初始渲染
renderProducts();
