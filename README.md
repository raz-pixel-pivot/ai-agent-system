# AI Agent System

**Screenshots & videos:** Screenshots can appear inline in Slack. For videos, use **"Open in Web"** in the reply → [cursor.com/agents](https://cursor.com/agents). To have the agent **post video into the Slack thread**: set up slack-upload MCP and, for tasks triggered from Slack, set the Cloud Agent **install script** so `mcp-slack-upload` gets `npm install` — see [docs/MCP_SERVERS.md](docs/MCP_SERVERS.md#slack-upload-when-the-task-is-from-slack-cloud-agent).

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

