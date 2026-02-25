# Known Limitations & Feature Requests

This document tracks current limitations of the AI Agent System and features that would improve the user experience, particularly for Slack integration.

## Slack Integration Limitations

### 1. Inline Screenshot Display

**Current Behavior:**
- When agents capture screenshots (e.g., via `computerUse` subagent), images are saved to `/opt/cursor/artifacts/`
- File paths are shared in Slack responses (e.g., `pixel_and_pivot_about_page.webp`)
- Users cannot view these images in Slack - the file links don't render as inline images
- Users don't have access to view the artifact files from the Slack interface

**Desired Behavior:**
- Screenshots should be embedded/attached directly in Slack messages so they appear inline in the conversation
- Users should be able to see the image immediately without needing to access external files or repositories

**Technical Requirements:**
- Slack MCP tool/integration that supports posting images to threads
- Or: Artifact system that automatically shares images to Slack threads
- Or: Modified Cloud Agent → Slack output relay that includes image attachments

**Use Case:**
When a user requests: "Open https://example.com and send me a screenshot," they should receive the screenshot image visible directly in the Slack thread.

---

### 2. Session Recording of Agent Actions

**Current Behavior:**
- Agents execute tasks (browser interactions, terminal commands, etc.) without providing a visual record
- Users only receive text summaries and potentially single screenshots
- No way to review how the agent actually executed the task step-by-step

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

**Workarounds (Current):**
- None available for inline image display in Slack
- None available for session recordings
- Users must currently rely on text descriptions of agent actions
