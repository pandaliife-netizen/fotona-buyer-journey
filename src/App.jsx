import { useState, useEffect } from "react";

const RED = "#E8192C";
const RED_DIM = "rgba(232,25,44,0.12)";
const RED_BORDER = "rgba(232,25,44,0.35)";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F2F0ED";
const BLACK = "#0A0A0A";
const DARK = "#111111";
const MID = "rgba(255,255,255,0.55)";
const FAINT = "rgba(255,255,255,0.05)";
const BORDER = "rgba(255,255,255,0.12)";

const DEVICES = {
  timewalker: {
    name: "Fotona TimeWalker® Fotona4D® Pro",
    tagline: "Next-Generation Aesthetic Laser Technology",
    badge: "Flagship Aesthetic",
    treatments: ["Fotona4D® Full-Face Rejuvenation","SmoothEye®","SmoothLase®","SMOOTH® Skin Tightening","Fractional Resurfacing","Pigmentation & Vascular","Body Contouring"],
    description: "The TimeWalker® Fotona4D® Pro delivers dual-wavelength Er:YAG + Nd:YAG performance across four sequential treatment modes — the gold standard for comprehensive facial rejuvenation without injectables.",
    fits: ["Maximizes revenue per patient with multi-mode treatments","Differentiates your practice with exclusive Fotona4D® branding","Minimal consumables — strong ROI from day one"],
    priceRange: [500, 1400],
    paybackMonths: [10, 20],
  },
  spDynamis: {
    name: "Fotona SP Dynamis Max",
    tagline: "One Powerful Device, Unlimited Potential",
    badge: "New · Multi-Specialty",
    treatments: ["TightSculpting®","NightLase®","HairRestart®","Acne & Scar Treatment","Onychomycosis","Spider Vein Removal","StarFormer® Synergy"],
    description: "The SP Dynamis Max is Fotona's most versatile platform — combining Er:YAG and Nd:YAG in a single high-power chassis built for practices that want to expand across multiple specialties from one device.",
    fits: ["Single platform covers aesthetics, wellness, and medical indications","High-power output supports faster treatment protocols","Designed for growing practices adding new revenue streams quickly"],
    priceRange: [600, 1600],
    paybackMonths: [8, 18],
  },
  starwalker: {
    name: "Fotona StarWalker® MaQX",
    tagline: "Unmatched Q-Switched Pulse Energy",
    badge: "Pigment & Tattoo",
    treatments: ["Tattoo Removal","Pigment Lesion Treatment","QX MAX Skin Rejuvenation","Melasma","Birthmark Removal","PICO+ Fractional","Nail Fungus"],
    description: "The StarWalker® MaQX delivers the highest Q-switched pulse energy available — four operating modes including PICO+ that positions your practice at the forefront of pigment and laser tattoo removal.",
    fits: ["Command premium pricing for tattoo removal — consistently high demand","Multi-mode platform reduces per-treatment competition","Low consumable cost drives exceptional margin per session"],
    priceRange: [350, 900],
    paybackMonths: [12, 22],
  },
  starformer: {
    name: "Fotona StarFormer® Pro",
    tagline: "One Device, Multiple Solutions",
    badge: "Body · Muscle",
    treatments: ["MuscleSculpt®","Pelvic Floor Restoration","TeslaFormer® Synergy","Body Contouring","Post-Partum Recovery","Core Strengthening","Muscle Re-Education"],
    description: "The StarFormer® Pro harnesses functional magnetic stimulation to build and restore muscle — opening a cash-pay body contouring and wellness category that complements any laser aesthetic practice.",
    fits: ["Tap into a rapidly growing non-invasive body category","No consumables, no injectables — high-margin cash-pay revenue","Expands your practice to wellness and rehabilitation demographics"],
    priceRange: [400, 1000],
    paybackMonths: [10, 16],
  },
};

const TREATMENT_OPTIONS = [
  { label: "Fotona4D® Facial Rejuvenation", priceRange: [800, 1400] },
  { label: "SmoothEye® / Periorbital", priceRange: [400, 700] },
  { label: "Laser Skin Tightening", priceRange: [500, 1000] },
  { label: "Fractional Resurfacing", priceRange: [600, 1200] },
  { label: "TightSculpting® Body", priceRange: [700, 1400] },
  { label: "Tattoo / Pigment Removal", priceRange: [300, 800] },
  { label: "NightLase® Snore Reduction", priceRange: [400, 700] },
  { label: "HairRestart® Hair Restoration", priceRange: [500, 900] },
  { label: "Body Contouring / MuscleSculpt®", priceRange: [500, 1000] },
  { label: "Acne & Scar Treatment", priceRange: [300, 700] },
];

