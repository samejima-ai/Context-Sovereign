---
description: Gitリポジトリの初期化からGitHubリポジトリ作成までを標準化するワークフロー
---

# Initializing Repository

新規プロジェクトのGit初期化、適切な`.gitignore`設定（特にエージェント関連ファイルの除外）、およびGitHubリポジトリの作成を手順化します。

## Steps

1.  **Configure .gitignore and Context Structure**
    - プロジェクトルートに `.gitignore` ファイルを作成（または確認）してください。
    - 以下の推奨除外リストが含まれていることを確認し、不足があれば追記してください：
      ```text
      node_modules/
      .env
      .DS_Store

      # Agent & Context
      .agent/
      # ※ .agent/context/ にコンテキストが集約されるため、.agent/ ごと除外することを推奨します。
      # 共有が必要なルールファイル等が .agent/rules/ にある場合は、
      # !.agent/rules/
      # のように例外設定を行ってください。
      ```
    - **重要:** 以前の `context/` ディレクトリを使用している場合は、`.agent/context/` に移動してください。

2.  **Initialize Git**
    - `Command to run`

    ```bash
    git init
    ```

3.  **Initial Commit**
    - `Command to run`

    ```bash
    git add .
    git commit -m "initial commit"
    ```

4.  **Create GitHub Repository**
    - GitHub CLIを使用してリポジトリを作成します。
    - `Command to run`

    ```bash
    gh repo create
    ```

    - プロンプトに従って設定してください（Public/Private、Remoteの追加など）。

5.  **Post-Setup Cleanup (Optional)**
    - もし `.gitignore` の設定が遅れ、不要なファイルがコミットされてしまった場合は以下を実行してください。
    - `Command to run`
    ```bash
    git rm -r --cached .
    git add .
    git commit -m "chore: clean up repo based on new .gitignore"
    ```
