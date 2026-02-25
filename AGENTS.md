# AI Agent System

## Overview

This is a **configuration-only project** — it contains no application source code. The entire product is a set of Markdown files that define agent roles, prompt templates, and orchestration rules consumed by **Cursor Cloud Agents** and **Slack**.

**Workflow:** Slack task intake → Manager plans → Approval gate → Delegation to Researcher / QA / Executor / Browser agents → Output back to Slack.

## When you receive a task from Slack

**Choose the appropriate workflow based on task complexity:**

### Fast-Path Workflow (Recommended for Simple Tasks)

For **simple, single-action tasks** (video recording, screenshots, single searches, basic browser actions), use the **Fast-Path workflow** defined in `agent-kit/workflows/fast_path.md`:

1. **Recognize** task type immediately
2. **Execute** directly without Manager overhead
3. **Report** completion with evidence

**Performance:** 5-8 seconds for typical tasks vs. 15-20 seconds with Manager-led flow.

**Examples of Fast-Path tasks:**
- "Record a video and upload to Slack"
- "Take a screenshot of example.com"
- "Search for X and show first result"
- "Navigate to URL and click button Y"

### Manager-Led Workflow (For Complex Tasks)

For **complex or multi-step tasks**, use the full Manager-led flow:

1. **Act as Manager first.** Load and follow:
 - `agent-kit/prompts/slack_task.md` — main flow (task intake, plan, approval, handoff).
 - `agent-kit/roles/manager.md` — you never modify the repo; you plan, label outputs `[MANAGER]`, and delegate.
2. **Parse the request** with the task_intake logic (goal, constraints, success in 1 line each).
3. **Produce a plan** (manager_plan, max 10 lines), then ask for approval before any execution.
4. **Delegate** to Researcher / QA / Executor / Browser only as per the plan and handoff template.

**Examples of Manager-led tasks:**
- "Research X and create a PR with improvements"
- "Analyze the codebase and propose architecture changes"
- "Test feature X across multiple scenarios"
- Any task requiring code modifications

**In every reply to the user (especially in Slack):** End with a single line stating which agents the task went through, e.g. `Agents involved: [MANAGER] → [BROWSER]` or `Task flow: Manager → Researcher → QA`. Use the role labels in order (left to right = first to last). This is required so the user sees which agents handled the task.

The user does **not** need to type anything special in Slack; you should treat every @Cursor message as a task for this Manager-led flow. If the user explicitly says e.g. "Use agent-kit" or "Manager flow", that is a reminder to follow this; otherwise follow it by default for this repo.

## Video artifacts and Slack upload

**When you produce a video artifact** (e.g. screen recording saved to `/opt/cursor/artifacts/`), you **must always upload it directly to Slack** using the Slack API. Do **not** rely on the `upload_file_to_slack` MCP tool (it may not be available) or artifact viewer links as the primary method.

**Required workflow for Slack video upload:**

1. **Get upload URL and file ID:**
   ```bash
   FILE_SIZE=$(stat -c%s "/opt/cursor/artifacts/your_video.mp4")
   RESPONSE=$(curl -s -X POST https://slack.com/api/files.getUploadURLExternal \
     -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
     -F "filename=your_video.mp4" \
     -F "length=$FILE_SIZE")
   ```
   Extract `upload_url` and `file_id` from the JSON response using `python3 -m json.tool` or similar.

2. **Upload the file to the URL:**
   ```bash
   curl -X POST "$UPLOAD_URL" -F "file=@/opt/cursor/artifacts/your_video.mp4"
   ```
   Should return `OK - <size>` with HTTP 200.

3. **Complete upload and post to Slack:**
 ```bash
 # Check if posting to a thread
 if [ -n "$SLACK_THREAD_TS" ]; then
   THREAD_PARAM=",\"thread_ts\":\"$SLACK_THREAD_TS\""
 else
   THREAD_PARAM=""
 fi
 
 curl -s -X POST https://slack.com/api/files.completeUploadExternal \
 -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
 -H "Content-Type: application/json" \
 -d "{\"files\":[{\"id\":\"$FILE_ID\",\"title\":\"Your Title\"}],\"channel_id\":\"$SLACK_DEFAULT_CHANNEL_ID\",\"initial_comment\":\"Your message (supports Hebrew and other languages)\"$THREAD_PARAM}"
 ```
 The video will appear in the Slack channel (or thread if `$SLACK_THREAD_TS` is set).

**Environment variables available:**
- `$SLACK_BOT_TOKEN` — Bot OAuth token for API authentication
- `$SLACK_DEFAULT_CHANNEL_ID` — Target channel ID (from Cursor Secrets)
- `$SLACK_THREAD_TS` — Thread timestamp (automatically set when invoked from a Slack thread)

**Important notes:**
- Do **not** send file paths like `/opt/cursor/artifacts/…` in Slack messages (agent-side paths won't work for users)
- Do **not** use markdown like `![Video](path)` or `[filename](path)` (Slack won't render these)
- Always upload the video directly instead of providing artifact viewer links
- The Slack API supports Unicode (Hebrew, emoji, etc.) in `initial_comment`

**Only if API upload fails:** Fall back to artifact viewer: "To watch: click *Open in Web* in this message, then open `filename.mp4` in the artifacts list."

For detailed workflow and troubleshooting, see: `agent-kit/skills/slack_video_upload.md`

## Project structure

| Path | Purpose |
|------|---------|
| `agent-kit/roles/*.md` | 5 agent role definitions (manager, qa, browser, executor, researcher) |
| `agent-kit/templates/*.md` | 4 templates (manager_plan, approval, handoff, task_intake) |
| `agent-kit/prompts/slack_task.md` | Main prompt for Slack task processing |
| `agent-kit/skills/*.md` | Skills and workflows (e.g. Slack video upload) |
| `agent-kit/workflows/*.md` | Workflow definitions (fast_path for simple tasks) |
| `orchestrator/README.md` | Orchestrator description |
| `.cursor/mcp.json` | MCP server config (Browser MCP, Slack upload, etc.) |
| `mcp-slack-upload/` | Slack upload MCP server (requires `npm install`) |
| `runs/` | Directory for run artifacts |

## Cursor Cloud specific instructions

- **No build, lint, or test commands exist.** There is no `package.json`, no build system, no test framework, and no linter configured.
- **Node.js is required** for MCP servers: Browser MCP (`npx -y @browsermcp/mcp@latest`) and Slack upload MCP (`node run-mcp-slack-upload.cjs`). Cursor loads these from `.cursor/mcp.json`.
- **Browser MCP startup caveat:** The server logs a harmless `Failed to kill process on port 9009` error on first start (cleanup of a previous instance that doesn't exist). This can be ignored.
- **Slack upload MCP setup:** The `mcp-slack-upload/` directory requires dependencies. On first use, run: `cd mcp-slack-upload && npm install`. Dependencies are already installed in the current environment.
- **`GITHUB_TOKEN`** (PAT with `repo` scope for `raz-pixel-pivot/ai-agent-system`) is required for the Executor agent to create branches (prefixed `agent-exec/`) and open PRs. Set it via Cursor Secrets, not in project files.
- **Slack integration** is required for task intake. Environment variables `SLACK_BOT_TOKEN` and `SLACK_DEFAULT_CHANNEL_ID` are injected via Cursor Secrets.
- When modifying agent roles or templates, verify changes by reviewing the Markdown directly — there are no automated validation tools in this repo.
- The `runs/` directory is for runtime artifacts; it ships with only a `.gitkeep`.
- To verify GitHub access works: `gh api repos/raz-pixel-pivot/ai-agent-system --jq '.permissions'`.