function recommend(sel) {
  const { practiceType, growthGoals = [], barriers = [], stage } = sel;
  const s = { timewalker:0, spDynamis:0, starwalker:0, starformer:0 };
  if (practiceType==="Med Spa") { s.timewalker+=3; s.spDynamis+=2; }
  if (practiceType==="Dermatology") { s.starwalker+=3; s.timewalker+=2; }
  if (practiceType==="Plastic Surgery") { s.timewalker+=3; s.spDynamis+=1; }
  if (practiceType==="Wellness / Anti-Aging") { s.starformer+=3; s.spDynamis+=2; }
  if (practiceType==="Multi-Specialty Aesthetic Practice") { s.spDynamis+=4; s.timewalker+=1; }
  growthGoals.forEach(g => {
    if (g==="Add new high-value treatments") { s.spDynamis+=2; s.timewalker+=2; }
    if (g==="Differentiate from competitors") { s.timewalker+=3; s.starwalker+=2; }
    if (g==="Increase patient volume") { s.spDynamis+=3; }
    if (g==="Expand premium offerings") { s.timewalker+=3; }
    if (g==="Improve revenue per patient") { s.timewalker+=3; s.starwalker+=2; }
  });
  barriers.forEach(b => {
    if (b==="Concerned about cost / ROI") { s.starformer+=2; s.spDynamis+=1; }
    if (b==="Need stronger treatment differentiation") { s.timewalker+=3; s.starwalker+=2; }
  });
  if (stage==="Early growth") { s.spDynamis+=2; s.starformer+=2; }
  if (stage==="Expanding services") { s.spDynamis+=3; s.timewalker+=1; }
  if (stage==="Established and optimizing") { s.timewalker+=3; s.starwalker+=2; }
  return DEVICES[Object.entries(s).sort((a,b)=>b[1]-a[1])[0][0]];
}

const TERRITORIES = {
  CA:"West — Sarah Chen", TX:"South Central — Marcus Webb", FL:"Southeast — Diana Ruiz",
  NY:"Northeast — Patrick O'Brien", IL:"Midwest — Kim Nakamura", WA:"Pacific NW — Tom Herrera",
  GA:"Southeast — Diana Ruiz", CO:"Mountain West — Sarah Chen", AZ:"Southwest — Marcus Webb",
  default:"National Accounts — Jeremy Alcott",
};
const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const STEPS = [
  { key:"practiceType", label:"Practice Type", subtitle:"What best describes your practice?", multi:false,
    opts:["Med Spa","Dermatology","Plastic Surgery","Wellness / Anti-Aging","Multi-Specialty Aesthetic Practice"] },
  { key:"growthGoals", label:"Growth Goals", subtitle:"Select all growth objectives that apply to your practice.", multi:true,
    opts:["Add new high-value treatments","Differentiate from competitors","Increase patient volume","Expand premium offerings","Improve revenue per patient"] },
  { key:"barriers", label:"Main Barriers", subtitle:"What's holding your practice back from investing? Select all that apply.", multi:true,
    opts:["Concerned about cost / ROI","Unsure which system fits best","Need stronger treatment differentiation","Need team confidence / adoption","Want proof before investing"] },
  { key:"stage", label:"Business Stage", subtitle:"Where is your practice today?", multi:false,
    opts:["Early growth","Expanding services","Established and optimizing"] },
  { key:"interest", label:"Interest Level", subtitle:"How would you characterize your decision timeline?", multi:false,
    opts:["Exploring options","Actively comparing systems","Ready to evaluate seriously"] },
];

const redBtn = (extra={}) => ({ background:RED, color:WHITE, border:"none", padding:"12px 28px", fontSize:11, letterSpacing:"0.16em", fontFamily:"'Helvetica Neue',Arial,sans-serif", textTransform:"uppercase", cursor:"pointer", fontWeight:600, ...extra });
const outlineBtn = (extra={}) => ({ background:"transparent", color:WHITE, border:`1px solid ${BORDER}`, padding:"12px 28px", fontSize:11, letterSpacing:"0.14em", fontFamily:"'Helvetica Neue',Arial,sans-serif", textTransform:"uppercase", cursor:"pointer", ...extra });
const eyebrow = { fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, letterSpacing:"0.35em", color:MID, textTransform:"uppercase", marginBottom:16 };

function PageHeader({ onReset }) {
  return (
    <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 48px", height:68, background:BLACK, borderBottom:`1px solid ${BORDER}`, position:"sticky", top:0, zIndex:100 }}>
      <div onClick={onReset} style={{ cursor:"pointer" }}>
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:18, fontWeight:700, color:WHITE, letterSpacing:"0.06em" }}>
          FOTONA<span style={{ color:RED }}>®</span>
        </div>
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:8, color:MID, letterSpacing:"0.22em", textTransform:"uppercase" }}>CHOOSE PERFECTION</div>
      </div>
      <div style={{ display:"flex", gap:28, fontSize:11, letterSpacing:"0.14em", color:MID, fontFamily:"'Helvetica Neue',Arial,sans-serif", textTransform:"uppercase" }}>
        {["Solutions","Resources","Events","Why Fotona®"].map(l=><span key={l} style={{ cursor:"pointer" }}>{l}</span>)}
      </div>
      <button style={redBtn()}>Book Free Demo</button>
    </nav>
  );
}

