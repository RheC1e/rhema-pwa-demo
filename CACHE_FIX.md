# 快取問題解決方案

## ✅ 已實作的解決方案

### 1. Vercel 設定（vercel.json）

已新增 `vercel.json` 設定檔，強制不緩存 HTML 檔案：
- HTML 檔案：`no-cache, no-store, must-revalidate`
- JS 檔案：使用版本控制（hash 檔名）

### 2. HTML Meta 標籤

在 `index.html` 中新增：
- `Cache-Control: no-cache, no-store, must-revalidate`
- `Pragma: no-cache`
- `Expires: 0`

### 3. PWA 快取策略

在 `vite.config.js` 中改善：
- HTML 檔案：不緩存（`maxAgeSeconds: 0`）
- JS 檔案：使用 NetworkFirst 策略
- 強制更新：`skipWaiting: true`, `clientsClaim: true`

### 4. 建置檔名 Hash

每次建置時，JS 檔案會包含 hash，確保檔名不同：
- `assets/[name].[hash].js`

## 🔄 如何清除快取

### 方式一：強制重新整理（最快）

**Windows/Linux:**
- `Ctrl + Shift + R` 或 `Ctrl + F5`

**macOS:**
- `Cmd + Shift + R`

### 方式二：清除瀏覽器快取

1. 開啟開發者工具（F12）
2. 右鍵點擊重新整理按鈕
3. 選擇「清除快取並強制重新整理」

### 方式三：清除 PWA 快取

1. 開啟開發者工具（F12）
2. 前往「Application」標籤
3. 左側選擇「Storage」
4. 點擊「Clear site data」

### 方式四：使用無痕模式測試

- 每次測試新版本時使用無痕模式
- 確保不會受到快取影響

## 📝 部署後檢查清單

部署完成後，請確認：

1. ✅ **Vercel 部署成功**
   - 前往 Vercel Dashboard 確認部署狀態

2. ✅ **清除瀏覽器快取**
   - 使用 `Cmd + Shift + R` 強制重新整理
   - 或清除瀏覽器快取

3. ✅ **檢查版本**
   - 開啟開發者工具（F12）
   - 前往「Network」標籤
   - 重新整理頁面
   - 檢查 JS 檔案是否有新的 hash

4. ✅ **測試功能**
   - 確認所有按鈕正常運作
   - 確認沒有使用舊版本的程式碼

## 🆘 如果還是看到舊版本

### 檢查步驟

1. **確認部署成功**
   ```bash
   # 檢查 GitHub 最新提交
   git log -1
   ```

2. **檢查 Vercel 部署**
   - 前往 Vercel Dashboard
   - 確認最新部署已完成

3. **強制清除快取**
   - 使用 `Cmd + Shift + R` 強制重新整理
   - 或清除瀏覽器快取

4. **檢查 Service Worker**
   - 開啟開發者工具（F12）
   - 前往「Application」→「Service Workers」
   - 點擊「Unregister」取消註冊
   - 重新整理頁面

5. **檢查網路請求**
   - 開啟開發者工具（F12）
   - 前往「Network」標籤
   - 勾選「Disable cache」
   - 重新整理頁面

## 💡 最佳實踐

1. **開發時：** 使用無痕模式或清除快取
2. **測試時：** 使用強制重新整理（`Cmd + Shift + R`）
3. **部署後：** 等待 2-3 分鐘讓 Vercel 完成部署，然後強制重新整理

## 📊 快取策略說明

### HTML 檔案
- **策略：** 不緩存
- **原因：** 確保總是取得最新版本
- **設定：** `Cache-Control: no-cache`

### JS/CSS 檔案
- **策略：** 版本控制（hash 檔名）
- **原因：** 每次建置檔名不同，自動清除舊快取
- **設定：** `Cache-Control: public, max-age=31536000, immutable`

### 圖片/字體
- **策略：** 長期快取
- **原因：** 這些資源很少變動
- **設定：** `Cache-Control: public, max-age=31536000`

