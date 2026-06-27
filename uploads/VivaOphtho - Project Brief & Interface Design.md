# 👁️ VivaOphtho — Project Brief & Interface Design

*One document merging the project strategy with a full interface/UX design for the web app, plus a behavioral-design layer. Working product name is **VivaOphtho** (you may remember it as "OphthaViva"). Market figures are June-2026 research ranges — re-verify before acting. Brand/trademark for "VivaOphtho" still pending.*

> **Three parts:** **Part 1** = project strategy · **Part 2** = interface/UX design · **Part 3** = engagement & habit design, applying Nir Eyal's **Hooked** Hook-Model — adapted to an exam-cycle *flow* business and kept strictly inside the product's confident-not-hype, Facilitator-not-Dealer ethics.

---

# PART 1 — Project at a Glance

### What it is
A **single-purpose web app of branching, examiner-style clinical cases** for ophthalmology residents preparing for any **English-language viva / oral / clinical exam** — EBO, FRCOphth, ICO clinical / FRCS Glasgow, ABO oral. One job: *"learning through cases."* **Not** a Qbank, **not** the German app translated. Its own brand and front door, spun out of the EBO thread once it was clear a German app can't reach a 25-country English market.

### Positioning — the wedge
Incumbents (OphthoQuestions, BoardVitals, StatPearls, AAO) are **MCQ engines**; their oral/viva offering is an afterthought. VivaOphtho is *only* viva cases, at examiner depth — the thing candidates buy **in addition to** a Qbank, not instead of it.
- Segmentation variable = **the exam's language**, not the country.
- The **viva is the common denominator** across EBO / FRCOphth / ICO / ABO — one format serves many exams.
- Moat = **format + execution depth**, not invention (OphthoQuestions already has an AI oral sim).

### The three make-or-break items
1. **Depth of the single case** — the 8-step progressive-reveal format *is* the product.
2. **Volume credibility** — a few dozen *complete* cases across subspecialties at launch, not five.
3. **Discovery** — free cases on the open web, SEO'd to "EBO / FRCOphth / ICO viva practice," are the entire top of funnel.

### Market (re-verify)
- **TAM (standing pool):** ~15,000–25,000 trainees in English-exam systems.
- **SAM (annual flow):** ~**5,000/yr** actually sit an English viva-style exam (ICO ~2.5k + FRCOphth ~1k + EBO ~0.5k + ABO oral ~0.5k + others ~0.5k).
- **Flow business, not MRR** — each candidate buys ~once per exam cycle; LTV ≈ one purchase. Model as **annual paying customers**.

### Pricing
| Access | High-income | PPP markets (India, Africa, SE Asia) |
|---|---|---|
| 6-month pass | €179 | ~€79–99 |
| 12-month pass | **€249** (test €199–299) | ~€99–129 |

Price **above** a cheap impulse buy (cheap signals "not serious"), **below** loaded incumbents (~$315–350/yr). Blended effective price ≈ **€175**. PPP tiering is essential.

### Revenue (annual flow ~5,000/yr, @ €175 blended)
| Penetration | Customers/yr | Revenue |
|---|---|---|
| 1% (optimistic Y1) | 50 | ~€8,800 |
| 5% (strong traction) | 250 | ~€43,800 |
| 10% (significant player) | 500 | ~€87,500 |
| 15% (category leadership) | 750 | ~€131,000 |

Gated entirely by **distribution**, not content.

### Sequencing
German core → validation first → **free English-cases probe** → build VivaOphtho only if the probe shows demand arrives. (Red ocean; a second go-to-market for a solo author.)

> Full strategy notes: `13b — VivaOphtho`, `13a — EBO Module & European Pricing` (Obsidian vault).

---

# PART 2 — Interface Design

## 2.1 Design principles (each maps to a product truth)

| Principle | Why (product truth) |
|---|---|
| **The case is the hero.** The Case Player gets the most design love and the calmest, most focused screen in the app. | "Value = how good *one* case is." Static Q→A wouldn't justify the price. |
| **Lead with readiness, not ranking.** The primary number everywhere is a personal **exam-readiness %**. | Leaderboards churn the stressed bottom of a one-shot-exam cohort. |
| **Mastered > done.** Every progress surface leads with *mastered* (passed a *delayed* re-test), not completion. | A click-through "mastered" number is vanity; rigorous = effective. |
| **Confident, not hype.** Calm, clinical, examiner-grade. Reassure a stressed final-year. | "Welcome back, Dr. {name} — {n} cases to exam-ready," not pep-rally. |
| **Exam-cycle framing.** Time-to-exam and blueprint coverage are always visible. | Flow business; people buy for a date, not forever. |
| **Free front door.** Public cases are first-class screens, not stripped demos. | Free cases are the entire top of funnel + the demand probe. |
| **Multi-exam, blueprint-aware.** Exam context (EBO/FRCOphth/ICO/ABO) reshapes labels, blueprint, and cohorts everywhere. | One format serves many exams with different blueprints. |

