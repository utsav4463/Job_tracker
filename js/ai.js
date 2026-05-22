/* ═══════════════════════════════════════════════
   AI.JS — AI Career Coach (Claude API)
   DS Jobs Pro
═══════════════════════════════════════════════ */

let aiThinking = false;

const AI_SYSTEM_PROMPT = `You are an expert Data Science career advisor specialising in the Canadian job market and remote DS roles worldwide. You help freshers and junior DS professionals with:
- Job search strategy in Canada
- Resume and cover letter writing
- Interview preparation (technical, HR, behavioural)
- Salary negotiation in Canada
- Skill roadmap and learning resources
- Cold emailing recruiters
- LinkedIn profile optimisation

Be concise, practical, encouraging and specific to Canada. Use emojis occasionally. Format responses with clear structure using bullet points where helpful. Always give actionable advice.`;

/* ── SEND USER MESSAGE ── */
async function sendAI() {
  if (aiThinking) return;

  const input = $('aiInput');
  const msg   = input.value.trim();
  if (!msg) return;

  input.value = '';
  addMsg(msg, 'user');
  aiThinking = true;
  $('aiSendBtn').disabled = true;

  const typingEl = addTypingIndicator();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     AI_SYSTEM_PROMPT,
        messages:   [{ role: 'user', content: msg }]
      })
    });

    const data = await res.json();
    typingEl.remove();

    const text = data.content?.map(c => c.text || '').join('') ||
      'Sorry, I had trouble responding. Please try again!';

    addMsg(fmtAI(text), 'ai', true);

  } catch (err) {
    typingEl.remove();
    addMsg('⚠️ Connection issue. Please check your internet and try again.', 'ai');
  }

  aiThinking = false;
  $('aiSendBtn').disabled = false;
}

/* ── QUICK PROMPT BUTTONS ── */
function sendQ(btn) {
  $('aiInput').value = btn.textContent.trim();
  sendAI();
}

/* ── ACTION BUTTONS (sidebar) ── */
function aiAction(prompt) {
  $('aiInput').value = prompt;
  // Navigate to AI page if not already there
  const aiPage = $('pg-ai');
  if (!aiPage.classList.contains('active')) {
    nav('ai', null);
  }
  setTimeout(sendAI, 150);
}

/* ── ADD MESSAGE TO CHAT ── */
function addMsg(text, type, isHTML = false) {
  const msgs = $('aiMessages');
  const div  = document.createElement('div');
  div.className = 'msg ' + type;

  if (isHTML) div.innerHTML = text;
  else        div.textContent = text;

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

/* ── TYPING INDICATOR ── */
function addTypingIndicator() {
  const msgs = $('aiMessages');
  const div  = document.createElement('div');
  div.className = 'msg ai';
  div.innerHTML = '<div class="typing-wrap"><div class="tdot"></div><div class="tdot"></div><div class="tdot"></div></div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}
