# 快速開始指南

## 第一步：安裝依賴

```bash
npm install
```

這會安裝所有必要的套件，包括：
- Vite（建置工具）
- Vite PWA Plugin（PWA 支援）
- Microsoft MSAL（Microsoft 365 登入）
- jsPDF（PDF 生成）

## 第二步：啟動開發伺服器

```bash
npm run dev
```

這會啟動開發伺服器，通常會在 `http://localhost:3000` 開啟。

## 第三步：測試功能

1. **登入測試：** 點擊「登入 Microsoft 365」按鈕，使用您的公司帳號登入
2. **請款單測試：** 
   - 點擊「+ 新增一筆」新增請款項目
   - 填寫日期、選擇項目（油資/交際費/其他）、輸入金額、填寫備註
   - 查看自動計算的總計
3. **PDF 輸出測試：** 點擊「匯出 PDF」按鈕，下載 PDF 檔案
4. **儲存測試：** 點擊「儲存」按鈕，資料會儲存在瀏覽器的 localStorage

## 目前功能狀態

✅ **已完成：**
- Microsoft 365 登入整合
- 請款單基本功能（新增、刪除、計算）
- PDF 輸出功能
- PWA 設定
- 響應式設計（手機、平板、電腦）

⏳ **待完成：**
- Teams 應用程式版本
- 資料庫整合（目前使用 localStorage）
- 權限管理系統
- 限額功能

## 下一步

1. **連接 Git 倉庫：** 參考 `GIT_SETUP.md`
2. **部署到 Vercel：** 連接 Git 倉庫後，Vercel 會自動部署
3. **測試 Teams 整合：** 待 Teams 應用程式版本完成後測試

## 疑難排解

### 登入失敗
- 確認 Azure Portal 中的 Redirect URI 已設定正確
- 確認 Client ID 和 Tenant ID 正確
- 檢查瀏覽器控制台是否有錯誤訊息

### PDF 輸出失敗
- 確認已安裝 jsPDF 套件：`npm install jspdf`
- 檢查瀏覽器控制台是否有錯誤訊息

### 樣式顯示異常
- 確認 CSS 檔案路徑正確
- 清除瀏覽器快取後重新載入

## 開發建議

1. **資料儲存：** 目前使用 localStorage，之後會改為 SharePoint List
2. **錯誤處理：** 目前使用簡單的 alert，之後可改為更友善的提示
3. **表單驗證：** 可加入更完整的表單驗證
4. **離線支援：** PWA 已設定，但可進一步優化離線功能

