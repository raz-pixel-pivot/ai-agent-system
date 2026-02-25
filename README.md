# AI Agent System

**הגדרת ממשק (UI):** [docs/UI_CHECKLIST.md](docs/UI_CHECKLIST.md) – מה לעשות ב-Cursor וב-Slack.

## Cloud Agents (Cursor)

**Cloud Agents דורשים תיקייה של גיט.** אם מופיע **GitHub Access Error** – הוראות תיקון: [.cursor/GITHUB_ACCESS.md](.cursor/GITHUB_ACCESS.md). – כלומר תיקייה שמכילה את התיקייה `.git` (ריפו גיט). בתיקייה הזו יש ריפו גיט.

### איך לפתוח נכון (כדי ש־Cloud Agents יזהה):

**אפשרות 1 – פתיחת קובץ ה־Workspace (מומלץ):**
1. **File** → **Open File** או **Open**
2. נווט ל־**Desktop** → **AI Agent system**
3. בחר את הקובץ **`AI Agent system.code-workspace`** (לא תיקייה)
4. אשר **Open** – Cursor יפתח את תיקיית הפרויקט כ־root, ו־Cloud Agents יזהה את הגיט

**אפשרות 2 – פתיחת התיקייה:**
1. **File** → **Open Folder**
2. בחר **בדיוק** את התיקייה **AI Agent system** (זו שיש בה את הקבצים README.md ו־.git)
3. **לא** לפתוח את תיקיית Desktop או תיקייה אחרת – רק את **AI Agent system**

אם מופיע "Open a Git repository" / "Background agents only work in folders with a git repository" – סימן שהתיקייה שנפתחה אינה התיקייה שיש בה `.git`. פתח את **AI Agent system** (או את הקובץ `.code-workspace`) מחדש.