function SummaryPanel({ selections }) {
  return (
    <div style={{ background:FAINT, border:`1px solid ${BORDER}`, padding:"24px 20px", position:"sticky", top:88 }}>
      <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.3em", color:RED, textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>Your Selections</div>
      {STEPS.map(s => {
        const val = selections[s.key];
        const has = Array.isArray(val) ? val.length>0 : !!val;
        if (!has) return null;
        return (
          <div key={s.key} style={{ borderBottom:`1px solid ${BORDER}`, paddingBottom:12, marginBottom:12 }}>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:5 }}>{s.label}</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:12, color:OFF_WHITE, lineHeight:1.5 }}>
              {Array.isArray(val) ? val.join(" · ") : val}
            </div>
          </div>
        );
      })}
      {!STEPS.some(s=>{ const v=selections[s.key]; return Array.isArray(v)?v.length>0:!!v; }) && (
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:11, color:"rgba(255,255,255,0.22)", fontStyle:"italic" }}>Your answers will appear here.</div>
      )}
    </div>
  );
}

function Landing({ onStart }) {
  return (
    <div>
      <div style={{ background:BLACK, minHeight:"84vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 64px 72px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`, backgroundSize:"80px 80px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:"-2%", top:"5%", fontSize:"clamp(120px,18vw,260px)", fontFamily:"'Helvetica Neue',Arial,sans-serif", fontWeight:700, color:"rgba(255,255,255,0.025)", letterSpacing:"-0.04em", lineHeight:1, userSelect:"none" }}>FOTONA</div>
        <div style={{ position:"relative", zIndex:2, maxWidth:680 }}>
          <div style={eyebrow}>Solutions · Aesthetics</div>
          <h1 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:"clamp(52px,7vw,92px)", fontWeight:700, color:WHITE, lineHeight:0.93, letterSpacing:"-0.025em", margin:"0 0 28px", textTransform:"uppercase" }}>
            Medical<br />Innovation<br /><span style={{ color:RED }}>Is What</span><br />We Do.
          </h1>
          <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:15, color:MID, lineHeight:1.7, maxWidth:440, marginBottom:40 }}>
            Versatile devices designed for effective, minimally invasive aesthetic and dermatological treatments.
          </p>
          <div style={{ display:"flex", gap:14 }}>
            <button style={redBtn()}>Book Free Demo</button>
            <button style={outlineBtn()}>Browse Solutions</button>
          </div>
          <div style={{ display:"flex", gap:52, marginTop:52, paddingTop:36, borderTop:`1px solid ${BORDER}` }}>
            {[["10M+","Procedures Performed"],["300+","Patents"],["60K+","Customers Worldwide"]].map(([n,l])=>(
              <div key={l}>
                <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:28, fontWeight:700, color:WHITE, letterSpacing:"-0.02em" }}>{n}</div>
                <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:MID, letterSpacing:"0.15em", textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background:DARK, borderTop:`3px solid ${RED}`, padding:"60px 48px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto", alignItems:"center", gap:48 }}>
          <div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.35em", color:RED, textTransform:"uppercase", marginBottom:14, fontWeight:600 }}>Personalized Recommendation</div>
            <h2 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:30, fontWeight:700, color:WHITE, lineHeight:1.08, marginBottom:14, textTransform:"uppercase", letterSpacing:"-0.01em" }}>
              Find the Right System<br />for Your Practice
            </h2>
            <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:14, color:MID, lineHeight:1.7 }}>
              Answer five questions about your practice and goals. We'll match you with the Fotona system built for where you are — and where you're headed. Takes about 2 minutes.
            </p>
          </div>
          <div style={{ textAlign:"center", flexShrink:0 }}>
            <button onClick={onStart} style={redBtn({ padding:"15px 32px", fontSize:12, display:"block", marginBottom:10, whiteSpace:"nowrap" })}>
              Get My Recommendation →
            </button>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.22)" }}>No commitment required</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidedIntro({ onStart, onBack }) {
  return (
    <div style={{ maxWidth:600, margin:"0 auto", padding:"96px 48px", textAlign:"center" }}>
      <div style={eyebrow}>Practice Fit Assessment</div>
      <h1 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:40, fontWeight:700, color:WHITE, textTransform:"uppercase", letterSpacing:"-0.02em", lineHeight:1.05, marginBottom:20 }}>Your Practice.<br />Your System.</h1>
      <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:14, color:MID, lineHeight:1.8, marginBottom:48 }}>
        Answer five brief questions about your practice type, goals, and growth stage. We'll identify the Fotona system best suited for your situation and show you how the numbers could work.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:48 }}>
        {[["5","Questions"],["~2 min","Your time"],["1","Tailored match"]].map(([n,l])=>(
          <div key={l} style={{ padding:"20px 12px", border:`1px solid ${BORDER}`, background:FAINT }}>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:32, fontWeight:700, color:RED }}>{n}</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:MID, textTransform:"uppercase", letterSpacing:"0.15em", marginTop:6 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
        <button onClick={onBack} style={outlineBtn()}>← Back</button>
        <button onClick={onStart} style={redBtn({ padding:"14px 40px", fontSize:12 })}>Start Assessment →</button>
      </div>
    </div>
  );
}

