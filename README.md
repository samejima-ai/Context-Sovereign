# Antigravity Global Workflows

Antigravity エージェントのためのグローバルなワークフローとスキルを管理するリポジトリです。
これらは、新しいエージェントコンポーネント（Rules, Skills, Workflows）を標準化された手順で生成するための「マスター」として機能します。

## 構成と配置場所 (File Placement)

このリポジトリのファイルを、エージェントがグローバルに参照できる場所に配置してください。

| ファイル/ディレクトリ         | 推奨配置場所                            | 内容                                 |
| :---------------------------- | :-------------------------------------- | :----------------------------------- |
| `creating-agent-component.md` | `.gemini/antigravity/global_workflows/` | **メガメタWF**: 生成プロセスの入り口 |
| `creating-rules.md`           | `.gemini/antigravity/global_workflows/` | ルール (RL) 生成フロー               |
| `creating-skills.md`          | `.gemini/antigravity/global_workflows/` | スキル (SK) 生成フロー               |
| `creating-workflows.md`       | `.gemini/antigravity/global_workflows/` | ワークフロー (WF) 生成フロー         |
| `agent-component-classifier/` | `.gemini/antigravity/global_workflows/` | 入力分類用スキル                     |

> [!NOTE]
> 現在、`agent-component-classifier` スキルは `global_workflows` 内に同居させています。これは、`creating-agent-component.md` からの相対パス参照を維持するためです。

## 使い方 (Usage)

新しいコンポーネントを作成したい場合、エージェントに以下のワークフローの実行を指示してください。

```bash
/creating-agent-component
```

または、直接ファイルの内容を読み込ませて開始します。

## 設計思想 (Design Philosophy)

- **CDD (Context-Driven Development)**: 実装（Script）の前に文脈（Context）を定義する。
- **Modular & Atomic**: 各スキルは単一の責任を持ち、再利用可能であること。
- **Standardized SOP**: 命名規則（kebab-case, verb-ing）や構造を厳格に守る。
