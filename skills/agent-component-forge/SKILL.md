---
name: agent-component-forge
description: CS層の推論が生成したForgeSpec v2をRS層のSlothForgeエンジンに渡す。CSからRSへのhandoffエントリポイント。
---

# Agent Component Forge (RS Entry Point)

このスキルはCS層（Sovereign Reasoning）が生成した **ForgeSpec v2** を受け取り、
`slothforge/core/engine.js`に渡して決定論的にコンポーネントを生成するRSエントリポイントである。

**前提**: ForgeSpec v2はすでにPhase 0/1で生成済みであること。
このスキルはPhase 2（Sloth Execution）を担う。Phase 0/1は `creating-agent-component.md` WFを参照せよ。

## Trigger

コンポーネント生成が必要と判断した時（人間の命令 or RS層の破綻検知後のCS推論完了時）。

## ForgeSpec v2 Interface (JSON Schema)

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

## Validation Gates (engine.js v2が強制)

| 条件 | 結果 |
|---|---|
| `phase0_classification.confidence < 0.8` | ABORT: clarification required |
| `classified_type !== type` | ABORT: classification mismatch |
| RL型: `invariant_result: false`が存在 | ABORT: principle rejected |
| SK型: `schema.side_effects`未宣言 | ABORT: idempotency undeclared |
| SK型: `script_logic`未定義 | ABORT: empty stub prohibited |
| `attempt_number > 3` | ABORT: escalate with artifact chain |

## Action

```bash
node slothforge/core/engine.js --spec='[FORGESPEC_V2_JSON]'
```

複数コンポーネントを一括生成する場合:

```bash
node slothforge/core/engine.js --spec-file='path/to/specs.json'
```

## Rational Sloth Mandate

1. このスキルはPhase 2（RS層）のみを担う。Phase 0/1の推論はここでは行わない。
2. `$TC$`最小化: Phase 2のAI思考はゼロ。engine.jsが全てを処理する。
3. エラー発生時はPhase 3（`creating-agent-component.md` WF）に従い、CS層に戻せ。