function DiscoveryFlow({ selections, onSelect, onToggle, onNext, onBack, step }) {
  const cfg = STEPS[step];
  const val = selections[cfg.key];
  const hasSelection = cfg.multi ? (val && val.length > 0) : !!val;
  const isActive = (opt) => cfg.multi ? (val||[]).includes(opt) : val === opt;
  const pct = (step / STEPS.length) * 100;
  return (
    <div style={{ maxWidth:1040, margin:"0 auto", padding:"40px 48px" }}>
      <div style={{ height:2, background:BORDER, marginBottom:8 }}>
        <div style={{ height:"100%", width:`${pct}%`, background:RED, transition:"width 0.4s ease" }} />
      </div>
      <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:MID, textAlign:"right", marginBottom:36, letterSpacing:"0.1em" }}>
        Step {step+1} of {STEPS.length}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 268px", gap:44, alignItems:"start" }}>
        <div>
          <div style={eyebrow}>{cfg.label}{cfg.multi && " · Select all that apply"}</div>
          <h2 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:32, fontWeight:700, color:WHITE, textTransform:"uppercase", letterSpacing:"-0.01em", lineHeight:1.05, marginBottom:8 }}>{cfg.label}</h2>
          <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:MID, marginBottom:32 }}>{cfg.subtitle}</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(215px,1fr))", gap:10 }}>
            {cfg.opts.map(opt => {
              const active = isActive(opt);
              return (
                <div key={opt} onClick={() => cfg.multi ? onToggle(cfg.key, opt) : onSelect(cfg.key, opt)}
                  style={{ border: active ? `1px solid ${RED}` : `1px solid ${BORDER}`, background: active ? RED_DIM : FAINT, padding:"15px 16px", cursor:"pointer", transition:"all 0.18s", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:15, height:15, flexShrink:0, borderRadius: cfg.multi ? 3 : "50%", border: active ? `2px solid ${RED}` : `2px solid rgba(255,255,255,0.3)`, background: active ? RED : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {active && <div style={{ width:5, height:5, borderRadius: cfg.multi ? 1 : "50%", background:WHITE }} />}
                  </div>
                  <span style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color: active ? WHITE : MID, lineHeight:1.4 }}>{opt}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:12, marginTop:40 }}>
            <button onClick={onBack} style={outlineBtn()}>← Back</button>
            <button onClick={onNext} disabled={!hasSelection}
              style={hasSelection ? redBtn({ padding:"12px 36px", fontSize:11 }) : outlineBtn({ padding:"12px 36px", fontSize:11, color:"rgba(255,255,255,0.22)", borderColor:"rgba(255,255,255,0.08)", cursor:"not-allowed" })}>
              {step === STEPS.length-1 ? "See My Recommendation →" : "Next →"}
            </button>
          </div>
        </div>
        <SummaryPanel selections={selections} />
      </div>
    </div>
  );
}

function Recommendation({ device, selections, onROI, onContact, onReset }) {
  return (
    <div style={{ maxWidth:980, margin:"0 auto", padding:"64px 48px" }}>
      <div style={eyebrow}>Your Personalized Match</div>
      <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:MID, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>We recommend the</div>
      <div style={{ border:`1px solid ${RED_BORDER}`, background:`linear-gradient(135deg, rgba(232,25,44,0.07) 0%, rgba(10,10,10,0) 55%)`, padding:"40px", marginBottom:16, position:"relative" }}>
        <div style={{ position:"absolute", right:32, top:32 }}>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.25em", color:RED, textTransform:"uppercase", background:RED_DIM, border:`1px solid ${RED_BORDER}`, padding:"5px 14px" }}>{device.badge}</div>
        </div>
        <h2 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:26, fontWeight:700, color:WHITE, marginBottom:6, lineHeight:1.15, paddingRight:180 }}>{device.name}</h2>
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:12, color:MID, marginBottom:24, letterSpacing:"0.05em" }}>{device.tagline}</div>
        <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:14, color:"rgba(255,255,255,0.68)", lineHeight:1.75, marginBottom:28, maxWidth:660 }}>{device.description}</p>
        <div style={{ marginBottom:28 }}>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.25em", color:MID, textTransform:"uppercase", marginBottom:16 }}>Why it fits your practice</div>
          {device.fits.map((f,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
              <div style={{ width:18, height:18, borderRadius:"50%", background:RED, flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:WHITE, fontSize:10, fontWeight:700, lineHeight:1 }}>✓</span>
              </div>
              <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:"rgba(255,255,255,0.68)", lineHeight:1.55 }}>{f}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.25em", color:MID, textTransform:"uppercase", marginBottom:14 }}>Supported Treatments</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:32 }}>
          {device.treatments.map(t => <span key={t} style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:11, color:MID, border:`1px solid ${BORDER}`, padding:"4px 12px" }}>{t}</span>)}
        </div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <button onClick={onROI} style={redBtn({ padding:"12px 26px", fontSize:11 })}>See Potential ROI →</button>
          <button onClick={onContact} style={outlineBtn({ padding:"12px 26px", fontSize:11 })}>Talk to a Specialist</button>
          <button onClick={onReset} style={outlineBtn({ padding:"12px 22px", fontSize:11, color:"rgba(255,255,255,0.3)", borderColor:"rgba(255,255,255,0.08)" })}>Start Over</button>
        </div>
      </div>
      <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.22)" }}>
        Based on: {selections.practiceType} · {(selections.growthGoals||[]).join(", ")} · {selections.stage}
      </div>
    </div>
  );
}

