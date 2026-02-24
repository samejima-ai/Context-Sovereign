---
name: creating-workflows
status: active
version: 1.0
tags: [meta-workflow, workflows, sop]
description: >-
  Generates new Workflows (WF) based on SOP & Checklist Manifesto.
  Creates standardized procedure documents with verify steps.
  Supports both Local and Global scope placement.
---

# Creating Workflows (WF)

> **Design Pattern**: SOP (Standard Operating Procedure) & The Checklist Manifesto
> **Goal**: Eliminate ambiguity and ensure reproducibility of complex processes.

## Prerequisites

- **Context**: A multi-step process that is prone to error or variation.
- **Scope**: Identified whether this is a Project Local workflow or a Global Standard.

## Workflow Steps

### 1. Naming (命名)

- **Naming Convention**: `kebab-case` (gerund: verb-ing + noun). Represents the **Action in Progress**.
  - Good: `creating-rules`, `deploying-service`
  - Bad: `create-rule`, `deployment`

### 2. Duplicate Check (重複確認)

- **Action**: Search existing workflows to prevent redundancy.
  - Local: Project-level workflows directory
  - Global: Shared/Global workflows directory
- **Goal**: Scan current environment for similar process definitions.

### 3. Objective Alignment (目的の明確化)

- **Action**: Define the **Definition of Done** (DoD).
- **Question**: "How do we know when this workflow is successfully completed?"

### 4. Process Mapping (工程の地図化)

- **Action**: Map out the sequence of steps.
- **Logic**: Use flowcharts or numbered lists to visualize dependencies.

### 5. Killer Items Identification (キラー項目の特定)

- **Action**: Identify **Pause Points** where failure is unacceptable.
- **Output**: These become mandatory generic checklist items.

### 6. Optimization (自動化の検討)

- **Action**: Identify steps that can be auto-run.
- **Annotation**: Use `// turbo` for single steps or `// turbo-all` for the entire workflow if applicable.

### 7. Codification (文書化)

- **Action**: Write the workflow document.
- **Placement Strategy**:
  - **Local**: Project-level workflows directory
  - **Global**: Shared/Global workflows directory
- **Constraint**: MUST use **YAML Frontmatter**.

#### Template

```markdown
---
name: <verb-ing-action>
status: active
version: 1.0
description: <Short description of the process>
tags: [<tag1>, <tag2>]
---

# <Title>

## Goal

<Definition of Done>

## Prerequisites

- <Required tools, access, or context>

## Steps

1. **Step Name**
   - Actionable instruction.
   - Command to run.

2. **Critical Step**
   - Check this specific condition.

## Verification

- [ ] Check Item 1
- [ ] Check Item 2
```

### 8. Verification (検証)

- [ ] **Frontmatter Check**: Are `status`, `version`, `description`, `tags` present?
- **Reproducibility Check**: Are steps actionable and unambiguous?
- **Scope Check**: Is it in the correct directory (Local vs Global)?

### 9. Indexing (インデックス更新)

- **Action**: Update the `MASTER_INDEX.md` (if exists) or equivalent registry.
