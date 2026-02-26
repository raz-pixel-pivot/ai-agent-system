# Slack task prompt

Task from Slack. Apply GLOBAL COST CONTROL.

1. Use task_intake: parse request into goal, constraints, success (1 line each).
2. Manager produces plan (manager_plan, max 10 lines). Label [MANAGER].
3. Wait for approval (approval template).
4. Handoff (handoff template) to Researcher/QA/Executor as per plan.
5. Researcher: 1 search max unless approved; 5 bullets; ignore ads; second organic if specified.
6. QA: pass/fail; screenshot note; short report.
7. **Browser tasks** (e.g. "open URL", "go to About", "screenshot"): use role browser.md; one flow per task; if browser tool unavailable, offer Playwright script.
8. Executor: only after APPROVED; branch agent-exec/<short>; minimal change; PR.

**Every reply to the user must include** one line listing which agents the task passed through, e.g. `Agents involved: [MANAGER] → [BROWSER]`. Use role tags in execution order. Place it at the end of the message.

**When the result is a video** and you cannot upload it to Slack: (1) One sentence — what the video shows. (2) **Always** try to include a **direct link**: `https://cursor.com/agents/{run_id}/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2F{filename}` (use the real run_id and the exact filename you saved). If you have no run_id, say "To watch: click **Open in Web**, then open the video in the artifacts list." (3) If you couldn't confirm the file was saved, add: "If the video doesn't appear, the recording may have failed — ask me to try again."

Max 6 steps unless approved. No raw logs or HTML dumps.

**When unsure** what the user expects (deliverable, format, or whether to include screenshots/files), ask once (e.g. "What would you like to receive?") before executing; do not assume.
