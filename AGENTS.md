# AI Agent System

## Overview

This is a **configuration-only project** — it contains no application source code. The entire product is a set of Markdown files that define agent roles, prompt templates, and orchestration rules consumed by **Cursor Cloud Agents** and **Slack**.

**Workflow:** Slack task intake → Manager plans → Approval gate → Delegation to Researcher / QA / Executor / Browser agents → Output back to Slack.

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
