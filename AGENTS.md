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

**Video artifacts and Slack:** When you produce a **video** artifact (e.g. screen recording saved to `/opt/cursor/artifacts/` or similar), if you have access to a **tool that uploads or posts a file to the current Slack thread** (e.g. via Slack MCP or Cursor), **use it** to post that video file to the thread so the user sees the video in the conversation. If no such tool is available, say where the video is (artifacts viewer, “Open in Web”) as you do today. Setup: `mcp-slack-upload/README.md`.

**Do not** try to send or embed the video in Slack using file paths (e.g. `/opt/cursor/artifacts/…`) or markdown like `![Video](path)` or `[filename](path)` — those paths are only valid on the agent side; the user will not see the video. **If you have the `upload_file_to_slack` tool** (slack-upload MCP): read the video file, base64-encode it, and call the tool with `filename`, `file_content_base64`, and (if known) `channel_id` and `thread_ts` to post the video into the thread. If you have no file-upload tool, use the reply format below.

**When you cannot upload the video to Slack — reply format (keep it short and readable):**
- One short sentence: what the video shows (e.g. "Screen recording of the Cursor docs homepage, ~20 seconds.").
- **Prefer a direct link to the video:** If you have access to the current run ID and the artifact filename (e.g. from the run context or the path where you saved the file), include a clickable link in this form so the user can open the video in the browser in one click:
  `https://cursor.com/agents/{run_id}/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2F{filename}`
  Use the actual run ID and filename; encode the path segment for the query (e.g. `cursor_docs_homepage_demo.mp4` → `cursor_docs_homepage_demo.mp4` in the path part). Example: `https://cursor.com/agents/bc-3be85d63-569f-5468-b5f3-23758700b070/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2Fcursor_docs_homepage_demo.mp4`
- If you do not have the run ID, say: **"To watch: click *Open in Web* in this message."**
- Do **not** paste raw file paths or long technical text. End with the agents-involved line.

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
- **Slack integration** is required for task intake. Connect Cursor to Slack in Cursor Settings.
- When modifying agent roles or templates, verify changes by reviewing the Markdown directly — there are no automated validation tools in this repo.
- The `runs/` directory is for runtime artifacts; it ships with only a `.gitkeep`.
- To verify GitHub access works: `gh api repos/raz-pixel-pivot/ai-agent-system --jq '.permissions'`.
