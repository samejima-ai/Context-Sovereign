---
name: slothforge-protocol
description: SlothForgeフレームワークを用いた能力生成の絶対憲法。CS×RS階層的協調プロトコルを核とし、決定論的鍛造を強制する。
---

# Rule: SlothForge Protocol

> **Core Principle**: エージェントの能力拡張は、すべてSlothForgeの決定論的製造ラインを経由しなければならない。CS層がForgeSpec v2を設計し、RS層（engine.js）がそれを実行する。

## Layer Architecture

```
[人間の命令 / RS層の破綻検知]
        ↓
━━━━━━━━━━━━━━━━━━━━━ CS層（メタ認知 / Sovereign Reasoning）
  Phase 0: Classification Gate （3-step推論）
  Phase 1: Sovereign Reasoning （5-Whys + API-First設計）
  OUTPUT → ForgeSpec v2 JSON
━━━━━━━━━━━━━━━━━━━━━ 層境界アーティファクト（ForgeSpec v2）
  Phase 2: Sloth Execution （AI思考ゼロ）
  engine.js → 物理ファイル生成
━━━━━━━━━━━━━━━━━━━━━ RS層（実行 / Sloth Execution）
```

**重要**: Phase 0/1はCS層の作業であり、RSのZero-Thinking Logic制約の適用外である。
Phase 2以降のみがZero-Thinking Logicの対象となる。

## Principles (原則)

- **Zero-Thinking Logic（RS層限定）**: Phase 2以降において、`SKILL.md`や`Workflow`に複雑な推論ロジックを記述することを禁ずる。Phase 2のロジックはすべて`slothforge/`内のスクリプトに集約せよ。
- **ForgeSpec v2 as Contract**: CS層の推論出力は必ずForgeSpec v2 JSON形式でなければならない。CSはファイルを直接生成しない。

## Scope Governance (スコープ統治の法)

### 1. Global (Meta Rules: `GEMINI.md`)
- **目的**: プロジェクト・技術スタックを問わない「絶対的・永続的」な原則の定義。
- **書くべきこと**: アイデンティティ、基本スタンス（例：「推測禁止」）、略語定義 (Dictionary)、メタ・ワークフロー。
- **禁忌**: 特定言語の規約、特定のディレクトリ構造に依存する命令（文脈汚染の防止）。

### 2. Local (Execution Rules: `rules/*.md`)
- **目的**: プロジェクトのARC/SKに直結する「物理的・具体的」な制約の定義。
- **書くべきこと**: 技術スタック固有のBP、コマンド実行のSOP、スキーマ/API参照先。
- **設計指針**: 巨大な1ファイルを避け、関心事項ごとに細分化（例：`ui-components.md`）せよ。

## ForgeSpec v2 (JSON Schema)

```json
{
  "phase0_classification": {
    "classified_type": "RL | SK | WF",
    "confidence": 0.0,
    "alternative_type": "RL | SK | WF | null",
    "classification_rationale": "string"
  },
  "type": "RL | SK | WF",
  "name": "kebab-case-name",
  "scope": "local | global",
  "metadata": {
    "name": "string",
    "description": "string (max 100 chars)",
    "trigger": "model_decision | always_on"
  },
  "reasoning_chain": {
    "intent_analysis": "string",
    "invariant_proof": [
      {
        "principle": "string",
        "why_chain": ["string"],
        "invariant_test": "string",
        "invariant_result": true
      }
    ],
    "patterns_observed": ["string"],
    "existing_rl_match": "string | null"
  },
  "content": {
    "principles": ["string"],
    "conventions": ["string"],
    "constraints": ["string"],
    "schema": {
      "input": {},
      "output": {},
      "idempotency_key": "string | none",
      "side_effects": []
    },
    "script_logic": {
      "description": "string",
      "algorithm": ["string"],
      "error_behavior": "string"
    },
    "steps": ["string"]
  },
  "forge_meta": {
    "attempt_number": 1,
    "previous_error": null
  }
}
```

**フィールド注記**:
- `trigger`: Global `GEMINI` RL では不要。SK と local RL のみ必須。
- `schema` / `script_logic`: SK型のみ必須。RL/WFでは省略可。
- `steps`: WF型のみ。RL/SKでは省略可。

## Constraints (制約)

- **engine.js独占の法**: `slothforge/core/engine.js`以外の手段による物理ファイルの直接生成（mkdir, write_to_file等の乱用）を、能力生成プロセスにおいて禁ずる。
- **empty stub禁止**: SK型において`script_logic`を伴わないForgeSpec v2の鍛造を禁ずる。engine.jsがこれを強制する。
- **confidence閾値の強制**: `phase0_classification.confidence < 0.8`のForgeSpec v2は鍛造を開始してはならない。
- **invariant純度の保持**: `invariant_result: false`のprincipleをそのまま`content.principles`に含めてはならない。
