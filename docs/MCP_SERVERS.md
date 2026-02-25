# MCP servers in this project

All MCPs are defined in **`.cursor/mcp.json`**. Cursor loads them when you open the project.

## Currently enabled

| Server | Purpose | Config |
|--------|--------|--------|
| **browsermcp** | Browser control: navigate, screenshot, click, type. | `npx -y @browsermcp/mcp@latest` |
| **slack-upload** | Upload files (e.g. video) to a Slack channel/thread. | Runs from `mcp-slack-upload/` so `node_modules` is found. Set env: `SLACK_BOT_TOKEN`, `SLACK_DEFAULT_CHANNEL_ID`. See `mcp-slack-upload/README.md`. |
| **filesystem** | Read/write/list files in allowed directories (project root `.`). | `npx -y @modelcontextprotocol/server-filesystem .` |
| **playwright** | E2E browser automation, snapshots, form fill (accessibility tree). First run: `npx playwright install`. | `npx -y @playwright/mcp@latest` |

**Note:** **fetch** was removed: `mcp-fetch-node` runs as an HTTP/SSE server and prints text to stdout, so Cursor’s stdio MCP connection fails (invalid JSON). Use **browsermcp** to open URLs or add a different fetch-style MCP that supports stdio.

## Troubleshooting: “No tools, prompts or resources” (slack-upload)

This usually means the MCP server **did not start** correctly. Fix:

1. **Run `npm install`** inside `mcp-slack-upload/` (from project root: `cd mcp-slack-upload && npm install`). Without this, `node index.js` cannot load dependencies and the process exits before exposing tools.
2. **Open the project at its root** – the folder that contains `mcp-slack-upload/` and `.cursor/mcp.json`. Cursor runs the MCP command with this folder as the current directory.
3. **Set env** for slack-upload in Cursor (Settings → MCP → slack-upload → env): `SLACK_BOT_TOKEN` and optionally `SLACK_DEFAULT_CHANNEL_ID`. The server will run without them but the tool will return an error if you call it without a token.

## slack-upload when the task is from Slack (Cloud Agent)

When you send a task from **Slack**, Cursor runs the agent in the **cloud**. The project is synced but `mcp-slack-upload/node_modules` is not in Git, so the slack-upload MCP often fails to start and the agent reports "upload_file_to_slack is not available". To fix it:

1. **Cursor Settings** → **Cloud Agents** → **Workspace Configuration** (or **Runtime Configuration**).
2. Set **Install script** so the cloud environment installs dependencies before running. For example:
   - **Install script:** `cd mcp-slack-upload && npm install`
   (Use the path relative to the project root; adjust if your config expects a different working directory.)
3. Ensure **Secrets** (Cloud Agents → Secrets) include `SLACK_BOT_TOKEN` and `SLACK_DEFAULT_CHANNEL_ID` so the tool can upload to Slack.

After saving, run a new task from Slack that produces a video; the agent should have `upload_file_to_slack` and can post the video into the thread. If it still says the tool is not available, check the Cloud Agent run logs to confirm the install step ran and the MCP started.

## Optional: add more public MCPs

You can add more entries to `.cursor/mcp.json`. Examples (from [Cursor’s MCP list](https://github.com/cursor/mcp-servers)):

| Server | Use case | Example config |
|--------|-----------|----------------|
| **GitHub** | Issues, PRs, repo actions | Docker + `GITHUB_PERSONAL_ACCESS_TOKEN` (see Cursor install link). |
| ~~Playwright~~ | *(already enabled above)* | — |
| **Firecrawl** | Web crawl/scrape (API) | `npx -y firecrawl-mcp` + env `FIRECRAWL_API_KEY` |
| **Stack Overflow** | Q&A search | `npx mcp-remote mcp.stackoverflow.com` |
| **MongoDB** | Query MongoDB | `npx -y mongodb-mcp-server` |
| **Sentry** | Errors and performance | Streamable HTTP, auth in Cursor. |
| **Linear** | Issues and projects | Streamable HTTP. |
| **Notion** | Notes and docs | Streamable HTTP. |

To add one: copy its `command` / `args` (and `env` if needed) into `mcpServers` in `.cursor/mcp.json`. Restart or reload Cursor so it picks up the new server.

**Recommended next:** Firecrawl (scraping with API key) or MongoDB if you use them; GitHub/Linear/Notion need Docker or streamable HTTP.
