# RHEMA 請款系統

航冠國際聯運有限公司請款系統 PWA 應用程式

## 專案說明

這是航冠國際聯運有限公司的請款系統，採用 PWA（Progressive Web App）技術開發，支援：
- Microsoft 365 單一登入（SSO）
- 跨平台使用（網頁、手機、平板）
- 可安裝為應用程式
- Teams 應用程式整合

## 技術棧

- **前端框架：** 原生 HTML/CSS/JavaScript
- **建置工具：** Vite
- **PWA：** Vite PWA Plugin
- **認證：** Microsoft MSAL (Microsoft Authentication Library)
- **PDF 生成：** jsPDF

## 開發環境設定

### 前置需求

- Node.js 18+ 
- npm 或 yarn

### 安裝步驟

1. 安裝依賴套件：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 開啟瀏覽器訪問 `http://localhost:3000`

### 建置生產版本

```bash
npm run build
```

建置後的檔案會在 `dist/` 目錄中。

## 專案結構

```
rhema-pwa-demo/
├── index.html          # 主 HTML 檔案
├── styles/             # CSS 樣式檔案
│   └── main.css
├── scripts/             # JavaScript 檔案
│   └── main.js
├── package.json        # 專案設定檔
├── vite.config.js      # Vite 設定檔
└── README.md          # 本檔案
```

## Microsoft 365 整合

### 應用程式設定

- **Client ID：** `33abd69a-d012-498a-bddb-8608cbf10c2d`
- **Tenant ID：** `cd4e36bd-ac9a-4236-9f91-a6718b6b5e45`
- **Redirect URI：** 需在 Azure Portal 中設定

### API 權限

- User.Read
- profile
- email
- User.ReadBasic.All
- GroupMember.Read.All

## 功能清單

### 第一階段（目前）
- [x] Microsoft 365 登入整合
- [x] 請款單基本功能（新增、刪除、計算）
- [x] PDF 輸出功能
- [x] PWA 設定
- [x] 響應式設計
- [ ] Teams 應用程式版本

### 第二階段（規劃中）
- [ ] 權限管理系統
- [ ] 會計後台功能
- [ ] 資料庫整合（SharePoint List）

### 第三階段（規劃中）
- [ ] 限額功能
- [ ] 數據分析與報表

## 部署

### Vercel 部署

1. 將專案推送到 Git 倉庫
2. 在 Vercel 中連接 Git 倉庫
3. 設定建置指令：`npm run build`
4. 設定輸出目錄：`dist`
5. 自動部署完成

## 授權

MIT License

## 聯絡資訊

- **開發者：** Ivan Chen
- **公司：** 航冠國際聯運有限公司
- **Email：** ivan.chen@rhema.com.tw

