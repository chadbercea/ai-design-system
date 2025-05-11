# ai-design-system
I have an idea for an AI Design System. Let's try and build a prototype.

Discovery May 5-9 2025
## Key Components

### 1. `mui-tokens/`
- **Purpose:** Extraction and normalization of raw MUI tokens.
- **Key Files:**
  - `mui-tokens-raw.json`: Raw dump of MUI tokens (colors, spacing, typography, etc.).
  - `primitives.json`: Extracted primitive tokens, following T-D-W-P rules.
  - `mui-tokens-w3c.json`: W3C-compliant version of the MUI tokens.
  - `w3c-semantic-mui-tokens.json`: Semantic tokens mapped to primitives, W3C-compliant.
  - `mui-tokens-relationships.json`: Maps relationships between semantic and primitive tokens.
  - `transform-for-tokens-studio.js`: Script to transform raw/primitive tokens into Tokens Studio format.
  - `extract-primitives.js`: Script to extract and format primitives from raw tokens.
  - `_extract-scripts/`: Modular scripts for extracting specific token categories.
  - `_ref/`: Reference files and canonical examples.

### 2. `token-studio-tokens/`
- **Purpose:** Transformation and validation for Tokens Studio (Figma) compatibility.
- **Key Files:**
  - `raw-to-primitives.js`: Script to convert raw tokens to primitives.
  - `raw-to-semantic.js`: Script to generate semantic tokens referencing primitives.
  - `primitives.json`: Primitives in Tokens Studio format.
  - `mui-semantic.json`: Semantic tokens in Tokens Studio format.
  - `tokens-studio-canonical-example.json`: Canonical example for validation.
  - `Design-Token-Transformation-Instructions.txt`: Step-by-step transformation rules.

### 3. `token-studio-sync-provider/`
- **Purpose:** Provides token sets for two-way sync between GitHub and Figma via Tokens Studio.
- **Key Files:**
  - `core.json`, `dark.json`, `light.json`, `theme.json`: Token sets for different themes/modes.
  - `$metadata.json`: Token set order and metadata for Tokens Studio.

### 4. `The-Design-Token-Codex.txt`
- **Purpose:** The definitive ruleset for token structure and processing (T-D-W-P system).
- **Contents:** 
  - Type determination, category decision, wrapping logic, and path/property formatting.
  - Canonical examples and error cases.
  - Ensures all tokens are W3C-compliant and Tokens Studio-ready.

### 5. `tokens-studio-mapped-from-mui.json`
- **Purpose:** Example output mapping MUI tokens to Tokens Studio format.

### 6. `what-i-did.txt`
- **Purpose:** Chronological log of project decisions, discoveries, and implementation steps.

---

## How It Works

1. **Extract:** Scripts in `mui-tokens/` extract raw tokens from the MUI package.
2. **Normalize:** Tokens are processed into primitives and semantic tokens, following the T-D-W-P rules in `The-Design-Token-Codex.txt`.
3. **Transform:** Scripts in `token-studio-tokens/` convert tokens to Tokens Studio (Figma) format.
4. **Sync:** The `token-studio-sync-provider/` folder provides token sets for two-way sync between GitHub and Figma.
5. **Validate:** Canonical examples and transformation instructions ensure all outputs are standards-compliant.

---

## Standards & Best Practices

- **W3C DTCG Compliance:** All tokens follow the [W3C Design Token Community Group](https://design-tokens.github.io/community-group/) schema.
- **T-D-W-P System:** Ensures consistent, contradiction-free token structure.
- **Tokens Studio Ready:** Outputs are compatible with Tokens Studio for Figma, enabling design-engineering sync.

---

## For More Information

- See `The-Design-Token-Codex.txt` for the full ruleset.
- See `what-i-did.txt` for a detailed project chronology.
- See `token-studio-tokens/Design-Token-Transformation-Instructions.txt` for transformation details.

---

*This project is the result of iterative discovery, standards research, and practical engineering to bridge the gap between design and development using modern token workflows.*
