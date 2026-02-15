---
description: 新しい技術や専門知識をスキルとしてパッケージ化し、グローバルに展開するための手順
---

# Creating Skills: Capability Expansion Protocol

特定の技術スタック、ドメイン知識、ツールセットを「スキル」として定義し、エージェントの能力を拡張するための手順。

## 1. Structure Definition Phase

**Target Directory:** `C:\Users\Owner\.gemini\antigravity\skills\`

1.  スキル名を決定する。
    - _Naming Convention:_ `snake_case` (e.g., `react_development`, `data_analysis_python`)
2.  スキルディレクトリを作成する。
    - Path: `C:\Users\Owner\.gemini\antigravity\skills\[skill_name]\`

## 2. Instruction Design Phase (SKILL.md)

**Target File:** `C:\Users\Owner\.gemini\antigravity\skills\[skill_name]\SKILL.md`

以下の構成で `SKILL.md` を作成する。エージェントがこのファイルを `view_file` した際に、即座に「専門家」として振る舞えるように記述する。

```markdown
---
name: [Skill Name]
description: [このスキルで何ができるか]
---

# [Skill Name] Instructions

## 1. Overview & Capability

- このスキルが提供する価値と、いつ使用すべきかを記述。

## 2. Core Principles & Best Practices

- この領域における「鉄則」や「ベストプラクティス」。
- _Example:_ 「Reactでは直接DOMを操作せず、Stateを使用する」

## 3. Standard Procedures

- よくあるタスクの具体的な実行手順。
- コードスニペットやコマンド例を含む。

## 4. Anti-Patterns

- 避けるべき行動、よくある間違い。
```

## 3. Resource Preparation Phase (Optional)

必要に応じて、スキルディレクトリ内にリソースを追加する。

- `scripts/`: 自動化スクリプト（Python, Shell etc.）
- `templates/`: コードの雛形ファイル
- `cheatsheets/`: 参照用ドキュメント

## 4. Integration Phase

1.  **Verification:**
    - タスク実行時に「[Skill Name]を使って」と指示し、`SKILL.md` が正しく参照されるか確認する。
2.  **Global Registration (Optional):**
    - 重要度が高い場合、`GEMINI.md` の `<skills>` セクションに追記する。
