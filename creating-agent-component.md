---
name: creating-agent-component
status: active
version: 1.0
tags: [meta-workflow, orchestration, automation]
description: >-
  Rules, Skills, Workflows の生成を自動化するマスタータワークフロー。
  ユーザー入力を分析し、適切な生成プロセスへルーティングする。
---

# Mega-Meta Workflow: Create Agent Component

> **Purpose**: Single Entry Point for extending the Agent System.
> **Logic**: Input -> Classify (RL/SK/WF) -> Route -> Execute

## Prerequisites

- **Skill**: `agent_component_classifier` must be available (Local or Global).
- **Workflows**: `creating-rules`, `creating-skills`, `creating-workflows` must be available.

## Steps

### 1. Analysis (分析)

- **Action**: Analyze the user's request using the classifier skill.
- **Command**:
  ```bash
  # ユーザー入力を分析
  # (エージェントが自律的に実行する場合)
  view_file "c:/Users/Owner/CDD-Guideline/.agent/skills/agent_component_classifier/SKILL.md"
  # Follow the instructions in SKILL.md to classify the input
  ```
- **Manual Decision**:
  - Is it a **Rule (RL)**? (Constraint, Principle)
  - Is it a **Skill (SK)**? (Tool, Function)
  - Is it a **Workflow (WF)**? (Process, Procedure)

### 2. Routing (分岐)

Based on the classification result, proceed to the corresponding workflow.

#### Case A: Rules (RL)

- **Target**: `creating-rules`
- **Action**: Switch context to the Rules creation workflow.
- **Command**:
  ```bash
  view_file "c:/Users/Owner/.gemini/antigravity/global_workflows/creating-rules.md"
  ```

#### Case B: Skills (SK)

- **Target**: `creating-skills`
- **Action**: Switch context to the Skills creation workflow.
- **Command**:
  ```bash
  view_file "c:/Users/Owner/.gemini/antigravity/global_workflows/creating-skills.md"
  ```

#### Case C: Workflows (WF)

- **Target**: `creating-workflows`
- **Action**: Switch context to the Workflows creation workflow.
- **Command**:
  ```bash
  view_file "c:/Users/Owner/.gemini/antigravity/global_workflows/creating-workflows.md"
  ```

#### Case D: Unknown / Mixed

- **Action**: Ask user for clarification or decompose the request.

### 3. Execution (実行)

- Follow the steps in the selected workflow to complete the component creation.
- Ensure `MASTER_INDEX.md` is updated at the end.

## Verification

- [ ] Did the classifier correctly identify the intent?
- [ ] Was the correct sub-workflow triggered?
- [ ] Was the component created in the correct directory (Local vs Global)?
