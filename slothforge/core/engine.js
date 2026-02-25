const fs = require('fs');
const path = require('path');

/**
 * SlothForge Core Engine v2
 *
 * Purpose: Deterministic generation of Agent Components based on ForgeSpec v2.
 * Phase 2 (RS layer) of the CS×RS Layered Protocol.
 * Phase 0/1 (CS layer: Sovereign Reasoning) must be completed before invoking this engine.
 */

class SlothForgeEngine {
    constructor() {
        this.LOCAL_AGENT_ROOT = path.resolve(process.env.AGENT_ROOT || path.join(process.cwd(), '.agent'));
        this.GLOBAL_AG_ROOT = path.resolve(process.env.GLOBAL_AG_ROOT || path.join(require('os').homedir(), '.gemini', 'antigravity'));
    }

    getBaseDir(scope, type) {
        if (scope === 'global') {
            switch (type) {
                case 'SK': return path.join(this.GLOBAL_AG_ROOT, 'skills');
                case 'WF': return path.join(this.GLOBAL_AG_ROOT, 'global_workflows');
                case 'RL': return path.join(this.GLOBAL_AG_ROOT, 'rules');
                default: throw new Error(`Unknown type for global scope: ${type}`);
            }
        } else {
            switch (type) {
                case 'SK': return path.join(this.LOCAL_AGENT_ROOT, 'skills');
                case 'WF': return path.join(this.LOCAL_AGENT_ROOT, 'workflows');
                case 'RL': return path.join(this.LOCAL_AGENT_ROOT, 'rules');
                default: throw new Error(`Unknown type for local scope: ${type}`);
            }
        }
    }

    /**
     * Validates ForgeSpec v2 before forging.
     * Returns array of validation errors; empty array = valid.
     */
    validateForgeSpec(spec) {
        const errors = [];

        // Phase 0 classification gate
        if (spec.phase0_classification) {
            const p0 = spec.phase0_classification;

            if (typeof p0.confidence === 'number' && p0.confidence < 0.8) {
                errors.push({
                    field: 'phase0_classification.confidence',
                    reason: `Confidence ${p0.confidence} is below threshold 0.8. Clarification required before forging.`
                });
            }

            if (p0.classified_type && p0.classified_type !== spec.type) {
                errors.push({
                    field: 'phase0_classification.classified_type',
                    reason: `Classification type '${p0.classified_type}' does not match spec.type '${spec.type}'.`
                });
            }
        }

        // Attempt limit gate
        if (spec.forge_meta && spec.forge_meta.attempt_number > 3) {
            errors.push({
                field: 'forge_meta.attempt_number',
                reason: `Attempt ${spec.forge_meta.attempt_number} exceeds limit of 3. Escalate to Orchestrator with full ForgeSpec chain.`
            });
        }

        // RL: invariant purity gate
        if (spec.type === 'RL') {
            const proofs = spec.reasoning_chain?.invariant_proof || [];
            proofs.forEach((entry, i) => {
                if (entry.invariant_result === false) {
                    errors.push({
                        field: `reasoning_chain.invariant_proof[${i}]`,
                        reason: `Principle "${entry.principle}" failed invariant test. Demote to content.conventions, do not include in content.principles.`
                    });
                }
            });
        }

        // SK: interface completeness gates
        if (spec.type === 'SK') {
            const schema = spec.content?.schema;
            if (!schema || !Array.isArray(schema.side_effects)) {
                errors.push({
                    field: 'content.schema.side_effects',
                    reason: 'SK type requires explicit side_effects declaration. Use [] if there are none (idempotency mandate).'
                });
            }

            if (!spec.content?.script_logic) {
                errors.push({
                    field: 'content.script_logic',
                    reason: 'SK type requires script_logic. Empty main.js stubs are prohibited by SlothForge Protocol.'
                });
            }
        }

        return errors;
    }

    forge(spec) {
        // Run validation gate first
        const errors = this.validateForgeSpec(spec);
        if (errors.length > 0) {
            const output = { status: 'VALIDATION_FAILED', errors };
            console.error(JSON.stringify(output, null, 2));
            process.exit(1);
        }

        const { type, name, scope, metadata, content } = spec;
        let baseDir = this.getBaseDir(scope, type);

        let folderPath = type === 'SK' ? path.join(baseDir, name) : baseDir;
        let fileName = type === 'SK' ? 'SKILL.md' : `${name}.md`;

        // Special Case: GEMINI.md in Global Root
        if (scope === 'global' && type === 'RL' && name === 'GEMINI') {
            folderPath = this.GLOBAL_AG_ROOT;
            fileName = 'GEMINI.md';
        }

        const filePath = path.join(folderPath, fileName);

        console.log(`[SlothForge] Forging ${type} component: ${name} (${scope})`);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        let output = '';

        if (type === 'RL') {
            output = this.templateRL(metadata, content);
        } else if (type === 'SK') {
            output = this.templateSK(name, metadata, content);
            this.prepareSKScripts(folderPath, content.script_logic);
        } else if (type === 'WF') {
            output = this.templateWF(metadata, content);
        }

        fs.writeFileSync(filePath, output);
        const result = { status: 'SUCCESS', path: filePath };
        console.log(`[SlothForge] Success: ${filePath}`);
        return result;
    }

