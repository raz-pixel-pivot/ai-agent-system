# MCP Slack Upload (workaround for video in Slack)

Small MCP server that exposes **`upload_file_to_slack`**. The agent can call it to post a file (e.g. a video artifact) to a Slack channel or thread, so the user sees the video inline instead of only via "Open in Web".

## How it works

1. The agent saves a video to `/opt/cursor/artifacts/…` (or similar).
2. The agent **reads the file** and encodes it as **base64**.
3. The agent calls the tool **`upload_file_to_slack`** with `filename`, `file_content_base64`, and optionally `channel_id`, `thread_ts`.
4. This MCP decodes the content and uploads it to Slack via `files.upload` (Slack API).

**Note:** Sending large videos as base64 in one tool call may hit size limits (e.g. a few MB). Prefer short clips, or use "Open in Web" for long recordings.

## Setup

### 1. Slack app

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch**.
2. **OAuth & Permissions** → **Bot Token Scopes** → add **`files:write`** (and any you already use, e.g. `chat:write`, `channels:read`).
3. **Install App to Workspace** and copy the **Bot User OAuth Token** (`xoxb-…`).

### 2. Channel ID

In Slack: right‑click the channel → **View channel details** → copy the **Channel ID** (e.g. `C01234567`). The app must be **invited to the channel** (e.g. `/invite @YourApp`).

### 3. Cursor MCP config

In **Cursor Settings** → **Tools & MCP**, add a **New MCP Server** (or add to `.cursor/mcp.json`):

- **Command:** `node`
- **Args:** `mcp-slack-upload/index.js` (or the full path to this folder’s `index.js`; Cursor usually runs with project root as cwd).
- **Env** (in Cursor’s UI for this MCP, not in the repo):
  - `SLACK_BOT_TOKEN` = `xoxb-…`
  - `SLACK_DEFAULT_CHANNEL_ID` = `C01234567` (optional; if set, the agent can omit `channel_id`).

Do **not** put the token in the repo or in `mcp.json`.

### 4. Install dependencies

From the **project root** (or from `mcp-slack-upload`):

```bash
cd mcp-slack-upload && npm install
```

## Tool parameters

| Parameter             | Required | Description |
|----------------------|----------|-------------|
| `filename`          | Yes      | Name shown in Slack (e.g. `walkthrough.mp4`). |
| `file_content_base64` | Yes    | File content encoded as base64. |
| `channel_id`        | No*      | Slack channel ID. *Required if `SLACK_DEFAULT_CHANNEL_ID` is not set.* |
| `thread_ts`         | No       | Parent message `ts` to post the file in that thread. |
| `initial_comment`    | No       | Comment to post with the file. |

## Current status

**Dependencies:** ✅ Installed (as of 2026-02-25)

**Preferred method:** Agents should use the **direct Slack API method** documented in `agent-kit/skills/slack_video_upload.md` rather than this MCP tool. The API method is more reliable and doesn't depend on MCP server availability.

## Agent instruction

**Primary method:** Use the Slack API directly (see `agent-kit/skills/slack_video_upload.md` for complete workflow).

**Fallback (if MCP tool is available):** If you have the **`upload_file_to_slack`** tool loaded, you can use it: read the file from the artifact path, base64‑encode it, and call the tool with `filename`, `file_content_base64`, and (if known) `channel_id` and `thread_ts` for the current Slack thread.

**Note:** The MCP tool may not be loaded in all sessions. Always prefer the direct API method for video uploads.
