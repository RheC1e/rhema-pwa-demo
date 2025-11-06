// Microsoft 365 登入設定
// Redirect URI 會自動使用當前網址（支援本地開發和 Vercel 部署）
const msalConfig = {
  auth: {
    clientId: '33abd69a-d012-498a-bddb-8608cbf10c2d',
    authority: 'https://login.microsoftonline.com/cd4e36bd-ac9a-4236-9f91-a6718b6b5e45',
    redirectUri: window.location.origin // 自動使用當前網址
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

const msalRequest = {
  scopes: ['User.Read', 'profile', 'email']
};

// 請款項目類別
const EXPENSE_TYPES = {
  FUEL: '油資',
  ENTERTAINMENT: '交際費',
  OTHER: '其他(請打在備註)'
};

// 應用程式狀態
let msalInstance = null;
let currentUser = null;
let expenseItems = [];

// 初始化應用程式
async function init() {
  try {
    // 動態載入 MSAL（使用 npm 套件）
    const { PublicClientApplication } = await import('@azure/msal-browser');
    msalInstance = new PublicClientApplication(msalConfig);
    await msalInstance.initialize();

    // 處理 redirect 回來的 callback（同一頁面登入）
    const response = await msalInstance.handleRedirectPromise();
    if (response) {
      // 登入成功，從 redirect 回來
      currentUser = response.account;
      showMainPage();
      return;
    }

    // 檢查是否已登入
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      currentUser = accounts[0];
      showMainPage();
    } else {
      showLoginPage();
    }

    // 設定事件監聽（延遲一下確保 DOM 完全準備好）
    setTimeout(() => {
      setupEventListeners();
    }, 100);
  } catch (error) {
    console.error('初始化失敗:', error);
    showError('系統初始化失敗，請重新整理頁面');
  }
}

// 設定事件監聽
function setupEventListeners() {
  console.log('設定事件監聽器...');
  
  // 確保元素存在後再綁定事件
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const addItemBtn = document.getElementById('add-item-btn');
  const saveBtn = document.getElementById('save-btn');
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  
  console.log('按鈕元素檢查:', {
    loginBtn: !!loginBtn,
    logoutBtn: !!logoutBtn,
    addItemBtn: !!addItemBtn,
    saveBtn: !!saveBtn,
    exportPdfBtn: !!exportPdfBtn
  });
  
  // 先暴露到全局（確保 HTML 中的 onclick 可以工作）
  window.addExpenseItem = addExpenseItem;
  window.saveExpenseForm = saveExpenseForm;
  window.exportToPDF = exportToPDF;
  window.handleLogin = handleLogin;
  window.handleLogout = handleLogout;
  
  // 同時綁定事件監聽器（雙重保障）
  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
    console.log('登入按鈕事件已綁定');
  }
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
    console.log('登出按鈕事件已綁定');
  }
  if (addItemBtn) {
    addItemBtn.addEventListener('click', addExpenseItem);
    console.log('新增按鈕事件已綁定');
  }
  if (saveBtn) {
    saveBtn.addEventListener('click', saveExpenseForm);
    console.log('儲存按鈕事件已綁定');
  }
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', exportToPDF);
    console.log('PDF 按鈕事件已綁定');
  }
  
  console.log('所有事件監聽器設定完成');
}

// 顯示登入頁面
function showLoginPage() {
  document.getElementById('login-page').classList.add('active');
  document.getElementById('main-page').style.display = 'none';
}

