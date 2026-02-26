# Skills index

Skills are documented procedures. Load a skill only when the **current action** matches its trigger. See `agent-kit/WHEN_TO_USE.md` for when to use which role and workflow.

| Skill ID | Trigger (when to use) | Role(s) | File |
|----------|------------------------|---------|------|
| slack_video_upload | Record a screen recording and share it in Slack; upload a video artifact to a Slack channel or thread | Browser | [slack_video_upload.md](slack_video_upload.md) |

**Adding a new skill:** Create `agent-kit/skills/<skill_id>.md` with sections: When to use, Prerequisites, Steps. Then add one row to this table and, if needed, reference the skill from the relevant role in `agent-kit/roles/`.
