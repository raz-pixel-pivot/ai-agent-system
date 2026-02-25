# All updates – summary

This document lists the main updates made to the AI Agent System project (Git, Slack, MCP, docs, and agent instructions).

---

## 1. Git & GitHub

| Update | Where | What |
|--------|--------|------|
| Repo connected to GitHub | `.git/config` | Remote: `https://github.com/raz-pixel-pivot/ai-agent-system.git`, branch `main`. |
| GitHub access doc | `.cursor/GITHUB_ACCESS.md` | How to set `GITHUB_TOKEN` (PAT, `repo` scope) via Cursor Secrets for Executor (branches, PRs). |

---

## 2. MCP (Cursor)

| Update | Where | What |
|--------|--------|------|
| Browser MCP | `.cursor/mcp.json` | `browsermcp`: `command: npx`, `args: ["-y", "@browsermcp/mcp@latest"]` – screenshots, navigation. |
| Slack MCP | `.cursor/mcp.json` | `slack`: `type: "streamableHttp"`, `url: "https://mcp.slack.com/mcp"` – same file as Browser MCP; user completes OAuth in Cursor Settings → Tools & MCP. |
| Slack upload workaround | `mcp-slack-upload/`, `.cursor/mcp.json` | **slack-upload** MCP exposes `upload_file_to_slack`; agent reads video, base64-encodes, calls tool → video appears in Slack thread. Set `SLACK_BOT_TOKEN` and `SLACK_DEFAULT_CHANNEL_ID` in Cursor; see `mcp-slack-upload/README.md`. |

---

## 3. Agent flow (Manager-led, Slack)

| Update | Where | What |
|--------|--------|------|
| Manager-led flow | `AGENTS.md`, `agent-kit/prompts/slack_task.md`, `agent-kit/roles/manager.md` | Every Slack task: Manager first → plan → approval → delegate to Researcher/QA/Executor/Browser. |
| “Agents involved” in every reply | `AGENTS.md` | Every reply must end with one line listing agents, e.g. `Agents involved: [MANAGER] → [BROWSER]`. |
| Video in Slack: do / don’t | `AGENTS.md` | **Do not** send video via file paths or markdown links in Slack (they don’t display). **Do** use a file-upload-to-Slack tool if available; otherwise give filename + “Open in Web” → artifacts viewer. |
| Video in Slack (confirmed limitation) | `docs/LIMITATIONS.md` | Documented: paths/markdown don’t show video in chat; correct behavior is “Open in Web” → artifacts viewer. |

---

## 4. Docs

| Update | Where | What |
|--------|--------|------|
| UI checklist | `docs/UI_CHECKLIST.md` | Step-by-step: Cursor + Slack setup (connect workspace, channels, @Cursor). |
| Limitations | `docs/LIMITATIONS.md` | Screenshots inline in Slack; videos only in artifacts viewer; workarounds; possible path via Slack MCP file upload. |
| Slack MCP & video | `docs/SLACK_MCP_VIDEO.md` | Slack MCP is in `.cursor/mcp.json`; how to complete OAuth; agent instruction to post video when upload tool exists; “Open in Web” if not. |
| This summary | `docs/UPDATES.md` | Single place for all updates (this file). |

---

## 5. Project structure (reference)

| Path | Purpose |
|------|--------|
| `agent-kit/roles/*.md` | Manager, Researcher, QA, Executor, Browser |
| `agent-kit/templates/*.md` | task_intake, manager_plan, approval, handoff |
| `agent-kit/prompts/slack_task.md` | Main Slack task flow |
| `.cursor/mcp.json` | Browser MCP + Slack MCP + slack-upload (workaround) |
| `mcp-slack-upload/` | Custom MCP for `upload_file_to_slack` (video in Slack thread) |
| `docs/UI_CHECKLIST.md` | Cursor + Slack setup |
| `docs/LIMITATIONS.md` | Screenshots vs videos, workarounds |
| `docs/SLACK_MCP_VIDEO.md` | Slack MCP setup and video-in-thread path |
| `docs/UPDATES.md` | This summary |

---

## Quick “what to do” after pull

1. **Cursor:** Open project; MCPs (browsermcp, slack, slack-upload) load from `.cursor/mcp.json`.
2. **Slack:** In Cursor Settings → Tools & MCP, complete **Slack OAuth** for `slack` (optional). For **video in thread:** set `SLACK_BOT_TOKEN` and `SLACK_DEFAULT_CHANNEL_ID` for **slack-upload** and run `npm install` in `mcp-slack-upload/`.
3. **GitHub:** Set `GITHUB_TOKEN` in Cursor Secrets if Executor will create branches/PRs.
4. **Slack tasks:** Use Manager-led flow; every reply ends with “Agents involved: …”.
5. **Videos:** Don’t embed via paths/markdown in Slack; point user to “Open in Web” → artifacts viewer (or use file-upload tool when available).
