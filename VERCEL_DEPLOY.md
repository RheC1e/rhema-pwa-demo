# Vercel 部署指南

## 🚀 快速部署

### 方式一：使用我建立的腳本（推薦）

```bash
./deploy-vercel.sh
```

腳本會自動：
1. ✅ 檢查並安裝 Vercel CLI（如果需要）
2. ✅ 檢查登入狀態
3. ✅ 引導您完成登入（如果需要）
4. ✅ 自動部署到生產環境

### 方式二：網頁操作（最簡單，推薦！）

1. **前往 Vercel：** https://vercel.com/new
2. **登入：** 點擊「Continue with GitHub」使用您的 GitHub 帳號登入
3. **匯入專案：**
   - 點擊「Import Git Repository」
   - 選擇 `RheC1e/rhema-pwa-demo`
   - 點擊「Import」
4. **設定專案：**
   - Framework Preset: **Vite** ✅（會自動偵測）
   - Build Command: `npm run build` ✅（會自動設定）
   - Output Directory: `dist` ✅（會自動設定）
   - Root Directory: `./`（保持預設）
5. **環境變數（如果需要）：**
   - 目前不需要額外環境變數
6. **部署：** 點擊「Deploy」

**完成！** 🎉 幾分鐘後您的網站就會上線！

### 方式三：使用 Vercel CLI 指令

#### 第一次部署

```bash
# 1. 安裝 Vercel CLI（如果還沒安裝）
npm install -g vercel

# 2. 登入 Vercel
vercel login

# 3. 部署到生產環境
vercel --prod
```

#### 後續部署

```bash
# 直接部署
vercel --prod
```

## 📋 部署設定

### 自動偵測的設定

Vercel 會自動偵測：
- ✅ **Framework:** Vite
- ✅ **Build Command:** `npm run build`
- ✅ **Output Directory:** `dist`
- ✅ **Install Command:** `npm install`

### 專案設定檔（vercel.json）

如果需要自訂設定，可以建立 `vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🔗 部署後的網址

部署完成後，Vercel 會提供：
- **生產環境網址：** `rhema-pwa-demo.vercel.app`（或您設定的自訂網域）
- **預覽網址：** 每次推送會產生新的預覽網址

## 🔄 自動部署

### 連接 GitHub 後自動部署

1. 在 Vercel 專案設定中連接 GitHub 倉庫
2. 之後每次推送程式碼到 GitHub，Vercel 會自動：
   - 偵測變更
   - 執行建置
   - 部署到生產環境

### 部署通知

- Vercel 會在部署完成後發送通知（如果已設定）
- 可以在 Vercel Dashboard 查看部署歷史

## 🛠️ 疑難排解

### 部署失敗

1. **檢查建置日誌：** 在 Vercel Dashboard 查看詳細錯誤
2. **本地測試建置：**
   ```bash
   npm run build
   ```
3. **檢查 Node.js 版本：** Vercel 使用 Node.js 18+，確保 `package.json` 中有指定版本

### 環境變數設定

如果需要環境變數：
1. 前往 Vercel Dashboard
2. 選擇專案 → Settings → Environment Variables
3. 新增變數（例如：`NODE_ENV=production`）

### 自訂網域

1. 前往 Vercel Dashboard
2. 選擇專案 → Settings → Domains
3. 新增您的網域（例如：`rhema.com.tw`）
4. 按照指示設定 DNS

## 📝 目前狀態

- ✅ GitHub 倉庫已建立：https://github.com/RheC1e/rhema-pwa-demo
- ✅ 程式碼已推送
- ⏳ Vercel 部署：待完成

## 🎯 下一步

選擇一種方式開始部署：
1. **網頁操作**（最簡單）：前往 https://vercel.com/new
2. **使用腳本**：執行 `./deploy-vercel.sh`
3. **使用 CLI**：執行 `vercel --prod`（需要先安裝並登入）

