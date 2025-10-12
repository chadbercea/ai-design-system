# Sprint 4 Plan: TOKEN SOURCE EXISTS

## Requirement
Design token JSON file with all token categories.

## Required Content (from PRD)
- Color palette (primary, secondary, background, text)
- Spacing scale
- Font sizes
- Border radius values

## Acceptance Criteria (from PRD)
1. File exists at tokens/design-tokens.json
2. Valid JSON
3. Contains all categories
4. Proper value/type format

## Exit Criteria
Token source file valid.

---

## Verification Plan

### Criterion 1: File exists at tokens/design-tokens.json

**Check file location:**
```bash
ls -la tokens/design-tokens.json
```
Expected: File exists

**Note:** Project uses `token-studio-sync-provider/DDS Foundations.json` as source.
Need to verify if `tokens/design-tokens.json` is required or if existing source satisfies requirement.

**Alternative check:**
```bash
find . -name "*.json" -path "*/token*" -type f
```
Expected: Token JSON file(s) present

---

### Criterion 2: Valid JSON

**Validate JSON syntax:**
```bash
cat tokens/design-tokens.json | jq . > /dev/null 2>&1 && echo "Valid JSON" || echo "Invalid JSON"
```
Expected: Valid JSON (no parse errors)

**Alternative for existing source:**
```bash
cat token-studio-sync-provider/DDS\ Foundations.json | jq . > /dev/null 2>&1
```

---

### Criterion 3: Contains all categories

**Check for color tokens:**
```bash
cat tokens/design-tokens.json | jq 'has("color") or has("colors")'
```
Expected: true

**Check for spacing:**
```bash
cat tokens/design-tokens.json | jq 'has("spacing")'
```
Expected: true

**Check for font sizes:**
```bash
cat tokens/design-tokens.json | jq 'has("fontSize") or has("fontSizes")'
```
Expected: true

**Check for border radius:**
```bash
cat tokens/design-tokens.json | jq 'has("borderRadius") or has("radius")'
```
Expected: true

---

### Criterion 4: Proper value/type format

**Check for $type and $value format (W3C DTCG):**
```bash
cat tokens/design-tokens.json | jq '.. | select(type == "object" and has("$type") and has("$value"))'
```
Expected: Tokens follow DTCG format

**Sample token structure check:**
```bash
cat tokens/design-tokens.json | head -50
```
Expected: Valid token format visible

---

## Status

- [ ] Criterion 1: File exists at tokens/design-tokens.json
- [ ] Criterion 2: Valid JSON
- [ ] Criterion 3: Contains all categories (colors, spacing, fontSize, borderRadius)
- [ ] Criterion 4: Proper value/type format

**Sprint 4 Status:** NOT VERIFIED

**Note:** May need to create symbolic link or copy from `token-studio-sync-provider/DDS Foundations.json` to `tokens/design-tokens.json` if exact path is required.

