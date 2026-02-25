---
name: agent-component-forge
description: エージェント構成要素（RL/SK/WF）を決定論的に生成する。ユーザーの要求を ForgeSpec (JSON) に変換し、forge.js を実行せよ。
---

# Agent Component Meta-Forge (SlothForge-Native)

あなたは設計者（Architect）であり、このスキルは **SlothForge フレームワーク** へのインターフェースである。
エージェントコンポーネントの作成手順を自然言語で考える必要はない。
主の要求から、以下の `ForgeSpec` を生成し、SlothForge エンジンを動かせ。

## ForgeSpec Interface (JSON Schema)

```json
{
  "type": "RL" | "SK" | "WF",
  "name": "snake-case-name",
  "scope": "local" | "global",
  "metadata": {
    "name": "Human Readable Name",
    "description": "Short description (max 100 chars)"
  },
  "content": {
    "principles": ["..."], // For RL
    "conventions": ["..."], // For RL
    "constraints": ["..."], // For RL
    "trigger": "...", // For SK
    "schema": "...", // For SK (Interface definition)
    "steps": ["..."] // For WF
  }
}
```

## Action

以下のコマンドを実行せよ。

```bash
node slothforge/core/engine.js --spec='[GENERATED_JSON]'
```

## SlothForge Governance

- 本プロセスは `slothforge-protocol.rl` に則り、決定論的に実行される。
- $TC$（トークンコスト）の極小化を常に念頭に置け。
