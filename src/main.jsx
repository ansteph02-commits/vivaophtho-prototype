import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import heroProduct from "../assets/hero-product.png";

const steps = [
  ["Presentation", "You are shown a 62-year-old patient with sudden painless blurring in one eye. Fundus shows sectoral haemorrhages and macular oedema. Present the case to the examiner.", "This is a unilateral retinal vascular occlusive picture, most consistent with branch retinal vein occlusion, complicated by macular oedema.", "A strong opening names the likely diagnosis, localises it, and states the sight-threatening issue. Mention unilateral sectoral intraretinal haemorrhages, venous tortuosity and macular oedema, then frame the case as BRVO until proven otherwise."],
  ["History", "What history would you take, and which systemic risks matter most?", "I would ask about onset, visual symptoms, diabetes, hypertension, hyperlipidaemia, smoking, glaucoma, thrombosis history and medications.", "Prioritise vascular risk factors: hypertension, diabetes, hyperlipidaemia and smoking. Ask about previous vascular events, glaucoma, hypercoagulable history in younger patients, medication history and symptoms suggesting alternative diagnoses."],
  ["Examination", "Talk through the ocular examination you would perform in clinic.", "I would check visual acuity, pupils, IOP, slit-lamp, gonioscopy if needed, dilated fundus exam and OCT assessment of the macula.", "Cover visual acuity, pupils, intraocular pressure, anterior segment, lens status and a careful dilated fundus exam. Look for macular oedema, ischaemia, neovascularisation, vitreous haemorrhage and signs of glaucoma or hypertensive retinopathy."],
  ["Differential", "What is your differential, and what would make you reconsider BRVO?", "Differentials include diabetic retinopathy, ocular ischaemic syndrome, hypertensive retinopathy, CRVO variant, retinal vasculitis and masquerade causes.", "The key alternatives are diabetic retinopathy, hypertensive retinopathy, ocular ischaemic syndrome, retinal vasculitis and central retinal vein occlusion. Bilaterality, widespread haemorrhages, severe pain or prominent inflammation should make you pause."],
  ["Investigations", "Which investigations do you request, and why?", "OCT for macular oedema, fundus photography, fluorescein angiography for ischaemia or neovascular risk, and systemic checks via the GP.", "OCT confirms and monitors macular oedema. Fundus photography documents baseline. Fluorescein angiography helps when ischaemia, non-perfusion or neovascularisation is suspected. Systemic work-up usually targets blood pressure, HbA1c and lipids."],
  ["Interpretation", "OCT confirms centre-involving macular oedema. Visual acuity is 6/18. How do you interpret this?", "This is visually significant macular oedema secondary to BRVO, and treatment is indicated rather than observation alone.", "Centre-involving macular oedema with reduced vision is the main treatable cause of visual loss in BRVO. Link the OCT finding to the patient's acuity, then discuss treatment rather than describing the scan in isolation."],
  ["Management", "How would you manage the patient?", "I would offer intravitreal anti-VEGF, monitor OCT and vision, treat neovascularisation if present, and address systemic vascular risks.", "First-line treatment for visually significant macular oedema is intravitreal anti-VEGF with OCT-guided follow-up. Laser may be relevant for neovascular complications. Management also includes risk factor control and clear safety-netting."],
  ["Curveball", "Three months later, the patient develops neovascularisation elsewhere. What changes?", "I would treat retinal ischaemia-driven neovascularisation with sectoral panretinal photocoagulation and continue monitoring for vitreous haemorrhage or macular oedema.", "Neovascularisation shifts the priority to ischaemic complication control. Treat with sectoral retinal laser to areas of non-perfusion, monitor for vitreous haemorrhage and neovascular glaucoma, and continue separate macular oedema management if needed."]
].map(([label, prompt, sample, model]) => ({ label, prompt, sample, model }));

const examTargets = {
  "ebo-spring-2027": { label: "EBO Spring", date: "2027-05-14" },
  "ebo-autumn-2027": { label: "EBO Autumn", date: "2027-10-01" },
  "frcophth-rawalpindi-2026": { label: "FRCOphth Oral", date: "2026-09-29" },
  "frcophth-bangalore-2026": { label: "FRCOphth Oral", date: "2026-10-22" },
  "frcophth-swansea-2026": { label: "FRCOphth Oral", date: "2026-11-09" },
  "of-september-2026": { label: "OF / ICO-style", date: "2026-09-30" },
  "abo-pending": { label: "ABO Oral Board", date: "" }
};

