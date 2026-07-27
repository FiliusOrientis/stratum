# Writing Agent Briefs

An agent brief is a structured comment posted on a GitHub issue or PR when it moves to `ready-for-agent`. It is the authoritative specification that an AFK agent will work from.

## Principles

### Durability over precision
- **Do** describe interfaces, types, and behavioral contracts
- **Do** name specific types, function signatures, or config shapes
- **Don't** reference file paths — they go stale
- **Don't** reference line numbers

### Behavioral, not procedural
- **Good:** "The `SkillConfig` type should accept an optional `schedule` field of type `CronExpression`"
- **Bad:** "Open src/types/skill.ts and add a schedule field on line 42"

### Complete acceptance criteria
Every agent brief must have concrete, testable acceptance criteria. Each criterion should be independently verifiable.

### Explicit scope boundaries
State what is out of scope. Prevents gold-plating or adjacent-feature assumptions.

## Template

```markdown
## Agent Brief

**Category:** bug / enhancement
**Summary:** one-line description of what needs to happen

**Current behavior:**
Describe what happens now.

**Desired behavior:**
Describe what should happen after the agent's work is complete.

**Key interfaces:**
- `TypeName` — what needs to change and why
- `functionName()` return type — what it currently returns vs what it should return

**Acceptance criteria:**
- [ ] Specific, testable criterion 1
- [ ] Specific, testable criterion 2

**Out of scope:**
- Thing that should NOT be changed or addressed
```