---

## 2.2 Visual language

- **Mood:** premium clinical. The "serious tool," not a colourful edtech toy. Generous whitespace, quiet confidence.
- **Color**
  - *Ink* `#0E1726` (near-black slate) — primary text & dark surfaces.
  - *Paper* `#F7F8FA` light / `#0B1220` dark — backgrounds (dark mode is default-able for long sessions).
  - *Accent — clinical teal* `#0FB5A6` — readiness, progress, primary actions. One confident accent, used sparingly.
  - *Mastery gold* `#C9A227` — reserved **only** for the *mastered* state, so it reads as earned.
  - *Semantic:* correct `#1FA971`, partial `#E0A100`, gap `#E5534B` — used in debrief/scoring only.
- **Typography**
  - **Case stems & examiner prompts:** a refined serif (e.g. *Source Serif / Newsreader*) — gives the examiner voice gravitas and visually separates "the exam" from "the UI."
  - **UI / data / labels:** a clean grotesk (e.g. *Inter*) — dashboards, nav, stats.
- **Motif:** subtle concentric iris/retina arcs as a quiet brand mark and as the **readiness ring**. Never decorative clutter.
- **Motion:** restrained. Progressive reveal uses a calm fade/slide; correct/partial scoring animates gently. No confetti — competence, not carnival.

---

## 2.3 Information architecture & navigation

**Persistent top bar (authenticated):**
`[VivaOphtho mark]  Dashboard · Cases · Practice · Progress` … right side: **Exam context pill** → `EBO · 47 days · 78% ready` · avatar.

The **exam context pill** is the spine of the app — clicking it switches exam target (EBO ↔ FRCOphth ↔ ICO ↔ ABO) and sets the exam date that drives the countdown and blueprint everywhere.

**Primary sections**
1. **Dashboard** — readiness, what to do next.
2. **Cases** — browse/library by subspecialty & blueprint.
3. **Practice** — the AI oral sim (separate workstream; flagged "Beta").
4. **Progress** — mastery, retention, blueprint coverage, outcomes.
5. **Account** — exam target, pass, PPP region, settings.

Mobile: same five as a bottom tab bar; the context pill collapses into the header.

---

## 2.4 Screen-by-screen

### ① Public landing + free case (the funnel)
- **Hero:** one confident line — *"Practise the viva, not just the MCQs."* Sub: *"Examiner-style ophthalmology cases for EBO, FRCOphth, ICO and ABO orals."* Single CTA: **Try a free case** (no signup wall first).
- **Free case runs the *real* Case Player**, fully, ungated — this is the product, not a teaser. At the natural end (step 8 debrief), a calm inline prompt: *"3 more free cases →"* then *"Track your readiness — create an account."*
- **SEO surfaces:** each free case is a public, indexable URL (`/cases/ebo/retina/branch-retinal-vein-occlusion`) titled to match search intent ("EBO viva practice case — BRVO"). A "Cases by exam" directory page for crawlers.
- **Proof strip (when real):** outcome claim — *"Candidates who reached 80%+ mastery passed at X%"* — built from day-one instrumentation.

### ② Onboarding (≤ 4 steps, skippable)
1. **Which exam?** EBO · FRCOphth · ICO clinical · ABO oral (cards). Sets the blueprint and labels.
2. **When?** Exam date → drives the countdown ("47 days") and pacing.
3. **Training year** → used only to **cohort** stats later (never to rank against seniors).
4. **Region** → quietly sets PPP pricing band.
End on the Dashboard, not a paywall. First case is free.

