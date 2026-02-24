---
name: creating-rules
status: active
version: 1.0
tags: [meta-workflow, rules, governance]
description: 新しい Rule (RL) を第一原理思考に基づき定義・生成するためのワークフロー
---

# Creating Rules (RL)

> **Design Pattern**: First Principles Thinking & Occam's Razor
> **Goal**: Distill experience into immutable principles, not just ad-hoc patches.

## Prerequisites

- **Context**: A recurring issue, a new insight, or a need for standardization.
- **Scope**: Identified whether this is a Project Local rule or a Global Standard.

## Workflow Steps

### 1. Deconstruction (解体)

- **Action**: Break down the problem or phenomenon into its most basic, indivisible elements.
- **Question**: "What are the fundamental facts that we know to be true?"
- **Avoid**: Reasoning by analogy ("We do it this way because X does it").

### 2. Naming & Categorization (命名と分類)

- **Naming Convention**: `kebab-case` (noun). Represents the **Subject Domain**, not the action.
  - Good: `error-handling`, `secret-management`
  - Bad: `handle-errors`, `dont-leak-secrets`
- **Categorization Strategy**:
  - `rules/topics/`: General engineering topics (e.g., `logging`, `testing`).
  - `rules/roles/`: Role-specific mandates (e.g., `frontend-architect`, `sre`).
  - `rules/`: Root level for high-level, cross-cutting rules.

### 3. Duplicate Check (重複確認)

- **Action**: Search existing rules in both Local and Global scopes to prevent duplication or conflict.
- **Goal**: Ensure the rule is not already defined in the standard or project-specific repositories.

### 4. Inquiry (探求 - The 5 Whys)

- **Action**: Ask "Why?" repeatedly until you reach the **Root Cause**.
- **Goal**: Uncover the underlying mechanism that dictates the rule.

### 5. Identification of Invariants (不変項の特定)

- **Action**: Identify the **Core Principle** that remains true regardless of context changes.
- **Criteria**:
  - Is it true for a team of 1? Team of 100?
  - Is it true in Python? In Go?
- **Output**: A single, concise sentence (e.g., "Errors should be handled explicitly at the source.").

### 6. Codification (明文化)

- **Action**: Create the rule file using the standard template.
- **Placement Strategy**:
  - **Local**: Project-level rules directory (e.g., `<project-root>/.agent/rules/`)
  - **Global**: Shared/Global rules directory
- **Constraint**: MUST use **YAML Frontmatter**.

#### Template

```markdown
---
name: <topic-name>
status: active
version: 1.0
trigger: always_on
description: <Brief description of when this rule applies>
tags: [<tag1>, <tag2>]

---

# Rule Name

> **Core Principle**: <The Invariant identified in Step 5>

## Principles (原則)

- <Universal truths>
- <Why this rule exists>

## Conventions (規約)

- <Agreed-upon methods>
- <Naming conventions, directory structures>

## Constraints (制約)

- <Prohibitions>
- <"Must not" items>
```

### 7. Verification (検証)

- [ ] **Frontmatter Check**: Are `name`, `status`, `version`, `trigger`, `description`, `tags` present?
- **Structure Check**: Does it have `Principles`, `Conventions`, `Constraints`?
- **Scope Check**: Is it in the correct directory (Local vs Global)?

### 8. Indexing (インデックス更新)

- **Action**: Update the `MASTER_INDEX.md` (if exists) or equivalent registry to include the new rule.