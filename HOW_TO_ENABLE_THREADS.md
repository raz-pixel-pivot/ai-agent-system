# איך להפעיל תמיכה ב-Threads

## מצב נוכחי

✅ **הקוד מוכן** - כל הלוגיקה לתמיכה ב-threads כבר מוכנה  
❌ **Cursor לא מעבירה את המידע** - חסר `SLACK_THREAD_TS` environment variable

## מה צריך לקרות?

### צד Cursor (Infrastructure)

כאשר Cloud Agent מופעל מתוך **thread** ב-Slack, Cursor צריכה להזריק:

```bash
export SLACK_THREAD_TS="1772043156.002799"  # timestamp של ההודעה האב
```

**איך Cursor יודעת?**

כאשר משתמש כותב `@Cursor` בתוך thread, Slack שולחת event עם:

```json
{
  "channel": "C01234567",
  "ts": "1772043200.003456",        // ההודעה הנוכחית
  "thread_ts": "1772043156.002799"  // ההודעה האב (קיים רק אם זה thread)
}
```

**הלוגיקה:**
- אם `thread_ts` **קיים** → להזריק `SLACK_THREAD_TS=<value>`
- אם `thread_ts` **לא קיים** → לא להזריק (זה הודעה רגילה ב-channel)

### צד Agent (כבר מוכן! ✅)

הקוד כבר בודק אוטומטית:

```bash
if [ -n "$SLACK_THREAD_TS" ]; then
  THREAD_PARAM=",\"thread_ts\":\"$SLACK_THREAD_TS\""
else
  THREAD_PARAM=""
fi
```

ומוסיף את זה להעלאה:

```bash
curl -s -X POST https://slack.com/api/files.completeUploadExternal \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"files\":[...],\"channel_id\":\"$SLACK_DEFAULT_CHANNEL_ID\"$THREAD_PARAM}"
```

## איך לבדוק אם זה עובד?

### אפשרות 1: הרץ את הסקריפט

```bash
./TEST_THREAD_SUPPORT.sh
```

**אם עובד, תראה:**
```
✅ SLACK_THREAD_TS: 1772043156.002799
🎉 Thread support is ACTIVE!
```

**אם לא עובד, תראה:**
```
❌ SLACK_THREAD_TS: Not set
⚠️  Thread support is INACTIVE
```

### אפשרות 2: בדיקה ידנית

```bash
echo "Thread TS: $SLACK_THREAD_TS"
```

אם זה ריק - Cursor עדיין לא הוסיפה תמיכה.

## איך לבקש מ-Cursor להוסיף את זה?

### דרך 1: Cursor Dashboard

1. לך ל-[cursor.com/settings](https://cursor.com/settings)
2. חפש "Cloud Agents" → "Secrets" או "Environment"
3. פתח ticket/request לתמיכה

### דרך 2: מייל לתמיכה

**To:** support@cursor.com  
**Subject:** Request: SLACK_THREAD_TS for Cloud Agents  
**Body:**

```
Hi Cursor team,

I'm using Cursor Cloud Agents with Slack integration and would like to request
a feature that would significantly improve the UX.

REQUEST:
When a Cloud Agent is invoked from a Slack thread (not a top-level channel message),
please inject the thread timestamp as an environment variable.

IMPLEMENTATION:
In the Slack event payload, check if "thread_ts" exists:
- If exists: inject environment variable SLACK_THREAD_TS=<thread_ts_value>
- If not exists: don't inject (agent was invoked from channel, not thread)

BENEFIT:
This allows agents to post videos/files as replies within threads instead of
as top-level channel messages, keeping conversations organized.

TECHNICAL DETAILS:
I've already implemented the agent-side logic - see:
https://github.com/raz-pixel-pivot/ai-agent-system/blob/cursor/google-search-recording-8ddf/CURSOR_REQUIREMENTS.md

Thanks!
```

### דרך 3: GitHub Issue (אם Cursor משתמשת ב-GitHub)

אם יש ל-Cursor repo ציבורי למשוב, פתח issue שם.

### דרך 4: Slack Community

אם יש Cursor Slack workspace, שאל שם.

## Timeline צפוי

| שלב | זמן משוער |
|-----|-----------|
| בקשה לצוות Cursor | 1 יום |
| הטמעה בצד Cursor | 2-4 שעות dev |
| בדיקות | 1-2 שעות |
| Deploy לייצור | 1 שבוע (תלוי ב-release cycle) |

**סה"כ:** 1-2 שבועות מרגע הבקשה (משוער)

## לסיכום

1. **הקוד מוכן** - אין מה לעשות בצד שלנו ✅
2. **Cursor צריכה להוסיף** - הזרקת `SLACK_THREAD_TS` כשמופעלים מ-thread
3. **איך לבקש** - מייל/dashboard/community
4. **איך לבדוק** - הרץ `./TEST_THREAD_SUPPORT.sh`

ברגע ש-Cursor תוסיף את זה, הסרטונים אוטומטית יתחילו להגיע לתוך ה-threads! 🎉

---

**קבצים קשורים:**
- `CURSOR_REQUIREMENTS.md` - מפרט טכני מלא לצוות Cursor
- `TEST_THREAD_SUPPORT.sh` - סקריפט בדיקה
- `IMPROVEMENTS_SUMMARY.md` - סיכום כל השיפורים
- `agent-kit/skills/slack_video_upload.md` - מימוש מפורט