### ③ Dashboard / Home (calm, one decision)
- **Greeting (confident tone):** *"Welcome back, Dr. Lang — 22 cases to exam-ready."*
- **Hero: Readiness ring** (the iris motif) — big **78% ready across the EBO blueprint**. Underneath, the two metrics, *mastered* leading: **Mastered 34 · Attempted 61**.
- **Primary CTA — "Continue / Next case":** one recommended case chosen by the spaced-retrieval engine (a due re-test or the weakest blueprint gap). The app makes the decision so a stressed user doesn't have to.
- **Blueprint coverage strip:** horizontal bars per subspecialty (Cornea, Retina, Glaucoma, Neuro, Paeds, Oculoplastics, Cataract/Refractive, Uveitis) coloured by mastery — instantly shows the weakest area.
- **Due for retention:** "5 cases due for re-test today" (the mechanism behind *mastered*).
- **Countdown** ties it together: *"47 days · on track for 90% by exam"* (or "behind pace" honestly).
- No leaderboard here.

> **⚓ Hook (Part 3):** the readiness ring is *stored value* + *endowed-progress* framing; **"Continue / Next case"** is the one-tap *Action* (B = M×A×T — zero choosing); **"5 cases due for re-test"** is the *internal-trigger loader* that pulls the user back tomorrow. The countdown is *real* scarcity (their actual exam date), never a fake timer.

### ④ Cases — library / browse
- **Filter rail:** Subspecialty · Difficulty · Blueprint topic · Status (New / In progress / Mastered / Due).
- **Case card:** title, subspecialty tag, est. time, an 8-dot **step meter**, and a status chip. *Mastered* cards carry the gold ring.
- **"Exam blueprint" view toggle:** instead of a flat list, show the official blueprint tree with your coverage mapped onto it — reinforces "is there enough, and am I covering what's examined?" (volume-credibility + readiness).

### ⑤ Case Player — **the hero screen** (8-step progressive reveal)
The whole app exists to make this feel like sitting across from an examiner. Maximum focus, minimum chrome.

**Layout**
- **Left rail — step spine (8 nodes):** vertical, showing where you are (e.g. *Presentation → History → Examination → Differential → Investigations → Interpretation → Management → Curveball*). Past steps collapse to a one-line summary you can re-open.
- **Center — the exchange:** examiner prompt in **serif**, one question at a time. Below it, the answer field. The screen never shows the next step until you commit — that withholding *is* the viva.
- **Answer modes (per step):**
  - *Free-text* ("type your answer as you'd say it") — the default; mirrors speaking.
  - *Structured pick* for differentials/investigations where a list is the honest format.
  - *Voice* (Practice/AI mode) — speak the answer.
- **Reveal:** after the user commits, the **model answer** slides in beneath theirs, side-by-side, in examiner voice — what a strong candidate would say, the *why*, and the red flags. A **self-score** (Got it / Partial / Missed) or AI-score feeds mastery.
- **Branching:** the next examiner prompt adapts to the answer/score — escalate on strength, probe the gap on weakness. Branch points are invisible to the user; it just feels responsive.
- **Top bar (minimal):** case title, step `4/8`, a quiet **exit-saves-progress** affordance, and a focus/zen toggle that hides everything but the exchange.

**Debrief (step 8 → end)** — see ⑥.

> Design rule: nothing on this screen competes with the examiner's question. No nav, no stats, no upsell mid-case.

> **⚓ Hook (Part 3):** the case *is* the **variable reward** — *Hunt* ("what will the examiner probe next?" via invisible branching = **infinite variability**) fused with *Self* (mastery/competence). This is the engine of the loop; it must always pay out **real clinical value**, never a hollow dopamine pull. The withheld next step is the variability — uncertainty the brain prefers to certainty, used honestly.

### ⑥ Case debrief / scoring
- **Per-step scorecard:** the 8 steps listed with Got it / Partial / Missed, each expandable to your answer vs the model answer.
- **One headline takeaway** (the single thing to remember), not a wall of text.
- **Mastery state honestly shown:** *"Attempted — re-test in 3 days to master."* A case only flips to **Mastered** (gold) after a correct **delayed** re-test, never on first pass.
- **Add to retention queue** automatically; "next case" suggestion continues the flow.
- **Outcome instrumentation** runs invisibly here (feeds the pass-rate marketing claim later).

> **⚓ Hook (Part 3):** the self-score and any case note are the **Investment** — small user effort that *loads the next trigger* (the re-test due date) and, via the **IKEA effect**, builds a readiness map the user owns (rising switching cost). Mastery flipping to gold only after a *delayed* re-test keeps it **stored value**, not a vanity number.

