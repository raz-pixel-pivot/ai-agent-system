# AI Agent System

**UI setup:** [docs/UI_CHECKLIST.md](docs/UI_CHECKLIST.md) – what to do in Cursor and Slack.

**Screenshots & videos from Slack:** Screenshots can appear inline in the thread. Videos are not embedded in Slack — use **"Open in Web"** in the reply to open the run at [cursor.com/agents](https://cursor.com/agents) and watch the video there. To try getting video into the thread (Slack MCP): [docs/SLACK_MCP_VIDEO.md](docs/SLACK_MCP_VIDEO.md). Details: [docs/LIMITATIONS.md](docs/LIMITATIONS.md#how-to-view-artifacts-today-per-cursor-docs).

## Cloud Agents (Cursor)

**Cloud Agents require a Git folder** (a directory that contains a `.git` repo). This folder is a Git repo.

### How to open correctly (so Cloud Agents detect it)

**Option 1 – Open the workspace file (recommended):**
1. **File** → **Open File** or **Open**
2. Go to **Desktop** → **AI Agent system**
3. Select the file **`AI Agent system.code-workspace`** (not the folder)
4. Confirm **Open** – Cursor will open the project folder as root and Cloud Agents will detect Git

**Option 2 – Open the folder:**
1. **File** → **Open Folder**
2. Select exactly the **AI Agent system** folder (the one that contains README.md and .git)
3. Do **not** open the Desktop folder or another folder – only **AI Agent system**

If you see "Open a Git repository" / "Background agents only work in folders with a git repository" – the opened folder is not the one with `.git`. Reopen **AI Agent system** (or the `.code-workspace` file).

**GitHub Access Error?** See [.cursor/GITHUB_ACCESS.md](.cursor/GITHUB_ACCESS.md).
