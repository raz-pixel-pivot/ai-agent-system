# Fix GitHub Access in Cursor

When **Personal Configuration** shows **GitHub Access: Error**, fix it as follows:

1. **Click the "GitHub Access" row** (the one marked Error) – this should open or expand the settings.
2. If you see **Connect** / **Reconnect** / **Add token** – click and **paste your GitHub PAT** (Personal Access Token) in the field (create one on GitHub with scope `repo`).
3. **Save** (Save button or close the panel with save).
4. If there is **"Save to .cursor/environment.json"** – you can click it to store the config structure in the project (values stay private and are not committed).

**Important:** Do not paste the token inside project files. Only in Cursor’s UI.

**Project repo:** `raz-pixel-pivot/ai-agent-system`. Ensure the token has access to this repo.

After connecting – try Cloud Agents again. If you still see an error, click **Refresh** or **Go to GitHub** in the error panel to update the connection.