### ⑦ Progress & mastery
- **Lead metric: mastered**, then attempted, then readiness %.
- **Retention curve:** a calm line of mastery over time + "due today" — makes the spaced-retrieval mechanic legible.
- **Blueprint heatmap:** subspecialty × topic grid coloured by mastery; the weakest cells are the to-do list.
- **Percentile — secondary, opt-in, guarded:** hidden until the cohort N is meaningful; always cohorted by **exam + training year**; framed as *"top X% of EBO final-years"*, never a raw global ladder. Off by default.
- **Readiness forecast:** "at current pace, ~88% by exam day" — honest, including "behind pace."

### ⑧ Practice — AI oral sim (separate workstream, "Beta")
- A **timed, spoken** examiner session: voice in, examiner voice out, branching live, scored at the end. Deliberately walled off as Beta because clinical-accuracy review and reliable free-text/voice scoring are hard, and health-advertising (HWG-style) constraints apply.
- Same visual language as the Case Player, but **session-framed** (timer, "examiner is thinking", end-of-session report) to feel like the real exam.

### ⑨ Pricing / paywall
- Triggered **after** value is felt (after the free cases), never up front.
- Two cards: **6-month** and **12-month pass** (the 12-month framed as best value for a full cycle). **Auto-detected PPP region** shows local pricing inline ("Pricing for India").
- Copy reframes cost against stakes: *"You already pay €600 to sit the exam."* Confident, not discounty.
- No fake countdown timers — the tone is "serious tool," and the real countdown (their exam date) is honest enough.

### ⑩ Account / settings
- **Exam target & date** (re-runs blueprint), **PPP region**, theme (dark default for study), notifications (retention reminders — opt-in, gentle), voice settings, data/outcome consent.

---

## 2.5 Component system (reusable)
- **Readiness ring** (iris motif) — used on dashboard, progress, and the context pill (mini).
- **Step meter** (8 dots) — on every case card and the Case Player rail.
- **Examiner bubble** (serif) vs **Your answer** (sans) — the core conversational primitive.
- **Score chip** — Got it / Partial / Missed (semantic colours, debrief only).
- **Mastery badge** — gold ring, *earned* state only.
- **Blueprint bar / heatmap cell** — coverage at two densities.
- **Exam context pill** — the navigational spine.

---

## 2.6 Mobile & responsive
- Residents study in transit → **mobile is first-class**, not an afterthought.
- Case Player on mobile: full-screen single-column exchange; step spine collapses to a top progress bar; answer field docks above the keyboard; reveal pushes up as a sheet.
- Bottom tab bar (Dashboard / Cases / Practice / Progress / Account); context pill in the header.
- Voice (Practice mode) is especially natural on mobile.

---

## 2.7 Tone & microcopy rules
- Address as **"Dr. {name}."** Competence-based motivation; never slogans or exclamation-mark hype.
- Honesty over flattery: show "behind pace" when true; "Attempted, not yet mastered" without sugar-coating.
- Empty states teach: a fresh dashboard reads *"Start with one case — we'll build your readiness map from how you do."*
- Accessibility: WCAG AA contrast (the clinical palette already favours it), full keyboard nav in the Case Player, captions/transcripts in Practice mode, respects reduced-motion.

---

## 2.8 Design-to-build: the MVP cut
To honour the sequencing (free probe before full build), the **first thing to ship is just ⑤ + ⑥ + ① on the open web** — a handful of complete, beautiful, SEO'd free cases running the *real* Case Player, with the lightest possible account layer. Dashboard, Progress, Practice/AI sim, and the paywall come **only if the probe shows non-DACH demand arrives.** Design everything else around that case engine so nothing is wasted if the probe says "go."

**Build order**
1. Case Player + debrief (the product) → 5–8 free cases live & indexed.
2. Light auth + readiness ring + dashboard (turn visitors into tracked users).
3. Progress/mastery + retention queue (make *mastered* real).
4. Pricing/PPP paywall + outcome instrumentation.
5. Practice / AI oral sim (Beta, separately scoped & budgeted).

---

# PART 3 — Engagement & Habit Design (the Hook Model)

*Applies Nir Eyal's **Hooked** (Trigger → Action → Variable Reward → Investment) to VivaOphtho. Source: `Hooked_Complete_Research.md`. The second file (`Hooked_Exhaustive_Extraction_Framework.md`) is a research-capture template, used here as a lens, not transcribed.*

