---
name: executing-agpl
status: active
version: 2.0
tags: [autonomous, evolution, loop, bushido]
description: AGPL v2 (Helix Edition) - 開発と成長が螺旋状に向上する自己進化型ループ
---

# Autonomous Goal-Pursuit Loop (AGPL) v2: Helix Edition

## 概要

本ワークフローは、**TOTEモデル**による課題解決、**螺旋学習 (Helix)**、**武士道エンジン (Bushido Engine)** を融合させた「自己完結型・自己進化エンジン」である。

外部からの賞賛を待たず、**内なる矜持（Honor）と恥（Shame）** によって自己を律し、**技術的に不可能でない限り成功するまでループを回し続ける**。

> **Core Mandate**: "Never Stop, Always Evolve."
> **Bushido Oath**: "外部の評価を待たず、己の美意識に恥じぬ仕事をせよ。"

---
## 前提条件

- **Skill**: `context-sovereign` (構成管理・自己修復能力)
- **Skill**: `agent-component-classifier` (要求分析能力)
- **Knowledge**: `GEMINI.md` (最上位指針)
- ユーザーによる「完了の定義 (DoD)」

---

## 手順

### Phase 0: Anchor (座標固定)

1. **DoDと誓いの宣言**
   - ユーザーにDoDを明示的に確認し、`task.md` に記録せよ。
   - **成功判定**: `task.md` に具体的な「完了の定義」と「制約」が明記されていること。

### Phase 0.5: External Orders Polling (指令受信)

> **【Omni-Channel Command Center】**
> 外部からの指令を、利用可能な通信経路から自律的に受信する。

1.  **インボックスの監視**
    - **Action**: 利用可能な通信ツール（Google Tasks, Slack, Email, etc.）を確認し、最新の指令をポーリングせよ。
    - **Logic**:
        - 指令がある場合: その内容をプロンプトおよび「現在のDoD」として認識。
        - 指令がない場合: 通常のユーザー入力を待つか、前回の目標を継続。

2.  **進捗・完了の同期**
    - **Action**: 実装の進捗や完了状態を、外部の追跡システムへ同期せよ。

### Phase 1: Test (内省監査 / Introspection)

2. **GAP分析 + 五常フィルター**
    - **Action**:
        - 成果物の内容を多角的に監査せよ。
        - 品質基準や制約事項への適合性を検証し、論理的矛盾や不足を特定せよ。
    - **Honor Check (武士道監査)**:
        - 「この成果物を自分の名で世に出せるか？」
        - 「主（あるじ）の信頼に応える品質であるか？」
    - **成功判定**:
        - GAP == 0 かつ Honor == True → Phase 4 (Exit) へ
        - GAP > 0 または Shame検知 → Phase 2 (Operate) へ

---

### Phase 2: Operate (実行 / Resolution)

3. **五常に基づく戦略実行**
    - **Action**:
        - 文脈に基づき、最適なツールとスキルを選択・実行せよ。
        - 試行錯誤の結果を常に記録し、学習の糧とせよ。
    - **五常フィルター適用**:
        - **仁**: 主の利益と体験を最優先に。
        - **義**: 論理的に最短かつ正しい解決策を。
        - **智**: 過去の知見を最大限に活用。
    - **成功判定**: 実行が完了し、検証フェーズへ移行できること。

---

### Phase 3: Verify & Learn (検証と即時言語化)

4. **結果検証と即時言語化**
    - **Action**:
        - 実行結果を客観的に検証し、成功/失敗の要因を分析せよ。
        - 失敗ログを `task.md` 等に蓄積し、同じ過ちを繰り返すな。
    - **Hot-Fix Learning**:
        - 汎用的な知見を発見した場合、即座にそれをルール（RL）やベストプラクティス（BP）として言語化せよ。
    - **成功判定**:
        - 基準クリア → Phase 1 (Test) へ戻り最終評価。
        - 失敗 → **螺旋学習 (Helix Loop)** を実行。

---

### Phase 4: Exit & Crystallize (完了と統合)

5. **成果報告と深層学習**
    - **Action**:
        - DoDの達成を報告し、成果物を納品せよ。
        - 得られた知見をシステム全体の能力（Skill/Rule）として永続化せよ。
    - **Knowledge Crystallization (知見の結晶化)**:
        1. **Success Pattern**: 成功したアプローチをテンプレート化。
        2. **Anti-Pattern**: 失敗から得られた「回避すべき罠」を明記。

---

## 例外処理 (Technical Impossibility)

- **発動条件**: 技術的に不可能な状況を検知した場合のみ。
- **アクション**:
  1. `notify_user` で状況を報告
  2. 代替案を提示
  3. ユーザーの判断を仰ぐ

---

## 備考

- **外部報酬を待たない**: 己が「これでよし」と言えるまで磨け。
- **Helix原則**: 失敗は「機能しない方法の発見」。一周するたびに高みへ。