function ROIExplorer({ device, selections, onCapture, onContact, onBack }) {
  const [patientsPerWeek, setPatientsPerWeek] = useState(80);
  const [avgPrice, setAvgPrice] = useState(600);
  const [adoptionRate, setAdoptionRate] = useState(4);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [manualPrice, setManualPrice] = useState(false);

  const toggleTreatment = (label) => {
    setManualPrice(false);
    setSelectedTreatments(prev => prev.includes(label) ? prev.filter(t=>t!==label) : [...prev, label]);
  };

  useEffect(() => {
    if (!manualPrice && selectedTreatments.length > 0) {
      const selected = TREATMENT_OPTIONS.filter(t => selectedTreatments.includes(t.label));
      const avg = selected.reduce((sum,t) => sum + (t.priceRange[0]+t.priceRange[1])/2, 0) / selected.length;
      setAvgPrice(Math.round(avg));
    }
  }, [selectedTreatments, manualPrice]);

  const monthlyPatients = Math.round(patientsPerWeek * 4.33 * (adoptionRate / 100));
  const monthlyRev = monthlyPatients * avgPrice;
  const annualRev = monthlyRev * 12;
  const [pbLow, pbHigh] = device.paybackMonths;
  const [priceLow, priceHigh] = device.priceRange;

  return (
    <div style={{ maxWidth:980, margin:"0 auto", padding:"64px 48px" }}>
      <div style={eyebrow}>ROI Exploration · Directional Only</div>
      <h1 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:34, fontWeight:700, color:WHITE, textTransform:"uppercase", letterSpacing:"-0.01em", marginBottom:8 }}>Revenue Potential</h1>
      <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:MID, marginBottom:44 }}>
        Select the treatments you're most interested in, then adjust volume and pricing to model practice performance.
      </p>
      <div style={{ marginBottom:44 }}>
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.3em", color:RED, textTransform:"uppercase", fontWeight:600, marginBottom:16 }}>
          Treatments You're Interested In <span style={{ color:MID, fontSize:9, fontWeight:400 }}>· Select all that apply</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:8 }}>
          {TREATMENT_OPTIONS.map(t => {
            const active = selectedTreatments.includes(t.label);
            return (
              <div key={t.label} onClick={() => toggleTreatment(t.label)}
                style={{ border: active ? `1px solid ${RED}` : `1px solid ${BORDER}`, background: active ? RED_DIM : FAINT, padding:"11px 14px", cursor:"pointer", transition:"all 0.18s", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:13, height:13, flexShrink:0, border: active ? `2px solid ${RED}` : `2px solid rgba(255,255,255,0.25)`, borderRadius:2, background: active ? RED : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {active && <div style={{ width:5, height:5, background:WHITE, borderRadius:1 }} />}
                </div>
                <div>
                  <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:12, color: active ? WHITE : MID }}>{t.label}</div>
                  <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.28)", marginTop:2 }}>${t.priceRange[0]}–${t.priceRange[1]} / session</div>
                </div>
              </div>
            );
          })}
        </div>
        {selectedTreatments.length > 0 && (
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:11, color:MID, marginTop:10 }}>
            {selectedTreatments.length} treatment{selectedTreatments.length>1?"s":""} selected · Blended avg price set to <strong style={{ color:WHITE }}>${avgPrice}</strong>
          </div>
        )}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:40, alignItems:"start" }}>
        <div>
          {[
            { label:"Patients seen per week", val:patientsPerWeek, set:v=>setPatientsPerWeek(v), min:20, max:400, step:10, display:`${patientsPerWeek}`, lo:"20", hi:"400" },
            { label:"Estimated adoption rate", val:adoptionRate, set:v=>setAdoptionRate(v), min:1, max:15, step:1, display:`${adoptionRate}%`, lo:"1%", hi:"15%", note:"% of patients likely to book a laser treatment" },
          ].map(({ label, val, set, min, max, step:st, display, lo, hi, note }) => (
            <div key={label} style={{ marginBottom:32 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
                <label style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, letterSpacing:"0.2em", color:MID, textTransform:"uppercase" }}>{label}</label>
                <span style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:22, fontWeight:700, color:WHITE }}>{display}</span>
              </div>
              <input type="range" min={min} max={max} step={st} value={val} onChange={e=>set(+e.target.value)} style={{ width:"100%", accentColor:RED }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.22)", marginTop:4 }}>
                <span>{lo}</span>{note && <span style={{ color:"rgba(255,255,255,0.28)" }}>{note}</span>}<span>{hi}</span>
              </div>
            </div>
          ))}
          <div style={{ marginBottom:32 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
              <label style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, letterSpacing:"0.2em", color:MID, textTransform:"uppercase" }}>
                Average treatment price
                {selectedTreatments.length>0 && !manualPrice && <span style={{ color:"rgba(255,255,255,0.28)", fontSize:9, letterSpacing:"0.1em" }}> · auto-set</span>}
              </label>
              <span style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:22, fontWeight:700, color:WHITE }}>${avgPrice}</span>
            </div>
            <input type="range" min={200} max={2000} step={50} value={avgPrice}
              onChange={e=>{ setManualPrice(true); setAvgPrice(+e.target.value); }}
              style={{ width:"100%", accentColor:RED }} />
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.22)", marginTop:4 }}>
              <span>$200</span><span>$2,000</span>
            </div>
          </div>
          <div style={{ background:FAINT, border:`1px solid ${BORDER}`, padding:"20px 22px" }}>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.3em", color:MID, textTransform:"uppercase", marginBottom:14 }}>Device Context</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, fontWeight:600, color:OFF_WHITE, marginBottom:10, lineHeight:1.4 }}>{device.name}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:4 }}>Est. Investment Range</div>
                <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:14, color:WHITE, fontWeight:600 }}>${priceLow}K – ${priceHigh}K</div>
              </div>
              <div>
                <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:4 }}>Typical Payback Window</div>
                <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:14, color:WHITE, fontWeight:600 }}>{pbLow}–{pbHigh} months</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background:`linear-gradient(160deg, rgba(232,25,44,0.1) 0%, rgba(10,10,10,0.5) 60%)`, border:`1px solid ${RED_BORDER}`, padding:"32px" }}>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.3em", color:RED, textTransform:"uppercase", fontWeight:600, marginBottom:20 }}>Estimated Monthly Revenue</div>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:52, fontWeight:700, color:WHITE, letterSpacing:"-0.03em", lineHeight:1, marginBottom:6 }}>${monthlyRev.toLocaleString()}</div>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:MID, textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:24 }}>per month from laser treatments</div>
          <div style={{ height:1, background:`rgba(232,25,44,0.25)`, marginBottom:24 }} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
            <div>
              <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:20, fontWeight:700, color:WHITE }}>${annualRev.toLocaleString()}</div>
              <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:MID, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:4 }}>Annual projection</div>
            </div>
            <div>
              <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:20, fontWeight:700, color:WHITE }}>{monthlyPatients}</div>
              <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:MID, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:4 }}>Patients / month</div>
            </div>
          </div>
          <div style={{ height:1, background:BORDER, marginBottom:20 }} />
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:"rgba(255,255,255,0.58)", lineHeight:1.7, marginBottom:20 }}>
            At this revenue level, directional payback falls within <span style={{ color:WHITE, fontWeight:600 }}>{pbLow}–{pbHigh} months</span>, consistent with comparable Fotona practices at similar volume.
          </div>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.28)", lineHeight:1.6, fontStyle:"italic", borderTop:`1px solid ${BORDER}`, paddingTop:14, marginBottom:24 }}>
            Estimates are directional and based on user inputs. Final pricing, financing, and practice results may vary.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <button onClick={onCapture} style={redBtn({ padding:"12px", fontSize:11, textAlign:"center" })}>Get My Custom Plan →</button>
            <button onClick={onContact} style={outlineBtn({ padding:"11px", fontSize:11, textAlign:"center" })}>Talk to a Specialist</button>
            <button onClick={onBack} style={outlineBtn({ padding:"11px", fontSize:11, textAlign:"center", color:"rgba(255,255,255,0.3)", borderColor:"rgba(255,255,255,0.08)" })}>← Back to Recommendation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadCapture({ device, selections, onSubmit, onBack }) {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", practice:"", specialty:"", state:"", notes:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const ok = form.firstName && form.lastName && form.email && form.practice && form.state;
  return (
    <div style={{ maxWidth:800, margin:"0 auto", padding:"64px 48px" }}>
      <div style={eyebrow}>High-Intent Handoff · Qualified Lead</div>
      <h1 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:32, fontWeight:700, color:WHITE, textTransform:"uppercase", letterSpacing:"-0.01em", marginBottom:8 }}>Connect with Your Specialist</h1>
      <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:MID, marginBottom:36, lineHeight:1.7 }}>
        Your territory rep will receive your full profile — system match, goals, barriers, and ROI scenario — so your first conversation is focused and productive.
      </p>
      <div style={{ background:FAINT, border:`1px solid rgba(232,25,44,0.2)`, padding:"20px 24px", marginBottom:32 }}>
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.3em", color:RED, textTransform:"uppercase", fontWeight:600, marginBottom:16 }}>Your Session Summary</div>
        {[["Practice Type",selections.practiceType],["Recommended System",device.name],["Growth Goals",(selections.growthGoals||[]).join(", ")],["Main Barriers",(selections.barriers||[]).join(", ")],["Interest Level",selections.interest]].map(([k,v])=>v&&(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:`1px solid ${BORDER}`, paddingBottom:10, marginBottom:10, gap:20 }}>
            <span style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:11, color:"rgba(255,255,255,0.35)", flexShrink:0 }}>{k}</span>
            <span style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:12, color:OFF_WHITE, textAlign:"right" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        {[["First Name","firstName","Jane"],["Last Name","lastName","Smith"],["Email","email","jane@practice.com","email"],["Practice Name","practice","Advanced Aesthetics Center"]].map(([label,key,ph,type="text"])=>(
          <div key={key}>
            <label style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.2em", color:MID, textTransform:"uppercase", display:"block", marginBottom:8 }}>{label} *</label>
            <input type={type} value={form[key]} onChange={e=>set(key,e.target.value)} placeholder={ph}
              style={{ background:"rgba(255,255,255,0.04)", border:"none", borderBottom:`1px solid ${BORDER}`, color:WHITE, padding:"11px 0", fontSize:14, fontFamily:"'Helvetica Neue',Arial,sans-serif", width:"100%", outline:"none", boxSizing:"border-box" }} />
          </div>
        ))}
        <div>
          <label style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.2em", color:MID, textTransform:"uppercase", display:"block", marginBottom:8 }}>Specialty</label>
          <select value={form.specialty} onChange={e=>set("specialty",e.target.value)}
            style={{ background:"rgba(10,10,10,0.8)", border:"none", borderBottom:`1px solid ${BORDER}`, color:form.specialty?WHITE:MID, padding:"11px 0", fontSize:13, fontFamily:"'Helvetica Neue',Arial,sans-serif", width:"100%", outline:"none", boxSizing:"border-box" }}>
            <option value="">Select…</option>
            {["Med Spa / Aesthetics","Dermatology","Plastic Surgery","Wellness / Anti-Aging","Multi-Specialty"].map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.2em", color:MID, textTransform:"uppercase", display:"block", marginBottom:8 }}>State *</label>
          <select value={form.state} onChange={e=>set("state",e.target.value)}
            style={{ background:"rgba(10,10,10,0.8)", border:"none", borderBottom:`1px solid ${BORDER}`, color:form.state?WHITE:MID, padding:"11px 0", fontSize:13, fontFamily:"'Helvetica Neue',Arial,sans-serif", width:"100%", outline:"none", boxSizing:"border-box" }}>
            <option value="">Select…</option>
            {US_STATES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom:32 }}>
        <label style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.2em", color:MID, textTransform:"uppercase", display:"block", marginBottom:8 }}>Anything for your specialist to know? (Optional)</label>
        <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="e.g. Evaluating 2–3 systems, budget approved for Q3, prefer virtual demo first…"
          style={{ background:"rgba(255,255,255,0.04)", border:"none", borderBottom:`1px solid ${BORDER}`, color:WHITE, padding:"11px 0", fontSize:13, fontFamily:"'Helvetica Neue',Arial,sans-serif", width:"100%", outline:"none", boxSizing:"border-box", minHeight:72, resize:"vertical" }} />
      </div>
      <div style={{ display:"flex", gap:12 }}>
        <button onClick={()=>ok&&onSubmit(form)} disabled={!ok} style={ok ? redBtn({ padding:"13px 32px", fontSize:11 }) : outlineBtn({ padding:"13px 32px", fontSize:11, color:"rgba(255,255,255,0.22)", borderColor:"rgba(255,255,255,0.08)", cursor:"not-allowed" })}>
          Submit & Connect with My Rep →
        </button>
        <button onClick={onBack} style={outlineBtn()}>← Back</button>
      </div>
      <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.22)", marginTop:14 }}>* Required. Shared only with your assigned Fotona territory specialist.</div>
    </div>
  );
}

