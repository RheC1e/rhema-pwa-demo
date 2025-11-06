# Azure Portal Redirect URI 設定指南

## 🔧 解決 Redirect URI 不匹配錯誤

當您看到錯誤訊息：
```
AADSTS50011: The redirect URI 'https://rhema-pwa-demo.vercel.app' specified in the request 
does not match the redirect URIs configured for the application
```

這表示需要在 Azure Portal 中添加 Vercel 的網址作為 Redirect URI。

## 📋 設定步驟

### 步驟 1: 前往 Azure Portal

1. 開啟瀏覽器，前往：**https://portal.azure.com**
2. 使用您的 Microsoft 365 管理員帳號登入（`ivan.chen@rhema.com.tw`）

### 步驟 2: 找到應用程式註冊

1. 在搜尋框輸入：**「應用程式註冊」** 或 **「App registrations」**
2. 點擊進入「應用程式註冊」頁面
3. 搜尋或選擇：**「RHEMA 請款系統」**

### 步驟 3: 新增 Redirect URI

1. 在左側選單中，點擊 **「驗證」**（Authentication）
2. 在「重新導向 URI」區塊中，點擊 **「+ 新增平台」** 或 **「+ Add a platform」**
3. 選擇 **「單頁應用程式 (SPA)」** 或 **「Single-page application」**
4. 在「重新導向 URI」欄位中，新增以下網址：

   **必須新增的 URI：**
   ```
   https://rhema-pwa-demo.vercel.app
   ```

   **如果還有其他網址，也一併新增：**
   ```
   http://localhost:3000
   http://localhost:5173
   https://rhema-pwa-demo.vercel.app
   ```

5. 點擊 **「設定」**（Configure）

### 步驟 4: 確認設定

1. 確認所有需要的 Redirect URI 都已列出
2. 點擊 **「儲存」**（Save）

### 步驟 5: 測試

1. 回到您的應用程式：**https://rhema-pwa-demo.vercel.app**
2. 重新整理頁面
3. 點擊「登入 Microsoft 365」
4. 應該可以正常登入了！

## 📝 需要新增的 Redirect URI 清單

根據您的部署環境，需要新增以下 URI：

### 生產環境
- `https://rhema-pwa-demo.vercel.app` ✅ **必須**
- 如果之後有自訂網域，也要新增（例如：`https://rhema.com.tw`）

### 開發環境
- `http://localhost:3000`（Vite 預設）
- `http://localhost:5173`（Vite 替代埠）

### Vercel 預覽環境（可選）
- `https://rhema-pwa-demo-*.vercel.app`（使用萬用字元 `*`）

## ⚠️ 重要提醒

1. **SPA 類型：** 確保選擇的是「單頁應用程式 (SPA)」，不是「Web」
2. **HTTPS：** 生產環境必須使用 HTTPS
3. **路徑：** Redirect URI 不需要包含路徑，只要網域即可
4. **儲存：** 修改後務必點擊「儲存」

## 🔍 如何確認目前的 Redirect URI

1. 前往 Azure Portal → 應用程式註冊 → RHEMA 請款系統
2. 點擊「驗證」（Authentication）
3. 在「重新導向 URI」區塊中查看目前設定的 URI

## 🆘 如果還是無法登入

1. **清除瀏覽器快取：** 清除 cookies 和快取
2. **檢查網址：** 確認 Vercel 網址是否正確
3. **等待幾分鐘：** Azure 設定可能需要幾分鐘才會生效
4. **檢查應用程式 ID：** 確認 Client ID 是否正確：`33abd69a-d012-498a-bddb-8608cbf10c2d`

## 📞 需要協助？

如果設定後還是無法登入，告訴我：
1. 您新增了哪些 Redirect URI？
2. 錯誤訊息是什麼？
3. 我可以幫您排查問題

