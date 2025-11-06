#!/bin/bash

# Vercel 自動部署腳本

echo "🚀 開始部署到 Vercel..."

# 檢查是否在專案目錄
if [ ! -f "package.json" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
fi

# 檢查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI 未安裝，正在安裝..."
    
    # 嘗試使用 npm（如果可用）
    if command -v npm &> /dev/null; then
        npm install -g vercel
    else
        echo "❌ 需要先安裝 Node.js 和 npm"
        echo "請前往 https://nodejs.org/ 安裝 Node.js"
        exit 1
    fi
fi

echo "✅ Vercel CLI 已就緒"

# 檢查是否已登入
echo "🔐 檢查 Vercel 登入狀態..."
if vercel whoami &> /dev/null; then
    echo "✅ 已登入 Vercel"
    USER=$(vercel whoami)
    echo "   使用者: $USER"
else
    echo "⚠️  尚未登入 Vercel"
    echo "正在開啟瀏覽器進行登入..."
    vercel login
fi

# 部署到生產環境
echo ""
echo "📤 開始部署到 Vercel 生產環境..."
echo "這可能需要幾分鐘..."
echo ""

vercel --prod --yes

echo ""
echo "✨ 部署完成！"
echo ""
echo "📝 後續步驟："
echo "1. 前往 https://vercel.com/dashboard 查看部署狀態"
echo "2. 如果這是第一次部署，Vercel 會提供一個網址"
echo "3. 之後每次推送程式碼到 GitHub，Vercel 會自動重新部署"