const blueprint = [
  ["Cornea", "72%", "8 mastered · 11 cases"],
  ["Retina", "64%", "9 mastered · 14 cases"],
  ["Glaucoma", "58%", "6 mastered · 10 cases"],
  ["Neuro-ophth", "41%", "4 mastered · 9 cases"],
  ["Paediatrics", "36%", "3 mastered · 8 cases"],
  ["Oculoplastics", "50%", "5 mastered · 9 cases"],
  ["Cataract / Refr.", "80%", "8 mastered · 10 cases"],
  ["Uveitis", "45%", "4 mastered · 8 cases"]
];

function getCountdown(targetKey, now = new Date()) {
  const target = examTargets[targetKey] || examTargets["ebo-spring-2027"];
  if (!target.date) return { label: `${target.label} · date pending`, days: "--", hours: "--", minutes: "--", status: "Pending" };
  const ms = new Date(`${target.date}T09:00:00`) - now;
  const days = Math.max(0, Math.floor(ms / 86400000));
  const hours = Math.max(0, Math.floor(ms / 3600000) % 24);
  const minutes = Math.max(0, Math.floor(ms / 60000) % 60);
  return {
    label: ms >= 0 ? `${target.label} · ${days} ${days === 1 ? "day" : "days"}` : `${target.label} · date passed`,
    days: ms >= 0 ? String(days) : "0",
    hours: ms >= 0 ? String(hours).padStart(2, "0") : "00",
    minutes: ms >= 0 ? String(minutes).padStart(2, "0") : "00",
    status: ms >= 0 ? "Live" : "Passed"
  };
}

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => window.localStorage.getItem(key) || fallback);
  useEffect(() => window.localStorage.setItem(key, value), [key, value]);
  return [value, setValue];
}

function App() {
  const [examKey, setExamKey] = useStoredState("vivaophtho-exam", "ebo-spring-2027");
  const [now, setNow] = useState(() => new Date());
  const countdown = useMemo(() => getCountdown(examKey, now), [examKey, now]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <Header countdown={countdown.label} />
      <main id="top">
        <Hero />
        <TrustStrip />
        <Positioning />
        <Principles />
        <CasePlayer countdown={countdown.label} />
        <CaseLibrary />
        <NotifySection countdown={countdown} examKey={examKey} onExamChange={setExamKey} />
        <MasterySection />
        <BlueprintSection />
        <PricingSection />
        <FollowSection />
      </main>
    </>
  );
}

function Header({ countdown }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="VivaOphtho home"><span className="brand-mark" aria-hidden="true" /><span>VivaOphtho</span></a>
      <nav aria-label="Primary navigation">
        <a href="#free-case">Free case</a><a href="#cases">Cases</a><a href="#notify">Notify me</a><a href="#pricing">Pricing</a>
      </nav>
      <a className="header-pill" href="#notify">{countdown}</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <img className="hero-image" src={heroProduct} alt="" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">Clinical cases for oral ophthalmology exams</p>
        <h1 id="hero-title">Practise the viva, not just the MCQs.</h1>
        <p className="hero-copy">Examiner-style branching cases for EBO, FRCOphth, ICO clinical and ABO orals. One focused product for learning through cases.</p>
        <div className="hero-actions"><a className="button primary" href="#free-case">Try a free case</a><a className="button ghost" href="#cases">Browse the case library</a></div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Product focus">
      <div><strong>8-step reveal</strong><span>Presentation to curveball</span></div>
      <div><strong>Mastered, not done</strong><span>Delayed re-test earns gold</span></div>
      <div><strong>Blueprint-aware</strong><span>EBO · FRCOphth · ICO · ABO</span></div>
    </section>
  );
}

function Positioning() {
  return (
    <section className="section intro-grid" aria-label="What VivaOphtho does">
      <div><p className="eyebrow">Not another question bank</p><h2>Your Qbank teaches recognition. The viva tests reasoning, out loud.</h2></div>
      <p>Incumbents are MCQ engines; their oral offering is usually an afterthought. VivaOphtho is only viva cases, at examiner depth: commit to an answer, reveal the model response, self-score honestly, and let the next prompt probe your gaps.</p>
    </section>
  );
}

