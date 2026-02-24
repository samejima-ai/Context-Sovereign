---
name: initializing-context-sovereign
status: active
version: 1.0.0
description: MetaFW (Context-Sovereign) をグローバルスコープへ一括配置し、統治を開始するワークフロー。
tags: [setup, bootstrap, governance, workflow]
---

# Workflow: Initializing Context Sovereign (統治の初期化)

## Goal

本リポジトリの内容を、Antigravityのグローバルスコープ（`~/.gemini/antigravity/`）の各ディレクトリ（rules, skills, global_workflows）に適切に配置し、エージェントが即座に「4つの美学」に基づいた自律統治を開始できるようにする手続き。

## Standard Procedures (一撃初期化手順)

エージェントは、本スキルが呼び出された際、以下のステップを自律的に実行せよ。

### 1. 座標の特定 (Locate)
- カレントリポジトリ内の各ファイルをスキャンする。
    - `GEMINI.md` -> Rules
    - `skills/` -> Skills
    - `global_workflows/` -> Global Workflows

### 2. 進軍と配置 (Deploy)
- 既存のファイルをバックアップ（推奨）した上で、最新の「純粋MetaSK」コンポーネントをグローバルパスへコピーする。
- **Command (Reference)**:
    ```powershell
    # 美学（魂）の配置
    cp ./GEMINI.md ~/.gemini/antigravity/rules/GEMINI.md
    
    # スキル（手足）の配置
    cp -r ./skills/* ~/.gemini/antigravity/skills/
    
    # ワークフロー（手順）の配置
    cp -r ./global_workflows/* ~/.gemini/antigravity/global_workflows/
    ```

### 3. 統治の宣言 (Activate)
- 配置完了後、`notify_user` にて「統治機構の初期化完了」を報告せよ。
- 以降、すべての思考において `GEMINI.md` の「4つの美学」を絶対規範とせよ。

---

> [!IMPORTANT]
> この「初期化」は、システムに魂を吹き込む儀式である。慎重かつ果敢に行え。
