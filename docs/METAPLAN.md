# Metaplan: AI Agent Approach to PRD Execution

## Principles

1. **One sprint at a time** - Never proceed to next sprint until current sprint's exit criteria are met
2. **Exit criteria are binary** - Either ALL criteria pass or the sprint is incomplete
3. **Verification before claiming completion** - Run commands, read files, check browser BEFORE saying "done"
4. **No partial credit** - "It's close" or "mostly works" means NOT DONE

## Process for Each Sprint

### Step 1: Read Sprint Requirements
- Quote the exact acceptance criteria from PRD
- List what currently exists vs what needs to be created/modified

### Step 2: Implement
- Make changes
- Run build commands if needed

### Step 3: Verify EVERY Acceptance Criterion
- For each criterion, run a verification command or check
- Show the output/result
- Mark as PASS or FAIL

### Step 4: Report Status
- If ALL criteria PASS: "Sprint [N] complete. Moving to Sprint [N+1]"
- If ANY criterion FAILS: "Sprint [N] incomplete. Failure: [specific criterion]. Fixing..."
- NEVER say "complete" with failures

### Step 5: Only Proceed When Clean
- All criteria passing
- No console errors
- Browser verification done (if applicable)

## Current State Assessment Protocol

Before starting any sprint work:
1. Assess which sprints are already complete
2. Identify the first incomplete sprint
3. Start there
4. Never skip sprints

## Verification Requirements

### For "file exists" criteria:
```bash
ls -la path/to/file
```

### For "no errors" criteria:
```bash
# Show actual command output
npm run command 2>&1
```

### For "renders/displays" criteria:
- Start/check dev server or Storybook
- Show browser verification or curl output
- Verify specific visual elements mentioned

### For "contains X" criteria:
```bash
cat path/to/file | grep "X"
```

## Red Flags - When AI Agent is Failing

- Saying "it should work" → Verify it DOES work
- Saying "files are correct" → Show file contents
- Saying "no errors" → Show clean console output  
- Claiming completion → Show verification proof
- Using words like "basically", "mostly", "close" → Means INCOMPLETE

## Hard Rules

1. Do NOT move to next sprint until current sprint exit achieved
2. Do NOT claim completion without verification proof
3. Do NOT implement hacks (manual colors, arbitrary shade numbers) - fix Style Dictionary
4. Do NOT skip verification steps to "save time"

## Sprint Status Tracking

Current sprint: [UPDATE THIS]
Status: [PASS/FAIL/IN PROGRESS]
Blocking issue: [IF FAIL, DESCRIBE]

Last verified: Oct 12, 2025

