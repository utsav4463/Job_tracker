# DS Jobs Pro — Setup Guide
## Step-by-Step Instructions

---

## WHAT'S INSIDE
- `index.html` — The complete dashboard (one file, everything included)

---

## OPTION 1: Run Locally (Quickest — 30 seconds)
1. Unzip the folder anywhere on your computer
2. Double-click `index.html`
3. It opens in your browser — done!

---

## OPTION 2: Host on GitHub Pages (Free, share with anyone)

### Step 1 — Create a GitHub account
- Go to https://github.com and sign up (free)

### Step 2 — Create a new repository
- Click the green "New" button
- Name it: `DSJobsPro` (or any name)
- Set it to **Public**
- Check "Add a README file"
- Click "Create repository"

### Step 3 — Upload the file
- Inside your new repo, click **"Add file"** → **"Upload files"**
- Drag and drop `index.html` from the unzipped folder
- At the bottom, click **"Commit changes"**

### Step 4 — Enable GitHub Pages
- Click **"Settings"** tab in your repo
- Scroll down to **"Pages"** in the left sidebar
- Under "Source", select **"Deploy from a branch"**
- Branch: **main**, Folder: **/ (root)**
- Click **"Save"**

### Step 5 — Wait 1-2 minutes, then visit:
```
https://YOUR-GITHUB-USERNAME.github.io/DSJobsPro/
```
Example: https://utsav4463.github.io/DSJobsPro/

---

## FEATURES EXPLAINED

### 📊 Overview (Dashboard)
- Live job count from real APIs (Remotive + Jobicy)
- Your application stats update automatically as you log jobs
- Application ring chart, timeline, and bar charts

### 💼 Live Jobs
- Fetches REAL jobs from Remotive.com and Jobicy.com every 20 minutes
- If APIs are unavailable, shows 15 curated Canadian DS jobs with real company links
- Click any job → auto-fills the application log form
- "View →" link opens the real job posting

### 📋 My Applications
- Log every job you apply to
- Change status (Applied → Interview → Offered etc.)
- Edit or delete any entry
- Data saves in your browser (persists on refresh)

### 📈 Analytics
- 6-month heatmap of your activity
- Response rate vs industry average
- Best performing role

### 🎤 Interview Prep
5 complete rounds with expandable Q&A:
- **Technical** — SQL, Python, ML, Statistics (8 questions)
- **HR Round** — Tell me about yourself, salary, 5-year plan (6 questions)
- **Behavioural** — STAR method, conflict, deadlines (5 questions)
- **Mock Interview** — Full system design scenarios (4 questions)
- **General Tips** — Resume, skills, job boards, Canadian companies (5 guides)

### 🤖 AI Career Coach
- Powered by Claude AI (requires internet)
- Ask anything about your DS job search
- Quick action buttons for cold emails, interview prep, salary guide
- Links to real Canadian job boards

### 🎯 Goals
- Set weekly application targets
- Track milestones (First application, 5 apps, first interview, etc.)

---

## REAL JOB SOURCES
The dashboard fetches from:
1. **Remotive.com API** — Free, no key needed, remote DS jobs
2. **Jobicy.com API** — Free, no key needed, remote jobs
3. **Fallback** — 15 curated Canadian DS jobs with real career page links

---

## TROUBLESHOOTING

**Jobs not loading?**
- You need an internet connection for live jobs
- Click "↻ Refresh" button
- The fallback Canadian jobs will always show

**AI Coach not responding?**
- Requires internet connection
- The AI uses Claude API — if there's an issue, try again in a moment

**My applications disappeared?**
- Data is stored in browser localStorage
- Don't clear your browser data/cache
- Use the same browser on the same device

**GitHub page showing blank?**
- Make sure the file is named exactly `index.html`
- Go to Settings → Pages and confirm it's enabled
- Wait 2-3 minutes after enabling

---

## DATA PRIVACY
- All your application data stays in YOUR browser only
- Nothing is sent to any server
- The AI Coach sends only your questions to Claude API (no personal data)

---

Good luck with your job search! 🍁
Apply consistently, track everything, prep well.