function Principles() {
  const cards = [
    ["01", "Depth over volume", "The 8-step progressive reveal is the product. A static question and answer would not justify a serious exam-prep habit."],
    ["02", "Invisible branching", "The case escalates when you are strong and probes the gap when you are weak. It should feel like an examiner, not a worksheet."],
    ["03", "Blueprint-aware", "Your exam target shapes the labels, countdown, coverage and future retention plan across EBO, FRCOphth, ICO-style and ABO orals."]
  ];
  return <section className="section principle-section" aria-label="Product principles">{cards.map(([num, title, body]) => <article className="principle-card" key={num}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}</section>;
}

function CasePlayer({ countdown }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(steps.length).fill(""));
  const [scores, setScores] = useState(Array(steps.length).fill(""));
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);
  const step = steps[index];
  const revealed = Boolean(answers[index]);
  const complete = scores.every(Boolean);

  function commitAnswer(event) {
    event.preventDefault();
    const nextAnswers = [...answers];
    nextAnswers[index] = draft.trim() || "I would structure my answer around diagnosis, threats to sight and immediate management priorities.";
    setAnswers(nextAnswers);
  }

  function scoreStep(score) {
    const nextScores = [...scores];
    nextScores[index] = score;
    setScores(nextScores);
    if (index < steps.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setDraft(answers[nextIndex] || "");
    }
  }

  return (
    <section className={focused ? "app-shell focus-mode" : "app-shell"} id="free-case" aria-labelledby="case-title">
      <div className="app-topbar">
        <a className="brand app-brand" href="#top"><span className="brand-mark" aria-hidden="true" /><span>VivaOphtho</span></a>
        <div className="app-tabs" role="tablist" aria-label="App sections"><button className="tab active" type="button">Dashboard</button><button className="tab" type="button">Cases</button><button className="tab" type="button">Practice</button><button className="tab" type="button">Progress</button></div>
        <button className="exam-pill" type="button">{countdown}</button>
      </div>
      <div className="case-layout">
        <aside className="case-rail" aria-label="Case steps">
          <p className="rail-label">Free case</p>
          <ol>{steps.map((item, itemIndex) => <li className={`${itemIndex === index ? "active" : ""} ${itemIndex < index || scores[itemIndex] ? "done" : ""}`} key={item.label}>{item.label}</li>)}</ol>
        </aside>
        <article className="case-panel" aria-live="polite">
          <div className="case-header"><div><p className="eyebrow">EBO viva practice case · Retina</p><h2 id="case-title">Branch retinal vein occlusion</h2></div><button className="zen-toggle" type="button" onClick={() => setFocused(!focused)}>{focused ? "Exit focus" : "Focus"}</button></div>
          <div className="mobile-meter" aria-hidden="true">{steps.map((item, itemIndex) => <span className={`${itemIndex === index ? "active" : ""} ${itemIndex < index || scores[itemIndex] ? "done" : ""}`} key={item.label} />)}</div>
          <div className="exchange"><div className="bubble examiner">{complete ? "Thank you. Let us finish with your debrief and retention plan." : step.prompt}</div>{answers[index] && !complete ? <div className="bubble user-answer">{answers[index]}</div> : null}</div>
          {!revealed && !complete ? (
            <form className="answer-area" onSubmit={commitAnswer}>
              <label htmlFor="answerInput">Your answer</label>
              <textarea id="answerInput" rows="5" placeholder="Type your answer as you would say it to the examiner." value={draft} onChange={(event) => setDraft(event.target.value)} />
              <div className="answer-actions"><button className="button primary" type="submit">Commit answer</button><button className="button muted" type="button" onClick={() => setDraft(step.sample)}>Use sample answer</button></div>
            </form>
          ) : null}
          {revealed && !complete ? (
            <div className="reveal">
              <div className="model-answer"><p className="eyebrow">Model answer</p><p>{step.model}</p></div>
              <div className="score-row" aria-label="Self-score">{["Got it", "Partial", "Missed"].map((score) => <button className={`score ${scoreClass(score)}`} type="button" onClick={() => scoreStep(score)} key={score}>{score}</button>)}</div>
            </div>
          ) : null}
          {complete ? <Debrief scores={scores} /> : null}
        </article>
      </div>
    </section>
  );
}

function Debrief({ scores }) {
  return (
    <section className="debrief">
      <p className="eyebrow">Debrief</p><h3>Attempted, not yet mastered.</h3>
      <p>Your answers have been added to the retention queue. This case can turn gold after a correct delayed re-test in 3 days.</p>
      <div className="takeaway"><strong>Single thing to remember</strong><span>In BRVO, always connect macular oedema, neovascular risk and systemic vascular risk factor control.</span></div>
      <div className="scorecard">{steps.map((step, index) => <div className="scorecard-row" key={step.label}><span>{index + 1}. {step.label}</span><span className={`score-chip ${scoreClass(scores[index])}`}>{scores[index]}</span></div>)}</div>
      <a className="button primary" href="#pricing">Track readiness</a>
    </section>
  );
}

function scoreClass(score) {
  if (score === "Got it") return "got";
  if (score === "Partial") return "partial";
  return "missed";
}

