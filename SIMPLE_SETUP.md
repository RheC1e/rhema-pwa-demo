# 最簡單的 Git 與 Vercel 設定方式

## 🎯 目標：5 分鐘完成設定

### 方式一：完全網頁操作（最簡單，推薦！）

#### 步驟 1: 建立 GitHub 倉庫（2 分鐘）

1. 前往 https://github.com/new
2. 填寫：
   - **Repository name:** `rhema-pwa-demo`
   - **Description:** `航冠國際聯運有限公司請款系統`
   - **Visibility:** 選擇 Public 或 Private
   - **⚠️ 重要：不要勾選** "Add a README file"、"Add .gitignore"、"Choose a license"
3. 點擊「Create repository」

#### 步驟 2: 推送程式碼到 GitHub（1 分鐘）

複製以下指令並執行（GitHub 會顯示這些指令）：

```bash
# 在專案目錄執行
git remote add origin https://github.com/您的帳號/rhema-pwa-demo.git
git branch -M main
git push -u origin main
```

**如果要求輸入帳號密碼：**
- 使用 **Personal Access Token**（不是密碼）
- 建立 Token：https://github.com/settings/tokens
- 點擊 "Generate new token (classic)"
- 勾選 `repo` 權限
- 複製 Token 並當作密碼使用

#### 步驟 3: 部署到 Vercel（2 分鐘）

1. 前往 https://vercel.com/new
2. 點擊「Continue with GitHub」登入
3. 選擇「Import Git Repository」
4. 選擇 `rhema-pwa-demo` 倉庫
5. 點擊「Import」
6. Vercel 會自動偵測設定：
   - Framework Preset: **Vite** ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
7. 點擊「Deploy」

**完成！** 🎉 幾分鐘後您的網站就會上線了！

---

### 方式二：使用指令（如果您熟悉終端機）

#### 快速指令集

```bash
# 1. 安裝 Vercel CLI（如果還沒安裝）
npm install -g vercel

# 2. 登入 Vercel
vercel login

# 3. 部署（會引導您完成設定）
vercel --prod
```

#### GitHub 設定（如果還沒建立倉庫）

```bash
# 1. 建立 GitHub 倉庫（需要先安裝 GitHub CLI）
# brew install gh  # macOS
# gh auth login
# gh repo create rhema-pwa-demo --public --source=. --remote=origin --push

# 或手動在網頁建立，然後：
git remote add origin https://github.com/您的帳號/rhema-pwa-demo.git
git push -u origin main
```

---

## 🔗 我如何幫您自動完成？

### 選項 A：我幫您準備好，您執行一個指令

我可以建立一個腳本，您只需要：
1. 執行 `./setup.sh`
2. 按照提示完成認證
3. 完成！

### 選項 B：我提供詳細步驟，您跟著做

我已經在 `AUTO_SETUP.md` 提供了詳細步驟。

### 選項 C：您提供 GitHub Token，我直接幫您建立

如果您建立 GitHub Personal Access Token 並給我，我可以：
1. ✅ 直接建立 GitHub 倉庫
2. ✅ 推送程式碼
3. ✅ 設定 Vercel（需要您登入一次）

**建立 Token 步驟：**
1. 前往 https://github.com/settings/tokens
2. 點擊 "Generate new token (classic)"
3. 名稱：`RHEMA Project`
4. 勾選權限：`repo`（完整倉庫權限）
5. 點擊 "Generate token"
6. **複製 Token**（只會顯示一次！）

---

## 📋 檢查清單

完成後，您應該有：

- [ ] GitHub 倉庫已建立
- [ ] 程式碼已推送到 GitHub
- [ ] Vercel 專案已建立
- [ ] 網站已部署並可訪問
- [ ] 自動部署已啟用（推送即部署）

---

## 🆘 需要協助？

告訴我您想要：
1. **完全自動化**：給我 GitHub Token，我幫您完成
2. **半自動化**：我建立腳本，您執行
3. **手動操作**：我提供詳細步驟

選擇哪一種？

