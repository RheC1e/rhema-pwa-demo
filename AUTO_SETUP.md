# 自動設定 Git 與 Vercel

## 快速自動設定

我已經為您建立了一個自動化腳本，可以幫您完成 Git 和 Vercel 的設定。

### 方法一：使用自動化腳本（推薦）

```bash
# 執行自動設定腳本
./setup-git-vercel.sh
```

腳本會引導您完成：
1. ✅ 檢查 Git 狀態
2. ✅ GitHub 倉庫連接（三種方式可選）
3. ✅ Vercel 部署設定

### 方法二：手動設定（如果腳本無法使用）

#### 步驟 1: 安裝 Vercel CLI

```bash
npm install -g vercel
```

#### 步驟 2: 登入 Vercel

```bash
vercel login
```

這會開啟瀏覽器讓您登入 Vercel（使用您的 GitHub 帳號或 Email）。

#### 步驟 3: 部署到 Vercel

```bash
# 在專案目錄執行
vercel --prod
```

Vercel 會自動：
- 偵測專案類型（Vite）
- 設定建置指令
- 部署到生產環境
- 提供一個網址（例如：`rhema-pwa-demo.vercel.app`）

#### 步驟 4: 連接 GitHub（可選，啟用自動部署）

1. 前往 https://vercel.com/dashboard
2. 點擊「Add New Project」
3. 選擇「Import Git Repository」
4. 連接您的 GitHub 帳號（如果還沒連接）
5. 選擇您的倉庫
6. 設定：
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. 點擊「Deploy」

之後每次推送程式碼到 GitHub，Vercel 會自動重新部署！

## 我如何幫您自動完成？

### 如果您的系統有 GitHub CLI

我可以幫您：
1. ✅ 自動建立 GitHub 倉庫
2. ✅ 自動連接並推送程式碼
3. ✅ 自動部署到 Vercel

**需要您先完成：**
```bash
# 安裝 GitHub CLI（macOS）
brew install gh

# 登入 GitHub
gh auth login
```

然後告訴我，我就可以直接幫您執行！

### 如果沒有 GitHub CLI

我可以：
1. ✅ 幫您安裝 Vercel CLI
2. ✅ 引導您完成 Vercel 部署
3. ⚠️  GitHub 倉庫需要您手動建立（或使用網頁介面）

## 快速指令參考

### Git 操作
```bash
# 查看狀態
git status

# 提交變更
git add .
git commit -m "描述"
git push
```

### Vercel 操作
```bash
# 登入
vercel login

# 部署（生產環境）
vercel --prod

# 部署（預覽環境）
vercel

# 查看部署狀態
vercel ls
```

## 常見問題

### Q: 為什麼需要 GitHub 倉庫？
A: 雖然可以直接部署到 Vercel，但連接 Git 倉庫可以：
- 自動部署（推送即部署）
- 版本控制
- 團隊協作
- 回滾到舊版本

### Q: Vercel 免費方案有限制嗎？
A: 免費方案對個人專案通常足夠，包括：
- 無限部署
- 100GB 頻寬/月
- Serverless Functions
- 自動 HTTPS

### Q: 如何更新部署？
A: 如果連接了 Git：
- 推送程式碼到 GitHub，Vercel 自動部署
- 或手動執行 `vercel --prod`

## 需要協助？

告訴我您想要：
1. **完全自動化**：我幫您執行腳本並引導完成認證
2. **部分自動化**：我幫您安裝工具，您完成認證
3. **手動設定**：我提供詳細步驟，您自己完成

選擇哪一種方式？

