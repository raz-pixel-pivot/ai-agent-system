# Getting video into the Slack thread (Slack MCP path)

This doc describes how to enable Slack MCP so the agent can (when the tool exists) post video artifacts into the Slack thread, and what to do today.

## Goal

When the agent records a video (e.g. screen recording), the video should appear **in the Slack thread**, not only in the Cursor artifacts viewer. Right now the agent saves the file but cannot post it to Slack; enabling Slack MCP is a step toward that.

## 1. Official Slack MCP (mcp.slack.com) – not usable in Cursor today

The official Slack MCP is **not** in this project's `mcp.json` because Cursor fails with: **"Incompatible auth server: does not support dynamic client registration"**. Slack's auth only accepts pre-registered clients; Cursor uses dynamic registration. Until that changes, use **slack-upload** (below) for video in Slack.


*(The official slack entry was removed from mcp.json so Cursor stops showing the auth error.)*

## 2. Workaround: custom MCP slack-upload (video in thread)


This project includes a **custom MCP** that exposes **`upload_file_to_slack`**, so the agent can post the video into the Slack thread.

1. **Setup (once):** Create a Slack app with scope **`files:write`** and install it; copy the Bot User OAuth Token (`xoxb-…`). In Cursor Settings → Tools & MCP, find **slack-upload** and set env: `SLACK_BOT_TOKEN` and optionally `SLACK_DEFAULT_CHANNEL_ID`. Invite the app to the channel. Run `cd mcp-slack-upload && npm install` from the project root.
2. **Flow:** The agent reads the video file, base64-encodes it, and calls **`upload_file_to_slack`** with `filename`, `file_content_base64`, and (if known) `channel_id` and `thread_ts`. The video then appears in the Slack thread.
3. **Limit:** Very large videos may hit size limits; prefer short clips or use "Open in Web" for long recordings. See **mcp-slack-upload/README.md** for full setup.

## 3. What the agent is instructed to do

In **AGENTS.md** the agent is told: **if you have a tool that can upload/post a file to the current Slack thread**, use it after saving a video artifact so the user sees the video in the thread. Once Slack MCP (or another tool) exposes “upload file to this thread”, the agent will use it automatically.

## 3. If Slack MCP doesn’t support file upload yet

The official Slack MCP today focuses on **send message**, **read thread**, **search**, etc. If there is no “upload file to thread” tool:

- Use **Open in Web** from the Slack reply to watch the video in the [run’s artifacts viewer](https://cursor.com/agents) (see [LIMITATIONS.md](LIMITATIONS.md)).
- Consider a **feature request** to Cursor or Slack: “Allow Cloud Agent to post artifact files (e.g. video) to the originating Slack thread (e.g. via Slack MCP file upload or Cursor-built-in Slack upload).”

## 5. Summary

| Step | Action |
|------|--------|
| 1 | Slack MCP is in `.cursor/mcp.json`. In Cursor (Settings → Tools & MCP) complete Slack OAuth so the server can connect. |
| 2 | Agent already has the instruction to post video to the thread when a suitable tool is available. |
| 3 | If no file-upload tool exists, keep using “Open in Web” and request the feature from Cursor/Slack. |

Related: [LIMITATIONS.md](LIMITATIONS.md) (workarounds and “Possible path: video in Slack”).