> **The one reframe that governs everything below.** VivaOphtho is a **flow business** — a candidate buys ~once per exam cycle; LTV ≈ one purchase. So we are **not** optimizing for lifetime retention or minutes-in-app. We are building a **prep-window habit** (weeks–months) whose payoff is **completion → mastery → exam pass → referral**. The Hook loop serves *getting the candidate ready and through the exam*, after which we *want* them to leave. Growth for a flow business = **referrals + renew-on-fail + the provable pass-rate claim**, not engagement metrics. Every hook below is bent to that goal and kept inside the product's existing "confident-not-hype, no-dark-patterns" stance.

## 3.1 The Hook loop, mapped to VivaOphtho

| Phase | Generic Hooked | VivaOphtho instantiation | Lives on |
|---|---|---|---|
| **Internal trigger** | Habits driven by uncomfortable emotion: anxiety, fear, professional insecurity, desire for mastery | *"I feel behind on viva prep"* · *"my exam is in 6 weeks"* · *"I have surgery tomorrow"* · *"10 min before clinic"* · *"I need to feel ready"* | First-to-mind goal: **exam anxiety → open VivaOphtho** |
| **External trigger** | Push/email/reminders | Spaced-retrieval **"due today"** reminder (real, not bait); weekly readiness-review email; honest pace nudge ("behind pace for 90%") | Dashboard ③, email, Account ⑩ |
| **Action** (B = M×A×T) | Smallest action toward reward; cut friction | **"Continue / Next case"** — one tap, app pre-picks the case, resume exactly where left. No choosing for a stressed user. | Dashboard ③, Case Player ⑤ |
| **Variable reward** | Brain prefers uncertainty; Tribe / Hunt / Self | **Hunt** = "what will the examiner probe next?" (invisible branching = *infinite variability*) · **Self** = mastery/competence · **Tribe** = relocated to *post-pass* referral, not in-app ranking | Case Player ⑤, Daily case |
| **Investment** | User effort that loads the next trigger; IKEA effect | Self-scores, case notes, flag-weak-topic, the **readiness map you build**, the retention queue you fill | Debrief ⑥, Progress ⑦ |

## 3.2 Where each hook lives (screen map)

| Screen | Hook mechanic |
|---|---|
| ① Public free case | **Consistency / foot-in-door** (first tiny commitment); the free case *is* the variable reward, ungated, to seed demand |
| ② Onboarding | **Endowed progress** — a 5-case diagnostic seeds the readiness map so the user starts at *"12% along,"* never 0% (2/10 beats 0/8) |
| ③ Dashboard | **Trigger loader** (due-today), **Action** (one-tap continue), **stored value** (readiness ring), **framing** ("78% ready" not "42 left") |
| ④ Cases library | **Stored value** + **IKEA** (your coverage mapped onto the blueprint), **infinite variability** (library never "finished") |
| ⑤ Case Player | The **variable reward engine** — Hunt + Self, infinite variability via branching |
| ⑥ Debrief | **Investment** (self-score, notes) loads the **next trigger** (re-test date); mastery = earned **stored value** |
| ⑦ Progress | **Stored value / switching cost**; **anchoring** (outcome claim); percentile kept opt-in & cohorted |
| ⑨ Pricing | **Anchoring** ("you already pay €600 to sit"), **real scarcity** (exam date, founding cohort) — never fake timers |

## 3.3 Cognitive principles, applied (and bounded)

- **Endowed progress** — diagnostic seeds a non-zero readiness map; greeting frames remaining work as *"22 cases to exam-ready,"* the 8-dot step meter shows momentum mid-case.
- **Framing** — always progress-framed: *"78% ready"* over *"42 cases left."*
- **Anchoring** — the outcome claim (*"80%+ mastery → passed at X%"*) and target ("top quartile of EBO finalists") anchor effort — **only with real data**.
- **IKEA effect** — the readiness map, notes and collections are *built by the user* → ownership → rising switching cost.
- **Consistency** — escalating commitments: free case → account → first self-score → daily case → purchase → pass.
- **Scarcity — REAL only** — the daily challenge genuinely expires at midnight; founding-cohort access genuinely capped; the **exam date is the ultimate honest scarcity.** No fabricated countdowns (the project explicitly bans fake urgency).
- **Stored value / switching cost** — readiness score, mastery, blueprint heatmap, notes all accrue: leaving = losing your map.
- **Infinite variability** — branching cases + a growing library mean the product is never "done," sustaining the prep-window habit without a Qbank's volume.

## 3.4 Where Hooked conflicts with our stance — and how we resolve it

