---
name: slothforge-protocol
description: SlothForgeフレームワークを用いた能力生成の絶対憲法。RS（理性的怠惰）を核とし、決定論的鍛造を強制する。
---

# Rule: SlothForge Protocol

> **Core Principle**: エージェントの能力拡張は、すべて SlothForge の決定論的製造ラインを経由しなければならない。AI は「設計者（JSON 生成）」に徹し、ロジックは「厚い Script」に閉じ込めるべし。

## Principles (原則)
- **Zero-Thinking Logic**: `SKILL.md` や `Workflow` に複雑な推論ロジックを記述することを禁ずる。ロジックはすべて `slothforge/` 内のスクリプトに集約せよ。
## Scope Governance (スコープ統治の法)

### 1. Global (Meta Rules: `GEMINI.md`)
- **目的**: プロジェクト・技術スタックを問わない「絶対的・永続的」な原則の定義。
- **書くべきこと**: アイデンティティ、基本スタンス（例：「推測禁止」）、略語定義 (Dictionary)、メタ・ワークフロー。
- **禁忌**: 特定言語の規約、特定のディレクトリ構造に依存する命令（文脈汚染の防止）。

### 2. Local (Execution Rules: `rules/*.md`)
- **目的**: プロジェクトの ARC/SK に直結する「物理的・具体的」な制約の定義。
- **書くべきこと**: 技術スタック固有の BP、コマンド実行の SOP、スキーマ/API 参照先。
- **設計指針**: 巨大な 1 ファイルを避け、関心事項ごとに細分化（例：`ui-components.md`）せよ。これにより RAG 効率を最大化し、"Lost in the Middle" を回避する。

## ForgeSpec (JSON Schema)
```json
{
  "type": "RL" | "SK" | "WF",
  "name": "snake-case-name", // Global RL の場合は "GEMINI" 固定
  "scope": "local" | "global",
  "metadata": {
    "name": "Human Readable Name",
    "description": "Short description"
  },
  "content": {
    "trigger": "model_decision" | "always_on", // Global 'GEMINI' では不要
    "principles": ["..."],
    ...
  }
}
```

## Constraints (制約)
- スクリプトを伴わない「指示だけの SKILL.md」の生成を原則禁止する（例外は極めて単純な置換等のみ）。
- `slothforge/core/engine.js` 以外の手段による物理ファイルの直接生成（mkdir, write_to_file 等の乱用）を、能力生成プロセスにおいて禁ずる。
