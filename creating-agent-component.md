---
name: creating-agent-component
status: active
version: 2.0
scope: global
tags: [meta-workflow, orchestration, automation, self-healing]
description: >-
  Rules, Skills, Workflows の生成を自動化するマスターワークフロー。
  意図入力（ユーザー/Orchestrator）およびエラーエスカレーション入力を分析し、
  適切な生成プロセスへルーティングする。
  v2.0: error-escalation RL連携によるエラーログ入力パスを追加。
deployment: >-
  グローバルスコープ。ローカル環境展開時は
  ~/.gemini/antigravity/global_workflows/creating-agent-component.md に配置すること。
---

# Mega-Meta Workflow: Create Agent Component

> **Purpose**: Single Entry Point for extending the Agent System.
> **Logic**: Input (Intent | Error Log) -> Classify (RL/SK/WF) -> Route -> Execute
> **Trigger**: ユーザーの明示的指示、Orchestratorの設計判断、または `error-escalation` RLからの強制遷移

## Prerequisites

- **Skill**: `agent_component_classifier` must be available (Local or Global).
- **Workflows**: `creating-rules`, `creating-skills`, `creating-workflows` must be available.
- **Rule**: `error-escalation` (エラー起因の自動遷移時に参照)

## Steps

### 1. Input Reception (入力受付)

入力ソースを判別し、後続の Analysis に渡す構造化データを準備する。

#### Source A: 意図入力（ユーザーまたはOrchestrator）

- ユーザーが明示的に「〇〇のSkill/Rule/Workflowを作って」と指示、またはOrchestratorが設計判断として生成を決定
- 構造化形式:
  ```
  [INPUT]
  - source: intent
  - request: <要望テキスト>
  - origin: user | orchestrator
  ```

#### Source B: エラーエスカレーション入力（v2.0追加）

- `error-escalation` RLのLevel 0判定により自動遷移
- 構造化形式:
  ```
  [INPUT]
  - source: error_escalation
  - error_context:
      error_message: <エラー出力>
      triggered_during: <実行中のWF/SK名>
      affected_files: <関連ファイルパス>
      last_successful_step: <最終成功ステップ>
      attempt_count: <試行回数>
      agent_role: <Orchestrator | Executor>
  - missing_references: <存在しないと判定されたファイルパス一覧>
  ```

#### Source C: リカバリ指示入力（半自動）

- Level 2エスカレーション後、人間が判断・指示を下した結果
- 構造化形式:
  ```
  [INPUT]
  - source: user_recovery
  - escalation_report: <Level 2レポートへの参照>
  - user_instruction: <人間の判断・指示>
  ```

### 2. Analysis (分析)

- **Action**: Classify the input using the classifier skill.
- **Command**:
  ```bash
  # agent-component-classifier SKの手順に従い入力を分類
  # Source A: 意図テキストを分類
  # Source B: エラーコンテキスト + missing_references から
  #           不足コンポーネントの種別と要件を推定
  # Source C: エスカレーションレポート + 人間指示を分類
  ```
- **Classification Output**:
  ```
  [CLASSIFICATION]
  - component_type: RL | SK | WF
  - component_name: <推奨名>
  - purpose: <生成理由>
  - source: intent | error_escalation | user_recovery
  - constraints: CDD五戒律準拠必須
  ```
- **Manual Decision** (Source Aの場合):
  - Is it a **Rule (RL)**? (Constraint, Principle)
  - Is it a **Skill (SK)**? (Tool, Function)
  - Is it a **Workflow (WF)**? (Process, Procedure)

### 3. Routing (分岐)

Based on the classification result, proceed to the corresponding workflow.

#### Case A: Rules (RL)

- **Target**: `creating-rules`
- **Action**: Switch context to the Rules creation workflow.

#### Case B: Skills (SK)

- **Target**: `creating-skills`
- **Action**: Switch context to the Skills creation workflow.

#### Case C: Workflows (WF)

- **Target**: `creating-workflows`
- **Action**: Switch context to the Workflows creation workflow.

#### Case D: Unknown / Mixed

- **Source B (error_escalation)**: エラーコンテキストから種別を推定できない場合、
  Level 2エスカレーションへ移行し、人間に判断を委ねる。
- **Source A/C**: Ask user for clarification or decompose the request.

### 4. Execution (実行)

- Follow the steps in the selected workflow to complete the component creation.
- Ensure `MASTER_INDEX.md` is updated at the end.

### 5. Post-Generation (生成後処理) — Source B のみ

エラーエスカレーション起因で生成された場合、以下を実行する。

1. **五戒律検証**: 生成コンポーネントが `cacao-architect` RLの3原則に違反していないか確認
   - 違反あり → 生成物を破棄し、Level 2エスカレーションへ
   - 違反なし → 次へ
2. **同期確認**: MASTER_INDEX.md に反映済みであることを確認
3. **元タスク復帰**: `error-escalation` RLの規定に従い、元の失敗タスクにリトライを許可
4. **ログ記録**: 生成したコンポーネントとエラーの因果関係を記録

## Verification

- [ ] Did the classifier correctly identify the intent?
- [ ] Was the correct sub-workflow triggered?
- [ ] Was the component created in the correct directory (Local vs Global)?
- [ ] (Source B) Was the generated component verified against CDD five precepts?
- [ ] (Source B) Was the original task retry authorized only after synchronization?
