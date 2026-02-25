# Getting video into the Slack thread (Slack MCP path)

This doc describes how to enable Slack MCP so the agent can (when the tool exists) post video artifacts into the Slack thread, and what to do today.

## Goal

When the agent records a video (e.g. screen recording), the video should appear **in the Slack thread**, not only in the Cursor artifacts viewer. Right now the agent saves the file but cannot post it to Slack; enabling Slack MCP is a step toward that.

## 1. Enable Slack MCP in Cursor

1. Open **Cursor Settings** → **Tools & MCP**.
2. Click **Add Custom MCP** / **New MCP Server**.
3. If Cursor offers **Slack** as a built-in or partner integration, choose it and complete the **OAuth flow** (connect your Slack workspace). The official Slack MCP endpoint is `https://mcp.slack.com/mcp` and requires OAuth; Cursor as a [partner client](https://docs.slack.dev/ai/mcp-server) may provide this in the UI.
4. If there is no built-in Slack MCP: you would need to run your own Slack app that connects to Slack’s MCP (see [Slack MCP server docs](https://docs.slack.dev/ai/mcp-server)) and expose it to Cursor; that is more advanced.

## 2. What the agent is instructed to do

In **AGENTS.md** the agent is told: **if you have a tool that can upload/post a file to the current Slack thread**, use it after saving a video artifact so the user sees the video in the thread. Once Slack MCP (or another tool) exposes “upload file to this thread”, the agent will use it automatically.

## 3. If Slack MCP doesn’t support file upload yet

The official Slack MCP today focuses on **send message**, **read thread**, **search**, etc. If there is no “upload file to thread” tool:

- Use **Open in Web** from the Slack reply to watch the video in the [run’s artifacts viewer](https://cursor.com/agents) (see [LIMITATIONS.md](LIMITATIONS.md)).
- Consider a **feature request** to Cursor or Slack: “Allow Cloud Agent to post artifact files (e.g. video) to the originating Slack thread (e.g. via Slack MCP file upload or Cursor-built-in Slack upload).”

## 4. Summary

| Step | Action |
|------|--------|
| 1 | Enable Slack MCP in Cursor (Settings → Tools & MCP) and connect Slack via OAuth if offered. |
| 2 | Agent already has the instruction to post video to the thread when a suitable tool is available. |
| 3 | If no file-upload tool exists, keep using “Open in Web” and request the feature from Cursor/Slack. |

Related: [LIMITATIONS.md](LIMITATIONS.md) (workarounds and “Possible path: video in Slack”).