function CaseLibrary() {
  const cases = [
    ["Retina", "Free", "Branch retinal vein occlusion", "EBO viva practice · 12 min · 8 steps", ""],
    ["Glaucoma", "Free soon", "Normal tension glaucoma", "FRCOphth viva practice · 14 min · 8 steps", ""],
    ["Cornea", "Mastered", "Microbial keratitis", "ICO clinical practice · 15 min · 8 steps", "mastered"]
  ];
  return <section className="section cases-section" id="cases" aria-labelledby="cases-title"><div className="section-heading"><p className="eyebrow">Case library</p><h2 id="cases-title">A public front door that feels like the paid product.</h2></div><div className="case-cards">{cases.map(([tag, status, title, meta, className]) => <article className={`case-card ${className}`} key={title}><div className="case-card-head"><span>{tag}</span><strong>{status}</strong></div><h3>{title}</h3><p>{meta}</p><div className="dots" aria-hidden="true" /></article>)}</div></section>;
}

function NotifySection({ countdown, examKey, onExamChange }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("No spam. Just launch updates and new free cases.");
  function submit(event) {
    event.preventDefault();
    const target = examTargets[examKey] || examTargets["ebo-spring-2027"];
    window.localStorage.setItem("vivaophtho-notify", JSON.stringify({ email, exam: examKey, savedAt: new Date().toISOString() }));
    setMessage(`Saved locally for this prototype. We will notify ${email} when ${target.label} cases are ready.`);
    setEmail("");
  }
  return (
    <section className="section notify-section" id="notify" aria-labelledby="notify-title">
      <div className="notify-copy"><p className="eyebrow">Under construction</p><h2 id="notify-title">VivaOphtho is being built case by case.</h2><p>Choose your exam target and we will count down to your date, then tell you the moment the first free examiner-style cases are ready.</p><div className="countdown-panel" aria-label="Countdown to selected exam"><p>Counting down to exam day</p><div className="countdown-grid"><div><strong>{countdown.days}</strong><span>Days</span></div><div><strong>{countdown.hours}</strong><span>Hours</span></div><div><strong>{countdown.minutes}</strong><span>Mins</span></div><div><strong>{countdown.status}</strong><span>Status</span></div></div></div></div>
      <form className="notify-form" onSubmit={submit}>
        <label htmlFor="examSelect">Exam target</label>
        <select id="examSelect" name="exam" value={examKey} onChange={(event) => onExamChange(event.target.value)}>{Object.entries(examTargets).map(([key, target]) => <option value={key} key={key}>{target.date ? `${target.label} · ${formatExamDate(target.date)}` : `${target.label} · date pending`}</option>)}</select>
        <label htmlFor="emailInput">Email</label>
        <div className="email-row"><input id="emailInput" name="email" type="email" autoComplete="email" placeholder="doctor@example.com" required value={email} onChange={(event) => setEmail(event.target.value)} /><button className="button primary" type="submit">Notify me</button></div>
        <p className="form-note">{message}</p>
      </form>
    </section>
  );
}

function formatExamDate(date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function MasterySection() {
  return <section className="section mastery-section" aria-labelledby="mastery-title"><div className="gold-ring" aria-hidden="true"><span /></div><div><p className="eyebrow gold">Mastery gold</p><h2 id="mastery-title">Gold is earned, never clicked.</h2><p>One colour is reserved for one state. A case turns gold only after you pass a delayed re-test, so progress means retained reasoning, not a click-through you will have forgotten by exam day.</p></div></section>;
}

function BlueprintSection() {
  return <section className="section blueprint-section" aria-labelledby="blueprint-title"><div className="section-heading"><p className="eyebrow">Blueprint coverage</p><h2 id="blueprint-title">Coverage across the exam map.</h2><p>The final app will turn your weakest blueprint cells into the next thing to practise, so the choice burden stays low when exam pressure is high.</p></div><div className="blueprint-grid">{blueprint.map(([name, fill, label]) => <article style={{ "--fill": fill }} key={name}><h3>{name}</h3><div><span /></div><p>{label}</p></article>)}</div></section>;
}

function PricingSection() {
  return <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title"><div className="section-heading"><p className="eyebrow">After value is felt</p><h2 id="pricing-title">Pricing that matches the exam cycle.</h2></div><div className="pricing-grid"><article className="price-card"><h3>6-month pass</h3><p className="price">€179</p><p>For candidates already inside the final preparation window.</p></article><article className="price-card featured"><h3>12-month pass</h3><p className="price">€249</p><p>For a full cycle of cases, re-tests, blueprint coverage and readiness tracking.</p></article></div></section>;
}

function FollowSection() {
  return <section className="section follow-section" aria-labelledby="follow-title"><p className="eyebrow">Follow along</p><h2 id="follow-title">We are publishing complete cases free.</h2><p>New examiner-style cases will be shared as the library grows. Follow for the free ones, and join the waitlist to get the full app with tracking and delayed re-testing at launch.</p><div className="social-row" aria-label="Social links placeholders"><a href="#notify">Instagram</a><a href="#notify">X / Twitter</a><a href="#notify">LinkedIn</a></div></section>;
}

createRoot(document.getElementById("root")).render(<App />);
