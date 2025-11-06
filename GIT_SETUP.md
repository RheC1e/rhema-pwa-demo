# Git 倉庫連接說明

## 目前狀態

專案已經初始化為 Git 倉庫，並完成第一次提交。

## 連接遠端 Git 倉庫（GitHub/GitLab）

### 方法一：連接到現有倉庫

如果您已經在 GitHub/GitLab 建立倉庫：

```bash
# 1. 新增遠端倉庫
git remote add origin https://github.com/您的帳號/rhema-pwa-demo.git

# 2. 推送到遠端
git push -u origin main
```

### 方法二：建立新倉庫並連接

1. **在 GitHub 建立新倉庫：**
   - 前往 https://github.com/new
   - 倉庫名稱：`rhema-pwa-demo`（或您喜歡的名稱）
   - 選擇 Public 或 Private
   - **不要**初始化 README、.gitignore 或 license（我們已經有了）

2. **連接並推送：**
```bash
# 新增遠端倉庫
git remote add origin https://github.com/您的帳號/rhema-pwa-demo.git

# 推送到遠端
git push -u origin main
```

### 方法三：使用 SSH（推薦，更安全）

如果您已設定 SSH 金鑰：

```bash
# 使用 SSH URL
git remote add origin git@github.com:您的帳號/rhema-pwa-demo.git
git push -u origin main
```

## Vercel 自動部署設定

1. **登入 Vercel：** https://vercel.com
2. **新增專案：** 選擇「Import Git Repository」
3. **連接 Git 倉庫：** 選擇您的 GitHub/GitLab 倉庫
4. **設定建置：**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **環境變數（如需要）：** 可在設定中新增
6. **部署：** 點擊 Deploy，Vercel 會自動部署

## 後續開發流程

每次完成功能後：

```bash
# 1. 查看變更
git status

# 2. 加入變更
git add .

# 3. 提交變更
git commit -m "描述您的變更"

# 4. 推送到遠端
git push
```

Vercel 會自動偵測推送並重新部署。

## 目前 Git 設定

- **使用者名稱：** Ivan Chen
- **Email：** rhemaluis125@gmail.com

如需修改：
```bash
git config user.name "新名稱"
git config user.email "新email"
```

## 疑難排解

### 如果推送失敗

```bash
# 先拉取遠端變更
git pull origin main --rebase

# 再推送
git push
```

### 如果忘記遠端倉庫 URL

```bash
# 查看遠端倉庫
git remote -v
```

### 如果需要更換遠端倉庫

```bash
# 移除現有遠端
git remote remove origin

# 新增新遠端
git remote add origin 新的倉庫URL
```

