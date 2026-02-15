# Antigravity Global Workflows

Antigravity（アングラ）環境で使用される、汎用的なメタワークフローおよび共通スキルの集合体です。

## 📁 ディレクトリ構成

### 1. Workflows (`.gemini/antigravity/global_workflows/`)

エージェントが特定の目的（コンポーネント生成、リサーチ、レビューなど）を完遂するための、動的な手順書を格納します。

- **`creating-agent-component.md`**: RL/SK/WF 生成の統括エントリーポイント
- **`creating-rules.md`**: Rules (RL) 生成フロー
- **`creating-skills.md`**: Skills (SK) 生成フロー
- **`creating-workflows.md`**: Workflows (WF) 生成フロー

### 2. Global Skills (`.gemini/antigravity/skills/`)

エージェントが特定の能力として自動認識し、`view_file` 等で直接参照可能な「道具」を格納します。

- **`agent-component-classifier/`**: ユーザー入力を分析し、最適な種別に分類する設計技師

## ⚙️ セットアップ & ポータビリティ

他のデバイスでこのスキルセットを有効にするには、以下のフォルダ構造に配置してください。

```bash
# Windows
%USERPROFILE%\.gemini\antigravity\skills\               # Global Skills 配置先
%USERPROFILE%\.gemini\antigravity\global_workflows/     # Meta-Workflows 配置先

# Unix (macOS/Linux)
~/.gemini/antigravity/skills/
~/.gemini/antigravity/global_workflows/
```

## 🚀 使い方

エージェントに対して「エージェントコンポーネントを作成して」などの関連するキーワードで依頼することで、自動的にこれらのグローバルワークフローがトリガーされます。

---

© 2026 samejima-ai