function RepHandoff({ device, selections, lead, onReset }) {
  const territory = TERRITORIES[lead.state] || TERRITORIES.default;
  const [repName, region] = territory.split(" — ");
  return (
    <div style={{ maxWidth:800, margin:"0 auto", padding:"64px 48px" }}>
      <div style={{ textAlign:"center", marginBottom:52 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:RED, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
          <span style={{ color:WHITE, fontSize:20, fontWeight:700 }}>✓</span>
        </div>
        <div style={eyebrow}>Lead Submitted · Rep Notified</div>
        <h1 style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:32, fontWeight:700, color:WHITE, textTransform:"uppercase", letterSpacing:"-0.01em", marginBottom:8 }}>You're Connected</h1>
        <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:MID }}>
          {lead.firstName}, your Fotona specialist will reach out within 1 business day.
        </p>
      </div>
      <div style={{ background:RED_DIM, border:`1px solid ${RED_BORDER}`, padding:"12px 20px", marginBottom:28, display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:RED, flexShrink:0 }} />
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:12, color:MID }}>
          <strong style={{ color:RED }}>Internal concept:</strong> Rep receives a warmer, more qualified lead with full context — replacing a cold call with a consultative first conversation.
        </div>
      </div>
      <div style={{ background:FAINT, border:`1px solid ${BORDER}`, padding:"36px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", paddingBottom:24, marginBottom:24, borderBottom:`1px solid ${BORDER}` }}>
          <div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.25em", color:MID, textTransform:"uppercase", marginBottom:8 }}>Lead Package</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:24, fontWeight:700, color:WHITE }}>{lead.firstName} {lead.lastName}</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:MID, marginTop:4 }}>{lead.practice} · {lead.state}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.2em", color:RED, textTransform:"uppercase", background:RED_DIM, border:`1px solid ${RED_BORDER}`, padding:"5px 14px", display:"inline-block", marginBottom:8 }}>{selections.interest}</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:MID, marginTop:4 }}>Territory: {region}</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:WHITE, marginTop:2 }}>{repName}</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
          {[["Practice Type",selections.practiceType],["Recommended Device",device.name.replace("Fotona ","")],["Top Growth Goal",(selections.growthGoals||[])[0]],["Main Barrier",(selections.barriers||[])[0]],["Business Stage",selections.stage],["Email",lead.email]].map(([k,v])=>v&&(
            <div key={k} style={{ borderBottom:`1px solid ${BORDER}`, paddingBottom:14 }}>
              <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:5 }}>{k}</div>
              <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:OFF_WHITE }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background:`linear-gradient(135deg, rgba(232,25,44,0.08) 0%, rgba(10,10,10,0) 70%)`, border:`1px solid rgba(232,25,44,0.2)`, padding:"20px 24px", marginBottom:lead.notes?20:0 }}>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, letterSpacing:"0.25em", color:RED, textTransform:"uppercase", fontWeight:600, marginBottom:12 }}>ROI Snapshot — Passed to Rep</div>
          <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:"rgba(255,255,255,0.62)", lineHeight:1.7 }}>
            Buyer modeled estimated monthly laser revenue potential based on their patient volume and adoption assumptions. Directional payback window: <strong style={{ color:WHITE }}>{device.paybackMonths[0]}–{device.paybackMonths[1]} months</strong>. Rep should validate assumptions and build a custom financial model in the first call.
          </div>
        </div>
        {lead.notes && (
          <div style={{ padding:"16px 20px", background:"rgba(255,255,255,0.02)", border:`1px solid ${BORDER}`, marginTop:16 }}>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:9, color:MID, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>Notes from buyer</div>
            <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:13, color:"rgba(255,255,255,0.58)", lineHeight:1.6 }}>"{lead.notes}"</div>
          </div>
        )}
        <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", fontSize:10, color:"rgba(255,255,255,0.18)", lineHeight:1.6, borderTop:`1px solid ${BORDER}`, paddingTop:16, marginTop:20, fontStyle:"italic" }}>
          Future integrations: Salesforce opportunity auto-create · territory routing by zip · lead scoring by intent + barrier tag · analytics pipeline handoff event
        </div>
      </div>
      <div style={{ textAlign:"center", marginTop:48 }}>
        <button onClick={onReset} style={outlineBtn({ padding:"14px 36px", fontSize:11 })}>← Return to Fotona.com</button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({ practiceType:"", growthGoals:[], barriers:[], stage:"", interest:"" });
  const [device, setDevice] = useState(null);
  const [lead, setLead] = useState(null);

  const onSelect = (key, val) => setSelections(s=>({...s,[key]:val}));
  const onToggle = (key, val) => setSelections(s=>{ const arr=s[key]||[]; return {...s,[key]: arr.includes(val)?arr.filter(v=>v!==val):[...arr,val]}; });
  const reset = () => { setScreen("landing"); setStep(0); setSelections({ practiceType:"", growthGoals:[], barriers:[], stage:"", interest:"" }); setDevice(null); setLead(null); };
  const flowNext = () => { if (step < STEPS.length-1) setStep(s=>s+1); else { setDevice(recommend(selections)); setScreen("recommendation"); } };
  const flowBack = () => { if (step>0) setStep(s=>s-1); else setScreen("intro"); };

  useEffect(()=>{ window.scrollTo(0,0); }, [screen]);

  return (
    <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", background:BLACK, color:WHITE, minHeight:"100vh" }}>
      <PageHeader onReset={reset} />
      {screen==="landing" && <Landing onStart={()=>setScreen("intro")} />}
      {screen==="intro" && <GuidedIntro onStart={()=>setScreen("flow")} onBack={()=>setScreen("landing")} />}
      {screen==="flow" && <DiscoveryFlow selections={selections} onSelect={onSelect} onToggle={onToggle} onNext={flowNext} onBack={flowBack} step={step} />}
      {screen==="recommendation" && device && <Recommendation device={device} selections={selections} onROI={()=>setScreen("roi")} onContact={()=>setScreen("capture")} onReset={reset} />}
      {screen==="roi" && device && <ROIExplorer device={device} selections={selections} onCapture={()=>setScreen("capture")} onContact={()=>setScreen("capture")} onBack={()=>setScreen("recommendation")} />}
      {screen==="capture" && device && <LeadCapture device={device} selections={selections} onSubmit={f=>{setLead(f);setScreen("handoff");}} onBack={()=>setScreen("roi")} />}
      {screen==="handoff" && device && lead && <RepHandoff device={device} selections={selections} lead={lead} onReset={reset} />}
    </div>
  );
}
