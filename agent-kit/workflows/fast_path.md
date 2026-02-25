# Fast-Path Workflow for Simple Tasks

## When to use Fast-Path

Use the fast-path workflow for **simple, single-action tasks** that don't require planning, research, or code changes:

**✅ Use Fast-Path for:**
- Recording and uploading videos to Slack
- Taking screenshots of websites
- Simple web searches (1 query)
- Opening URLs and capturing state
- Quick browser interactions (click, type, navigate)
- Status checks or info queries

**❌ Use Manager-led Flow for:**
- Code modifications or PRs
- Multi-step research tasks
- Complex planning requirements
- Tasks requiring approval gates
- Delegation to multiple agents
- Tasks with unclear requirements

## Fast-Path Execution

When using fast-path, skip the full Manager overhead:

### Standard Flow (Manager-led)
1. Read `slack_task.md`, `manager.md`, `task_intake.md`
2. Parse request (goal, constraints, success)
3. Create plan (max 10 lines)
4. Label `[MANAGER]`
5. Delegate to specialized agent
6. Execute and report

**Time:** ~5-10 seconds overhead before execution

### Fast-Path Flow
1. Immediately recognize task type
2. Execute directly (no file reads, no planning)
3. Report completion

**Time:** ~0.5 seconds overhead before execution

## Example: Video Recording Task

### Manager-led (slow):
```
1. Read 3 files (slack_task.md, manager.md, task_intake.md)
2. Parse: goal, constraints, success
3. Plan: steps 1-5
4. Label [MANAGER]
5. Delegate to Browser
6. Execute recording
7. Upload to Slack
8. Report: Agents involved: [MANAGER] → [BROWSER]

Total time: ~15-20 seconds
```

### Fast-path (fast):
```
1. Recognize: simple video recording task
2. Start recording
3. Use computerUse to navigate and type
4. Save recording
5. Upload to Slack with thread support
6. Report: completed

Total time: ~5-8 seconds
```

## Implementation Guidelines

### Fast-Path Task Recognition

```
IF task matches:
  - "record video" OR "screenshot" OR "upload to Slack"
  - "search for X" (single query)
  - "open URL" OR "navigate to"
  - "click X" OR "type Y"
THEN:
  Execute fast-path
ELSE:
  Use Manager-led flow
```

### Fast-Path Response Format

For fast-path tasks, you can use a simplified response:

```markdown
[Quick summary of action]

[Evidence: screenshot, video link, or result]

✓ Completed in X seconds
```

No need for:
- `[MANAGER]` labels (unless complexity requires it)
- Detailed plan documentation
- "Agents involved" footer (for truly simple tasks)

### When Fast-Path Gets Complex

If during execution you discover the task is more complex than initially assessed:
1. **Switch to Manager-led flow mid-stream**
2. Document the pivot: "Switching to full planning mode due to complexity"
3. Follow the standard Manager workflow from that point

## Performance Targets

| Task Type | Fast-Path Target | Manager-led Typical |
|-----------|------------------|---------------------|
| Video recording (3-5 sec) | 5-8 seconds | 15-20 seconds |
| Screenshot | 3-5 seconds | 10-12 seconds |
| Single web search | 4-6 seconds | 12-15 seconds |
| Simple browser task | 5-7 seconds | 12-18 seconds |

## Configuration

To enable fast-path workflow globally, add to `AGENTS.md`:

```markdown
## Fast-Path Mode

For simple tasks (video recording, screenshots, single searches), use the fast-path workflow defined in `agent-kit/workflows/fast_path.md`. Skip Manager overhead and execute directly.
```

## Agent Label Simplification

For fast-path tasks, you may omit the detailed agent labeling:

**Instead of:**
```
Agents involved: [MANAGER] → [BROWSER]
```

**Use:**
```
✓ Task completed
```

Reserve the full agent labeling for complex, multi-step tasks where the user benefits from understanding the orchestration.
