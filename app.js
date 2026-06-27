const steps = [
  {
    label: "Presentation",
    prompt:
      "You are shown a 62-year-old patient with sudden painless blurring in one eye. Fundus shows sectoral haemorrhages and macular oedema. Present the case to the examiner.",
    sample:
      "This is a unilateral retinal vascular occlusive picture, most consistent with branch retinal vein occlusion, complicated by macular oedema.",
    model:
      "A strong opening names the likely diagnosis, localises it, and states the sight-threatening issue. Mention unilateral sectoral intraretinal haemorrhages, venous tortuosity and macular oedema, then frame the case as BRVO until proven otherwise."
  },
  {
    label: "History",
    prompt:
      "What history would you take, and which systemic risks matter most?",
    sample:
      "I would ask about onset, visual symptoms, diabetes, hypertension, hyperlipidaemia, smoking, glaucoma, thrombosis history and medications.",
    model:
      "Prioritise vascular risk factors: hypertension, diabetes, hyperlipidaemia and smoking. Ask about previous vascular events, glaucoma, hypercoagulable history in younger patients, medication history and symptoms suggesting alternative diagnoses."
  },
  {
    label: "Examination",
    prompt:
      "Talk through the ocular examination you would perform in clinic.",
    sample:
      "I would check visual acuity, pupils, IOP, slit-lamp, gonioscopy if needed, dilated fundus exam and OCT assessment of the macula.",
    model:
      "Cover visual acuity, pupils, intraocular pressure, anterior segment, lens status and a careful dilated fundus exam. Look for macular oedema, ischaemia, neovascularisation, vitreous haemorrhage and signs of glaucoma or hypertensive retinopathy."
  },
  {
    label: "Differential",
    prompt:
      "What is your differential, and what would make you reconsider BRVO?",
    sample:
      "Differentials include diabetic retinopathy, ocular ischaemic syndrome, hypertensive retinopathy, CRVO variant, retinal vasculitis and masquerade causes.",
    model:
      "The key alternatives are diabetic retinopathy, hypertensive retinopathy, ocular ischaemic syndrome, retinal vasculitis and central retinal vein occlusion. Bilaterality, widespread haemorrhages, severe pain or prominent inflammation should make you pause."
  },
  {
    label: "Investigations",
    prompt:
      "Which investigations do you request, and why?",
    sample:
      "OCT for macular oedema, fundus photography, fluorescein angiography for ischaemia or neovascular risk, and systemic checks via the GP.",
    model:
      "OCT confirms and monitors macular oedema. Fundus photography documents baseline. Fluorescein angiography helps when ischaemia, non-perfusion or neovascularisation is suspected. Systemic work-up usually targets blood pressure, HbA1c and lipids."
  },
  {
    label: "Interpretation",
    prompt:
      "OCT confirms centre-involving macular oedema. Visual acuity is 6/18. How do you interpret this?",
    sample:
      "This is visually significant macular oedema secondary to BRVO, and treatment is indicated rather than observation alone.",
    model:
      "Centre-involving macular oedema with reduced vision is the main treatable cause of visual loss in BRVO. Link the OCT finding to the patient's acuity, then discuss treatment rather than describing the scan in isolation."
  },
  {
    label: "Management",
    prompt:
      "How would you manage the patient?",
    sample:
      "I would offer intravitreal anti-VEGF, monitor OCT and vision, treat neovascularisation if present, and address systemic vascular risks.",
    model:
      "First-line treatment for visually significant macular oedema is intravitreal anti-VEGF with OCT-guided follow-up. Laser may be relevant for neovascular complications. Management also includes risk factor control and clear safety-netting."
  },
  {
    label: "Curveball",
    prompt:
      "Three months later, the patient develops neovascularisation elsewhere. What changes?",
    sample:
      "I would treat retinal ischaemia-driven neovascularisation with sectoral panretinal photocoagulation and continue monitoring for vitreous haemorrhage or macular oedema.",
    model:
      "Neovascularisation shifts the priority to ischaemic complication control. Treat with sectoral retinal laser to areas of non-perfusion, monitor for vitreous haemorrhage and neovascular glaucoma, and continue separate macular oedema management if needed."
  }
];

