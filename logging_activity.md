---
description: 学習サイクルに基づき、活動記録・成功事例・失敗分析をMemory Bankに保存する
---

# Logging Activity: Memory Bank Transaction

日々の活動、成功パターン、失敗分析を体系的に記録し、自己螺旋学習ループを回すためのワークフロー。

## 1. Select Log Type

記録する情報の種類を選択する。

- **Daily Journal (日報):** 1日の活動終了時。
- **Success Pattern (成功):** うまくいった手法の形式知化。
- **Failure Analysis (失敗):** エラーや問題の分析と再発防止。
- **Progress Log (進捗):** プロジェクトの中断・再開時。

## 2. Process Steps

### A. Daily Journal (`daily_journals`)

1.  **Date Check:** 今日の日付 `YYYY-MM-DD` を確認。
2.  **File Creation/Update:**
    - Path: `C:\Users\Owner\.gemini\antigravity\memory_bank\daily_journals\YYYY\MM\YYYY-MM-DD.md`
    - すでに存在する場合は追記。
3.  **Content Generation:**
    - `Summary`, `Achievements`, `Learnings`, `Issues` を埋める。
    - 特に「何が学習できたか」「次にどう活かすか」に焦点を当てる。

### B. Success Pattern (`success_patterns`)

1.  **Category Definition:** 適切なカテゴリ（例: `web_dev`, `data_analysis`）を決める。
2.  **File Creation:**
    - Path: `C:\Users\Owner\.gemini\antigravity\memory_bank\success_patterns\[category]\[verb]_[noun].md`
3.  **Codification:**
    - テンプレートに従い、`Problem`, `Solution`, `Rationale` を記述。
    - 再現可能な `Code/Prompt Snippet` を必ず含める。

### C. Failure Analysis (`failure_analysis`)

1.  **Category Definition:** エラーの種類やコンテキストでカテゴリを決める。
2.  **File Creation:**
    - Path: `C:\Users\Owner\.gemini\antigravity\memory_bank\failure_analysis\[category]\[error_name].md`
3.  **Analysis:**
    - `Root Cause`（根本原因）を深く掘り下げる（なぜなぜ分析）。
    - `Prevention`（再発防止策）として、具体的なルール追加やWF修正を提案する。

### D. Progress Log (`progress_logs`)

1.  **Project Context:** 対象のプロジェクト名を確認。
2.  **File Creation:**
    - Path: `C:\Users\Owner\.gemini\antigravity\memory_bank\progress_logs\[project_name]\session_[timestamp].md`
3.  **Snapshot:**
    - 現在のタスク状態、開いているファイル、次への申し送り事項を記録。

## 3. Commit to Memory

1.  作成・更新したファイルを保存する。
2.  （Optional）重要な教訓は `GEMINI.md` の更新案としてユーザーに提示する。
