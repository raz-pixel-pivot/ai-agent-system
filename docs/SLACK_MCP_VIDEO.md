# Getting video into the Slack thread (Slack MCP path)

This doc describes how to enable Slack MCP so the agent can (when the tool exists) post video artifacts into the Slack thread, and what to do today.

## Goal

When the agent records a video (e.g. screen recording), the video should appear **in the Slack thread**, not only in the Cursor artifacts viewer. Right now the agent saves the file but cannot post it to Slack; enabling Slack MCP is a step toward that.

## 1. Enable Slack MCP in Cursor

**Slack MCP is already added in this project** (same place as Browser MCP): `.cursor/mcp.json` includes a `slack` entry with `type: "streamableHttp"` and `url: "https://mcp.slack.com/mcp"`.

To use it:

1. Open **Cursor Settings** → **Tools & MCP** (or **Features** → **MCP**). The **slack** server from the project should appear in the list.
2. Complete the **OAuth flow** when Cursor prompts you (or use “Connect” / “Sign in with Slack”) so Cursor can talk to your Slack workspace. The official Slack MCP requires OAuth; Cursor as a [partner client](https://docs.slack.dev/ai/mcp-server) provides this in the UI.
3. If Slack does not appear or connect: add it manually as a **Streamable HTTP** MCP with URL `https://mcp.slack.com/mcp`, then complete OAuth when asked.

## 2. What the agent is instructed to do

In **AGENTS.md** the agent is told: **if you have a tool that can upload/post a file to the current Slack thread**, use it after saving a video artifact so the user sees the video in the thread. Once Slack MCP (or another tool) exposes “upload file to this thread”, the agent will use it automatically.

## 3. If Slack MCP doesn’t support file upload yet

The official Slack MCP today focuses on **send message**, **read thread**, **search**, etc. If there is no “upload file to thread” tool:

- Use **Open in Web** from the Slack reply to watch the video in the [run’s artifacts viewer](https://cursor.com/agents) (see [LIMITATIONS.md](LIMITATIONS.md)).
- Consider a **feature request** to Cursor or Slack: “Allow Cloud Agent to post artifact files (e.g. video) to the originating Slack thread (e.g. via Slack MCP file upload or Cursor-built-in Slack upload).”

## 4. Summary

| Step | Action |
|------|--------|
| 1 | Slack MCP is in `.cursor/mcp.json`. In Cursor (Settings → Tools & MCP) complete Slack OAuth so the server can connect. |
| 2 | Agent already has the instruction to post video to the thread when a suitable tool is available. |
| 3 | If no file-upload tool exists, keep using “Open in Web” and request the feature from Cursor/Slack. |

Related: [LIMITATIONS.md](LIMITATIONS.md) (workarounds and “Possible path: video in Slack”).