const examTargets = {
  "ebo-spring-2027": {
    label: "EBO Spring",
    date: "2027-05-14",
    source: "EBO"
  },
  "ebo-autumn-2027": {
    label: "EBO Autumn",
    date: "2027-10-01",
    source: "EBO"
  },
  "frcophth-rawalpindi-2026": {
    label: "FRCOphth Oral",
    date: "2026-09-29",
    source: "RCOphth"
  },
  "frcophth-bangalore-2026": {
    label: "FRCOphth Oral",
    date: "2026-10-22",
    source: "RCOphth"
  },
  "frcophth-swansea-2026": {
    label: "FRCOphth Oral",
    date: "2026-11-09",
    source: "RCOphth"
  },
  "of-september-2026": {
    label: "OF / ICO-style",
    date: "2026-09-30",
    source: "Ophthalmology Foundation"
  },
  "abo-pending": {
    label: "ABO Oral Board",
    date: "",
    source: "ABO"
  }
};

const state = {
  index: 0,
  answers: Array(steps.length).fill(""),
  scores: Array(steps.length).fill("")
};

const stepRail = document.querySelector("#stepRail");
const mobileMeter = document.querySelector("#mobileMeter");
const exchange = document.querySelector("#caseExchange");
const form = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const revealPanel = document.querySelector("#revealPanel");
const modelAnswer = document.querySelector("#modelAnswer");
const sampleAnswer = document.querySelector("#sampleAnswer");
const debrief = document.querySelector("#debrief");
const scorecard = document.querySelector("#scorecard");
const zenToggle = document.querySelector("#zenToggle");
const examSelect = document.querySelector("#examSelect");
const notifyForm = document.querySelector("#notifyForm");
const emailInput = document.querySelector("#emailInput");
const notifyMessage = document.querySelector("#notifyMessage");
const countdownLabels = document.querySelectorAll(".exam-countdown");
const countDays = document.querySelector("#countDays");
const countHours = document.querySelector("#countHours");
const countMinutes = document.querySelector("#countMinutes");
const countStatus = document.querySelector("#countStatus");

function initChrome() {
  stepRail.innerHTML = steps
    .map((step) => `<li>${step.label}</li>`)
    .join("");

  mobileMeter.innerHTML = steps.map(() => "<span></span>").join("");

  document.querySelectorAll(".dots").forEach((dots) => {
    dots.setAttribute("aria-label", "8-step case meter");
  });

  const savedExam = window.localStorage.getItem("vivaophtho-exam");
  if (savedExam && examTargets[savedExam]) {
    examSelect.value = savedExam;
  }

  updateCountdown();
}

function renderStep() {
  const step = steps[state.index];
  const previousAnswer = state.answers[state.index];

  document.querySelectorAll("#stepRail li").forEach((item, idx) => {
    item.classList.toggle("active", idx === state.index);
    item.classList.toggle("done", idx < state.index || Boolean(state.scores[idx]));
  });

  document.querySelectorAll("#mobileMeter span").forEach((item, idx) => {
    item.classList.toggle("active", idx === state.index);
    item.classList.toggle("done", idx < state.index || Boolean(state.scores[idx]));
  });

  exchange.innerHTML = `
    <div class="bubble examiner">${step.prompt}</div>
    ${previousAnswer ? `<div class="bubble user-answer">${escapeHtml(previousAnswer)}</div>` : ""}
  `;

  answerInput.value = previousAnswer;
  modelAnswer.textContent = step.model;
  revealPanel.classList.toggle("hidden", !state.scores[state.index]);
  form.classList.toggle("hidden", Boolean(state.scores[state.index]));
  debrief.classList.add("hidden");
}

