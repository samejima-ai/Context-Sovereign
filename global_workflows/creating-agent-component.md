---
name: creating-agent-component
status: active
version: 1.0
tags: [meta-workflow, orchestration, automation]
description: >-
  Rules, Skills, Workflows の生成を自動化するマスタータワークフロー。
  ユーザー入力を分析し、適切な生成プロセスへルーティングする。
---

# Mega-Meta Workflow: Creating Agent Component (SlothForge-Powered)

> **Purpose**: Single Entry Point for extending the Agent System using SlothForge framework.
> **Logic**: Request -> Analysis (Blueprint Generation) -> Forge (Deterministic Engine)

## Prerequisites

- **Frame**: `SlothForge` framework must be accessible at `slothforge/`.
- **Protocol**: `slothforge-protocol.md` must be referenced for RS-Native design.

## Steps

### 1. Analysis (設計と仕様化)

- **Action**: 主の要求から、SlothForge が受理可能な `ForgeSpec` (JSON) を生成せよ。
- **RS Policy**: 
  - `slothforge-protocol` に則り、SK は Interface 定義に絞り、ロジックは `scripts/` へ逃がせ。
  - **Environment Design**:
    - **Global (`GEMINI`)**: 普遍的な原則、共通語彙 (Dictionary) のみに絞れ。技術スタック依存の記述を禁ず。
    - **Local (`rules/*.md`)**: 具体的 ARC、SOP、スキーマ参照を記述せよ。ファイルは関心事ごとに細分化すること。
  - RL の `trigger` は `model_decision` または `always_on` の正規化された文字列を厳密に使用せよ。
  - **Global RL**: グローバルスコープの Rule は `name: "GEMINI"` とし、`GEMINI.md` として鍛造せよ。
  - 出力は一切の解説を省き、純粋な JSON 形式にすること。

### 2. Forge (鍛造実行)

- **Action**: 生成した JSON を引数として、SlothForge エンジンを実行せよ。
- **Command**:
  ```bash
  node slothforge/core/engine.js --spec='[ForgeSpec_JSON]'
  ```

### 3. Verification

- **Action**: 生成されたファイルのディレクトリ構造と、RS 教義への適合性を確認せよ。