    templateRL(meta, content) {
        if (meta.name === 'GEMINI') {
            return `# ${meta.name} (Global Protocol)

${content.principles?.[0] || ''}

## Principles (原則)
${(content.principles || []).map(p => `- ${p}`).join('\n')}

## Conventions (規約)
${(content.conventions || []).map(c => `- ${c}`).join('\n')}

## Constraints (制約)
${(content.constraints || []).map(c => `- ${c}`).join('\n')}
`;
        }

        let trigger = content.trigger || 'model_decision';
        if (trigger === 'always' || trigger === 'always-on') trigger = 'always_on';
        if (trigger === 'decision' || trigger === 'auto') trigger = 'model_decision';

        return `---
name: ${meta.name}
trigger: ${trigger}
description: ${meta.description}
---

# Rule: ${meta.name}

> **Core Principle**: ${content.principles?.[0] || 'TBD'}

## Principles (原則)
${(content.principles || []).map(p => `- ${p}`).join('\n')}

## Conventions (規約)
${(content.conventions || []).map(c => `- ${c}`).join('\n')}

## Constraints (制約)
${(content.constraints || []).map(c => `- ${c}`).join('\n')}
`;
    }

    templateSK(name, meta, content) {
        const schema = content.schema || {};
        const schemaStr = JSON.stringify(schema, null, 2);

        return `---
name: ${name}
description: ${meta.description}
---

# ${meta.name}

${meta.description}

## Trigger
${content.trigger || 'TBD'}

## Interface (JSON Schema)
\`\`\`json
${schemaStr}
\`\`\`

## Rational Sloth Mandate
1. Use deterministic scripts in \`scripts/\` for logic.
2. Minimize Token Cost ($TC$).
`;
    }

    templateWF(meta, content) {
        return `---
description: ${meta.description}
---

# Workflow: ${meta.name}

## Steps
${(content.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}
`;
    }

    /**
     * Prepares scripts/ directory for SK components.
     * Injects script_logic.algorithm into main.js (no empty stubs).
     */
    prepareSKScripts(skillPath, scriptLogic) {
        const scriptsDir = path.join(skillPath, 'scripts');
        if (!fs.existsSync(scriptsDir)) {
            fs.mkdirSync(scriptsDir, { recursive: true });
        }

        let scriptContent = '// SlothForge v2: Sovereign Forge Generated\n';
        scriptContent += '// DO NOT modify the header. Edit algorithm steps below.\n\n';

        if (scriptLogic) {
            scriptContent += `// Purpose: ${scriptLogic.description}\n`;
            if (scriptLogic.error_behavior) {
                scriptContent += `// Error Behavior: ${scriptLogic.error_behavior}\n`;
            }
            scriptContent += '\n// Algorithm:\n';
            (scriptLogic.algorithm || []).forEach((step, i) => {
                scriptContent += `// Step ${i + 1}: ${step}\n`;
            });
            scriptContent += '\n';
            (scriptLogic.algorithm || []).forEach((step, i) => {
                scriptContent += `// TODO Step ${i + 1}: Implement — ${step}\n`;
            });
        } else {
            // Defensive fallback (should not reach here due to validation gate)
            scriptContent += '// WARNING: script_logic was not provided. This violates SlothForge Protocol.\n';
        }

        fs.writeFileSync(path.join(scriptsDir, 'main.js'), scriptContent);
    }
}

// --- CLI ENTRY ---

async function main() {
    const specArg = process.argv.find(arg => arg.startsWith('--spec='));
    const fileArg = process.argv.find(arg => arg.startsWith('--spec-file='));

    const engine = new SlothForgeEngine();
    let spec;

    try {
        if (specArg) {
            spec = JSON.parse(specArg.substring(7));
        } else if (fileArg) {
            spec = JSON.parse(fs.readFileSync(fileArg.substring(12), 'utf8'));
        }

        if (!spec) {
            const errorOutput = { status: 'ERROR', reason: '--spec or --spec-file is required.' };
            console.error(JSON.stringify(errorOutput));
            process.exit(1);
        }

        if (Array.isArray(spec)) {
            spec.forEach(s => engine.forge(s));
        } else {
            engine.forge(spec);
        }
    } catch (err) {
        const errorOutput = { status: 'CRITICAL_ERROR', reason: err.message };
        console.error(JSON.stringify(errorOutput));
        process.exit(1);
    }
}

main();
