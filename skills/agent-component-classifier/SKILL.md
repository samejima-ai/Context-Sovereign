---
name: agent-component-classifier
status: active
version: 2.0
scope: global
tags: [skill, classification, meta, self-healing]
description: >-
  意図入力（ユーザー/Orchestrator）またはエラーログを分析し、
  生成すべきAgent Component（RL/SK/WF）の種別を判定する分類スキル。
  v2.0: エラーエスカレーション入力の分類能力を追加。
deployment: >-
  グローバルスコープ。ローカル環境展開時は
  ~/.gemini/antigravity/skills/agent-component-classifier/SKILL.md に配置すること。
---

# Skill: Agent Component Classifier

> **Purpose**: `creating-agent-component` WFのAnalysisステップで使用される。
> 入力を分析し、RL/SK/WFのいずれを生成すべきか判定する。

## Input Types

### Type 1: 意図入力（ユーザーまたはOrchestrator要望）

```
[INPUT]
- source: intent | user_recovery
- request: <自然言語テキスト>
- origin: user | orchestrator
```

### Type 2: エラーエスカレーション（v2.0追加）

```
[INPUT]
- source: error_escalation
- error_context: <ERROR_CONTEXT構造体>
- missing_references: <存在しないファイルパス一覧>
```

## Classification Logic

### Phase 1: 入力ソース判定

- `source: intent | user_recovery` → Phase 2A（意図分類）
- `source: error_escalation` → Phase 2B（欠陥分類）

### Phase 2A: 意図分類（従来ロジック）

意図テキストから以下のシグナルを検出する。

| シグナル                 | 判定        | 例                                     |
| ------------------------ | ----------- | -------------------------------------- |
| 制約・禁止・原則・ルール | **RL**      | 「〇〇を禁止するルールを作って」       |
| ツール・機能・変換・計算 | **SK**      | 「JSONをYAMLに変換するスキルが欲しい」 |
| 手順・プロセス・フロー   | **WF**      | 「デプロイの手順を定義したい」         |
| 複合・不明確             | **Unknown** | 分解を提案、またはユーザーに確認       |

### Phase 2B: 欠陥分類（v2.0追加）

エラーコンテキストから不足コンポーネントの種別を推定する。

#### Step 1: missing_references の解析

ファイルパスから種別を機械的に判定する（最も信頼性が高い）。

| パスパターン                         | 判定   |
| ------------------------------------ | ------ |
| `**/rules/**` または `**/*.rl.*`     | **RL** |
| `**/skills/**` または `**/*.sk.*`    | **SK** |
| `**/workflows/**` または `**/*.wf.*` | **WF** |

該当あり → 判定確定。Phase 3へ。

#### Step 2: エラーパターンからの推定

missing_references が空、またはパスパターンで判定不能な場合。

| エラーパターン                                     | 推定        | 根拠                      |
| -------------------------------------------------- | ----------- | ------------------------- |
| 「〇〇 is not defined」「command not found」系     | **SK**      | 実行可能な機能の不足      |
| 「〇〇 violated」「constraint error」系            | **RL**      | 制約定義の不足            |
| 「step 〇〇 not found」「workflow 〇〇 missing」系 | **WF**      | 手順定義の不足            |
| 上記に該当しない                                   | **Unknown** | Level 2エスカレーションへ |

#### Step 3: confidence 付与

| 判定根拠                                | confidence                            |
| --------------------------------------- | ------------------------------------- |
| Phase 2B Step 1（パスパターン一致）     | **high**                              |
| Phase 2B Step 2（エラーパターンマッチ） | **medium**                            |
| いずれにも該当しない                    | **low** → Level 2エスカレーション推奨 |

### Phase 3: 出力

```
[CLASSIFICATION]
- component_type: RL | SK | WF | Unknown
- component_name: <推奨名>
- purpose: <生成理由（エラー起因の場合はエラーメッセージから抽出）>
- source: <入力ソース>
- confidence: high | medium | low
- constraints: CDD五戒律準拠必須
```

## Limitations

- Phase 2B Step 2 のエラーパターンマッチはヒューリスティクスであり、誤判定の可能性がある。
  `confidence: medium` 以下の場合、`creating-agent-component` WF側で
  追加検証を行うか、Level 2エスカレーションを検討すること。
- 複数コンポーネントが同時に不足している場合、missing_references の先頭から
  1つずつ順次生成する。並列生成は行わない（依存関係の破綻を防止）。
