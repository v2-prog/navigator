/* AcerLab Navigator — client-side app. No personal financial data is uploaded. */
(function () {
  const D = window.NAV_DATA;
  const KEY = "acerlab-nav-v1";
  const ADMIN_KEY = "acerlab-nav-admin";
  const ROUTES = [
    { id: "home", path: "/", n: "00", label: "Home", group: null },
    { id: "finance", path: "/finance", n: "01", label: "Money literacy", group: "Learn" },
    { id: "budget", path: "/budget", n: "02", label: "Budget studio", group: "Learn" },
    { id: "wages", path: "/wages", n: "03", label: "Wage & tax structure", group: "Learn" },
    { id: "savings", path: "/savings", n: "04", label: "Savings & investing", group: "Learn" },
    { id: "debt", path: "/debt", n: "05", label: "Debt literacy", group: "Learn" },
    { id: "glossary", path: "/glossary", n: "06", label: "Glossary", group: "Learn" },
    { id: "progress", path: "/progress", n: "07", label: "Your progress", group: "Learn" },
    { id: "village", path: "/village", n: "08", label: "Shared living", group: "Live" },
    { id: "structures", path: "/structures", n: "09", label: "Legal structures", group: "Live" },
    { id: "zoning", path: "/zoning", n: "10", label: "Zoning pathway", group: "Live" },
    { id: "building", path: "/building", n: "11", label: "Building codes", group: "Live" },
    { id: "shared", path: "/shared", n: "12", label: "Shared money", group: "Live" },
    { id: "resources", path: "/resources", n: "13", label: "Directory", group: "Live" },
    { id: "templates", path: "/templates", n: "14", label: "Checklists", group: "Live" },
    { id: "admin", path: "/admin", n: "15", label: "Treasurer desk", group: "Group" }
  ];
  function loadState() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
  function saveState(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
  function state() {
    const s = loadState();
    if (!s.jurisdiction) s.jurisdiction = "ACT";
    if (!s.done) s.done = {};
    if (!s.events) s.events = [];
    if (!s.budget) s.budget = { income: 6500, housing: 1800, food: 900, transport: 350, utilities: 280, other: 400 };
    if (!s.visited) s.visited = {};
    return s;
  }
  function patch(fn) { const s = state(); fn(s); saveState(s); return s; }
  function track(name) {
    patch((s) => {
      s.visited[name] = (s.visited[name] || 0) + 1;
      s.events.push({ t: Date.now(), n: name });
      if (s.events.length > 400) s.events = s.events.slice(-400);
    });
  }
  function markDone(id) { patch((s) => { s.done[id] = true; }); render(); }
  function money(n) { if (!isFinite(n)) return "—"; return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }); }
  function money2(n) { if (!isFinite(n)) return "—"; return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }); }
  function taxOn(taxable) {
    let remaining = Math.max(0, taxable), tax = 0, last = 0;
    for (const b of D.taxBrackets) {
      const span = Math.min(remaining, b.upTo - last);
      if (span > 0) tax += span * b.rate;
      remaining -= Math.max(0, span);
      last = b.upTo;
      if (remaining <= 0) break;
    }
    const medicare = Math.max(0, taxable) * D.medicare;
    return { tax, medicare, total: tax + medicare };
  }
  function parseHash() {
    const raw = (location.hash || "#/").replace(/^#/, "");
    const path = raw.split("?")[0] || "/";
    return ROUTES.find((r) => r.path === path) || ROUTES[0];
  }
  function navHtml(current) {
    let html = "", last = null;
    for (const r of ROUTES) {
      if (r.group && r.group !== last) { html += `<div class="group">${esc(r.group)}</div>`; last = r.group; }
      const cur = r.id === current.id ? " is-current" : "";
      html += `<a class="${cur}" href="#${r.path}"><span class="n">${r.n}</span>${esc(r.label)}</a>`;
    }
    return html;
  }
  function esc(s) {
    return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function disclaimer() {
    return `<p class="note warn"><span class="mark">▣</span><span>Education only. Calculators are simplified illustrations using ${esc(D.yearLabel)} They omit many offsets, HELP/HECS, MLS nuances, Div 293, and state taxes. They are not a tax return and not a recommendation.</span></p>`;
  }
  function doneBtn(id) {
    const s = state();
    if (s.done[id]) return `<p class="done">Marked as revisited.</p>`;
    return `<div class="actions"><button class="btn" type="button" data-done="${id}">Mark this module reviewed</button></div>`;
  }
  function pageHome() {
    const s = state();
    const reviewed = Object.keys(s.done).length;
    return `
      <h1>Money literacy, then shared land — without mixing the two.</h1>
      <p class="lede">Two rooms in one notebook. First, how a household’s cash actually behaves. Second, how Australians hold land together without accidentally signing away their independence. Nothing here is a product, a quote, or a booking.</p>
      <div class="kpi">
        <div class="card"><span class="muted">Place set</span><strong>${esc(s.jurisdiction)}</strong></div>
        <div class="card"><span class="muted">Modules reviewed</span><strong>${reviewed} / ${D.modules.length}</strong></div>
        <div class="card"><span class="muted">Data stored</span><strong>This device only</strong></div>
      </div>
      <div class="grid two">
        <a class="card" href="#/finance"><span class="num">01</span><h2>Financial literacy</h2><p>Budget picture, wage packaging language, compounding, debt mechanics, searchable glossary.</p></a>
        <a class="card" href="#/village"><span class="num">02</span><h2>Cohabitation / eco-village</h2><p>Title models, council questions, building-class flags, shared levies, checklists.</p></a>
      </div>
      <p class="note"><span class="mark">▣</span><span>A charity or community land trust with an asset lock cannot be a substitute for a family discretionary trust. If you need the family-investment fork, use <a href="https://acerlab.link/">Structure Lab AU</a>.</span></p>
      <p class="muted">Companion notebook to Structure Lab AU (acerlab.link). Workshop voice of Earth Acer / Ever Earth Acre. Australia only.</p>`;
  }
  function pageFinance() {
    return `
      <h1>Financial literacy for group members</h1>
      <p class="lede">Plain pictures of cashflow, tax structure language, and risk. Use them in a treasurer session. Do not paste real account numbers into this page.</p>
      ${disclaimer()}
      <div class="grid two">
        <a class="card" href="#/budget"><span class="num">02</span><h2>Budget studio</h2><p>Income against the usual outgoing buckets, with a visual split.</p></a>
        <a class="card" href="#/wages"><span class="num">03</span><h2>Wage &amp; tax structure</h2><p>Salary sacrifice, concessional vs non-concessional, SG — as explanations.</p></a>
        <a class="card" href="#/savings"><span class="num">04</span><h2>Savings &amp; investing</h2><p>Compounding sketch and vehicle comparison.</p></a>
        <a class="card" href="#/debt"><span class="num">05</span><h2>Debt literacy</h2><p>Minimum vs extra repayments, and the good/bad-debt teaching frame.</p></a>
        <a class="card" href="#/glossary"><span class="num">06</span><h2>Glossary</h2><p>Searchable terms used in both rooms.</p></a>
        <a class="card" href="#/progress"><span class="num">07</span><h2>Progress</h2><p>What you have opened and marked reviewed on this device.</p></a>
      </div>`;
  }
  function pageBudget() {
    const b = state().budget;
    const totalExp = num(b.housing) + num(b.food) + num(b.transport) + num(b.utilities) + num(b.other);
    const inc = num(b.income);
    const rest = inc - totalExp;
    const items = [["housing", "Housing / rent / loan", b.housing],["food", "Food", b.food],["transport", "Transport", b.transport],["utilities", "Utilities & comms", b.utilities],["other", "Other living", b.other]];
    const max = Math.max(inc, totalExp, 1);
    const rows = items.map(([id, label, v]) => {
      const pct = Math.min(100, (num(v) / max) * 100);
      return `<div class="bar-row"><span>${esc(label)}</span><div class="bar-track"><div class="bar-fill clay" style="width:${pct}%"></div></div><span>${money(num(v))}</span></div>`;
    }).join("");
    return `
      <h1>Budget studio</h1>
      <p class="lede">A monthly picture, not a bank feed. Figures stay in this browser.</p>
      ${disclaimer()}
      <div class="grid two">
        <div>
          ${field("income", "Net income each month (what actually lands)", b.income)}
          ${field("housing", "Housing (rent or loan + rates share)", b.housing)}
          ${field("food", "Food", b.food)}
          ${field("transport", "Transport", b.transport)}
          ${field("utilities", "Utilities & communications", b.utilities)}
          ${field("other", "Other living costs", b.other)}
        </div>
        <div>
          <div class="kpi">
            <div class="card"><span class="muted">Income</span><strong>${money(inc)}</strong></div>
            <div class="card"><span class="muted">Outgoings</span><strong>${money(totalExp)}</strong></div>
            <div class="card"><span class="muted">${rest >= 0 ? "Unallocated" : "Shortfall"}</span><strong>${money(rest)}</strong></div>
          </div>
          <div class="bars">
            <div class="bar-row"><span>Income</span><div class="bar-track"><div class="bar-fill" style="width:${(inc / max) * 100}%"></div></div><span>${money(inc)}</span></div>
            ${rows}
          </div>
          <p class="muted">If housing is more than about a third of net income, the picture is tight before a community levy is added. That is an observation, not a rule.</p>
        </div>
      </div>
      ${doneBtn("budget")}`;
    function field(id, label, val) {
      return `<label class="field"><span>${esc(label)}</span><input type="number" min="0" step="10" data-budget="${id}" value="${esc(val)}"></label>`;
    }
  }
  function pageWages() {
    return `
      <h1>Wage optimisation — as language, not advice</h1>
      <p class="lede">How take-home pay is commonly structured in Australia. Use the sketch to see direction of travel, then sit with a registered tax agent and payroll.</p>
      ${disclaimer()}
      <div class="grid two">
        <div>
          <label class="field"><span>Illustrative gross annual wage</span><input type="number" min="0" step="1000" id="gross" value="90000"></label>
          <label class="field"><span>Extra concessional contribution / salary sacrifice ($ / year)</span><input type="number" min="0" step="500" id="sacrifice" value="5000"></label>
          <label class="field"><span>Include 12% Super Guarantee on gross?</span>
            <select id="sg"><option value="1" selected>Yes — typical employee</option><option value="0">No — already in the wage figure</option></select>
          </label>
          <p class="muted">${esc(D.yearLabel)} Concessional cap used in this sketch: ${money(D.concessionalCap)}. Non-concessional cap illustration: ${money(D.nonConcessionalCap)}.</p>
        </div>
        <div id="wage-out" class="summary"></div>
      </div>
      <h2>What the words mean</h2>
      <div class="grid two">
        <div class="card"><h3>Salary packaging / sacrifice</h3><p>A written deal with the employer to send part of gross pay to super (or a limited set of benefits) before it is taxed at marginal rates. Award, enterprise agreement and payroll software decide whether it is even available.</p></div>
        <div class="card"><h3>Concessional vs non-concessional</h3><p>Concessional amounts (SG + sacrifice + deductible personal contributions) are taxed in the fund, usually 15% for most members, and use the concessional cap. Non-concessional amounts are after-tax and use a different cap.</p></div>
        <div class="card"><h3>Offsets</h3><p>Offsets (LITO and others) reduce tax payable; they are not deductions. They have income phase-outs. This sketch ignores them on purpose so nobody treats the number as a refund estimate.</p></div>
        <div class="card"><h3>Independence inside a group</h3><p>Each adult keeps their own super member account. A community levy is an after-tax outgoing. Do not salary-sacrifice into a co-owner’s offset or a group cash tin.</p></div>
      </div>
      ${doneBtn("wages")}`;
  }
  function wageSketch() {
    const gross = num(document.getElementById("gross") && document.getElementById("gross").value);
    const sac = num(document.getElementById("sacrifice") && document.getElementById("sacrifice").value);
    const sgOn = document.getElementById("sg") ? document.getElementById("sg").value !== "0" : true;
    const sg = sgOn ? gross * D.sgRate : 0;
    const concessional = sg + sac;
    const overCap = Math.max(0, concessional - D.concessionalCap);
    const taxable = Math.max(0, gross - sac);
    const base = taxOn(gross);
    const after = taxOn(taxable);
    const takeHomeBase = gross - base.total;
    const takeHomeAfter = (gross - sac) - after.total;
    const el = document.getElementById("wage-out");
    if (!el) return;
    el.innerHTML = `
      <p><b>Sketch only</b> — marginal rates + ${D.medicare * 100}% Medicare levy. No offsets, no HELP, no MLS.</p>
      <ul>
        <li>Employer SG at ${D.sgRate * 100}% (if toggled on): <b>${money(sg)}</b></li>
        <li>Extra concessional / sacrifice: <b>${money(sac)}</b></li>
        <li>Total concessional in sketch: <b>${money(concessional)}</b> ${overCap ? `— over the ${money(D.concessionalCap)} cap by ${money(overCap)}` : "— inside the illustrated cap"}</li>
        <li>Tax + Medicare on full gross: <b>${money(base.total)}</b> → cash to you ≈ <b>${money(takeHomeBase)}</b></li>
        <li>Tax + Medicare after sacrifice: <b>${money(after.total)}</b> → cash to you ≈ <b>${money(takeHomeAfter)}</b></li>
        <li>Cash to you falls by <b>${money(takeHomeBase - takeHomeAfter)}</b>; super (concessional side) rises by <b>${money(sac)}</b> before contributions tax inside the fund.</li>
      </ul>
      <p class="muted">Direction: sacrifice usually trades today’s take-home for a larger preserved balance. Whether that is wise depends on cash buffer, debt rate, preservation age and the fund. Ask a licensed adviser for a personal recommendation.</p>`;
  }
  function pageSavings() {
    const cards = D.vehicles.map((v) => `<div class="card"><h3>${esc(v.name)}</h3><p><span class="tag">Risk ${esc(v.risk)}</span><span class="tag">${esc(v.access)}</span></p><p>${esc(v.point)}</p></div>`).join("");
    return `
      <h1>Savings vehicles and compounding</h1>
      <p class="lede">A compound-interest sketch so the shape of time is visible. Then a plain comparison. Past rates are not a promise.</p>
      ${disclaimer()}
      <div class="grid two">
        <div>
          <label class="field"><span>Starting amount ($)</span><input type="number" id="c-start" value="10000" min="0" step="100"></label>
          <label class="field"><span>Extra each month ($)</span><input type="number" id="c-month" value="300" min="0" step="10"></label>
          <label class="field"><span>Illustrative annual rate (%)</span><input type="number" id="c-rate" value="5" min="0" step="0.1"></label>
          <label class="field"><span>Years</span><input type="number" id="c-years" value="15" min="1" max="50"></label>
        </div>
        <div id="compound-out" class="summary"></div>
      </div>
      <h2>Vehicles, in plain language</h2>
      <div class="compare cols-2">${cards}</div>
      <p class="muted">Index funds can fall 20–50% in a bad year. Super cannot be used for a council DA fee next March. Match the vehicle to the job.</p>
      ${doneBtn("savings")}`;
  }
  function compoundSketch() {
    const start = num(val("c-start")); const monthly = num(val("c-month")); const rate = num(val("c-rate")) / 100;
    const years = Math.min(50, Math.max(1, num(val("c-years"))));
    const mRate = rate / 12; const months = years * 12; let bal = start;
    for (let i = 0; i < months; i++) bal = bal * (1 + mRate) + monthly;
    const contributed = start + monthly * months;
    const el = document.getElementById("compound-out"); if (!el) return;
    el.innerHTML = `<p>After <b>${years}</b> years at <b>${val("c-rate")}%</b> (monthly compounding sketch):</p><ul><li>You put in <b>${money(contributed)}</b></li><li>Illustrated balance <b>${money(bal)}</b></li><li>Illustrated growth <b>${money(bal - contributed)}</b></li></ul><p class="muted">Inflation, fees, tax on interest or CGT, and contribution pauses are not modelled. A 5% line is not an index-fund forecast.</p>`;
  }
  function pageDebt() {
    return `
      <h1>Debt literacy</h1>
      <p class="lede">Interest is rent on money. Minimum payments keep the account open; they are rarely the cheapest path off the balance.</p>
      ${disclaimer()}
      <div class="grid two">
        <div>
          <label class="field"><span>Balance ($)</span><input type="number" id="d-bal" value="12000" min="0"></label>
          <label class="field"><span>Annual interest rate (%)</span><input type="number" id="d-rate" value="19.99" min="0" step="0.01"></label>
          <label class="field"><span>Minimum payment ($ / month)</span><input type="number" id="d-min" value="300" min="0"></label>
          <label class="field"><span>What-if extra payment ($ / month)</span><input type="number" id="d-extra" value="150" min="0"></label>
        </div>
        <div id="debt-out" class="summary"></div>
      </div>
      <h2>Good debt / bad debt — a teaching frame</h2>
      <div class="grid two">
        <div class="card"><h3>Usually discussed as working debt</h3><p>A loan attached to an asset that can be sold, on a rate you can service from ordinary income, with a written exit. A home loan with an offset, or a well-documented investment loan, sits in this conversation. Still debt. Still risk.</p></div>
        <div class="card"><h3>Usually discussed as consuming debt</h3><p>Credit cards, buy-now-pay-later piles, car loans on rapidly depreciating vehicles when the rate is high. The thing bought does not help repay the loan.</p></div>
      </div>
      <p class="note"><span class="mark">▣</span><span>A joint mortgage for a community property is still joint and several. Trust is not a repayment strategy. Put the rule in a deed, and still assume the bank can pick any one borrower.</span></p>
      ${doneBtn("debt")}`;
  }
  function amortise(balance, annualRate, monthlyPay) {
    if (monthlyPay <= 0 || balance <= 0) return { months: 0, interest: 0, ok: false };
    const r = annualRate / 100 / 12; let bal = balance; let months = 0; let interest = 0; const cap = 600;
    while (bal > 0.5 && months < cap) {
      const int = bal * r; interest += int; const prin = monthlyPay - int;
      if (prin <= 0) return { months: Infinity, interest: Infinity, ok: false };
      bal = Math.max(0, bal - prin); months++;
    }
    return { months, interest, ok: months < cap };
  }
  function debtSketch() {
    const bal = num(val("d-bal")); const rate = num(val("d-rate")); const min = num(val("d-min")); const extra = num(val("d-extra"));
    const a = amortise(bal, rate, min); const b = amortise(bal, rate, min + extra);
    const el = document.getElementById("debt-out"); if (!el) return;
    function line(label, x) {
      if (!x.ok) return `<li>${label}: payment does not cover interest — balance will not clear on this setting.</li>`;
      return `<li>${label}: about <b>${x.months}</b> months (${(x.months / 12).toFixed(1)} yrs), interest sketched at <b>${money(x.interest)}</b></li>`;
    }
    el.innerHTML = `<ul>${line("Minimum only", a)}${line("Minimum + extra", b)}${a.ok && b.ok ? `<li>Interest not paid in the extra-pay sketch: <b>${money(Math.max(0, a.interest - b.interest))}</b></li>` : ""}</ul><p class="muted">Card rates often include promotional periods and default rates. Use the statement rate. Hardship arrangements exist — Moneysmart and the lender’s hardship team, not this page.</p>`;
  }
  function pageGlossary() {
    const terms = D.glossary.map((g) => `<div class="term" data-term="${esc(g.t.toLowerCase())} ${esc(g.d.toLowerCase())}"><h3>${esc(g.t)}</h3><p class="muted">${esc(g.d)}</p></div>`).join("");
    return `<h1>Glossary</h1><p class="lede">Words used in treasurer meetings and land meetings. Search filters this device only.</p><label class="field search"><span>Search</span><input type="search" id="gloss-q" placeholder="levy, concessional, Class 2…"></label><div id="gloss-list">${terms}</div>${doneBtn("glossary")}`;
  }
  function pageProgress() {
    const s = state();
    const rows = D.modules.map((m) => {
      const on = s.done[m.id]; const v = s.visited[m.id] || 0;
      return `<tr><td><span class="progress-dot ${on ? "on" : ""}"></span>${esc(m.title)}</td><td>${on ? "Reviewed" : "Open"}</td><td>${v || "—"}</td></tr>`;
    }).join("");
    return `<h1>Progress on this device</h1><p class="lede">No accounts. Marks live in localStorage. Clearing site data clears the ticks.</p><div class="scroll"><table><thead><tr><th>Module</th><th>Status</th><th>Opens logged</th></tr></thead><tbody>${rows}</tbody></table></div><div class="actions"><button class="btn-ghost btn" type="button" id="reset-progress">Clear my ticks</button></div>`;
  }
  function pageVillage() {
    return `
      <h1>Cohabitation / eco-village navigator</h1>
      <p class="lede">Legal, zoning, building and money questions that keep showing up when people want to live near each other without becoming each other’s bank or jailer.</p>
      <p class="note warn"><span class="mark">▣</span><span>Every pathway here ends with a question to a solicitor, planner or certifier. State schemes rename themselves. This page does not issue approvals.</span></p>
      <div class="grid two">
        <a class="card" href="#/structures"><span class="num">09</span><h2>Legal structures</h2><p>Title and governance models side by side.</p></a>
        <a class="card" href="#/zoning"><span class="num">10</span><h2>Zoning pathway</h2><p>A short questionnaire that writes the council question.</p></a>
        <a class="card" href="#/building"><span class="num">11</span><h2>Building-code primer</h2><p>Class 1 vs multi-dwelling flags, in questions.</p></a>
        <a class="card" href="#/shared"><span class="num">12</span><h2>Shared money</h2><p>Levies, sinking funds, joint vs several finance.</p></a>
        <a class="card" href="#/resources"><span class="num">13</span><h2>Directory</h2><p>Government portals by jurisdiction.</p></a>
        <a class="card" href="#/templates"><span class="num">14</span><h2>Checklists</h2><p>Co-ownership conversation list and sketches.</p></a>
      </div>`;
  }
  function pageStructures() {
    const cards = D.structures.map((s) => `<article class="card"><h3>${esc(s.name)}</h3><dl class="meta"><dt>Independence</dt><dd>${esc(s.independence)}</dd><dt>Exit</dt><dd>${esc(s.exit)}</dd><dt>Decisions</dt><dd>${esc(s.decisions)}</dd><dt>Liability</dt><dd>${esc(s.liability)}</dd></dl><p><b>Holds up when</b></p><ul>${s.pros.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><p><b>Breaks when</b></p><ul>${s.cons.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></article>`).join("");
    return `<h1>Ownership and governance models</h1><p class="lede">Pick the axis you care about — exit, control, or liability — and read across. Mixing a family investment aim with an asset-locked purpose entity is how groups stall for years.</p><div class="compare cols-2">${cards}</div><p class="note"><span class="mark">▣</span><span>Company title, co-ops and CLTs are often non-standard for home-loan desks. Speak to a broker who has settled that product in the last two years.</span></p>${doneBtn("structures")}`;
  }
  function pageZoning() {
    const s = state();
    return `
      <h1>Zoning — questions, not answers</h1>
      <p class="lede">Planning law is state + local. The useful output is a paragraph you can paste into a pre-application email.</p>
      <p class="note warn"><span class="mark">▣</span><span>Place is set to <b>${esc(s.jurisdiction)}</b> in the header. Change it if the lot is elsewhere.</span></p>
      <div class="q"><p><b>1. What already exists on the lot?</b></p><div class="choices">${choice("z-exist", "one-house", "One lawful house")}${choice("z-exist", "two-plus", "Two or more dwellings already")}${choice("z-exist", "vacant", "Vacant or shedding only")}${choice("z-exist", "moveable", "Moveable dwellings / vans already")}</div></div>
      <div class="q"><p><b>2. What do you want to add?</b></p><div class="choices">${choice("z-add", "secondary", "A smaller second dwelling")}${choice("z-add", "cluster", "Three or more dwellings / a cluster")}${choice("z-add", "common", "A common house or workshop")}${choice("z-add", "subdivide", "Separate titles (subdivision)")}</div></div>
      <div class="q"><p><b>3. Setting</b></p><div class="choices">${choice("z-set", "urban", "Town / suburban")}${choice("z-set", "rural", "Rural / rural-residential")}${choice("z-set", "unknown", "Not sure — will attach a map")}</div></div>
      <div id="zone-out" class="tree-out"></div>${doneBtn("zoning")}`;
  }
  function choice(name, value, label) {
    return `<label class="btn-ghost btn" style="min-height:2.4rem"><input type="radio" name="${name}" value="${value}"> ${esc(label)}</label>`;
  }
  function zoningSketch() {
    const exist = radio("z-exist"); const add = radio("z-add"); const set = radio("z-set");
    const j = state().jurisdiction; const hint = D.zoningHints[j] || D.zoningHints.NSW;
    const pathway = [];
    if (add === "secondary") pathway.push("Ask whether a secondary / ancillary dwelling (granny flat) is complying or needs a DA, and the maximum floor area.");
    if (add === "cluster") pathway.push("Ask whether multi-dwelling housing, dual occupancy, rural workers dwellings or a rural land-sharing / multiple-occupancy clause is the live pathway — and what the current instrument is actually called.");
    if (add === "common") pathway.push("Ask whether a common house is an additional dwelling, a change of use, or ancillary to residential — and whether food / public use changes the class.");
    if (add === "subdivide") pathway.push("Ask minimum lot size, access, and whether community title vs torrens subdivision is even contemplated in this zone.");
    if (exist === "moveable") pathway.push("Ask how moveable dwellings and tiny houses on wheels are defined — caravan, manufactured home, or dwelling — and the time limits.");
    if (set === "rural") pathway.push("Ask about on-site wastewater, bushfire attack level, and whether extra dwellings are tied to agriculture.");
    if (set === "urban") pathway.push("Ask parking, private open space and plot-ratio / R-Code style controls.");
    const el = document.getElementById("zone-out"); if (!el) return;
    if (!exist && !add && !set) { el.innerHTML = `<p>Answer the three questions. Below is the ${esc(j)} briefing you will still use.</p><p>${esc(hint)}</p>`; return; }
    el.innerHTML = `<p><b>Email draft for ${esc(j)} council / planning desk</b></p><p>We are looking at a lot in your local government area. Current occupation: ${esc(exist || "not stated")}. Intention: ${esc(add || "not stated")}. Setting: ${esc(set || "not stated")}. Could you confirm the zone and overlays, the correct name of the approval pathway, and whether a pre-lodgement meeting is offered?</p><ul>${pathway.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><p>${esc(hint)}</p>`;
  }
  function pageBuilding() {
    const blocks = D.buildingTopics.map((t) => `<div class="card"><h3>${esc(t.q)}</h3><p>${esc(t.a)}</p></div>`).join("");
    return `<h1>Building-code primer</h1><p class="lede">The National Construction Code is national; how a certifier classifies your cluster is the whole game. Read this as a briefing note for the first certifier call.</p><div class="grid two">${blocks}</div><p class="note"><span class="mark">▣</span><span>A tiny house built as a trailer and a tiny house built as a dwelling are different objects. Insurance, NCC and planning may each pick a different answer. Get all three in writing.</span></p>${doneBtn("building")}`;
  }
  function pageShared() {
    const blocks = D.sharedFinance.map((t) => `<div class="card"><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p></div>`).join("");
    return `<h1>Money inside a collective, without losing the individual</h1><p class="lede">Shared living fails more often on informal loans than on compost systems. Separate the household’s books from the common books.</p>${disclaimer()}<div class="grid two">${blocks}</div><h2>Levy sketch (group conversation, not a quote)</h2><div class="grid two"><div><label class="field"><span>Households</span><input type="number" id="h-n" value="6" min="2"></label><label class="field"><span>Annual shared operating costs ($)</span><input type="number" id="h-op" value="24000" min="0"></label><label class="field"><span>Annual sinking-fund target ($)</span><input type="number" id="h-sink" value="9000" min="0"></label></div><div id="levy-out" class="summary"></div></div>${doneBtn("shared")}`;
  }
  function levySketch() {
    const n = Math.max(1, num(val("h-n"))); const op = num(val("h-op")); const sink = num(val("h-sink"));
    const el = document.getElementById("levy-out"); if (!el) return;
    el.innerHTML = `<ul><li>Operating levy per household per month: <b>${money2((op / n) / 12)}</b></li><li>Sinking fund per household per month: <b>${money2((sink / n) / 12)}</b></li><li>Combined monthly call: <b>${money2(((op + sink) / n) / 12)}</b></li></ul><p class="muted">Equal splits are simple; they are unfair if one household uses the workshop as a business. Weighting rules belong in the deed.</p>`;
  }
  function pageResources() {
    const extra = loadResources(); const j = state().jurisdiction; const all = extra.concat(D.defaultResources);
    const rows = all.filter((r) => r.region === "AU" || r.region === j || r.region === "LOCAL").map((r) => `<tr><td>${esc(r.region)}</td><td><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)}</a></td><td>${esc(r.note || "")}</td></tr>`).join("");
    return `<h1>Resource directory</h1><p class="lede">Starting doors, not endorsements. Filtered to Australia plus <b>${esc(j)}</b>. Treasurers can add local links on the treasurer desk.</p><div class="scroll"><table><thead><tr><th>Region</th><th>Door</th><th>Why it is here</th></tr></thead><tbody>${rows}</tbody></table></div>${doneBtn("resources")}`;
  }
  function pageTemplates() {
    const checks = D.checklist.map((c, i) => `<label class="check"><input type="checkbox" data-tick="${i}"> <span>${esc(c)}</span></label>`).join("");
    const cases = D.caseStudies.map((c) => `<div class="card"><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div>`).join("");
    return `<h1>Checklists and sketches</h1><p class="lede">A conversation agenda for a co-ownership meeting. Adapt it; do not file it as a contract.</p><h2>Co-ownership agreement — things the deed must decide</h2>${checks}<div class="actions"><button class="btn-ghost btn" type="button" id="print-check">Print / save as PDF</button></div><h2>Sketches, not models to copy</h2><div class="grid">${cases}</div>${doneBtn("templates")}`;
  }
  function pageAdmin() {
    const unlocked = sessionStorage.getItem(ADMIN_KEY) === "1";
    if (!unlocked) {
      return `<h1>Treasurer desk</h1><p class="lede">Local only. Default pass-phrase is <span class="code">acerlab</span> — change it after first entry. This is not a multi-user server.</p><label class="field"><span>Pass-phrase</span><input type="password" id="admin-pass" autocomplete="current-password"></label><div class="actions"><button class="btn" type="button" id="admin-unlock">Unlock this browser</button></div>`;
    }
    const s = state(); const counts = {};
    for (const e of s.events) counts[e.n] = (counts[e.n] || 0) + 1;
    const rows = Object.keys(counts).sort().map((k) => `<tr><td>${esc(k)}</td><td>${counts[k]}</td></tr>`).join("") || `<tr><td colspan="2">No events yet on this device.</td></tr>`;
    const extra = loadResources();
    return `
      <h1>Treasurer desk</h1>
      <p class="lede">Update local resources and glance at anonymised module opens stored in this browser. There is no central member database on purpose.</p>
      <h2>Engagement on this device</h2>
      <div class="scroll"><table><thead><tr><th>Screen</th><th>Opens</th></tr></thead><tbody>${rows}</tbody></table></div>
      <h2>Add a local resource</h2>
      <label class="field"><span>Name</span><input type="text" id="r-name" placeholder="Local planner pre-app page"></label>
      <label class="field"><span>URL</span><input type="text" id="r-url" placeholder="https://"></label>
      <label class="field"><span>Note</span><input type="text" id="r-note" placeholder="Why a member would use it"></label>
      <label class="field"><span>Region tag</span><select id="r-region"><option value="LOCAL">LOCAL (always shown)</option>${D.jurisdictions.map((j) => `<option value="${j.id}">${j.id}</option>`).join("")}<option value="AU">AU</option></select></label>
      <div class="actions"><button class="btn" type="button" id="r-add">Add to this browser</button></div>
      <h2>Resources already added here</h2>
      <div class="scroll"><table><thead><tr><th>Region</th><th>Name</th><th></th></tr></thead><tbody>${extra.map((r, i) => `<tr><td>${esc(r.region)}</td><td>${esc(r.name)}</td><td><button class="btn-ghost btn" data-del-r="${i}" type="button">Remove</button></td></tr>`).join("") || `<tr><td colspan="3">None yet.</td></tr>`}</tbody></table></div>
      <h2>Pass-phrase</h2>
      <label class="field"><span>New pass-phrase (stored only here)</span><input type="password" id="new-pass"></label>
      <div class="actions"><button class="btn-ghost btn" type="button" id="set-pass">Save pass-phrase</button><button class="btn-ghost btn" type="button" id="admin-lock">Lock desk</button></div>
      <p class="muted">To publish directory edits for everyone, change <span class="code">data.js</span> in the GitHub repo and redeploy Cloudflare Pages. This desk does not write to GitHub.</p>`;
  }
  function loadResources() { try { return JSON.parse(localStorage.getItem("acerlab-nav-resources") || "[]"); } catch { return []; } }
  function saveResources(list) { localStorage.setItem("acerlab-nav-resources", JSON.stringify(list)); }
  function loadPass() { return localStorage.getItem("acerlab-nav-pass") || "acerlab"; }
  function val(id) { const el = document.getElementById(id); return el ? el.value : ""; }
  function num(v) { const n = parseFloat(v); return isFinite(n) ? n : 0; }
  function radio(name) { const el = document.querySelector(`input[name="${name}"]:checked`); return el ? el.value : ""; }
  function fillJurisdictions() {
    const sel = document.getElementById("jurisdiction"); const cur = state().jurisdiction;
    sel.innerHTML = D.jurisdictions.map((j) => `<option value="${j.id}" ${j.id === cur ? "selected" : ""}>${esc(j.name)}</option>`).join("");
  }
  function render() {
    const route = parseHash();
    document.getElementById("nav-desktop").innerHTML = navHtml(route);
    document.getElementById("nav-mobile").innerHTML = navHtml(route);
    document.getElementById("crumb-n").textContent = route.n;
    document.getElementById("crumb-label").textContent = route.label;
    document.title = `${route.label} — Navigator · Structure Lab AU`;
    const app = document.getElementById("app");
    const pages = { home: pageHome, finance: pageFinance, budget: pageBudget, wages: pageWages, savings: pageSavings, debt: pageDebt, glossary: pageGlossary, progress: pageProgress, village: pageVillage, structures: pageStructures, zoning: pageZoning, building: pageBuilding, shared: pageShared, resources: pageResources, templates: pageTemplates, admin: pageAdmin };
    app.innerHTML = (pages[route.id] || pageHome)();
    app.focus({ preventScroll: true });
    track(route.id);
    bindPage(route.id);
    document.getElementById("drawer").classList.remove("is-open");
  }
  function bindPage(id) {
    document.querySelectorAll("[data-done]").forEach((btn) => btn.addEventListener("click", () => markDone(btn.getAttribute("data-done"))));
    if (id === "budget") {
      document.querySelectorAll("[data-budget]").forEach((inp) => {
        inp.addEventListener("input", () => {
          patch((s) => { s.budget[inp.getAttribute("data-budget")] = num(inp.value); });
          const keep = document.activeElement && document.activeElement.getAttribute("data-budget");
          document.getElementById("app").innerHTML = pageBudget();
          bindPage("budget");
          if (keep) { const n = document.querySelector(`[data-budget="${keep}"]`); if (n) { n.focus(); n.selectionStart = n.selectionEnd = n.value.length; } }
        });
      });
    }
    if (id === "wages") { ["gross", "sacrifice", "sg"].forEach((i) => { const el = document.getElementById(i); if (el) el.addEventListener("input", wageSketch); }); wageSketch(); }
    if (id === "savings") { ["c-start", "c-month", "c-rate", "c-years"].forEach((i) => { const el = document.getElementById(i); if (el) el.addEventListener("input", compoundSketch); }); compoundSketch(); }
    if (id === "debt") { ["d-bal", "d-rate", "d-min", "d-extra"].forEach((i) => { const el = document.getElementById(i); if (el) el.addEventListener("input", debtSketch); }); debtSketch(); }
    if (id === "glossary") {
      const q = document.getElementById("gloss-q");
      if (q) q.addEventListener("input", () => {
        const needle = q.value.toLowerCase().trim();
        document.querySelectorAll("#gloss-list .term").forEach((el) => { el.style.display = !needle || el.getAttribute("data-term").includes(needle) ? "" : "none"; });
      });
    }
    if (id === "progress") { const b = document.getElementById("reset-progress"); if (b) b.addEventListener("click", () => { patch((s) => { s.done = {}; }); render(); }); }
    if (id === "zoning") { document.querySelectorAll("#app input[type=radio]").forEach((r) => r.addEventListener("change", zoningSketch)); zoningSketch(); }
    if (id === "shared") { ["h-n", "h-op", "h-sink"].forEach((i) => { const el = document.getElementById(i); if (el) el.addEventListener("input", levySketch); }); levySketch(); }
    if (id === "templates") { const p = document.getElementById("print-check"); if (p) p.addEventListener("click", () => window.print()); }
    if (id === "admin") {
      const un = document.getElementById("admin-unlock");
      if (un) un.addEventListener("click", () => {
        if (val("admin-pass") === loadPass()) { sessionStorage.setItem(ADMIN_KEY, "1"); render(); }
        else alert("Pass-phrase does not match what this browser has stored.");
      });
      const add = document.getElementById("r-add");
      if (add) add.addEventListener("click", () => {
        const item = { name: val("r-name"), url: val("r-url"), note: val("r-note"), region: val("r-region") };
        if (!item.name || !item.url) return;
        const list = loadResources(); list.push(item); saveResources(list); render();
      });
      document.querySelectorAll("[data-del-r]").forEach((b) => b.addEventListener("click", () => {
        const list = loadResources(); list.splice(Number(b.getAttribute("data-del-r")), 1); saveResources(list); render();
      }));
      const setp = document.getElementById("set-pass");
      if (setp) setp.addEventListener("click", () => { const p = val("new-pass"); if (p.length >= 6) { localStorage.setItem("acerlab-nav-pass", p); alert("Pass-phrase saved on this device."); } });
      const lock = document.getElementById("admin-lock");
      if (lock) lock.addEventListener("click", () => { sessionStorage.removeItem(ADMIN_KEY); render(); });
    }
  }
  document.getElementById("open-nav").addEventListener("click", () => document.getElementById("drawer").classList.add("is-open"));
  document.getElementById("close-nav").addEventListener("click", () => document.getElementById("drawer").classList.remove("is-open"));
  document.getElementById("jurisdiction").addEventListener("change", (e) => { patch((s) => { s.jurisdiction = e.target.value; }); render(); });
  window.addEventListener("hashchange", render);
  fillJurisdictions();
  if (!location.hash) location.hash = "#/";
  render();
})();
