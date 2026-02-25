const fs = require('fs');
const path = require('path');

/**
 * SlothForge Core Engine
 * 
 * Purpose: Deterministic generation of Agent Components based on Blueprint specs.
 * Optimized for Antigravity (AG) directory structure.
 */

class SlothForgeEngine {
    constructor() {
        this.LOCAL_AGENT_ROOT = path.join('c:', 'Users', 'Takehisa', 'CDD-Orchestration', '.agent');
        this.GLOBAL_AG_ROOT = path.join('C:', 'Users', 'Takehisa', '.gemini', 'antigravity');
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

    forge(spec) {
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
            this.prepareSKScripts(folderPath);
        } else if (type === 'WF') {
            output = this.templateWF(metadata, content);
        }

        fs.writeFileSync(filePath, output);
        console.log(`[SlothForge] Success: ${filePath}`);
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
        // Normalize common variations to strict official strings
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
        return `---
name: ${name}
description: ${meta.description}
---

# ${meta.name}

${meta.description}

## Trigger
${content.trigger || 'TBD'}

## Interface (JSON Schema)
${content.schema || '{}'}

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

    prepareSKScripts(skillPath) {
        const scriptsDir = path.join(skillPath, 'scripts');
        if (!fs.existsSync(scriptsDir)) {
            fs.mkdirSync(scriptsDir, { recursive: true });
            fs.writeFileSync(path.join(scriptsDir, 'main.js'), '// SlothForge: Implementation Logic\n');
        }
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

        if (Array.isArray(spec)) {
            spec.forEach(s => engine.forge(s));
        } else if (spec) {
            engine.forge(spec);
        } else {
            console.error('[SlothForge] Error: --spec or --spec-file is required.');
            process.exit(1);
        }
    } catch (err) {
        console.error(`[SlothForge] Critical Error: ${err.message}`);
        process.exit(1);
    }
}

main();
