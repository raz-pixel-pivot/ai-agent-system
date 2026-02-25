# UI checklist

Complete these steps in the **UI** (Cursor + Slack). The repo code already supports the flow.

---

## 1. Cursor – Cloud Agent Settings

- [ ] **Cursor** → Open the **AI Agent system** project (folder or `.code-workspace`).
- [ ] **Cloud Agent Settings** (or Personal Configuration):
  - [ ] **GitHub Access** – Ensure Verified / Access Granted for `raz-pixel-pivot/ai-agent-system`.
  - [ ] **Secrets** – Ensure a **GitHub** secret (PAT token) with access to the repo.
  - [ ] **Runtime Configuration** – If the agent needs to run scripts (e.g. `npm install`): set **Install Script** and **Start Script** as needed. Otherwise leave empty.
- [ ] **Tools & MCP** (Settings → Tools & MCP):
  - The project already has **`.cursor/mcp.json`** with **Browser MCP** (`browsermcp`). Cursor should load it when the project is open.
  - If "Installed MCP Servers" shows no browser tool: click **"Add Custom MCP"** and add a server with:
    - **Command:** `npx`
    - **Args:** `-y`, `@browsermcp/mcp@latest`
  - **Node.js** is required. For real browser automation, install the [Browser MCP](https://browsermcp.io/) extension in your browser.
  - After changes – refresh or reopen the project so tools load.

---

## 2. Slack – Cursor connection

- [ ] **Slack** → Add the **Cursor** app (or Cursor for Slack) to your channel/workspace.
- [ ] Ensure the channel where you send commands is connected to Cursor.
- [ ] (Optional) Set which **repo** Cursor in Slack uses – if configurable, select `raz-pixel-pivot/ai-agent-system`.

---

## 3. How to verify

- [ ] Send a simple task in Slack (e.g. "Summarize the files in agent-kit/roles").
- [ ] If you added browser capability – try: "Go to site X, open the About page, and take a screenshot".

---

## 4. Viewing screenshots and videos (Slack tasks)

When the agent completes a task (e.g. screenshot, browser flow), its reply in Slack includes **"Open in Web"** and **"Open in Desktop"**.

- [ ] Click **"Open in Web"** → opens the run at [cursor.com/agents](https://cursor.com/agents).
- [ ] In the run view you can watch **videos**, view **screenshots**, and read **logs** from the agent’s execution.

Screenshots and videos are not shown inline in Slack; use the run view to see them. Full details: [LIMITATIONS.md](LIMITATIONS.md#how-to-view-artifacts-today-per-cursor-docs).

---

## Summary

| Where   | What to do |
|--------|------------|
| Cursor | GitHub Access + Secrets; optional: Runtime, browser MCP |
| Slack  | Connect Cursor to channel; optional: link to repo |
| Verify | Text task then (if relevant) browser task |
| Artifacts | Use "Open in Web" from Slack reply to view videos/screenshots in run view |

After completing the checklist – the repo (roles, prompts, orchestrator) is ready; if you add browser in the UI, the Browser role knows when to use it.