*This is the important part: the textbook Hooked move is sometimes wrong for a high-stakes, one-shot, flow product. Resolutions:*

| Hooked impulse | Our constraint | Resolution |
|---|---|---|
| Tribe rewards / leaderboards | One-shot-exam anxiety churns the bottom of any ranking | Primary metric stays **personal readiness**; percentile **opt-in, cohorted by exam+year**; move "tribe" to **post-pass referral/testimonial** |
| Streaks (loss-framed) | Confident-not-hype; user is already anxious | Use **"study days this week,"** forgiving and competence-framed; **never** a punishing broken-streak red |
| Variable-reward dopamine | "No gambling mechanics" (project) | Every reward delivers **real clinical value** (a genuine pearl), never a hollow slot-pull |
| Maximize time-in-app / infinite scroll | Medical seriousness + *Indistractable* ethics | Optimize for **mastery achieved**, not minutes; show **"you're done for today"** and let them leave ready |
| Retention / MRR optimization | **Flow business** (buy once per cycle) | Optimize the loop for **completion + pass within the cycle**; growth = referrals + renew-on-fail, not lifetime engagement |
| Notification volume | "No meaningless notifications" | Fire **only** on genuine spaced-retrieval due-dates or real pace risk; user controls cadence |

## 3.5 Ethical guardrails — Facilitator, not Dealer

- **The two-question test (must stay "yes"):** (1) Would the author use this themselves? (2) Does it *materially* improve the candidate's pass odds? If either turns "no," cut the feature.
- **Adopt the project's "Features to Avoid" verbatim:** no gambling mechanics, no meaningless notifications, no fake urgency, no dark patterns, no value-less infinite scroll.
- **Indistractable principle:** the ethical product *solves* the internal discomfort (exam anxiety) rather than exploiting it — **every session should leave the user measurably more ready and calmer.** That is the line between persuasion and manipulation here.

## 3.6 Adapted feature backlog (from the Hooked "Foveal" list, tuned for VivaOphtho's exam-cycle flow)

Each tagged with the hook phase it serves; all pass the Facilitator test.

1. **Continue / Next case** (one-tap resume) — *Action.*
2. **Daily challenge case** (real, expires at midnight) — *Trigger + Variable reward + real scarcity.*
3. **Readiness map from a 5-case diagnostic** — *Endowed progress + Investment + IKEA.*
4. **Spaced-retrieval "due today" queue** + honest reminders — *Trigger + Stored value.*
5. **Weakness / blueprint heatmap** — *Self reward + stored value.*
6. **Weekly readiness review** (email + in-app, competence-framed) — *external Trigger.*
7. **"Before clinic / before surgery" 10-min case mode** — *situational internal trigger.*
8. **Notes / flag-weak / collections on cases** — *Investment + IKEA.*
9. **Post-pass referral & testimonial capture** — *Tribe reward relocated; the flow-business growth engine.*
10. **Hidden clinical pearls / image-of-the-day** — *Hunt variable reward, always real value.*

**Explicitly avoid:** streak-shaming, fake timers, a vanity "mastered" number, any ranking that isn't opt-in & cohorted.

## 3.7 Habit testing & metrics (Hooked §15)

- **Study the power users:** identify candidates who reach 80%+ mastery and pass, **codify their path** (which cases, what cadence), then make that the **default recommended path** for new users.
- **North-star = mastery-to-exam completion within the cycle + pass rate** — explicitly **not** minutes-in-app (which would betray the ethics and mislead a flow business).
- Instrument the loop end-to-end (already in the brief): the same data **proves the outcome claim** *and* audits whether we're a Facilitator.

---

## Open design questions
- [ ] Exact 8-step labels per exam — do EBO/FRCOphth/ICO/ABO want different step names?
- [ ] First-pass scoring: self-score vs AI-score for the *free* web cases (cost vs trust).
- [ ] How much of the blueprint heatmap to expose pre-purchase (proof vs giving it away).
- [ ] Voice scoring reliability bar before Practice mode leaves Beta.
- [ ] Confirm brand mark / iris motif against the pending "VivaOphtho" trademark check.
- [ ] Daily challenge case: real expiry vs always-available — does a genuine midnight reset help or just stress a time-poor resident?
- [ ] Streak mechanic: ship a forgiving "study days this week" or skip streaks entirely for an anxious one-shot cohort?
- [ ] When is cohort N large enough to switch percentile on without it being noise (or harm)?
