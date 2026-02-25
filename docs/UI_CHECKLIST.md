# רשימת משימות בממשק (UI)

עשה את השלבים האלה **בממשק** (Cursor + Slack). אחרי שסיימת, הקוד ב-repo תומך בזרימה.

---

## 1. Cursor – Cloud Agent Settings

- [ ] **Cursor** → פתח את הפרויקט **AI Agent system** (תיקייה או `.code-workspace`).
- [ ] **Cloud Agent Settings** (או Personal Configuration):
  - [ ] **GitHub Access** – וודא ש־Verified / Access Granted ל־`raz-pixel-pivot/ai-agent-system`.
  - [ ] **Secrets** – וודא שיש סוד **GitHub** (טוקן PAT) עם גישה לריפו.
  - [ ] **Runtime Configuration** – אם הסוכן צריך להריץ סקריפטים (למשל `npm install`): מלא **Install Script** ו־**Start Script** לפי הצורך. אחרת השאר ריק.
- [ ] **Integrations / MCP / Tools** (אם מופיע): הוסף או הפעל **דפדפן** (browser) או **Playwright** כדי שהסוכן יוכל לגלוש ולצלם מסך. אם אין אופציה כזו – השאר כמו שזה; הקוד כולל תפקיד Browser שמתאר מתי להשתמש בזה.

---

## 2. Slack – חיבור Cursor

- [ ] **Slack** → הוסף את האפליקציה **Cursor** (או Cursor for Slack) לערוץ/צוות.
- [ ] וודא שהערוץ שבו אתה שולח פקודות מחובר ל־Cursor.
- [ ] (אופציונלי) הגדר **איזה repo** Cursor בסלאק משתמש – אם יש הגדרה, בחר `raz-pixel-pivot/ai-agent-system`.

---

## 3. איך לבדוק שהכל עובד

- [ ] שלח בסלאק משימה פשוטה (למשל: "תסכם את הקבצים ב-agent-kit/roles").
- [ ] אם הוספת יכולת דפדפן – נסה: "היכנס לאתר X, עבור ל-About, וצלם מסך" (או לפי מה שהגדרת).

---

## סיכום

| מקום        | מה לעשות |
|------------|----------|
| Cursor     | GitHub Access + Secrets; אופציונלי: Runtime, MCP דפדפן |
| Slack      | חיבור Cursor לערוץ; אופציונלי: קישור ל-repo |
| בדיקה     | משימת טקסט ואז (אם רלוונטי) משימת דפדפן |

אחרי שסיימת את הרשימה – הקוד ב-repo (roles, prompts, orchestrator) כבר מכין את הזרימה; אם תוסיף דפדפן ב-UI, התפקיד Browser יידע מתי להשתמש בו.