function commitAnswer(answer) {
  state.answers[state.index] = answer.trim() || "I would structure my answer around diagnosis, threats to sight and immediate management priorities.";
  renderStep();
  revealPanel.classList.remove("hidden");
  form.classList.add("hidden");
}

function scoreCurrent(score) {
  state.scores[state.index] = score;

  if (state.index < steps.length - 1) {
    state.index += 1;
    renderStep();
    window.setTimeout(() => {
      document.querySelector("#free-case").scrollIntoView({ block: "start" });
    }, 20);
    return;
  }

  renderDebrief();
}

function renderDebrief() {
  revealPanel.classList.add("hidden");
  form.classList.add("hidden");
  exchange.innerHTML = `
    <div class="bubble examiner">Thank you. Let us finish with your debrief and retention plan.</div>
  `;

  scorecard.innerHTML = steps
    .map((step, idx) => {
      const score = state.scores[idx] || "Missed";
      const chipClass = score === "Got it" ? "got" : score === "Partial" ? "partial" : "missed";
      return `
        <div class="scorecard-row">
          <span>${idx + 1}. ${step.label}</span>
          <span class="score-chip ${chipClass}">${score}</span>
        </div>
      `;
    })
    .join("");

  debrief.classList.remove("hidden");
  debrief.scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateCountdown() {
  const target = examTargets[examSelect.value] || examTargets["ebo-spring-2027"];
  let text = `${target.label} · date pending`;
  let daysText = "--";
  let hoursText = "--";
  let minutesText = "--";
  let statusText = "Pending";

  if (target.date) {
    const now = new Date();
    const examDate = new Date(`${target.date}T09:00:00`);
    const ms = examDate - now;
    const days = Math.max(0, Math.floor(ms / 86400000));
    const hours = Math.max(0, Math.floor(ms / 3600000) % 24);
    const minutes = Math.max(0, Math.floor(ms / 60000) % 60);
    const dayLabel = days === 1 ? "day" : "days";
    text = ms >= 0 ? `${target.label} · ${days} ${dayLabel}` : `${target.label} · date passed`;
    daysText = ms >= 0 ? String(days) : "0";
    hoursText = ms >= 0 ? String(hours).padStart(2, "0") : "00";
    minutesText = ms >= 0 ? String(minutes).padStart(2, "0") : "00";
    statusText = ms >= 0 ? "Live" : "Passed";
  }

  countdownLabels.forEach((label) => {
    label.textContent = text;
  });

  if (countDays) countDays.textContent = daysText;
  if (countHours) countHours.textContent = hoursText;
  if (countMinutes) countMinutes.textContent = minutesText;
  if (countStatus) countStatus.textContent = statusText;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  commitAnswer(answerInput.value);
});

sampleAnswer.addEventListener("click", () => {
  answerInput.value = steps[state.index].sample;
  answerInput.focus();
});

document.querySelectorAll(".score").forEach((button) => {
  button.addEventListener("click", () => {
    scoreCurrent(button.dataset.score);
  });
});

zenToggle.addEventListener("click", () => {
  document.body.classList.toggle("focus-mode");
  zenToggle.textContent = document.body.classList.contains("focus-mode") ? "Exit focus" : "Focus";
});

examSelect.addEventListener("change", () => {
  window.localStorage.setItem("vivaophtho-exam", examSelect.value);
  updateCountdown();
});

notifyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const target = examTargets[examSelect.value] || examTargets["ebo-spring-2027"];

  window.localStorage.setItem(
    "vivaophtho-notify",
    JSON.stringify({ email, exam: examSelect.value, savedAt: new Date().toISOString() })
  );

  notifyMessage.textContent = `Saved locally for this prototype. We will notify ${email} when ${target.label} cases are ready.`;
  notifyForm.reset();
  examSelect.value = window.localStorage.getItem("vivaophtho-exam") || "ebo-spring-2027";
  updateCountdown();
});

initChrome();
renderStep();
window.setInterval(updateCountdown, 60000);
