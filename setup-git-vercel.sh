#!/bin/bash

# RHEMA 請款系統 - Git 與 Vercel 自動設定腳本

echo "🚀 開始設定 Git 與 Vercel..."

# 顏色定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
fi

# 1. 檢查 Git 狀態
echo -e "\n${BLUE}📦 步驟 1: 檢查 Git 狀態...${NC}"
if [ -d ".git" ]; then
    echo "✅ Git 倉庫已初始化"
else
    echo "❌ Git 倉庫未初始化，正在初始化..."
    git init
    git add .
    git commit -m "初始專案"
fi

# 2. GitHub 倉庫設定
echo -e "\n${BLUE}📦 步驟 2: GitHub 倉庫設定...${NC}"

# 檢查是否已有遠端倉庫
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ 已設定遠端倉庫: $(git remote get-url origin)"
    read -p "是否要更換遠端倉庫？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
    else
        echo "跳過 GitHub 設定"
        SKIP_GITHUB=true
    fi
fi

if [ -z "$SKIP_GITHUB" ]; then
    echo -e "${YELLOW}請選擇 GitHub 倉庫設定方式：${NC}"
    echo "1) 我已經在 GitHub 建立倉庫，直接連接"
    echo "2) 使用 GitHub CLI 自動建立（需要先安裝並登入）"
    echo "3) 稍後手動設定"
    read -p "請選擇 (1/2/3): " choice
    
    case $choice in
        1)
            read -p "請輸入 GitHub 倉庫 URL (例如: https://github.com/username/rhema-pwa-demo.git): " repo_url
            if [ ! -z "$repo_url" ]; then
                git remote add origin "$repo_url"
                echo "✅ 已設定遠端倉庫: $repo_url"
                echo -e "${YELLOW}正在推送程式碼...${NC}"
                git branch -M main
                git push -u origin main || echo "⚠️  推送失敗，請檢查權限或手動推送"
            fi
            ;;
        2)
            if command -v gh &> /dev/null; then
                echo "使用 GitHub CLI 建立倉庫..."
                read -p "請輸入倉庫名稱 (預設: rhema-pwa-demo): " repo_name
                repo_name=${repo_name:-rhema-pwa-demo}
                read -p "倉庫描述 (預設: 航冠國際聯運有限公司請款系統): " repo_desc
                repo_desc=${repo_desc:-航冠國際聯運有限公司請款系統}
                read -p "是否為私有倉庫？(y/n，預設: n): " is_private
                
                if [[ $is_private =~ ^[Yy]$ ]]; then
                    gh repo create "$repo_name" --description "$repo_desc" --private --source=. --remote=origin --push
                else
                    gh repo create "$repo_name" --description "$repo_desc" --public --source=. --remote=origin --push
                fi
                echo "✅ GitHub 倉庫已建立並推送"
            else
                echo "❌ GitHub CLI 未安裝"
                echo "請先安裝: brew install gh"
                echo "然後登入: gh auth login"
            fi
            ;;
        3)
            echo "⏭️  跳過 GitHub 設定，稍後請參考 GIT_SETUP.md"
            ;;
    esac
fi

# 3. Vercel 部署設定
echo -e "\n${BLUE}📦 步驟 3: Vercel 部署設定...${NC}"

if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI 已安裝"
    read -p "是否要現在部署到 Vercel？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}開始 Vercel 部署...${NC}"
        echo "如果是第一次使用，會要求您登入 Vercel"
        vercel --prod
    else
        echo "⏭️  稍後可執行 'vercel --prod' 來部署"
    fi
else
    echo "❌ Vercel CLI 未安裝"
    echo "正在安裝 Vercel CLI..."
    npm install -g vercel
    if command -v vercel &> /dev/null; then
        echo "✅ Vercel CLI 安裝成功"
        echo "請執行 'vercel login' 登入，然後執行 'vercel --prod' 部署"
    else
        echo "❌ Vercel CLI 安裝失敗，請手動安裝: npm install -g vercel"
    fi
fi

echo -e "\n${GREEN}✨ 設定完成！${NC}"
echo ""
echo "📝 後續步驟："
echo "1. 如果 GitHub 倉庫已連接，可以在 Vercel 網站連接 Git 倉庫以啟用自動部署"
echo "2. 每次推送程式碼到 GitHub，Vercel 會自動重新部署"
echo "3. 詳細說明請參考 GIT_SETUP.md 和 README.md"

