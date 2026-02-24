---
name: creating-skills
status: active
version: 1.0
tags: [meta-workflow, skills, api-design]
description: >-
  Generates new Skills (SK) based on API-First Design.
  Creates standardized skill packages with strict interface definitions.
  Supports both Local and Global scope placement.
---

# Creating Skills (SK)

> **Design Pattern**: API-First Design & Unix Philosophy
> **Goal**: Create reusable tools that "Do One Thing Well" with clear contracts.

## Prerequisites

- **Context**: A repeatable task that requires specialized knowledge or complex execution.
- **Scope**: Identified whether this is a Project Local skill or a Global Utility.

## Workflow Steps

### 1. Naming (命名)

- **Naming Convention**: `kebab-case` (noun). Represents the **Capability/Function**.
  - Good: `code-review`, `dependency-analysis`
  - Bad: `review-code`, `analyze-deps`

### 2. Duplicate Check (重複確認)

- **Action**: Search existing skills to prevent redundancy.
  - Local: Project-level skills directory
  - Global: Shared/Global skills directory
- **Goal**: Check if the capability is already implemented in the environment.

### 3. Capability Scope (能力の定義)

- **Action**: Define the **Single Responsibility** of this skill.
- **Constraint**: If it does "X and Y", break it down into two skills.
- **Philosophy**: "Do One Thing Well."

### 4. Contract Design (契約設計)

- **Action**: Define the **Interface (Inputs/Outputs)** _before_ implementation.
- **Goal**: Predictability and Consistency.
- **Format**: JSON Schema or strict Type Definition style.

### 5. Implementation (モジュラー実装)

- **Action**: Implement the logic (Script or Prompt).
- **Guideline**:
  - Minimize external dependencies.
  - Aim for **Idempotency** (Safe to run multiple times).
  - Use `scripts/` directory for logic, `prompts/` for flexible instructions.

### 6. Interface Documentation (I/F文書化)

- **Action**: Document usage examples to lower the cognitive load for other agents/users.

### 7. Codification (パッケージング)

- **Action**: Package the skill into `SKILL.md`.
- **Placement Strategy**:
  - **Local**: Project-level skills directory
  - **Global**: Shared/Global skills directory
- **Constraint**: MUST use **YAML Frontmatter**.

#### Template

````markdown
---
name: <capability-name>
status: active
version: 1.0
description: <What this skill does>
tags: [<tag1>, <tag2>]
---

# Skill: <Title>

## Goal

<Concise description of the problem this skill solves>

## Inputs

- `param_name` (Type, Required): Description

## Outputs

- `return_value` (Type): Description

## Instructions

1. Step 1
2. Step 2

## Usage Example

```bash

# Example command or tool call

```
````

```

### 8. Verification (検証)
- [ ] **Frontmatter Check**: Are `name`, `status`, `version`, `description`, `tags` present?
- **Interface Check**: Are Inputs and Outputs clearly defined?
- **Scope Check**: Is it in the correct directory (Local vs Global)?

### 9. Indexing (インデックス更新)
- **Action**: Update the `MASTER_INDEX.md` (if exists) or equivalent registry.
```
