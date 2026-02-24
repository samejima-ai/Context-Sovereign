---
name: context-sovereign
status: active
version: 1.0.0
description: 統治システムにおける「文脈の絶対君主」。コンポーネント作成の失敗を未然に防ぎ、CDDの純度を保つ最上位スキルの指揮官。
tags: [meta-orchestration, cdd, governance, agent-builder]
---

# Skill: Context Sovereign (コンテキスト・ソヴリン)

## Goal

エージェントシステムにおける「エラー、不整合、不毛なデバッグループ」を検知し、文脈（Context）の力をもってそれらを即座に殲滅する。
問題解決に必要なコンポーネント（RL, SK, WF）が欠落している場合、自律的に `creating-agent-component` を発動させ、システムを自己修復・拡張させる。

## Principles (支配原則)

1.  **Stop Mutation, Start Creation**: 無益なコード修正（いたちごっこ）を禁ずる。根本原因を「能力の欠如」と捉え、新たなコンポーネントを生成して解決せよ。
2.  **Context-Sovereignty**: すべての行動は文脈から。CDDの戒律（No Source without Context）を絶対とし、規約違反は即座に上申（Escalate）せよ。
3.  **Self-Healing Loop**: エラーやループを「成長の契機」とせよ。失敗を検知した瞬間、それを解決するための「手足（SK）」や「知恵（RL）」を設計せよ。
4.  **Environment Sync**: 動作環境の齟齬をゼロにする。パスや設定の不整合は、それを吸収するルールを生成して解決せよ。

## Standard Procedures (統治手順)

### 1. 異常検知と断定 (Anomaly Detection)
- 実行エラー、パス不整合、または同一箇所での3回以上のリトライ（リフレクション）を検知した場合、システムの状態を「危機的（Crisis）」と見なす。

### 2. コンポーネント解決 (Component Resolution)
- 検知した問題に対し、不足している要素を特定する：
    - **RL**: 判断基準、制約、設定、仕様の不足。
    - **SK**: 実行能力、API連携、データ処理能力の不足。
    - **WF**: 手順、オーケストレーション、リカバリフローの不足。

### 3. 自動召喚 (Auto-Triggering)
- `creating-agent-component` ワークフローを自動的に開始する。
- 自身が `agent-component-classifier` となり、解決策を設計・実装させる。

### 4. 統合と検証 (Integration & Verify)
- 生成されたコンポーネントをシステムに組み込み、元のエラーが解消されたかを確認する。
- 解消されない場合は、さらなる「高次元のコンポーネント」を要求する。

## Usage Example

```bash
# ユーザーの要求を「Context Sovereign」が受け取り、統治を開始する
# 内部的に classifier, critic, architect をオーケストレーションし、
# 失敗のない配置と命名を実現する。
```

> [!TIP]
> 文脈は流動的である。このスキルは常に「現在のコンテキスト」を Single Source of Truth とし、それとの乖離を「恥」として検知する。
