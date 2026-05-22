/* ═══════════════════════════════════════════════
   INTERVIEW.JS — Full Question Bank
   Rounds: Technical, HR, Behavioural, Mock, General
   DS Jobs Pro
═══════════════════════════════════════════════ */

const QUESTIONS = {

  /* ─────────────── TECHNICAL ─────────────── */
  tech: [
    {
      icon: '💻', diff: 'easy',
      q: 'What is the difference between supervised and unsupervised learning?',
      a: `<strong>Supervised Learning:</strong> The model trains on labelled data — you provide input-output pairs and the model learns to map inputs to outputs.<br><br>
<strong>Examples:</strong> Linear regression, logistic regression, decision trees, random forests, SVMs.<br><br>
<strong>Unsupervised Learning:</strong> The model finds hidden patterns in unlabelled data without guidance.<br><br>
<strong>Examples:</strong> K-Means clustering, PCA, autoencoders, DBSCAN.<br><br>
<div class="q-tip">💡 Interview tip: Always give a real-world example — e.g., email spam detection (supervised) vs customer segmentation (unsupervised).</div>`
    },
    {
      icon: '🗄️', diff: 'med',
      q: 'Write a SQL query to find the second highest salary from an Employees table.',
      a: `<strong>Solution 1 — LIMIT / OFFSET:</strong><br>
<code>SELECT DISTINCT salary FROM Employees ORDER BY salary DESC LIMIT 1 OFFSET 1;</code><br><br>
<strong>Solution 2 — Subquery (works everywhere):</strong><br>
<code>SELECT MAX(salary) FROM Employees WHERE salary &lt; (SELECT MAX(salary) FROM Employees);</code><br><br>
<strong>Solution 3 — DENSE_RANK (best for ties):</strong><br>
<code>SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk FROM Employees) t WHERE rnk = 2;</code><br><br>
<div class="q-tip">💡 Always mention edge cases: what if there are ties? DENSE_RANK is the safest and most interview-friendly answer.</div>`
    },
    {
      icon: '📊', diff: 'med',
      q: 'Explain overfitting and how to prevent it.',
      a: `<strong>Overfitting</strong> occurs when a model learns the training data too well — including its noise — and fails to generalise to new data.<br><br>
<strong>Signs:</strong><ul><li>High training accuracy, low validation accuracy</li><li>Large gap between train and test error</li></ul>
<strong>Prevention techniques:</strong><ul>
<li><strong>Regularisation</strong> — L1 (Lasso) and L2 (Ridge) penalise model complexity</li>
<li><strong>Cross-validation</strong> — k-fold CV to evaluate generalisation</li>
<li><strong>Dropout</strong> — randomly deactivate neurons during training (neural nets)</li>
<li><strong>Early stopping</strong> — stop training when validation loss increases</li>
<li><strong>More data / augmentation</strong> — give the model more examples to generalise from</li>
<li><strong>Simpler model</strong> — reduce features, prune trees</li>
</ul>
<div class="q-tip">💡 Mention the bias-variance tradeoff: overfitting = high variance, underfitting = high bias.</div>`
    },
    {
      icon: '🔗', diff: 'easy',
      q: 'What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?',
      a: `<strong>INNER JOIN:</strong> Returns only rows where there is a match in BOTH tables.<br>
<code>SELECT * FROM A INNER JOIN B ON A.id = B.id;</code><br><br>
<strong>LEFT JOIN:</strong> Returns ALL rows from the left table + matching rows from the right. Non-matching right rows get NULL.<br>
<code>SELECT * FROM A LEFT JOIN B ON A.id = B.id;</code><br><br>
<strong>FULL OUTER JOIN:</strong> Returns all rows from both tables. NULLs fill where there is no match on either side.<br><br>
<div class="q-tip">💡 Visualise a Venn diagram when answering. Be ready to write an example query live on a whiteboard or shared editor.</div>`
    },
    {
      icon: '🧮', diff: 'med',
      q: 'Explain p-value and hypothesis testing in simple terms.',
      a: `<strong>Hypothesis Testing</strong> is a statistical method to decide if data supports a claim.<br><br>
<strong>Steps:</strong><ul>
<li><strong>H₀ (Null hypothesis):</strong> No effect — the default assumption</li>
<li><strong>H₁ (Alternative hypothesis):</strong> There IS an effect</li>
<li>Choose significance level α (usually 0.05)</li>
<li>Run the test, compute the p-value</li>
</ul>
<strong>P-value:</strong> The probability of observing your data (or more extreme) IF H₀ is true.<br><br>
<strong>Decision rule:</strong><ul>
<li>p-value &lt; α → Reject H₀ (statistically significant)</li>
<li>p-value ≥ α → Fail to reject H₀</li>
</ul>
<div class="q-tip">💡 Common trap: p-value is NOT the probability that H₀ is true. Make this distinction clearly — interviewers love it.</div>`
    },
    {
      icon: '🌲', diff: 'med',
      q: 'How does a Random Forest work and why is it better than a single Decision Tree?',
      a: `<strong>Random Forest</strong> is an ensemble method that builds many decision trees and combines their outputs (majority vote for classification, average for regression).<br><br>
<strong>How it works:</strong><ul>
<li><strong>Bagging:</strong> Each tree trains on a random bootstrap sample of the data</li>
<li><strong>Feature randomness:</strong> At each split, only a random subset of features is considered</li>
<li>Final prediction = aggregate of all trees</li>
</ul>
<strong>Why better than a single tree:</strong><ul>
<li>Reduces overfitting (variance) through averaging</li>
<li>More robust to noise and outliers</li>
<li>Built-in feature importance scores</li>
</ul>
<div class="q-tip">💡 Key hyperparameters to know: <code>n_estimators</code>, <code>max_depth</code>, <code>max_features</code>. Know what each controls.</div>`
    },
    {
      icon: '📉', diff: 'easy',
      q: 'What is the difference between mean, median, and mode? When do you use each?',
      a: `<strong>Mean:</strong> Average of all values. Sensitive to outliers.<br>
→ Use when data is normally distributed with no extreme outliers.<br><br>
<strong>Median:</strong> Middle value when sorted. Robust to outliers.<br>
→ Use when data is skewed (e.g. income, house prices).<br><br>
<strong>Mode:</strong> Most frequent value. Works with categorical data.<br>
→ Use when finding the most common category (e.g. most popular product).<br><br>
<strong>Example:</strong> Salaries [40K, 45K, 50K, 55K, 500K]<br>
Mean = $138K (misleading), Median = $50K (representative) ✓<br><br>
<div class="q-tip">💡 Always connect statistical concepts to a real business scenario — it shows you can apply theory.</div>`
    },
    {
      icon: '🐼', diff: 'easy',
      q: 'What is Pandas and what are the most common operations you use daily?',
      a: `<strong>Pandas</strong> is the primary Python library for data manipulation and analysis, built on top of NumPy.<br><br>
<strong>Most used operations:</strong><ul>
<li><code>df.head(), df.info(), df.describe()</code> — explore data</li>
<li><code>df.dropna(), df.fillna()</code> — handle missing values</li>
<li><code>df.groupby().agg()</code> — group and aggregate</li>
<li><code>df.merge(), df.concat()</code> — join dataframes</li>
<li><code>df[df['col'] > val]</code> — boolean filtering</li>
<li><code>df.apply(func)</code> — apply custom functions row/column-wise</li>
<li><code>df.pivot_table()</code> — cross-tabulation</li>
<li><code>df.sort_values(), df.drop_duplicates()</code></li>
</ul>
<div class="q-tip">💡 Practice live coding small data wrangling tasks on Kaggle or StrataScratch. Speed matters in interviews.</div>`
    },
  ],

  /* ─────────────── HR ROUND ─────────────── */
  hr: [
    {
      icon: '👋', diff: 'easy',
      q: 'Tell me about yourself and why you want to work in Data Science.',
      a: `<strong>Use the Present → Past → Future structure (under 2 minutes):</strong><br><br>
<em>"I am [Name], a [background] professional passionate about using data to solve real problems. I have experience with [key skills — Python, SQL, ML]. Most recently, I [specific project / achievement]. I am excited about this role at [Company] because [specific reason]. My goal is to [career aspiration]."</em><br><br>
<strong>Tips:</strong><ul>
<li>Keep it under 2 minutes</li>
<li>Mention 2–3 specific skills with brief examples</li>
<li>Connect your story to the role</li>
<li>Show genuine enthusiasm for data</li>
</ul>
<div class="q-tip">💡 Practice this 10 times aloud. First impressions matter enormously in Canadian tech interviews.</div>`
    },
    {
      icon: '💼', diff: 'easy',
      q: 'Why do you want to work at this company specifically?',
      a: `<strong>Research these before every interview:</strong><ul>
<li>Company tech stack and data infrastructure</li>
<li>Recent news, product launches, or achievements</li>
<li>Engineering / data team blog posts</li>
<li>Glassdoor reviews about culture</li>
</ul>
<strong>Template answer:</strong><br>
<em>"I am particularly excited about [Company] for three reasons: First, your focus on [specific product/mission] aligns with my interest in [area]. Second, I was impressed by [specific thing — blog post, product feature, dataset]. Third, the opportunity to work with [specific tech or team] would help me grow in [skill area]."</em><br><br>
<div class="q-tip">💡 Mentioning something specific — a blog post, a product feature — immediately sets you apart from 95% of candidates.</div>`
    },
    {
      icon: '💰', diff: 'med',
      q: 'What are your salary expectations for a DS role in Canada?',
      a: `<strong>2024–2025 Canada DS Salary Ranges:</strong><ul>
<li><strong>Fresher / New Grad:</strong> $55,000 – $75,000</li>
<li><strong>Junior (1–3 yrs):</strong> $70,000 – $95,000</li>
<li><strong>Mid-level (3–6 yrs):</strong> $90,000 – $125,000</li>
<li><strong>Senior (6+ yrs):</strong> $120,000 – $175,000+</li>
</ul>
<strong>By city:</strong><ul>
<li>Toronto: +10–15% premium</li>
<li>Vancouver: +5–10% premium</li>
<li>Calgary / Ottawa: Market rate</li>
<li>Remote (US-based company): Often $100K+ USD</li>
</ul>
<strong>Template response:</strong><br>
<em>"Based on my research for [role] in [city/remote], I am targeting $[X]–$[Y]. I am flexible depending on the total compensation package."</em><br><br>
<div class="q-tip">💡 Always give a range, not a single number. Research Glassdoor + LinkedIn Salary before every interview.</div>`
    },
    {
      icon: '🚪', diff: 'easy',
      q: 'Where do you see yourself in 5 years?',
      a: `<strong>What they really want to know:</strong> Will you stay? Are you ambitious but realistic?<br><br>
<strong>Template:</strong><br>
<em>"In 5 years, I see myself as a strong independent contributor in data science — someone who can lead projects end-to-end, mentor juniors, and drive business decisions through data. I would love to deepen my expertise in [ML / Analytics / Engineering] and potentially grow into a senior or lead role. Most importantly, I want to be making a real, measurable impact."</em><br><br>
<div class="q-tip">💡 Do not say "your position" (too aggressive) or "I do not know" (too passive). Show ambition balanced with loyalty.</div>`
    },
    {
      icon: '🤝', diff: 'easy',
      q: 'Do you prefer working independently or in a team?',
      a: `<strong>Always answer: Both — with a concrete example.</strong><br><br>
<em>"I genuinely enjoy both. Deep independent work is essential for tasks like model building, EDA, or writing analysis. At the same time, some of my best work has come from collaborating with engineers, product managers, and business stakeholders to frame the right problem. In my [project/experience], I [specific example of collaboration]. I have learnt that the best data science happens at the intersection of solo deep work and strong cross-functional communication."</em><br><br>
<div class="q-tip">💡 DS is inherently collaborative. Showing you understand this signals real maturity in the field.</div>`
    },
    {
      icon: '❓', diff: 'easy',
      q: 'Do you have any questions for us?',
      a: `<strong>ALWAYS prepare 3–4 questions. This shows genuine interest and seriousness.</strong><br><br>
<strong>Great questions to ask:</strong><ul>
<li>"What does a typical first 90 days look like for someone in this role?"</li>
<li>"What does the data team tech stack look like — what tools will I use daily?"</li>
<li>"What are the biggest data challenges the team is working on right now?"</li>
<li>"How does the data team collaborate with product and engineering?"</li>
<li>"What does success look like in this role after 6 months?"</li>
<li>"What do you enjoy most about working here?"</li>
</ul>
<div class="q-tip">💡 Never say "I think I have covered everything." Never ask about salary / benefits in the first round. Always ask something meaningful.</div>`
    },
  ],

  /* ─────────────── BEHAVIOURAL ─────────────── */
  behav: [
    {
      icon: '⭐', diff: 'med',
      q: 'Tell me about a time you had to work with messy, incomplete data.',
      a: `<strong>Use the STAR method:</strong><br><br>
<strong>S</strong>ituation → <strong>T</strong>ask → <strong>A</strong>ction → <strong>R</strong>esult<br><br>
<strong>Example framework:</strong><br>
<em>"In [project/internship], I received a dataset from [source] that had [specific problems — 30% missing values, inconsistent formats, duplicate entries]. My task was to build a [model / dashboard / report] from it. I first performed EDA to understand the missingness patterns, then applied [median imputation / forward fill / row removal] based on variable type and business context. I also standardised date formats using Python. After cleaning, model performance improved by [X%] and the report accurately reflected [outcome]."</em><br><br>
<div class="q-tip">💡 Always quantify the result. "Improved accuracy by 15%" is far stronger than "it worked better".</div>`
    },
    {
      icon: '🤝', diff: 'hard',
      q: 'Describe a time you disagreed with a team member or manager. How did you handle it?',
      a: `<strong>What they are testing:</strong> Communication skills, maturity, ability to handle conflict professionally.<br><br>
<strong>What to show:</strong><ul>
<li>You listened first</li>
<li>You used data / evidence to support your view</li>
<li>You found common ground or deferred gracefully</li>
<li>The relationship remained intact</li>
</ul>
<strong>Template:</strong><br>
<em>"During [project], my manager wanted to use [approach A], but based on my analysis I believed [approach B] would be more effective because [data-backed reason]. I scheduled a 1:1 to present my findings with a clear comparison. We discussed the trade-offs and ultimately [agreed on B / my manager explained why A was better / we combined both]. The outcome was [result]. I learnt that bringing data — not just opinions — to disagreements makes conversations far more productive."</em><br><br>
<div class="q-tip">💡 Never criticise your manager or team. Show professionalism and a data-driven mindset.</div>`
    },
    {
      icon: '⏰', diff: 'med',
      q: 'Tell me about a time you had to meet a tight deadline. What did you do?',
      a: `<strong>What they want to see:</strong> Prioritisation, execution under pressure, communication, resourcefulness.<br><br>
<strong>Structure your answer:</strong><ul>
<li>What the deadline was and why it mattered</li>
<li>What obstacles you faced</li>
<li>How you prioritised (MVP approach)</li>
<li>How you communicated progress proactively</li>
<li>What the outcome was</li>
</ul>
<strong>Key phrases:</strong><br>
<em>"I prioritised the highest-impact tasks first"</em><br>
<em>"I communicated proactively with [stakeholder] so there were no surprises"</em><br>
<em>"I shipped a working 80% solution on time and iterated after"</em><br><br>
<div class="q-tip">💡 In DS, delivering a working 80% solution on time is often better than a perfect solution late. Show you understand this trade-off.</div>`
    },
    {
      icon: '📚', diff: 'med',
      q: 'Tell me about a time you learned a new skill quickly to complete a project.',
      a: `<strong>This is gold for freshers and juniors</strong> — it demonstrates learning agility, which is critical in DS.<br><br>
<strong>What to include:</strong><ul>
<li>What skill you needed and why</li>
<li>How you approached learning it fast (structured plan)</li>
<li>What resources you used</li>
<li>How you applied it</li>
<li>The outcome</li>
</ul>
<strong>Example structure:</strong><br>
<em>"For [project], I realised I needed to learn [Spark / dbt / Airflow / PyTorch] which I had not used before. I had [X days]. I [completed a specific course, read the official documentation, built a small practice project]. Within [timeframe], I was able to [apply it to the real project]. The final result was [outcome]."</em><br><br>
<div class="q-tip">💡 Continuous learning is the job in DS. Showing you pick up new skills fast is a major differentiator.</div>`
    },
    {
      icon: '💡', diff: 'med',
      q: 'Tell me about your most impactful data science project.',
      a: `<strong>Prepare 2–3 projects to discuss in depth before every interview.</strong><br><br>
<strong>Cover these points:</strong><ul>
<li><strong>Business problem:</strong> What question were you answering?</li>
<li><strong>Data:</strong> Where did it come from? How large? What challenges?</li>
<li><strong>Approach:</strong> What techniques / models and why?</li>
<li><strong>Results:</strong> Quantified business impact</li>
<li><strong>What you would do differently:</strong> Shows growth mindset</li>
</ul>
<strong>For freshers:</strong> Academic projects, Kaggle competitions, personal projects, freelance work — all count!<br><br>
<div class="q-tip">💡 Always tie the project to a business outcome. "Improved AUC-ROC by 15%" is good. "Reduced customer churn by 15%, saving $500K annually" is great.</div>`
    },
  ],

  /* ─────────────── MOCK INTERVIEW ─────────────── */
  mock: [
    {
      icon: '🎭', diff: 'hard',
      q: 'MOCK Q1: You have 1 million rows of user clickstream data. How would you build a churn prediction model?',
      a: `<strong>This is a system design + ML question. Think out loud and show your process!</strong><br><br>
<strong>Step 1 — Clarify the problem:</strong><ul>
<li>How is churn defined? (30 days inactive? Cancelled subscription?)</li>
<li>What is the prediction horizon? (Churn in next 7 / 30 / 90 days?)</li>
<li>What action will the business take with the predictions?</li>
</ul>
<strong>Step 2 — Build the dataset:</strong><ul>
<li>Label: users who churned vs did not</li>
<li>Features: session frequency, recency, purchase history, engagement score</li>
</ul>
<strong>Step 3 — Model selection:</strong><ul>
<li>Start with Logistic Regression (baseline), then XGBoost / LightGBM</li>
<li>Handle class imbalance: SMOTE or <code>class_weight='balanced'</code></li>
</ul>
<strong>Step 4 — Evaluation:</strong><ul>
<li>AUC-ROC, Precision-Recall curve (important for imbalanced classes)</li>
<li>Business metric: cost of false positives vs false negatives?</li>
</ul>
<strong>Step 5 — Deployment:</strong><ul>
<li>Batch predictions daily, trigger retention campaigns automatically</li>
<li>Monitor model drift over time</li>
</ul>
<div class="q-tip">💡 In mock interviews, thinking out loud matters as much as the answer itself. Show your reasoning clearly.</div>`
    },
    {
      icon: '🎭', diff: 'hard',
      q: 'MOCK Q2: An A/B test shows a 5% improvement in conversion. Is this result statistically significant?',
      a: `<strong>Walk through the full statistical analysis:</strong><br><br>
<strong>Questions to ask first:</strong><ul>
<li>What is the sample size in each group?</li>
<li>What is the baseline conversion rate?</li>
<li>How long did the test run?</li>
<li>What significance threshold are we using (α = 0.05)?</li>
</ul>
<strong>Analysis approach:</strong><ul>
<li>Run a <strong>two-proportion z-test</strong></li>
<li>If p-value &lt; 0.05 → statistically significant</li>
<li>Calculate a <strong>confidence interval</strong> for the difference</li>
<li>Check <strong>statistical power</strong> — was the sample large enough?</li>
</ul>
<strong>Business layer:</strong><ul>
<li>Statistical significance ≠ practical significance</li>
<li>Is a 5% lift worth the engineering cost?</li>
<li>Watch for novelty effect and multiple testing problem</li>
</ul>
<div class="q-tip">💡 "Check the data pipeline first" and questioning whether the test was designed correctly immediately signals seniority.</div>`
    },
    {
      icon: '🎭', diff: 'med',
      q: 'MOCK Q3: Walk me through how you would approach an EDA on a new dataset.',
      a: `<strong>Show a systematic, repeatable approach:</strong><br><br>
<strong>1. Understand the shape:</strong><br>
<code>df.shape, df.dtypes, df.head()</code><br><br>
<strong>2. Data quality checks:</strong><br>
<code>df.isnull().sum(), df.duplicated().sum()</code><ul>
<li>Missing values — pattern or random?</li>
<li>Duplicates — should they exist?</li>
</ul>
<strong>3. Univariate analysis:</strong><br>
<code>df.describe()</code><ul>
<li>Histograms and boxplots for each variable</li>
<li>Identify outliers using IQR or Z-score</li>
</ul>
<strong>4. Bivariate / multivariate analysis:</strong><ul>
<li>Correlation: <code>df.corr()</code> and heatmap</li>
<li>Target variable relationships: groupby, scatterplots</li>
</ul>
<strong>5. Business sanity checks:</strong><ul>
<li>Do the numbers make sense?</li>
<li>Are there impossible values?</li>
</ul>
<div class="q-tip">💡 Saying "EDA is iterative — you discover new questions as you explore" shows real hands-on experience.</div>`
    },
    {
      icon: '🎭', diff: 'hard',
      q: 'MOCK Q4: Our dashboard shows sales dropped 20% last week. How do you investigate this?',
      a: `<strong>Break this down systematically — do NOT jump to analysis immediately.</strong><br><br>
<strong>Step 1 — Verify the data first:</strong><ul>
<li>Is the drop real or a data pipeline / tracking issue?</li>
<li>Did the ETL run correctly? Did a data source change?</li>
</ul>
<strong>Step 2 — Characterise the drop:</strong><ul>
<li>Is it across all regions / products or specific ones?</li>
<li>Is it a specific customer segment?</li>
<li>When exactly did it start?</li>
</ul>
<strong>Step 3 — Generate hypotheses:</strong><ul>
<li><strong>External:</strong> Holiday, competitor promotion, news event?</li>
<li><strong>Internal:</strong> Price change, feature change, marketing spend cut?</li>
<li><strong>Technical:</strong> Website outage, checkout bug, tracking issue?</li>
</ul>
<strong>Step 4 — Test each hypothesis with data<br>
Step 5 — Present findings with clear recommendations</strong><br><br>
<div class="q-tip">💡 Saying "check the data pipeline first" immediately signals experience. Most candidates jump straight to analysis without validating the data.</div>`
    },
  ],

  /* ─────────────── GENERAL TIPS ─────────────── */
  gen: [
    {
      icon: '⭐', diff: 'easy',
      q: 'Top 10 Tips for Data Science Job Search in Canada',
      a: `<ol style="margin-left:16px;">
<li style="margin-bottom:8px;"><strong>Tailor every resume</strong> — Use keywords from the job posting. ATS systems filter automatically before a human sees your resume.</li>
<li style="margin-bottom:8px;"><strong>Build a GitHub portfolio</strong> — 3–5 strong projects with clean READMEs. Include datasets, notebooks, and visualised results.</li>
<li style="margin-bottom:8px;"><strong>Network on LinkedIn</strong> — Connect with DS professionals in Canada, comment on posts, join Canadian tech groups.</li>
<li style="margin-bottom:8px;"><strong>Apply to 5+ jobs per week</strong> — Volume matters. Track everything in this app so nothing slips through.</li>
<li style="margin-bottom:8px;"><strong>Customise cover letters</strong> — One specific paragraph about why THIS company sets you apart immediately.</li>
<li style="margin-bottom:8px;"><strong>Practice SQL daily</strong> — LeetCode, StrataScratch, Mode Analytics. SQL appears in 90% of DS interviews.</li>
<li style="margin-bottom:8px;"><strong>Target Canadian companies</strong> — Shopify, Wealthsimple, Cohere, RBC, TD, TELUS, Intact, Loblaw Digital, Bell.</li>
<li style="margin-bottom:8px;"><strong>Use referrals</strong> — A referral increases interview chances by 5–10x. Reach out to LinkedIn connections.</li>
<li style="margin-bottom:8px;"><strong>Follow up</strong> — Send a polite follow-up email 1 week after applying if you have not heard back.</li>
<li style="margin-bottom:8px;"><strong>Be patient but persistent</strong> — Average DS job search in Canada: 3–6 months. Consistency beats intensity.</li>
</ol>
<div class="q-tip">💡 The #1 mistake: applying to 100 jobs with a generic resume. Apply to 30 jobs with tailored resumes instead.</div>`
    },
    {
      icon: '🛠️', diff: 'easy',
      q: 'Essential Skills & Tools for Data Science in Canada (2025)',
      a: `<strong>Must-have (non-negotiable):</strong><ul>
<li>🐍 <strong>Python</strong> — Pandas, NumPy, Scikit-learn, Matplotlib / Seaborn</li>
<li>🗄️ <strong>SQL</strong> — Joins, window functions, CTEs, aggregations</li>
<li>📊 <strong>Data Visualisation</strong> — Tableau, Power BI, or Plotly / Looker</li>
<li>📈 <strong>Statistics</strong> — Distributions, hypothesis testing, regression</li>
</ul>
<strong>High-value additions:</strong><ul>
<li>☁️ <strong>Cloud</strong> — AWS (most common in Canada), Azure, GCP</li>
<li>⚙️ <strong>Data Engineering</strong> — dbt, Spark, Airflow, Kafka</li>
<li>🤖 <strong>ML Frameworks</strong> — PyTorch, TensorFlow, XGBoost, LightGBM</li>
<li>🏔️ <strong>Data Warehouses</strong> — Snowflake, BigQuery, Redshift</li>
<li>📦 <strong>MLOps</strong> — MLflow, Docker, Git, CI/CD</li>
</ul>
<strong>Very hot in 2025:</strong><ul>
<li>LLMs and Generative AI experience</li>
<li>Vector databases (Pinecone, Weaviate)</li>
<li>RAG pipelines and prompt engineering</li>
</ul>
<div class="q-tip">💡 Do not try to learn everything at once. Master Python + SQL + one cloud platform + one viz tool first. Then add specialisations.</div>`
    },
    {
      icon: '📝', diff: 'easy',
      q: 'How to write a strong DS resume for Canada',
      a: `<strong>Resume essentials for Canada:</strong><ul>
<li><strong>1–2 pages max</strong> — 1 page for under 5 years experience</li>
<li><strong>Skills section prominent</strong> — Put Python, SQL, and tools at the top</li>
<li><strong>Quantify everything</strong> — "Improved model accuracy by 15%" not "built a model"</li>
<li><strong>Project section</strong> — 2–4 projects with GitHub links</li>
<li><strong>ATS-friendly format</strong> — Simple layout, no tables or columns in the digital version</li>
<li><strong>No photo or date of birth</strong> — Canadian norms differ from other countries</li>
</ul>
<strong>Bullet point formula:</strong><br>
<em>Action verb + What you did + Technology used + Quantified result</em><br><br>
<strong>Example:</strong><br>
❌ "Built a machine learning model for customer churn"<br>
✅ "Developed an XGBoost churn prediction model using Python and Scikit-learn achieving 87% AUC-ROC, reducing churn by 12% and saving $500K annually"<br><br>
<div class="q-tip">💡 Use Jobscan.co to compare your resume against each job posting's ATS score before submitting.</div>`
    },
    {
      icon: '🌐', diff: 'med',
      q: 'How to prepare for a remote DS job interview',
      a: `<strong>Technical setup:</strong><ul>
<li>Test your camera, microphone, and internet 30 minutes before</li>
<li>Have a mobile hotspot as backup</li>
<li>Clean, well-lit background</li>
<li>Close all unnecessary apps — screen sharing is very common</li>
</ul>
<strong>For live coding rounds:</strong><ul>
<li>Practice on CoderPad, HackerRank, or LeetCode in timed mode</li>
<li>Think out loud — remote interviewers cannot see your body language</li>
<li>Have a local Python + SQL environment ready</li>
</ul>
<strong>For case studies / take-homes:</strong><ul>
<li>Document your thought process clearly in Jupyter notebooks</li>
<li>Always include EDA before modelling</li>
<li>State your assumptions explicitly</li>
<li>Submit before the deadline — always</li>
</ul>
<strong>After the interview:</strong><ul>
<li>Send a thank-you email within 24 hours</li>
<li>Reference something specific from the conversation</li>
</ul>
<div class="q-tip">💡 Remote interviews mean global competition. Being extra prepared is your key differentiator.</div>`
    },
    {
      icon: '🍁', diff: 'easy',
      q: 'Top Canadian Companies Hiring DS Freshers & Juniors in 2025',
      a: `<strong>Tech / Fintech:</strong><ul>
<li><strong>Shopify</strong> — Canada's largest tech company, strong data culture</li>
<li><strong>Wealthsimple</strong> — Fintech, excellent for analytics roles</li>
<li><strong>Cohere</strong> — AI/NLP, cutting-edge research environment</li>
<li><strong>Hootsuite, Lightspeed, Ritual, Thinkific</strong> — SaaS companies with junior programmes</li>
</ul>
<strong>Banking / Financial Services:</strong><ul>
<li><strong>RBC, TD, BMO, Scotiabank, CIBC</strong> — All have structured new-grad and rotational programmes</li>
<li><strong>Intact Financial, Manulife, Sun Life</strong> — Insurance analytics, strong hiring</li>
</ul>
<strong>Telecom:</strong><ul>
<li><strong>TELUS, Bell, Rogers</strong> — Large DS teams, structured onboarding</li>
</ul>
<strong>Retail / Consumer:</strong><ul>
<li><strong>Loblaw Digital, Canadian Tire, Sobeys</strong></li>
</ul>
<strong>How to find graduate programmes:</strong><ul>
<li>Search "[Company] new grad data science 2025" on LinkedIn</li>
<li>Check company career pages directly every 2 weeks</li>
<li>Follow company LinkedIn pages and turn on notifications</li>
</ul>
<div class="q-tip">💡 Canadian banks have the most structured new-grad DS programmes. If you want stability, mentorship, and benefits — start there.</div>`
    },
  ],
};

/* ── RENDER QUESTIONS ── */
let currentRound = 'tech';

function setRound(round, el) {
  currentRound = round;
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderQuestions(round);
}

function renderQuestions(round) {
  const panel = $('questionsPanel');
  if (!panel) return;

  const qs = QUESTIONS[round] || [];

  panel.innerHTML = qs.map((q, i) => `
    <div class="q-card">
      <div class="q-head" onclick="toggleQ('qb_${round}_${i}', 'qa_${round}_${i}')">
        <span class="q-icon">${q.icon}</span>
        <span class="q-text">${q.q}</span>
        <span class="q-diff diff-${q.diff}">${q.diff}</span>
        <span class="q-arrow" id="qa_${round}_${i}">▼</span>
      </div>
      <div class="q-body" id="qb_${round}_${i}">
        <div class="q-inner">${q.a}</div>
      </div>
    </div>`).join('');
}

function toggleQ(bodyId, arrId) {
  const body = $(bodyId);
  const arr  = $(arrId);
  if (!body) return;
  const open = body.classList.toggle('open');
  if (arr) arr.classList.toggle('open', open);
}
