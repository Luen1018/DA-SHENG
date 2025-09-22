const loginForm = document.getElementById('loginForm');
const adminPasswordInput = document.getElementById('adminPassword');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredPassword = adminPasswordInput.value.trim();

  if (enteredPassword === ADMIN_PASSWORD) {
    // 登入成功，儲存登入狀態
    localStorage.setItem('isAdmin', 'true');
    window.location.href = 'index.html';
  } else {
    alert('密碼錯誤');
  }
});
