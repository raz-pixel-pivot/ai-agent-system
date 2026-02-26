# When to Use What

Use this document to decide **which role**, **which skill**, **which workflow** (fast-path vs manager-led), and **whether to attach files**. Base decisions on **task type and complexity**, not on the exact wording of the request.

---

## 1. When to use which role

| Role | Use when |
|------|----------|
| **Manager** | Every request from Slack starts with Manager. Manager decides: fast-path or full flow, and which role(s) to use. |
| **Researcher** | The goal is **finding or summarizing information** (search, query). Not for navigation, screenshots, or code changes. |
| **Browser** | The goal is **navigation, viewing a page, screenshot, or screen recording** — no change to project code. |
| **Executor** | The goal requires **changing the project** (code, files, Git, PR). Use only after **explicit approval** of the plan. |
| **QA** | The goal is **verifying an outcome** (did the page load? is the result correct?) or producing a short pass/fail report. |

**Handoff:** Manager assigns **one primary role** per main action type. If the task mixes search and code change, hand off in a clear order (e.g. Researcher then Executor).

---

## 2. When to use which skill

A **skill** is a documented procedure (e.g. upload video to Slack). Load a skill only when the **current action** matches that skill’s “When to use” section.

- If the request or current step **matches** a skill’s trigger (e.g. “record and share in Slack”) → load that skill’s file from `agent-kit/skills/` and follow its steps.
- If no skill applies → use the role and available tools only; do not invent ad-hoc procedures.

The list of skills and their triggers is in `agent-kit/skills/README.md`.

---

## 3. When to use fast-path vs manager-led flow

**Fast-path** (no plan, no approval step):

- The request is **unambiguous**: a single clear action (one search, one screenshot, one short recording, navigate to URL and view).
- **No** change to the project (no code, no files, no Git).
- **No** risk or explicit user requirement for a plan or approval.

→ Manager may **skip** plan and approval and hand off directly to the right role; report the result briefly.

**Manager-led** (plan + approval before execution):

- The request has **multiple steps** or is unclear.
- It involves **code or file changes** or a PR.
- The user asked for a plan or approval, or there are constraints (e.g. “only show, do not change”).

→ Manager writes a short plan, presents it, **waits for approval**, then hands off per the plan.

**If in doubt** whether the task is simple → use the **manager-led** flow (plan + approval).

---

## 4. When to attach files or screenshots to the user

- **Do not** attach screenshots, videos, or other files **by default**. Attach only when:
  - The user **explicitly asked** (e.g. “send a screenshot”, “upload the video”), or
  - A **documented skill** requires it (e.g. “upload video to Slack” in the skill).
- If you captured screens or recordings **only for internal verification** and the user did not ask for them → **do not** send them. You may offer: “Would you like me to attach screenshots?”

---

## 5. When unsure: ask the user

If you are **not sure** what the user expects (e.g. which outcome, which format, whether to attach files, or how much detail), **ask once** before proceeding.

- Phrase it clearly, e.g.: “What would you like to receive? For example: a short confirmation, a screenshot, a link, or a detailed report?” or “Should I [option A] or [option B]?”
- **Do not assume.** One short clarifying question is better than delivering the wrong thing.

Apply this whenever the deliverable or format is ambiguous, regardless of role or workflow.
