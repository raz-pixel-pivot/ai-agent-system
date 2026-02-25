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
- **Videos:** Not shown inline in Slack. When the agent says *"Video Artifact: filename.mp4"*, you only see the filename and repo/branch in the thread. To **watch the video**:
  1. In that same Slack message, click **"Open in Web"** (or **"Open in Desktop"**).
  2. That opens the **run** at [cursor.com/agents](https://cursor.com/agents) (or in the Cursor app).
  3. In the run view, open the **video** (and any screenshots/logs) to review the agent’s execution.

**References:** [Cloud agents (computer use)](https://cursor.com/blog/agent-computer-use), [Cloud Agents (web and mobile)](https://cursor.com/docs/cloud-agent/web-and-mobile), [Changelog (Feb 24, 2026)](https://cursor.com/changelog/02-24-26).

---

## Workarounds (current)

- **Screenshots:** Now sent inline in the Slack conversation; no workaround needed.
- **Videos:** Not inline in Slack. Use **"Open in Web"** (or **"Open in Desktop"**) in the Slack reply to open the run and watch the video at [cursor.com/agents](https://cursor.com/agents).
