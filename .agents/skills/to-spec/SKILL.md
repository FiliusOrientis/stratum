---
name: to-spec
description: Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---

# To Spec

This skill takes the current conversation context and codebase understanding and produces a spec (PRD). Do NOT interview the user — just synthesize what you already know.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if not.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the spec, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better — the ideal number is one.

Check with the user that these seams match their expectations.

3. Write the spec using the template below, then publish it to the project issue tracker. Apply the `ready-for-agent` triage label.

### Spec template

```markdown
## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A numbered list of user stories covering all aspects of the feature.

## Implementation Decisions

A list of implementation decisions including modules, interfaces, technical clarifications, architectural decisions, schema changes, API contracts. Do NOT include specific file paths or code snippets.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can, inline it within the relevant decision.

## Testing Decisions

- Description of what makes a good test (only test external behavior, not implementation details)
- Which modules will be tested
- Prior art for the tests

## Out of Scope

What is NOT covered by this spec.

## Further Notes

Any further notes about the feature.
```
