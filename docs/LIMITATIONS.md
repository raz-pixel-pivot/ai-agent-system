# Known Limitations & Feature Requests

This document tracks current limitations of the AI Agent System and features that would improve the user experience, particularly for Slack integration.

## Slack Integration Limitations

### 1. Inline Screenshot Display

**Current Behavior (updated):**
- **Screenshots:** The agent **can** now send the image inline in the Slack conversation; you can see the screenshot directly in the thread.
- Images may also be saved to artifacts; the inline display in Slack is the main way to view them for screenshot-only tasks.

---

### 2. Session Recording of Agent Actions

**Current Behavior:**
- Cloud agents **do** record their runs and produce **videos, screenshots, and logs** (see [Cursor blog](https://cursor.com/blog/agent-computer-use)).
- **Screenshots** can be sent inline in the Slack thread (see §1 above).
- **Videos** are **not** embedded in Slack; users get the filename and repo/branch only. To watch the video, open the run via **"Open in Web"** from the Slack reply → [cursor.com/agents](https://cursor.com/agents), where the video is playable.

**Desired Behavior:**
- Agents should record video/screen capture of their full task execution
- Session recordings should be delivered to users (viewable in Slack or via accessible link)
- Users can watch the complete flow of how the agent performed the task

**Technical Requirements:**
- Screen recording capability for agent sessions (particularly `computerUse` subagent)
- Video file delivery mechanism to Slack or user-accessible storage
- Efficient video compression/streaming for session playback

**Use Case:**
When a user requests: "Open URL, go to About page, take screenshot," they should receive:
1. A video recording showing the browser opening, navigation, and screenshot capture
2. The final screenshot (if applicable)

This allows users to:
- Verify the agent followed the correct steps
- Debug issues if something went wrong
- Review the agent's interpretation of instructions
- Learn from the agent's execution approach

---

## Implementation Notes

**When Available:**
- Once Cursor Cloud Agents or integrations support image posting to Slack, update agent logic to embed screenshots inline
- Once session recording to Slack is supported, enable video capture for browser tasks and other visual workflows
- Consider making session recording opt-in via task parameters (e.g., `record_session: true`) for performance/cost control

**Related Files:**
- `.cursor/mcp.json` - MCP server configuration
- `agent-kit/roles/browser.md` - Browser agent role definition
- `docs/UI_CHECKLIST.md` - Cursor + Slack setup instructions

---

## How to view artifacts today (per Cursor docs)

- **Screenshots:** The agent can send them **inline in the Slack thread**; you see the image directly in the conversation.
- **Videos:** Not shown inline in Slack or in chat. When the agent says *"Video Artifact: filename.mp4"*, you only see the filename and repo/branch in the thread. To **watch the video**:
  1. In that same Slack message, click **"Open in Web"** (or **"Open in Desktop"**).
  2. That opens the **run** at [cursor.com/agents](https://cursor.com/agents) (or in the Cursor app).
  3. In the run, open the **artifacts viewer** for that Cloud Agent run — the video is there and playable. The agent cannot embed videos directly in chat; that is a **Cursor product design choice**: video artifact files are shown in the artifacts viewer for the run, not embedded in chat messages.

**Why the agent says it "can't control" this:** The agent records and uploads the video correctly; it does **not** control how the Cursor UI displays it (inline vs artifacts viewer). That behavior is fixed by the Cursor Cloud Agent system.

**Confirmed:** Sending the video in Slack using file paths (e.g. `/opt/cursor/artifacts/filename.mp4`) or markdown image/link syntax does **not** show the video in the chat; those paths are not accessible to the user. The correct behavior is to name the file and direct the user to **"Open in Web"** → artifacts viewer.

**References:** [Cloud agents (computer use)](https://cursor.com/blog/agent-computer-use), [Cloud Agents (web and mobile)](https://cursor.com/docs/cloud-agent/web-and-mobile), [Changelog (Feb 24, 2026)](https://cursor.com/changelog/02-24-26).

---

## Workarounds (current)

- **Screenshots:** Now sent inline in the Slack conversation; no workaround needed.
- **Videos:** Not inline in Slack or chat. The video is in the **artifacts viewer** for the run. Use **"Open in Web"** in the Slack reply → open the run at [cursor.com/agents](https://cursor.com/agents) → open the run’s artifacts viewer to watch the video. This is how Cursor is designed; the agent cannot embed videos in chat.

---

## Possible path: video (or file) in Slack

It may still be possible to get the video into the Slack thread:

1. **Slack MCP** – Slack provides an official [MCP server](https://docs.slack.dev/ai/mcp-server) (send messages, read threads, etc.). **Cursor is listed as a partner client** that can use it. If the Cloud Agent run has access to Slack MCP and the MCP (or a custom wrapper) exposes **“upload file to thread”** (Slack’s [files.getUploadURLExternal](https://api.slack.com/methods/files.getUploadURLExternal) + complete flow), the agent could upload the recorded video to the **same Slack thread** after saving it. Then the video would appear in the thread.
2. **What’s needed** – Either: (a) Slack MCP adds a file-upload tool and Cursor wires the Cloud Agent to it with the right thread context, or (b) a custom MCP (or Cursor feature) that takes the artifact file from the run and posts it to the originating Slack thread. The agent already has the file at `/opt/cursor/artifacts/`; the missing piece is a **tool the agent can call** to “post this file to the current Slack thread.”
3. **Next steps** – See **[docs/SLACK_MCP_VIDEO.md](SLACK_MCP_VIDEO.md)** for setup: enable Slack MCP in Cursor (Settings → Tools & MCP), and the agent is instructed to post the video to the thread when a file-upload-to-thread tool is available. If no such tool exists yet, request it from Cursor/Slack.

**If Slack MCP shows "Error":** Click **Show Output** to see the cause; usually OAuth was not completed (Connect / Sign in with Slack in the MCP settings). See the **Troubleshooting** section in [SLACK_MCP_VIDEO.md](SLACK_MCP_VIDEO.md). Even after fixing the error, attaching a video to the Slack thread may still be impossible until Cursor or Slack provide an upload-file-to-thread tool.
