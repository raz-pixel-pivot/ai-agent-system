# AI Agent System

## Overview

This is a **configuration-only project** — it contains no application source code. The entire product is a set of Markdown files that define agent roles, prompt templates, and orchestration rules consumed by **Cursor Cloud Agents** and **Slack**.

**Workflow:** Slack task intake → Manager plans → Approval gate → Delegation to Researcher / QA / Executor / Browser agents → Output back to Slack.

## When you receive a task from Slack

**Always use the Manager-led flow.** For every request that comes from Slack (or is a general task):

1. **Act as Manager first.** Load and follow:
   - `agent-kit/prompts/slack_task.md` — main flow (task intake, plan, approval, handoff).
   - `agent-kit/roles/manager.md` — you never modify the repo; you plan, label outputs `[MANAGER]`, and delegate.
2. **Parse the request** with the task_intake logic (goal, constraints, success in 1 line each).
3. **Produce a plan** (manager_plan, max 10 lines), then ask for approval before any execution.
4. **Delegate** to Researcher / QA / Executor / Browser only as per the plan and handoff template.

**In every reply to the user (especially in Slack):** End with a single line stating which agents the task went through, e.g. `Agents involved: [MANAGER] → [BROWSER]` or `Task flow: Manager → Researcher → QA`. Use the role labels in order (left to right = first to last). This is required so the user sees which agents handled the task.

The user does **not** need to type anything special in Slack; you should treat every @Cursor message as a task for this Manager-led flow. If the user explicitly says e.g. "Use agent-kit" or "Manager flow", that is a reminder to follow this; otherwise follow it by default for this repo.

**Video artifacts and Slack:** When you produce a **video** artifact (e.g. screen recording saved to `/opt/cursor/artifacts/` or similar), if you have access to a **tool that uploads or posts a file to the current Slack thread** (e.g. via Slack MCP or Cursor), **use it** to post that video file to the thread so the user sees the video in the conversation. If no such tool is available, say where the video is (artifacts viewer, “Open in Web”) as you do today. See `docs/SLACK_MCP_VIDEO.md` for setup.

**Do not** try to send or embed the video in Slack using file paths (e.g. `/opt/cursor/artifacts/…`) or markdown like `![Video](path)` or `[filename](path)` — those paths are only valid on the agent side; the user will not see the video. If you have no file-upload-to-Slack tool, give the filename and tell the user to click **"Open in Web"** to watch it in the run's artifacts viewer.

## Project structure

| Path | Purpose |
|------|---------|
| `agent-kit/roles/*.md` | 5 agent role definitions (manager, qa, browser, executor, researcher) |
| `agent-kit/templates/*.md` | 4 templates (manager_plan, approval, handoff, task_intake) |
| `agent-kit/prompts/slack_task.md` | Main prompt for Slack task processing |
| `orchestrator/README.md` | Orchestrator description |
| `.cursor/mcp.json` | MCP server config (Browser MCP via `npx`) |
| `runs/` | Directory for run artifacts |

## Cursor Cloud specific instructions

- **No build, lint, or test commands exist.** There is no `package.json`, no build system, no test framework, and no linter configured.
- **Node.js is required** only for the Browser MCP server (`npx -y @browsermcp/mcp@latest`), which is configured in `.cursor/mcp.json`. Cursor loads this automatically when the project is opened.
- **Browser MCP startup caveat:** The server logs a harmless `Failed to kill process on port 9009` error on first start (cleanup of a previous instance that doesn't exist). This can be ignored.
- **`GITHUB_TOKEN`** (PAT with `repo` scope for `raz-pixel-pivot/ai-agent-system`) is required for the Executor agent to create branches (prefixed `agent-exec/`) and open PRs. Set it via Cursor Secrets, not in project files.
- **Slack integration** is required for task intake. See `docs/UI_CHECKLIST.md` for Cursor + Slack setup steps.
- When modifying agent roles or templates, verify changes by reviewing the Markdown directly — there are no automated validation tools in this repo.
- The `runs/` directory is for runtime artifacts; it ships with only a `.gitkeep`.
- To verify GitHub access works: `gh api repos/raz-pixel-pivot/ai-agent-system --jq '.permissions'`.
