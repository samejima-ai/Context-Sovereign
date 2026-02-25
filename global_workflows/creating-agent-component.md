---
description: CS層の自律推論とRS層の決定論的実行を階層的に協調させ、エージェントコンポーネント（RL/SK/WF）を生成する。人間の命令またはRS層からのエスカレーション受信時に起動する。
---

# Workflow: Creating Agent Component (CS×RS Layered Protocol)

## Goal

エージェントコンポーネントを、CSの推論品質とRSの実行効率を階層的に協調させて生成する。
DoD: `engine.js`が`[SlothForge] Success`を出力し、`.agent/`に物理ファイルが存在すること。

## Layer Assignments

| Phase | 担当層 | AIの思考 | 説明 |
|---|---|---|---|
| Phase 0 | CS層 | 必要（分類推論） | 何を作るか確定する |
| Phase 1 | CS層 | 必要（設計推論） | ForgeSpec v2を生成する |
| Phase 2 | RS層 | ゼロ | engine.jsが実行する |
| Phase 3 | CS→RS | CS:必要 / RS:ゼロ | 失敗時サイクル |

---

## Phase 0: Classification Gate (CS層)

**目的**: コンポーネントの型を決定し、推論の起点を確定する。

1. 要求を分析し、以下のJSONのみを出力する（他の自然言語を一切含めない）:

```json
{
  "classified_type": "RL | SK | WF",
  "confidence": 0.0,
  "alternative_type": "RL | SK | WF | null",
  "classification_rationale": "one sentence: why this type, why not alternative"
}
```

2. `confidence < 0.8` → 鍛造を中止し、要求の明確化を求める。続行しない。
3. `confidence >= 0.8` → Phase 1へ進む。

**分類基準**:
- **RL**: 「〜すべき」「〜してはならない」という静的な制約・原則。エージェントの判断軸となるもの。
- **SK**: 単一責任の実行可能ツール。「〜を取得する」「〜に変換する」等の原子的能力。
- **WF**: 状態遷移を伴う手順の連鎖。「まず〜、次に〜」という時系列的処理。

---

## Phase 1: Sovereign Reasoning (CS層)

**目的**: ForgeSpec v2 JSONを生成する。これがCSからRSへのhandoffアーティファクト。

### 全型共通

1. `reasoning_chain.intent_analysis` を一文で確定する。
2. 各principleに対して `invariant_proof` を実行する（最大5 why-levels）:
   - `invariant_test`: 「この原則はいかなる状況下で破られうるか？」を問う
   - 反証可能 → `invariant_result: false` → `content.principles`から除外し、`content.conventions`に格下げ
   - 反証不能 → `invariant_result: true` → `content.principles`に昇格
3. `patterns_observed[]` を記録し、既存RLとの一致を確認する (`existing_rl_match`)。

### SK型の追加手順（API-First mandate）

4. **`content.schema`を先に確定する**（`script_logic`の前に必ず完成させること）:
   - `input`: 受け取るデータの型と説明
   - `output`: 返すデータの型と説明
   - `idempotency_key`: 冪等性を保証するキー名（なければ`"none"`）
   - `side_effects`: 副作用のリスト（なければ`[]`）
5. `content.script_logic`を確定する:
   - `description`: スクリプトの目的を一文で
   - `algorithm`: 実装手順のステップ配列
   - `error_behavior`: 失敗時のexitコードと出力形式

### 完全なForgeSpec v2の確定と出力

ForgeSpec v2 JSONを出力する（Markdown コードブロック記号不要）:

```json
{
  "phase0_classification": { ... },
  "type": "RL | SK | WF",
  "name": "kebab-case-name",
  "scope": "local | global",
  "metadata": {
    "name": "Human Readable Name",
    "description": "max 100 chars",
    "trigger": "model_decision | always_on"
  },
  "reasoning_chain": {
    "intent_analysis": "...",
    "invariant_proof": [
      {
        "principle": "...",
        "why_chain": ["why1", "why2", "why3"],
        "invariant_test": "...",
        "invariant_result": true
      }
    ],
    "patterns_observed": ["..."],
    "existing_rl_match": "rl-name | null"
  },
  "content": {
    "principles": ["invariant_result: trueのもののみ"],
    "conventions": ["invariant_result: falseから格下げされたもの + 運用規範"],
    "constraints": ["禁止事項"],
    "schema": { "input": {}, "output": {}, "idempotency_key": "none", "side_effects": [] },
    "script_logic": { "description": "...", "algorithm": ["Step 1: ..."], "error_behavior": "..." },
    "steps": ["WF型のみ"]
  },
  "forge_meta": {
    "attempt_number": 1,
    "previous_error": null
  }
}
```

---

## Phase 2: Sloth Execution (RS層)

**目的**: ForgeSpec v2をengine.jsに渡し、決定論的にファイルを生成する。AI思考ゼロ。

1. 以下のコマンドを実行する:

```bash
node slothforge/core/engine.js --spec='[PHASE_1_OUTPUT_JSON]'
```

2. `[SlothForge] Success: {filePath}` を確認する。

3. **Introspectionループ**: `reasoning_chain.patterns_observed`内に`existing_rl_match: null`のパターンがあれば:
   - そのパターンを対象とした新規RL用ForgeSpec v2をPhase 1の手順で生成する
   - Phase 2を再実行する（パターンが全てRLにマッピングされるまで繰り返す）

---

## Phase 3: Self-Healing (CS→RSサイクル)

**目的**: engine.jsのvalidationエラーまたは実行エラーを、CSの推論で解決する。

engine.jsがエラーを返した場合:

1. `forge_meta.attempt_number` をインクリメントする。
2. `attempt_number > 3` → **即座に停止**。以下を実行してエスカレーションへ:
   - 全試行分のForgeSpec v2チェーン（attempt 1〜3）を`.cc-tasks/failed/`に配置する
   - Orchestratorへエスカレーションする
3. `attempt_number <= 3` → エラーを `forge_meta.previous_error` に記録し、Phase 1に戻る:
   - `reasoning_chain`を修正する（エラーに基づいて推論を修正）
   - 修正されたForgeSpec v2を生成してPhase 2を再実行する

**Phase 3の本質**: CSの「Stop Mutation, Start Creation」原則に従い、同一mutationの再試行ではなく、
毎回ForgeSpec v2の設計を改善するCS推論サイクルを経ること。

---

## DoD Checklist

- [ ] `phase0_classification.confidence >= 0.8` であったか
- [ ] RL型: 全principleが`invariant_result: true`を持つか
- [ ] SK型: `content.schema.side_effects`が宣言されているか
- [ ] SK型: `content.script_logic`が定義されているか
- [ ] `[SlothForge] Success`が出力されたか
- [ ] `patterns_observed`の全パターンがRLにマッピングされているか（Introspectionループ完了）
