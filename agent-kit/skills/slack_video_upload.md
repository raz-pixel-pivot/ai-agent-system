# Skill: Slack Video Upload

## When to use this skill

Use this skill whenever you need to:
- Record a screen recording and share it in Slack
- Upload any video artifact to a Slack channel or thread
- Demonstrate visual changes or features to the user in Slack

## Prerequisites

- `$SLACK_BOT_TOKEN` environment variable (injected via Cursor Secrets)
- `$SLACK_DEFAULT_CHANNEL_ID` environment variable (injected via Cursor Secrets)
- Video file saved to `/opt/cursor/artifacts/` (or similar accessible path)

## Complete workflow

### Step 1: Create the video artifact

If you need to record a screen recording:

1. **Setup the environment** using the `computerUse` subagent:
   - Navigate to the URL or application you want to record
   - Wait for the page/app to fully load
   - Take a screenshot to confirm you're ready

2. **Start recording:**
   ```bash
   # Use RecordScreen tool with mode=START_RECORDING
   ```

3. **Capture the content** using the `computerUse` subagent:
   - Perform the actions you want to record
   - Wait the specified duration (e.g. 3 seconds, 10 seconds)
   - Let animations or content display naturally

4. **Save the recording:**
   ```bash
   # Use RecordScreen tool with mode=SAVE_RECORDING
   # Provide a descriptive filename (snake_case, no extension)
   # Example: cursor_docs_homepage_3sec
   # This saves to: /opt/cursor/artifacts/cursor_docs_homepage_3sec.mp4
   ```

### Step 2: Upload to Slack using API

**Important:** Do NOT rely on the `upload_file_to_slack` MCP tool. It may not be loaded or available. Always use the direct Slack API method below.

#### 2.1 Get upload URL and file ID

```bash
FILE_SIZE=$(stat -c%s "/opt/cursor/artifacts/your_video.mp4")
RESPONSE=$(curl -s -X POST https://slack.com/api/files.getUploadURLExternal \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -F "filename=your_video.mp4" \
  -F "length=$FILE_SIZE")

echo "$RESPONSE" | python3 -m json.tool
```

Expected response:
```json
{
  "ok": true,
  "upload_url": "https://files.slack.com/upload/v1/...",
  "file_id": "F0ABC123XYZ"
}
```

Extract the `upload_url` and `file_id` for the next steps.

#### 2.2 Upload the file

```bash
UPLOAD_URL="<paste-upload-url-here>"
FILE_ID="<paste-file-id-here>"

curl -X POST "$UPLOAD_URL" \
  -F "file=@/opt/cursor/artifacts/your_video.mp4" \
  -w "\nHTTP Status: %{http_code}\n"
```

Expected output:
```
OK - 1059914
HTTP Status: 200
```

#### 2.3 Complete upload and post to channel (or thread)

**For posting to a thread:** Add the `thread_ts` parameter to post the video as a reply in a thread instead of a top-level message.

```bash
# If posting to a thread, check for SLACK_THREAD_TS environment variable:
if [ -n "$SLACK_THREAD_TS" ]; then
  THREAD_PARAM=",\"thread_ts\":\"$SLACK_THREAD_TS\""
else
  THREAD_PARAM=""
fi

curl -s -X POST https://slack.com/api/files.completeUploadExternal \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"files\": [
      {
        \"id\": \"$FILE_ID\",
        \"title\": \"Descriptive Title Here\"
      }
    ],
    \"channel_id\": \"$SLACK_DEFAULT_CHANNEL_ID\",
    \"initial_comment\": \"Your message here (supports Hebrew, emoji, etc.)\"
    $THREAD_PARAM
  }" | python3 -m json.tool
```

**Note:** The `$SLACK_THREAD_TS` environment variable should be set by Cursor when the agent is invoked from a Slack thread. If it's not available, the video will post to the channel as a top-level message.

Expected response:
```json
{
  "ok": true,
  "files": [
    {
      "id": "F0ABC123XYZ",
      "name": "your_video.mp4",
      "title": "Descriptive Title Here",
      "mimetype": "video/mp4",
      "permalink": "https://pixelpivot.slack.com/files/...",
      ...
    }
  ]
}
```

The video should now appear directly in the Slack channel/thread.

### Step 3: Confirm and respond to user

After successful upload, respond to the user in Slack with:
- Short description of what the video shows (one sentence)
- Confirmation that the video was uploaded (e.g. "🎥 הסרטון הועלה בהצלחה" or "✅ Video uploaded successfully")
- Any relevant context about what was demonstrated

## Common issues and solutions

### Issue: "invalid_arguments" error in step 2.1

**Cause:** The `filename` or `length` parameters are not being sent correctly.

**Solution:** Make sure you're using `-F` (form data) not `-d` (JSON) for the getUploadURLExternal call:
```bash
curl -s -X POST https://slack.com/api/files.getUploadURLExternal \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -F "filename=video.mp4" \
  -F "length=$FILE_SIZE"
```

### Issue: "method_deprecated" error

**Cause:** Trying to use the old `files.upload` API.

**Solution:** Use the new three-step flow: `getUploadURLExternal` → upload to URL → `completeUploadExternal`.

### Issue: "unknown_method: files.uploadV2" error

**Cause:** Trying to use `files.uploadV2` which doesn't exist in the Slack API.

**Solution:** Use `files.getUploadURLExternal` (step 2.1 above), not `files.uploadV2`.

### Issue: MCP tool not available

**Cause:** The `upload_file_to_slack` MCP tool is not loaded or the dependencies are not installed.

**Solution:** Always use the direct Slack API method (steps 2.1-2.3) instead of relying on MCP tools. If you want to ensure the MCP works for future runs:
```bash
cd /workspace/mcp-slack-upload && npm install
```

### Issue: Video appears in artifacts but not in Slack

**Cause:** You provided an artifact link instead of uploading the file.

**Solution:** Always upload the video using the API (steps 2.1-2.3). Do not rely on "Open in Web" or artifact viewer links as the primary method.

## Environment variables

| Variable | Description | Example |
|----------|-------------|---------|
| `$SLACK_BOT_TOKEN` | Bot OAuth token (starts with `xoxb-`) | `xoxb-123-456-abc...` |
| `$SLACK_DEFAULT_CHANNEL_ID` | Target Slack channel ID | `C01234567` |
| `$SLACK_THREAD_TS` | Thread timestamp (if posting to a thread) | `1234567890.123456` |

The first two are injected via Cursor Secrets. `$SLACK_THREAD_TS` should be automatically set by Cursor when the agent is invoked from a Slack thread.

## Tips for better video uploads

1. **Keep videos short:** 3-10 seconds is ideal for quick demonstrations. Longer videos increase upload time and may hit size limits.

2. **Use descriptive filenames:** Use snake_case and include context, e.g. `cursor_homepage_demo_3sec` instead of `video` or `recording`.

3. **Add helpful titles and comments:** The `title` field in step 2.3 appears in Slack's file list. The `initial_comment` is posted with the video.

4. **Test in the browser first:** Before recording, navigate to the page using `computerUse` and take a screenshot to confirm everything is ready.

5. **Don't kill browser processes:** Leave the browser open after recording so the user can continue testing if needed.

## Language support

The Slack API fully supports Unicode, so you can use:
- Hebrew: "🎥 הסרטון של דף הבית של Cursor"
- Emoji: "✅ ✨ 🎬 🎥"
- Other languages: Works with all Unicode characters

Just include the text in the `initial_comment` field in step 2.3.
