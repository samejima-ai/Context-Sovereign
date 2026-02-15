---
description: 標準化された手順を新規ワークフローとして作成し、システムを拡張するための手順
---

# Creating Workflows: Standardization Protocol

新しいワークフローを作成し、知識を再現可能な「形式知」としてシステムに実装するための手順。

## 1. Scope & Design Phase

**Goal:** 作成するワークフローの目的と範囲を定義する。

1.  **Objective (目的):**
    - 「何を達成するためのWFか？」を一行で定義する。
    - _Example:_ 「新規Reactプロジェクトのセットアップ」「日次レポートの自動生成」など。
2.  **Inputs (入力):**
    - 実行に必要な情報（ファイルパス、変数、ユーザー入力）を特定する。
3.  **Process (手順):**
    - 成功したチャットログや、既存のドキュメントから手順を抽出する。
    - **Abstraction:** 固有名詞（プロジェクト名など）を一般的な手順に書き換える。

## 2. Implementation Phase

**Target Directory:** `C:\Users\Owner\.gemini\antigravity\global_workflows\`

1.  上記ディレクトリに新規 `.md` ファイルを作成する。
    - Filename: `[verb]_[noun].md` (e.g., `creating_project.md`, `deploy_app.md`)
    - **Naming Convention:** ファイル名は動詞（現在分詞 `ing` 推奨、または命令形）から開始し、アクションを明確にする。
    - _空白スペースはアンダースコア `_` を使用する。\_

2.  **File Content Structure:**
    以下のフォーマットに従って記述する。

    ```markdown
    ---
    description: [短い説明文 - ユーザーが /slash-command で使う時に表示される]
    ---

    # [Workflow Title]

    [詳細な説明や前提条件]

    ## Steps

    1.  **[Step Name]**
        - [具体的な指示]
        - `Command to run`

    // turbo (自動実行可能なコマンドがある場合のみ) 2. **[Auto-run Step Name]** \* [指示]
    ```

3.  **Turbo Annotation Rules:**
    - `// turbo` : 直後のコマンド実行ステップが安全（確認不要）な場合のみ付与。
    - `// turbo-all` : WF全体の全コマンドが安全な場合、ファイルの先頭付近に付与。

## 3. Validation Phase

1.  **Dry Run:**
    - 作成したWFをエージェントに読み込ませ、意図通りに解釈されるか確認する。
2.  **Registration:**
    - （AIエージェントのシステム上、`.agent/workflows` への配置で自動認識されるが、グローバルWFの場合はユーザー設定に従う）
