#!/usr/bin/env python3
"""
使用 GitHub API 自動建立倉庫並推送程式碼
需要 GitHub Personal Access Token
"""

import json
import subprocess
import sys
import os

def create_github_repo(token, repo_name="rhema-pwa-demo", is_private=False):
    """使用 GitHub API 建立倉庫"""
    import urllib.request
    import urllib.error
    
    url = "https://api.github.com/user/repos"
    
    data = {
        "name": repo_name,
        "description": "航冠國際聯運有限公司請款系統",
        "private": is_private,
        "auto_init": False  # 不初始化，因為我們已有程式碼
    }
    
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }
    
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers, method='POST')
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            return result.get('clone_url'), result.get('ssh_url')
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode()
        print(f"❌ 建立倉庫失敗: {error_msg}")
        return None, None
    except Exception as e:
        print(f"❌ 錯誤: {e}")
        return None, None

def push_to_github(repo_url):
    """推送程式碼到 GitHub"""
    try:
        # 檢查是否已有遠端
        result = subprocess.run(['git', 'remote', 'get-url', 'origin'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ 已存在遠端倉庫: {result.stdout.strip()}")
            response = input("是否要更換？(y/n): ")
            if response.lower() == 'y':
                subprocess.run(['git', 'remote', 'remove', 'origin'], check=True)
            else:
                return True
        
        # 新增遠端
        subprocess.run(['git', 'remote', 'add', 'origin', repo_url], check=True)
        print(f"✅ 已設定遠端倉庫: {repo_url}")
        
        # 確保在 main 分支
        subprocess.run(['git', 'branch', '-M', 'main'], check=True)
        
        # 推送
        print("📤 正在推送程式碼...")
        subprocess.run(['git', 'push', '-u', 'origin', 'main'], check=True)
        print("✅ 程式碼已成功推送到 GitHub！")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 推送失敗: {e}")
        return False
    except Exception as e:
        print(f"❌ 錯誤: {e}")
        return False

def main():
    print("🚀 GitHub 倉庫自動建立工具\n")
    
    # 檢查是否在 Git 倉庫中
    if not os.path.exists('.git'):
        print("❌ 錯誤：請在專案根目錄執行此腳本")
        sys.exit(1)
    
    # 取得 Token
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        print("請提供 GitHub Personal Access Token")
        print("方式 1: 設定環境變數 GITHUB_TOKEN")
        print("方式 2: 直接在下方輸入（不會顯示）")
        token = input("GitHub Token: ").strip()
    
    if not token:
        print("❌ 需要 GitHub Token 才能繼續")
        sys.exit(1)
    
    # 取得倉庫資訊
    repo_name = input("倉庫名稱 (預設: rhema-pwa-demo): ").strip() or "rhema-pwa-demo"
    is_private_input = input("是否為私有倉庫？(y/n，預設: n): ").strip().lower()
    is_private = is_private_input == 'y'
    
    # 建立倉庫
    print(f"\n📦 正在建立 GitHub 倉庫: {repo_name}...")
    https_url, ssh_url = create_github_repo(token, repo_name, is_private)
    
    if not https_url:
        print("❌ 建立倉庫失敗")
        sys.exit(1)
    
    print(f"✅ 倉庫已建立: https://github.com/{repo_name.split('/')[-1] if '/' in repo_name else repo_name}")
    
    # 推送程式碼
    push_to_github(https_url)
    
    print("\n✨ 完成！")
    print(f"🌐 倉庫網址: https://github.com/{repo_name.split('/')[-1] if '/' in repo_name else repo_name}")

if __name__ == "__main__":
    main()

