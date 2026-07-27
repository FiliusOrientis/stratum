---
name: thinking-tools
description: Thinking tools and frameworks from untools.co for problem solving, decision making, systems thinking, and communication. Triggers on words like "decide", "choose", "bug", "problem", "feature", "plan", "priority", "refactor", "architecture", "cause", "complex", "uncertain", "option".
---

# Thinking Tools (Untools)

Collection of 20+ thinking frameworks. When user expresses uncertainty, use the decision tree below to pick the right tool, apply its structure, and output results.

## Quick Reference

| When user says... | Trigger Question | Tool | Output |
|---|---|---|---|
| "I have a bug / it broke / why is X happening" | "What patterns recur? What structure allows this?" | Iceberg Model + Ishikawa Diagram | Root cause map with 4 layers (event → pattern → structure → mental model) + cause categories |
| "new feature / I want to add Y / need to build Z" | "Is this the right problem to solve?" | Abstraction Laddering + Issue Trees | Reframed problem at 3 abstraction levels + sub-issue breakdown tree |
| "should we do A or B / which option" | "What are your weighted criteria?" | Decision Matrix | Weighted scoring table with ranked options |
| "I think the cause is Z / I believe X" | "What data leads to that conclusion?" | Ladder of Inference | Step-by-step traceback from data → selected data → meaning → assumption → conclusion → belief → action |
| "I'm about to merge / deploy / ship" | "What happens in week 2? Month 6?" | Second-Order Thinking | 1st/2nd/3rd order consequence table |
| "how should I respond to this / this is tricky" | "What kind of situation is this?" | Cynefin Framework | Situation classification (Clear/Complicated/Complex/Chaotic) + recommended response |
| "help me plan / what should I work on" | "What's urgent AND important?" | Eisenhower Matrix | 4-quadrant grid with tasks placed |
| "this is complex / I don't understand the system" | "What are the elements and connections?" | Connection Circles + Concept Map | Element-relationship map exposing feedback loops |
| "I only think of obvious solutions / same ideas" | "What would make things worse instead?" | Inversion | Worst-case scenario table → inverted success criteria |
| "I need a creative solution / fresh approach" | "What are the fundamental principles?" | First Principles + Productive Thinking Model | Deconstructed fundamentals + rebuilt solution from scratch |
| "I can't decide between hard options" | "What kind of decision is this?" | Hard Choice Model | Decision type classification (no-brainer / hard / big / habit) + appropriate response per type |
| "this is urgent / I'm stuck in firefighting" | "What trade-off between speed and quality?" | Confidence Determines Speed vs. Quality | Confidence level assessment → recommended speed/quality balance |
| "I keep seeing the same issue / it keeps happening" | "What reinforces or balances this pattern?" | Balancing + Reinforcing Feedback Loops | Loop diagram with causal links and exponential/balancing dynamics |
| "I need to give feedback / communicate clearly" | "What specific behavior had what impact?" | Situation-Behavior-Impact (SBI) | Structured feedback: when X happened, you did Y, and the impact was Z |
| "my message isn't clear / stakeholders don't understand" | "What is the core message?" | Minto Pyramid | Pyramid with key takeaway at top, supporting arguments below |
| "this feature scope is huge / where do I start" | "What are all the sub-problems?" | Issue Trees | MECE breakdown of problem into independent sub-problems |
| "I can't resolve this conflict" | "What does each side actually need?" | Conflict Resolution Diagram | Win-win solution finding: needs vs. wants per party |

## Decision Tree (untools.co prompt questions)

Walk through these questions in order until one fits:

1. "Am I only thinking of ideal solutions?" → **Inversion**
2. "Can I break this problem down?" → **Issue Trees**
3. "Do I need an innovative solution to a complex problem?" → **First Principles**
4. "Am I solving the right problem?" → **Abstraction Laddering**
5. "How do I come up with a creative solution?" → **Productive Thinking Model**
6. "What kind of decision am I making?" → **Hard Choice Model**
7. "Which option from these is the best one?" → **Decision Matrix**
8. "What would be the long-term consequences of this decision?" → **Second-Order Thinking**
9. "Am I jumping to conclusions?" → **Ladder of Inference**
10. "How should I respond to this situation?" → **Cynefin Framework**
11. "What should I be working on right now?" → **Eisenhower Matrix**
12. "How does this system work?" → **Connection Circles**
13. "Why is X happening?" → **Iceberg Model**

## Development-Specific Scenarios

### Bug Investigation (Iceberg Model + Ishikawa)

```
Event level (what happened):
  └─ Pattern level (what's the recurring behavior):
       └─ Structure level (what processes allow this):
            └─ Mental Model level (what assumptions keep this in place?)

Cause categories: People | Process | Technology | Environment
```

### Feature Scoping (Abstraction Laddering + Issue Trees)

```
Higher abstraction: "What goal does this feature serve? What else would serve it?"
Current problem:   "The stated problem"
Lower abstraction: "What's the smallest concrete step toward solving it?"

Issue tree (MECE):
├─ Sub-issue A
│  ├─ A1
│  └─ A2
├─ Sub-issue B
└─ Sub-issue C
```

### Decision Between Options (Decision Matrix)

```
| Criterion (weight) | Option A | Option B | Option C |
|-------------------|----------|----------|----------|
| Criterion 1 (W%)  | score    | score    | score    |
| Criterion 2 (W%)  | score    | score    | score    |
| **Weighted Total** | **X**    | **Y**    | **Z**    |
```

### Pre-Merge Check (Second-Order Thinking)

```
| Order | Expected Effect | Timeframe |
|-------|----------------|-----------|
| 1st   | Direct result of merge | Immediate |
| 2nd   | Consequence of 1st-order effect | 1-4 weeks |
| 3rd   | Long-term systemic shift | 1-6 months |
```

### Pull Request Review (Situation-Behavior-Impact)

```
Situation: When reviewing file:line...
Behavior: I noticed that the code does X...
Impact: This could cause Y problem because...
Suggested change: Consider doing Z instead.
```

### Prioritization (Eisenhower Matrix)

```
                    URGENT                  NOT URGENT
IMPORTANT    │  Do first (schedule)    │  Schedule later (strategic)
NOT IMPORTANT │  Delegate / automate   │  Eliminate / backlog
```

### Architecture Decision (Cynefin Framework)

```
Clear (known knowns):     Apply best practice ──> Standard pattern
Complicated (known unk):  Analyze ──> Expert consultation
Complex (unknown unk):    Probe ──> Sense ──> Respond (emergent)
Chaotic:                  Act ──> Sense ──> Respond (novel)
```

## Integration Points

When invoked during these workflow events, append tool output to the relevant artifact:

| Event | Artifact | Tool Output Added |
|-------|----------|-------------------|
| Bug issue created | Issue body | Iceberg Model layers as checklist |
| Feature request created | Issue body | Abstraction Laddering reframe + Issue Tree |
| PR opened | PR body | Second-Order Thinking table |
| Decision needed | Issue/PR comment | Decision Matrix table |
| Code review comment | Review comment | SBI structure |
| Sprint planning | Comment | Eisenhower Matrix |

## Output Format

Always output thinking tool results in a collapsible section with the tool name as summary:

<details>
<summary>Thinking Tool: <Tool Name></summary>

<Rendered output per template above>

</details>

This keeps the conversation clean while making the structured thinking visible.
