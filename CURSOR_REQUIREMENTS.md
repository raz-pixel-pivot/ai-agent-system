# Cursor Infrastructure Requirements

## Slack Thread Support

### Current Status: ⚠️ PENDING IMPLEMENTATION

The agent system is **ready** to support Slack threads, but requires Cursor Cloud Agents infrastructure to inject the thread timestamp.

### What Needs to Happen

When a Cursor Cloud Agent is invoked from a **Slack thread** (not a top-level channel message), Cursor must inject:

```bash
export SLACK_THREAD_TS="<timestamp_of_parent_message>"
```

**Example:**
- User posts message in channel at timestamp `1772043156.002799`
- User replies in thread: "@Cursor do something"
- Cursor invokes Cloud Agent
- Agent should receive: `SLACK_THREAD_TS=1772043156.002799`

### How to Detect Thread vs. Channel

Slack provides this information in the event payload:

```json
{
  "channel": "C01234567",
  "ts": "1772043200.003456",           // Current message timestamp
  "thread_ts": "1772043156.002799"     // Parent thread timestamp (only if in thread)
}
```

**Detection logic:**
- If `thread_ts` exists in event → Agent is invoked from a thread
- If `thread_ts` is missing → Agent is invoked from top-level channel message

### Environment Variables Summary

| Variable | When to Set | Value |
|----------|-------------|-------|
| `SLACK_BOT_TOKEN` | Always | Bot OAuth token (from Cursor Secrets) |
| `SLACK_DEFAULT_CHANNEL_ID` | Always | Channel where message was posted |
| `SLACK_THREAD_TS` | **Only when invoked from thread** | Parent message timestamp |

### Implementation Checklist for Cursor Team

- [ ] Parse Slack event payload for `thread_ts` field
- [ ] If `thread_ts` exists, inject as environment variable: `SLACK_THREAD_TS=<value>`
- [ ] Ensure variable is available before agent execution starts
- [ ] Test with both thread and non-thread invocations
- [ ] Document in Cursor Cloud Agents docs

### Testing Thread Support

Once implemented, users can verify thread support works by running:

```bash
# In any agent execution
echo "SLACK_THREAD_TS: $SLACK_THREAD_TS"

if [ -n "$SLACK_THREAD_TS" ]; then
  echo "✅ Thread support is active - videos will post to thread"
else
  echo "❌ Not in a thread - videos will post to channel"
fi
```

### Impact if Not Implemented

**Without `SLACK_THREAD_TS`:**
- ❌ Videos upload to channel as top-level messages
- ❌ Thread conversations become fragmented
- ❌ Hard to follow context of agent responses

**With `SLACK_THREAD_TS`:**
- ✅ Videos post as replies within the thread
- ✅ Conversations stay organized
- ✅ Easy to track agent work in context

### Agent-Side Implementation Status

The agent code is **100% ready**:
- ✅ Code checks for `$SLACK_THREAD_TS` automatically
- ✅ Includes `thread_ts` in Slack API calls when available
- ✅ Falls back gracefully to channel posting when not in thread
- ✅ Documented in `AGENTS.md` and `slack_video_upload.md`

**Files implementing thread support:**
- `AGENTS.md` (lines 15-22)
- `agent-kit/skills/slack_video_upload.md` (section 2.3)

### How to Request This Feature

**Option 1: Cursor Dashboard**
1. Go to [cursor.com/settings](https://cursor.com/settings) or Cloud Agents settings
2. Look for "Slack Integration" or "Environment Variables"
3. Request thread_ts injection for Slack-invoked agents

**Option 2: Cursor Support**
- Email: support@cursor.com
- Subject: "Request: SLACK_THREAD_TS environment variable for Cloud Agents"
- Body: Link to this document

**Option 3: Cursor Secrets (Workaround)**
If Cursor Secrets supports dynamic values, you might be able to manually set it per-repo. However, this would need to be updated for each thread, which is impractical.

### Expected Timeline

| Priority | Estimated Effort | Impact |
|----------|------------------|--------|
| **Medium-High** | 2-4 hours dev + testing | High user experience improvement |

This is a straightforward feature addition that significantly improves UX for Slack-based workflows.

---

## Contact

For questions about this requirement, refer to:
- Technical implementation: `agent-kit/skills/slack_video_upload.md`
- Fast-path optimization: `agent-kit/workflows/fast_path.md`
- Overall improvements: `IMPROVEMENTS_SUMMARY.md`
