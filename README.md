# DS Jobs Pro — Data Science Job Tracker
### Canada & Remote | AI-Powered | Real-Time Jobs

---

## 📁 Project Structure

```
DSJobsPro/
├── index.html          ← Main entry point (open this!)
├── README.md           ← This file
│
├── css/
│   ├── base.css        ← Variables, reset, layout, sidebar, topbar
│   ├── components.css  ← Cards, chips, job cards, modal, forms, charts
│   └── pages.css       ← Interview prep, AI coach, goals page styles
│
└── js/
    ├── store.js        ← LocalStorage data management
    ├── utils.js        ← Shared helper functions
    ├── jobs.js         ← Real-time job fetching (Remotive + Jobicy APIs)
    ├── modal.js        ← Add / edit application modal
    ├── interview.js    ← Full question bank (5 rounds, 30+ questions)
    ├── ai.js           ← AI Career Coach (Claude API)
    ├── charts.js       ← Stats, ring chart, bar charts, timeline, heatmap
    ├── pages.js        ← Tracker, analytics, goals page logic
    └── app.js          ← Navigation router & app initialisation
```

---

## 🚀 How to Run

### Option 1 — Open Locally (30 seconds)
1. Unzip the folder anywhere on your computer
2. Double-click `index.html`
3. Opens in your browser — done!

> ⚠️ **Important:** Open the folder, not just the file. All CSS and JS files must be in their folders next to index.html.

### Option 2 — GitHub Pages (Free hosting, shareable link)

**Step 1** — Go to https://github.com and sign in (or create a free account)

**Step 2** — Click the **"+"** button → **"New repository"**
- Name: `DSJobsPro`
- Set to **Public**
- Click **"Create repository"**

**Step 3** — Upload ALL files maintaining the folder structure:
- Click **"uploading an existing file"**
- Upload the entire unzipped `DSJobsPro` folder
- Commit changes

**Step 4** — Enable GitHub Pages:
- Go to **Settings** → **Pages** (left sidebar)
- Source: **Deploy from a branch**
- Branch: **main**, Folder: **/ (root)**
- Click **Save**

**Step 5** — Wait 1–2 minutes, then visit:
```
https://YOUR-GITHUB-USERNAME.github.io/DSJobsPro/
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 Overview | Live stats, job list, status ring, timeline, bar charts |
| 💼 Live Jobs | Real jobs from Remotive.com + Jobicy.com APIs (auto-refresh every 20 min) |
| 📋 My Applications | Log, edit, delete, change status of every application |
| 📈 Analytics | 6-month heatmap, response rate, best role |
| 🎤 Interview Prep | 30+ Q&A across Technical, HR, Behavioural, Mock, General rounds |
| 🤖 AI Coach | Claude AI — resume tips, cold emails, salary guide, action plans |
| 🎯 Goals | Weekly targets + milestone tracking |

---

## 🌐 Real Job Sources

The dashboard fetches from two **free APIs** (no API key needed):
1. **Remotive.com** — Remote data science jobs worldwide
2. **Jobicy.com** — Remote tech jobs including data roles
3. **Fallback** — 15 curated Canadian DS jobs with real company career page links (used when APIs are unavailable)

---

## 💾 Data Storage

- All your application data is stored in your **browser's localStorage**
- Nothing is sent to any server
- Data persists when you refresh the page
- Use the same browser and device to access your data

---

## 🤖 AI Coach Notes

- Requires an active internet connection
- Powered by Claude (Anthropic)
- Your questions are sent to the Claude API only — no personal application data is shared

---

## 🔧 Troubleshooting

**Jobs not loading?**
→ You need internet for live jobs. The 15 curated fallback jobs always show.

**CSS/JS not loading?**
→ Make sure the `css/` and `js/` folders are in the same directory as `index.html`.

**GitHub page blank?**
→ Go to Settings → Pages → confirm it is enabled on `main` branch.

**AI not responding?**
→ Check internet connection and try again.

---

Good luck with your job search! 🍁
*Apply consistently, track everything, prep well.*
