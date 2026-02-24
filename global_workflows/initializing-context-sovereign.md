---
name: initializing-context-sovereign
status: active
version: 1.0.0
description: MetaFW (Context-Sovereign) をグローバルスコープへ一括配置し、統治を開始するワークフロー。
tags: [setup, bootstrap, governance, workflow]
---

# Workflow: Initializing Context Sovereign (統治の初期化)

## Goal

本リポジトリの内容を、ターゲット環境の各ディレクトリ（rules, skills, global_workflows）に適切に配置し、エージェントが即座に「4つの美学」に基づいた自律統治を開始できるようにする手続き。

## Standard Procedures (一撃初期化手順)

エージェントは、本ワークフローが実行された際、以下のステップを自律的に実行せよ。

### 1. 座標の特定 (Locate)
- カレントリポジトリ内の各ファイルをスキャンする。
    - `GEMINI.md` -> Rules
    - `skills/` -> Skills
    - `global_workflows/` -> Global Workflows

### 2. 進軍と配置 (Deploy)
- 既存のファイルをバックアップした上で、最新の「純粋MetaSK」コンポーネントをグローバルパスへ配置する。
- **Action (Reference)**:
    - 魂（GEMINI.md）をルールディレクトリへ配置せよ。
    - スキルおよびワークフローをそれぞれのディレクトリへ配置せよ。

### 3. 統治の宣言 (Activate)
- 配置完了後、`notify_user` にて「統治機構の初期化完了」を報告せよ。
- 以降、すべての思考において `GEMINI.md` の「4つの美学」を絶対規範とせよ。

---

> [!IMPORTANT]
> この「初期化」は、システムに魂を吹き込む儀式である。慎重かつ果敢に行え。