// 顯示主頁面
function showMainPage() {
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('main-page').style.display = 'block';
  
  if (currentUser) {
    document.getElementById('user-name').textContent = currentUser.name || currentUser.username;
    document.getElementById('form-user').textContent = `RHEMA / ${currentUser.name || currentUser.username}`;
  }
  
  // 設定當前月份
  const now = new Date();
  const month = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}月`;
  document.getElementById('form-month').textContent = month;
  
  // 載入請款項目
  loadExpenseItems();
  renderExpenseItems();
}

// 處理登入（同一頁面，不開新分頁）
async function handleLogin() {
  const loginBtn = document.getElementById('login-btn');
  const loginBtnText = document.getElementById('login-btn-text');
  const loginLoading = document.getElementById('login-loading');
  const loginStatus = document.getElementById('login-status');
  
  try {
    loginBtn.disabled = true;
    loginBtnText.style.display = 'none';
    loginLoading.style.display = 'block';
    loginStatus.textContent = '正在導向登入頁面...';
    
    // 使用 loginRedirect 在同一頁面登入（不開新分頁）
    await msalInstance.loginRedirect(msalRequest);
    // 注意：loginRedirect 會導向到 Microsoft 登入頁面
    // 登入成功後會自動 redirect 回來，由 handleRedirectPromise 處理
  } catch (error) {
    console.error('登入失敗:', error);
    loginStatus.textContent = '登入失敗，請重試';
    loginBtn.disabled = false;
    loginBtnText.style.display = 'block';
    loginLoading.style.display = 'none';
  }
}

// 處理登出（同一頁面）
async function handleLogout() {
  try {
    // 使用 logoutRedirect 在同一頁面登出
    await msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin
    });
    // 登出後會自動 redirect 回來，currentUser 會被清除
  } catch (error) {
    console.error('登出失敗:', error);
    // 如果登出失敗，手動清除
    currentUser = null;
    expenseItems = [];
    showLoginPage();
  }
}

// 新增請款項目
function addExpenseItem() {
  console.log('=== 新增請款項目 ===');
  console.log('目前項目數:', expenseItems.length);
  
  const newItem = {
    id: Date.now() + Math.random(), // 確保 ID 唯一
    date: new Date().toISOString().split('T')[0],
    type: EXPENSE_TYPES.FUEL,
    amount: 0, // 預設為 0，但顯示時為空字串
    remark: ''
  };
  
  expenseItems.push(newItem);
  console.log('新項目已加入陣列，總數:', expenseItems.length);
  console.log('新項目內容:', newItem);
  
  // 渲染（但避免在 renderExpenseItems 中再次調用 addExpenseItem）
  renderExpenseItems();
  
  // 自動聚焦到新項目的金額欄位
  setTimeout(() => {
    const lastRow = document.querySelector('#expense-items tr:last-child');
    if (lastRow) {
      const amountInput = lastRow.querySelector('input[type="number"]');
      if (amountInput) {
        amountInput.focus();
        amountInput.select();
      }
    }
  }, 200);
}

// 刪除請款項目（暴露到全局作用域）
window.deleteExpenseItem = function(id) {
  console.log('=== 刪除請款項目 ===');
  console.log('要刪除的 ID:', id);
  console.log('刪除前項目數:', expenseItems.length);
  
  const beforeCount = expenseItems.length;
  expenseItems = expenseItems.filter(item => {
    // 確保 ID 類型一致（可能是數字或字串）
    return item.id != id;
  });
  
  console.log('刪除後項目數:', expenseItems.length);
  
  if (expenseItems.length === beforeCount) {
    console.warn('警告：沒有找到要刪除的項目！');
  }
  
  renderExpenseItems();
  updateSummary();
};

// 更新請款項目（暴露到全局作用域，供 HTML 內聯事件使用）
window.updateExpenseItem = function(id, field, value) {
  // 確保 ID 類型一致
  const item = expenseItems.find(item => item.id == id);
  if (item) {
    console.log(`更新項目 ${id} 的 ${field} 為:`, value);
    item[field] = value;
    updateSummary();
  } else {
    console.warn(`找不到 ID 為 ${id} 的項目`);
  }
};

// 渲染請款項目
function renderExpenseItems() {
  console.log('開始渲染請款項目，總數:', expenseItems.length);
  const tbody = document.getElementById('expense-items');
  
  if (!tbody) {
    console.error('找不到 expense-items 元素！');
    return;
  }
  
  // 清空現有內容
  tbody.innerHTML = '';
  
  // 如果沒有項目，新增一個（但要避免無限循環）
  if (expenseItems.length === 0) {
    console.log('沒有項目，新增一個預設項目');
    const newItem = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type: EXPENSE_TYPES.FUEL,
      amount: 0,
      remark: ''
    };
    expenseItems.push(newItem);
  }
  
  console.log('開始渲染', expenseItems.length, '個項目');
  expenseItems.forEach((item, index) => {
    console.log(`渲染項目 ${index + 1}:`, item);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <input 
          type="date" 
          value="${item.date}" 
          onchange="window.updateExpenseItem && window.updateExpenseItem(${item.id}, 'date', this.value)"
        >
      </td>
      <td>
        <select 
          onchange="window.updateExpenseItem && window.updateExpenseItem(${item.id}, 'type', this.value)"
        >
          <option value="${EXPENSE_TYPES.FUEL}" ${item.type === EXPENSE_TYPES.FUEL ? 'selected' : ''}>${EXPENSE_TYPES.FUEL}</option>
          <option value="${EXPENSE_TYPES.ENTERTAINMENT}" ${item.type === EXPENSE_TYPES.ENTERTAINMENT ? 'selected' : ''}>${EXPENSE_TYPES.ENTERTAINMENT}</option>
          <option value="${EXPENSE_TYPES.OTHER}" ${item.type === EXPENSE_TYPES.OTHER ? 'selected' : ''}>${EXPENSE_TYPES.OTHER}</option>
        </select>
      </td>
      <td>
        <input 
          type="number" 
          value="${item.amount || ''}" 
          min="0"
          step="1"
          placeholder="0"
          onfocus="if(this.value === '0') this.value = ''; this.select();"
          oninput="window.updateExpenseItem && window.updateExpenseItem(${item.id}, 'amount', parseFloat(this.value) || 0)"
          onchange="window.updateExpenseItem && window.updateExpenseItem(${item.id}, 'amount', parseFloat(this.value) || 0)"
          onblur="if(this.value === '' || this.value === '0') { this.value = '0'; window.updateExpenseItem && window.updateExpenseItem(${item.id}, 'amount', 0); }"
        >
      </td>
      <td>
        <input 
          type="text" 
          value="${item.remark}" 
          placeholder="備註說明"
          onchange="window.updateExpenseItem && window.updateExpenseItem(${item.id}, 'remark', this.value)"
        >
      </td>
      <td>
        <button class="delete-btn" onclick="window.deleteExpenseItem && window.deleteExpenseItem(${item.id})">刪除</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  console.log('渲染完成，已新增', expenseItems.length, '個項目到 DOM');
  updateSummary();
}

// 更新總計
function updateSummary() {
  const fuelSubtotal = expenseItems
    .filter(item => item.type === EXPENSE_TYPES.FUEL)
    .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  
  const entertainmentSubtotal = expenseItems
    .filter(item => item.type === EXPENSE_TYPES.ENTERTAINMENT)
    .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  
  const otherSubtotal = expenseItems
    .filter(item => item.type === EXPENSE_TYPES.OTHER)
    .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  
  const total = fuelSubtotal + entertainmentSubtotal + otherSubtotal;
  
  document.getElementById('fuel-subtotal').textContent = fuelSubtotal.toLocaleString();
  document.getElementById('entertainment-subtotal').textContent = entertainmentSubtotal.toLocaleString();
  document.getElementById('other-subtotal').textContent = otherSubtotal.toLocaleString();
  document.getElementById('total-amount').textContent = total.toLocaleString();
}

// 載入請款項目（從 localStorage，之後可改為 SharePoint）
function loadExpenseItems() {
  const saved = localStorage.getItem(`expenseItems_${currentUser?.username}`);
  if (saved) {
    try {
      expenseItems = JSON.parse(saved);
    } catch (error) {
      console.error('載入資料失敗:', error);
      expenseItems = [];
    }
  }
}

// 儲存請款單
function saveExpenseForm() {
  console.log('開始儲存請款單...');
  console.log('請款項目:', expenseItems);
  
  // 先重新計算總額（確保資料是最新的）
  updateSummary();
  
  // 檢查是否有使用者
  if (!currentUser || !currentUser.username) {
    alert('錯誤：無法取得使用者資訊，請重新登入');
    return;
  }
  
  // 儲存到 localStorage（之後可改為 SharePoint）
  // 目前使用 localStorage，所以儲存功能是可用的，只是資料存在瀏覽器本地
  try {
    const storageKey = `expenseItems_${currentUser.username}`;
    localStorage.setItem(storageKey, JSON.stringify(expenseItems));
    console.log('已儲存到 localStorage:', storageKey);
    
    // 顯示儲存成功訊息，包含總額資訊
    const total = expenseItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    alert(`請款單已儲存！\n\n總計：${total.toLocaleString()} 元\n項目數：${expenseItems.length} 筆`);
  } catch (error) {
    console.error('儲存失敗:', error);
    alert('儲存失敗：' + error.message);
  }
}

// 匯出 PDF
async function exportToPDF() {
  try {
    console.log('開始匯出 PDF...');
    
    // 先更新總額
    updateSummary();
    
    // 動態載入 jsPDF（使用 npm 套件）
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    console.log('jsPDF 載入成功');
    
    // 設定字體（使用內建字體）
    const font = 'helvetica';
    
    // 標題
    doc.setFontSize(18);
    doc.text('請款單', 20, 20);
    
    // 使用者資訊
    doc.setFontSize(12);
    const now = new Date();
    const month = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}月`;
    doc.text(month, 20, 30);
    doc.text(`RHEMA / ${currentUser?.name || currentUser?.username || ''}`, 20, 37);
    
    // 表格標題
    let yPos = 50;
    doc.setFontSize(10);
    doc.text('日期', 20, yPos);
    doc.text('項目', 50, yPos);
    doc.text('金額', 100, yPos);
    doc.text('備註', 130, yPos);
    
    yPos += 10;
    doc.line(20, yPos, 190, yPos);
    yPos += 5;
    
    // 請款項目
    expenseItems.forEach(item => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text(item.date, 20, yPos);
      doc.text(item.type, 50, yPos);
      doc.text((item.amount || 0).toLocaleString(), 100, yPos);
      doc.text(item.remark || '', 130, yPos);
      yPos += 7;
    });
    
    // 總計
    yPos += 5;
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    const fuelSubtotal = expenseItems
      .filter(item => item.type === EXPENSE_TYPES.FUEL)
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    
    const entertainmentSubtotal = expenseItems
      .filter(item => item.type === EXPENSE_TYPES.ENTERTAINMENT)
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    
    const otherSubtotal = expenseItems
      .filter(item => item.type === EXPENSE_TYPES.OTHER)
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    
    const total = fuelSubtotal + entertainmentSubtotal + otherSubtotal;
    
    doc.setFontSize(10);
    doc.text(`油資小計: ${fuelSubtotal.toLocaleString()}`, 20, yPos);
    yPos += 7;
    doc.text(`交際費小計: ${entertainmentSubtotal.toLocaleString()}`, 20, yPos);
    yPos += 7;
    doc.text(`其他小計: ${otherSubtotal.toLocaleString()}`, 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setFont(font, 'bold');
    doc.text(`總計: ${total.toLocaleString()}`, 20, yPos);
    
    // 儲存 PDF
    const fileName = `請款單_${month}_${currentUser?.name || currentUser?.username || 'unknown'}.pdf`;
    doc.save(fileName);
    console.log('PDF 匯出成功:', fileName);
  } catch (error) {
    console.error('匯出 PDF 失敗:', error);
    alert('匯出 PDF 失敗：' + error.message + '\n\n請檢查瀏覽器控制台查看詳細錯誤');
  }
}

// 顯示錯誤訊息
function showError(message) {
  alert(message);
}

// 啟動應用程式
// 確保 DOM 載入完成後再初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

