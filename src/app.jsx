import React, { useState, useEffect } from 'react';

// --- Color Palette ---
const COLORS = {
  bg: '#050505',
  card: '#121212',
  cardBorder: '#2A2A2A',
  primary: '#FFFFFF',
  secondary: '#A0A0A0',
  accent: '#5E5CE6',     // Purple accent
  danger: '#FF453A',     // Red for danger
  success: '#32D74B',    // Green for positive stats
  inputBg: '#1C1C1E',
};

// --- Web SVG Icons (Resolves Netlify Missing Module Errors) ---
const MaterialCommunityIcons = ({ name, size = 22, color = COLORS.secondary, style }) => {
  const iconPaths = {
    'cog': <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>,
    'view-dashboard-outline': <path d="M13 3v6h8V3h-8m2 2h4v2h-4V5M3 3v10h8V3H3m2 2h4v6H5V5m8 6v10h8V11h-8m2 2h4v6h-4v-6M3 15v6h8v-6H3m2 2h4v2H5v-2Z"/>,
    'chart-bar': <path d="M22 21H2V3h2v16h18v2M6 10h3v7H6v-7m5-5h3v12h-3V5m5 3h3v9h-3V8Z"/>,
    'plus': <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/>,
    'microphone': <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3m6 10a1 1 0 0 0-2 0a4 4 0 0 1-8 0a1 1 0 0 0-2 0a6 6 0 0 0 5 5.91V20H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-2.09A6 6 0 0 0 18 12Z"/>,
    'camera-plus-outline': <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 14H4V7h4.05l1.83-2h4.24l1.83 2H20v12M12 8a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"/>,
    'google-analytics': <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m.5 4.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M8 17.5A1.5 1.5 0 1 1 8 14.5a1.5 1.5 0 0 1 0 3m4.5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m4.5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3Z"/>,
    'wallet-outline': <path d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9m-9-2h10V8H12v8m4-2.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3Z"/>,
    'forum-outline': <path d="M15 4H5c-1.1 0-2 .9-2 2v12l4-4h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 8H6.83L5 13.83V6h10v6m4-2h-2v2h2v4.17L17.17 14H11v2h7l4 4V10c0-1.1-.9-2-2-2Z"/>,
    'account-circle-outline': <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6m0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22Z"/>,
    'translate': <path d="m12.87 15.07l-2.54-2.51l.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11l.76-2.04M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12m-2.62 7l1.62-4.33L19.12 17h-3.24Z"/>,
    'chevron-up': <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"/>,
    'chevron-down': <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41Z"/>,
    'chevron-right': <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41Z"/>,
    'trash': <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"/>,
    'pencil': <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"/>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      {iconPaths[name] || <circle cx="12" cy="12" r="10" fill={color} />}
    </svg>
  );
};

const Ionicons = ({ name, size = 24, color = COLORS.primary }) => {
  const iconPaths = {
    'arrow-back': <path d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {iconPaths[name] || <circle cx="12" cy="12" r="10" fill={color} />}
    </svg>
  );
};


// ===== FINWISE data layer =====
const CATS = ['Food', 'Transport', 'Leisure', 'Shopping', 'Health', 'Other'];
const SYM = { EUR: '€', USD: '$', GBP: '£', INR: '₹' };
const DEF_BUD = { Food: 300, Transport: 120, Leisure: 150, Shopping: 150, Health: 80, Other: 100 };
const DEF_PROFILE = { name: '', email: '', income: 0, currency: 'EUR', language: 'English', notify: true, compact: false, confirmDelete: true };
const uid = () => Math.random().toString(36).slice(2, 9);
const today = () => new Date().toISOString().slice(0, 10);
const mk = (d) => (d || '').slice(0, 7);
const num = (v) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
const sum = (a, f = (x) => x) => a.reduce((s, x) => s + f(x), 0);

function useLocal(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

const series = (ex, n, cat) => {
  const out = [], t = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const dt = new Date(t.getFullYear(), t.getMonth() - i, 1);
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
    out.push({ key, label: dt.toLocaleString('en', { month: 'short' }),
      total: sum(ex.filter((e) => mk(e.date) === key && (!cat || e.category === cat)), (e) => e.amount) });
  }
  return out;
};

const download = (name, text, type) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click();
};

const X = {
  body: { padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  card: { background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 16 },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 },
  btn: { background: COLORS.accent, color: '#fff', border: 0, borderRadius: 12, padding: '10px 14px', fontWeight: 600, cursor: 'pointer' },
  ghost: { background: 'transparent', color: COLORS.secondary, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: '8px 12px', cursor: 'pointer' },
  icon: { background: 'none', border: 0, cursor: 'pointer', padding: 6 },
  track: { height: 8, borderRadius: 4, background: COLORS.inputBg, overflow: 'hidden', marginTop: 6 },
  sub: { color: COLORS.secondary, fontSize: '0.85em' },
  big: { fontSize: '1.5em', fontWeight: 700, marginTop: 4 },
  toast: { position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: COLORS.accent, color: '#fff', padding: '10px 18px', borderRadius: 20, zIndex: 9 },
};

const Card = ({ children, style }) => <div style={{ ...X.card, ...style }}>{children}</div>;
const Stat = ({ label, value, color }) => (
  <Card><p style={X.sub}>{label}</p><p style={{ ...X.big, color: color || COLORS.primary }}>{value}</p></Card>
);
const Meter = ({ pct, color }) => (
  <div style={X.track}><div style={{ width: `${Math.min(100, pct)}%`, height: '100%', background: color || (pct > 100 ? COLORS.danger : pct > 80 ? '#FFD60A' : COLORS.accent) }} /></div>
);
const Bars = ({ data, h = 110 }) => {
  const max = Math.max(1, ...data.map((x) => x.total));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: h + 20 }}>
      {data.map((x) => (
        <div key={x.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ width: '70%', height: Math.max(2, (x.total / max) * h), borderRadius: 4, background: x.total === max && x.total > 0 ? COLORS.danger : COLORS.accent }} />
          <p style={{ fontSize: 10, color: COLORS.secondary, marginTop: 4 }}>{x.label}</p>
        </div>
      ))}
    </div>
  );
};
const Field = ({ label, children }) => (<><p style={styles.label}>{label}</p>{children}</>);
const Chips = ({ items, value, onPick }) => (
  <div style={{ ...styles.categorySelector, flexWrap: 'wrap' }}>
    {items.map((c) => (
      <button key={c} style={{ ...styles.catChip, ...(value === c ? styles.catChipActive : {}) }} onClick={() => onPick(c)}>
        <p style={{ ...styles.catText, ...(value === c ? styles.catTextActive : {}) }}>{c}</p>
      </button>
    ))}
  </div>
);

// ===== App =====
export default function App() {
  const [screen, setScreen] = useState('Menu');
  const [expenses, setExpenses] = useLocal('finwise.expenses', []);
  const [fixed, setFixed] = useLocal('finwise.fixed', []);
  const [weekly, setWeekly] = useLocal('finwise.weekly', []);
  const [budgets, setBudgets] = useLocal('finwise.budgets', DEF_BUD);
  const [profile, setProfile] = useLocal('finwise.profile', DEF_PROFILE);
  const [toast, setToast] = useState('');
  const [editing, setEditing] = useState(null);
  const sym = SYM[profile.currency] || '€';
  const money = (n) => `${sym} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const notify = (m) => { if (profile.notify) { setToast(m); setTimeout(() => setToast(''), 2200); } };
  const confirmDel = (m) => !profile.confirmDelete || window.confirm(m);
  const month = mk(today());
  const monthExp = expenses.filter((e) => mk(e.date) === month);
  const spent = sum(monthExp, (e) => e.amount);
  const fixedTotal = sum(fixed, (f) => f.amount);
  const budgetTotal = sum(Object.values(budgets));
  const byCat = CATS.map((c) => ({ cat: c, spent: sum(monthExp.filter((e) => e.category === c), (e) => e.amount), budget: num(budgets[c]) }));
  const d = { expenses, setExpenses, fixed, setFixed, weekly, setWeekly, budgets, setBudgets, profile, setProfile,
    money, sym, notify, confirmDel, editing, setEditing, spent, fixedTotal, budgetTotal, byCat, monthExp,
    go: setScreen, back: () => setScreen('Menu') };
  const S = { Menu: MenuScreen, Dashboard: DashboardScreen, NewFlexibleExpense: ExpenseScreen, WeeklyVariables: WeeklyScreen,
    AnnualOverview: AnnualScreen, BudgetHub: BudgetScreen, FullScopeAnalysis: AnalysisScreen, TalkToUs: TalkScreen, Profile: ProfileScreen }[screen] || MenuScreen;
  return (
    <div style={{ ...styles.container, fontSize: profile.compact ? 13 : 15 }}>
      <style>{`*{box-sizing:border-box}p{margin:0}input,select,textarea,button{font-family:inherit}`}</style>
      <S d={d} />
      {toast && <div style={X.toast}>{toast}</div>}
    </div>
  );
}

// ===== Menu =====
const MenuScreen = ({ d }) => {
  const [open, setOpen] = useState('Variable Expenses');
  return (
    <div style={styles.screenWrapper}>
      <div style={styles.header}>
        <div style={styles.logoRow}><span style={{ fontSize: 20, marginRight: 8 }}>💰</span><p style={styles.logoText}>FINWISE</p></div>
        <button style={styles.iconBtn} onClick={() => d.go('Profile')}><MaterialCommunityIcons name="cog" size={24} /></button>
      </div>
      <div style={styles.scrollContent}>
        <p style={{ ...X.sub, marginBottom: 8 }}>{d.profile.name ? `Welcome, ${d.profile.name}` : 'Welcome to FINWISE'}</p>
        <MenuItem icon="view-dashboard-outline" label="Dashboard" onClick={() => d.go('Dashboard')} />
        <Accordion title="Variable Expenses" isOpen={open === 'Variable Expenses'} onToggle={() => setOpen(open ? null : 'Variable Expenses')}>
          <SubMenuItem label="New Flexible Expense" highlight onClick={() => { d.setEditing(null); d.go('NewFlexibleExpense'); }} />
          <SubMenuItem label="Weekly Variables (editable)" onClick={() => d.go('WeeklyVariables')} />
          <SubMenuItem label="Monthly Summary" onClick={() => d.go('AnnualOverview')} />
        </Accordion>
        <MenuItem icon="chart-bar" label="Annual Overview (Aggregated)" onClick={() => d.go('AnnualOverview')} />
        <MenuItem icon="wallet-outline" label="Budget Hub" onClick={() => d.go('BudgetHub')} />
        <MenuItem icon="google-analytics" label="Full-Scope Analysis" onClick={() => d.go('FullScopeAnalysis')} />
        <MenuItem icon="forum-outline" label="Talk to Us" onClick={() => d.go('TalkToUs')} />
        <MenuItem icon="account-circle-outline" label="Profile & Settings" onClick={() => d.go('Profile')} />
      </div>
    </div>
  );
};

// ===== Dashboard =====
const DashboardScreen = ({ d }) => {
  const remaining = d.profile.income - d.fixedTotal - d.spent;
  const util = d.budgetTotal ? (d.spent / d.budgetTotal) * 100 : 0;
  const recent = [...d.expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const pressure = [...d.byCat].filter((c) => c.budget).sort((a, b) => b.spent / b.budget - a.spent / a.budget);
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Dashboard" onBack={d.back} />
      <div style={X.body}>
        <div style={X.grid}>
          <Stat label="Spent this month" value={d.money(d.spent)} />
          <Stat label="Remaining income" value={d.money(remaining)} color={remaining < 0 ? COLORS.danger : COLORS.success} />
          <Stat label="Fixed commitments" value={d.money(d.fixedTotal)} />
          <Stat label="Variable budget used" value={`${util.toFixed(0)}%`} color={util > 100 ? COLORS.danger : COLORS.primary} />
        </div>
        {!d.profile.income && <Card><p style={X.sub}>Set your monthly income in Profile & Settings to see remaining income.</p></Card>}
        <Card>
          <p style={{ fontWeight: 600 }}>Category pressure</p>
          {pressure.map((c) => (
            <div key={c.cat} style={{ marginTop: 10 }}>
              <div style={X.row}><p>{c.cat}</p><p style={X.sub}>{d.money(c.spent)} / {d.money(c.budget)}</p></div>
              <Meter pct={(c.spent / c.budget) * 100} />
            </div>
          ))}
        </Card>
        <Card>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>12-month spending pulse</p>
          <Bars data={series(d.expenses, 12)} />
        </Card>
        <Card>
          <p style={{ fontWeight: 600 }}>Recent transactions</p>
          {recent.length === 0 && <p style={X.sub}>No expenses yet. Add your first one.</p>}
          {recent.map((e) => (
            <div key={e.id} style={{ ...X.row, marginTop: 10 }}>
              <div><p>{e.name}</p><p style={X.sub}>{e.category} · {e.date}</p></div>
              <p style={{ fontWeight: 600 }}>{d.money(e.amount)}</p>
            </div>
          ))}
        </Card>
        <button style={X.btn} onClick={() => { d.setEditing(null); d.go('NewFlexibleExpense'); }}>+ New Expense</button>
      </div>
    </div>
  );
};

// ===== Expense management =====
const blank = () => ({ name: '', amount: '', category: 'Food', date: today(), notes: '', att: null });
const ExpenseScreen = ({ d }) => {
  const [f, setF] = useState(d.editing ? { ...d.editing, amount: String(d.editing.amount) } : blank());
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = () => {
    if (!f.name.trim()) return d.notify('Please enter a name');
    if (num(f.amount) <= 0) return d.notify('Amount must be greater than 0');
    if (!f.date) return d.notify('Please pick a date');
    const rec = { ...f, name: f.name.trim(), amount: num(f.amount), id: f.id || uid() };
    d.setExpenses(f.id ? d.expenses.map((e) => (e.id === f.id ? rec : e)) : [...d.expenses, rec]);
    d.notify(f.id ? 'Expense updated' : 'Expense saved');
    d.setEditing(null); setF(blank());
  };
  const del = (e) => { if (d.confirmDel(`Delete "${e.name}"?`)) { d.setExpenses(d.expenses.filter((x) => x.id !== e.id)); d.notify('Expense deleted'); } };
  const pick = (ev) => {
    const file = ev.target.files[0]; if (!file) return;
    if (file.size > 250000) { setF({ ...f, att: { name: file.name, type: file.type } }); return d.notify('Over 250 KB: only the file name is kept'); }
    const r = new FileReader();
    r.onload = () => setF((p) => ({ ...p, att: { name: file.name, type: file.type, url: r.result } }));
    r.readAsDataURL(file);
  };
  const listen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return d.notify('Speech input is not supported in this browser');
    const r = new SR();
    r.onresult = (ev) => {
      const t = ev.results[0][0].transcript, m = t.match(/\d+(?:[.,]\d+)?/);
      const cat = CATS.find((c) => t.toLowerCase().includes(c.toLowerCase()));
      setF((p) => ({ ...p, name: t.replace(/\d+(?:[.,]\d+)?/, '').replace(/\b(euros?|dollars?|rupees?|pounds?)\b/gi, '').trim() || p.name,
        amount: m ? m[0].replace(',', '.') : p.amount, category: cat || p.category }));
    };
    r.onerror = () => d.notify('Could not hear you, try again');
    r.start(); d.notify('Listening… say e.g. "lunch 12 food"');
  };
  const list = [...d.expenses].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title={f.id ? 'Edit Expense' : 'New Expense'} onBack={d.back} />
      <div style={styles.formContainer}>
        <label style={{ ...styles.uploadArea, cursor: 'pointer' }}>
          {f.att?.url && f.att.type.startsWith('image') ? <img src={f.att.url} alt="bill" style={{ maxHeight: 120, borderRadius: 8 }} />
            : <MaterialCommunityIcons name="camera-plus-outline" size={40} />}
          <p style={styles.uploadText}>{f.att ? f.att.name : 'Scan or Upload Bill (image/PDF)'}</p>
          {f.att?.url && f.att.type === 'application/pdf' && <a href={f.att.url} target="_blank" rel="noreferrer" style={{ color: COLORS.accent }}>Preview PDF</a>}
          <input type="file" accept="image/*,application/pdf" onChange={pick} style={{ display: 'none' }} />
        </label>
        <button style={{ ...X.ghost, marginTop: 10 }} onClick={listen}><MaterialCommunityIcons name="microphone" size={18} /> Quick entry by voice</button>
        <Field label="Expense Name"><input style={styles.input} value={f.name} onChange={set('name')} placeholder="e.g. Dinner at Mario's" /></Field>
        <Field label={`Amount (${d.sym})`}><input style={styles.input} type="number" min="0" value={f.amount} onChange={set('amount')} placeholder="0.00" /></Field>
        <Field label="Category"><Chips items={CATS} value={f.category} onPick={(c) => setF({ ...f, category: c })} /></Field>
        <Field label="Date"><input style={styles.input} type="date" value={f.date} onChange={set('date')} /></Field>
        <Field label="Notes"><input style={styles.input} value={f.notes} onChange={set('notes')} placeholder="Optional" /></Field>
        <button style={styles.saveBtn} onClick={save}><p style={styles.saveBtnText}>{f.id ? 'Update Expense' : 'Save Expense'}</p></button>
        {f.id && <button style={{ ...X.ghost, marginTop: 8, width: '100%' }} onClick={() => { d.setEditing(null); setF(blank()); }}>Cancel edit</button>}
      </div>
      <div style={X.body}>
        <p style={{ fontWeight: 600 }}>All expenses ({list.length})</p>
        {list.map((e) => (
          <Card key={e.id}>
            <div style={X.row}>
              <div><p>{e.name}</p><p style={X.sub}>{e.category} · {e.date}{e.att ? ' · 📎' : ''}</p>{e.notes && <p style={X.sub}>{e.notes}</p>}</div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 600 }}>{d.money(e.amount)}</p>
                <button style={X.icon} onClick={() => { d.setEditing(e); setF({ ...e, amount: String(e.amount) }); window.scrollTo(0, 0); }}><MaterialCommunityIcons name="pencil" size={18} /></button>
                <button style={X.icon} onClick={() => del(e)}><MaterialCommunityIcons name="trash" size={18} color={COLORS.danger} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ===== Weekly variables =====
const WeeklyScreen = ({ d }) => {
  const [name, setName] = useState(''), [amt, setAmt] = useState('');
  const add = () => {
    if (!name.trim() || num(amt) <= 0) return d.notify('Enter a name and an amount');
    d.setWeekly([...d.weekly, { id: uid(), name: name.trim(), amount: num(amt) }]); setName(''); setAmt(''); d.notify('Weekly item added');
  };
  const total = sum(d.weekly, (w) => w.amount);
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Weekly Variables" onBack={d.back} />
      <div style={X.body}>
        <div style={X.grid}><Stat label="Per week" value={d.money(total)} /><Stat label="Monthly equivalent" value={d.money((total * 52) / 12)} /></div>
        {d.weekly.map((w) => (
          <Card key={w.id} style={X.row}>
            <input style={{ ...styles.input, flex: 2 }} value={w.name} onChange={(e) => d.setWeekly(d.weekly.map((x) => (x.id === w.id ? { ...x, name: e.target.value } : x)))} />
            <input style={{ ...styles.input, flex: 1 }} type="number" value={w.amount} onChange={(e) => d.setWeekly(d.weekly.map((x) => (x.id === w.id ? { ...x, amount: num(e.target.value) } : x)))} />
            <button style={X.icon} onClick={() => d.confirmDel(`Delete "${w.name}"?`) && d.setWeekly(d.weekly.filter((x) => x.id !== w.id))}><MaterialCommunityIcons name="trash" size={18} color={COLORS.danger} /></button>
          </Card>
        ))}
        <Card>
          <Field label="New weekly item"><input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Groceries" /></Field>
          <Field label={`Weekly amount (${d.sym})`}><input style={styles.input} type="number" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
          <button style={{ ...X.btn, marginTop: 12, width: '100%' }} onClick={add}>Add</button>
        </Card>
      </div>
    </div>
  );
};

// ===== Annual overview =====
const AnnualScreen = ({ d }) => {
  const [n, setN] = useState(12), [cat, setCat] = useState('All');
  const data = series(d.expenses, n, cat === 'All' ? null : cat);
  const year = String(new Date().getFullYear());
  const ytd = sum(d.expenses.filter((e) => e.date.startsWith(year) && (cat === 'All' || e.category === cat)), (e) => e.amount);
  const peak = data.reduce((a, b) => (b.total > a.total ? b : a), data[0]);
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Annual Overview" onBack={d.back} />
      <div style={X.body}>
        <Chips items={['6 months', '12 months']} value={`${n} months`} onPick={(c) => setN(parseInt(c))} />
        <Chips items={['All', ...CATS]} value={cat} onPick={setCat} />
        <Card><p style={{ fontWeight: 600, marginBottom: 8 }}>Variable spending · {cat}</p><Bars data={data} h={140} /></Card>
        <div style={X.grid}>
          <Stat label="Year to date" value={d.money(ytd)} />
          <Stat label="Avg monthly variable" value={d.money(sum(data, (x) => x.total) / n)} />
          <Stat label="Peak month" value={peak.total ? `${peak.label} · ${d.money(peak.total)}` : '—'} />
        </div>
      </div>
    </div>
  );
};

// ===== Budget Hub =====
const BudgetScreen = ({ d }) => {
  const [nf, setNf] = useState({ name: '', amount: '', due: '1' });
  const add = () => {
    const due = Math.round(num(nf.due));
    if (!nf.name.trim() || num(nf.amount) <= 0 || due < 1 || due > 31) return d.notify('Enter name, amount and a due day (1-31)');
    d.setFixed([...d.fixed, { id: uid(), name: nf.name.trim(), amount: num(nf.amount), due }]); setNf({ name: '', amount: '', due: '1' }); d.notify('Fixed expense added');
  };
  const upd = (id, k, v) => d.setFixed(d.fixed.map((f) => (f.id === id ? { ...f, [k]: v } : f)));
  const day = new Date().getDate();
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Budget Hub" onBack={d.back} />
      <div style={X.body}>
        <Card>
          <p style={{ fontWeight: 600 }}>Category budgets (monthly)</p>
          {d.byCat.map((c) => (
            <div key={c.cat} style={{ marginTop: 12 }}>
              <div style={X.row}>
                <p>{c.cat}</p>
                <input style={{ ...styles.input, width: 110, margin: 0 }} type="number" value={d.budgets[c.cat] ?? 0} onChange={(e) => d.setBudgets({ ...d.budgets, [c.cat]: num(e.target.value) })} />
              </div>
              <p style={X.sub}>{d.money(c.spent)} used</p>
              <Meter pct={c.budget ? (c.spent / c.budget) * 100 : 0} />
            </div>
          ))}
        </Card>
        <Card>
          <p style={{ fontWeight: 600 }}>Fixed recurring expenses · {d.money(d.fixedTotal)}</p>
          {d.fixed.map((f) => (
            <div key={f.id} style={{ marginTop: 12 }}>
              <div style={X.row}>
                <input style={{ ...styles.input, flex: 2, margin: 0 }} value={f.name} onChange={(e) => upd(f.id, 'name', e.target.value)} />
                <input style={{ ...styles.input, flex: 1, margin: 0 }} type="number" value={f.amount} onChange={(e) => upd(f.id, 'amount', num(e.target.value))} />
                <button style={X.icon} onClick={() => d.confirmDel(`Delete "${f.name}"?`) && d.setFixed(d.fixed.filter((x) => x.id !== f.id))}><MaterialCommunityIcons name="trash" size={18} color={COLORS.danger} /></button>
              </div>
              <div style={{ ...X.row, justifyContent: 'flex-start', marginTop: 6 }}>
                <p style={X.sub}>Due day</p>
                <input style={{ ...styles.input, width: 70, margin: 0 }} type="number" min="1" max="31" value={f.due} onChange={(e) => upd(f.id, 'due', num(e.target.value))} />
                <p style={{ ...X.sub, color: f.due >= day && f.due - day <= 5 ? '#FFD60A' : COLORS.secondary }}>
                  {f.due >= day ? (f.due === day ? 'due today' : `in ${f.due - day} days`) : 'next month'}
                </p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <input style={styles.input} placeholder="Name (e.g. Rent)" value={nf.name} onChange={(e) => setNf({ ...nf, name: e.target.value })} />
            <input style={styles.input} type="number" placeholder="Amount" value={nf.amount} onChange={(e) => setNf({ ...nf, amount: e.target.value })} />
            <input style={styles.input} type="number" placeholder="Due day of month" value={nf.due} onChange={(e) => setNf({ ...nf, due: e.target.value })} />
            <button style={{ ...X.btn, marginTop: 12, width: '100%' }} onClick={add}>Add fixed expense</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ===== Full-scope analysis =====
const AnalysisScreen = ({ d }) => {
  const top = [...d.byCat].sort((a, b) => b.spent - a.spent)[0];
  const share = d.spent && top ? (top.spent / d.spent) * 100 : 0;
  const breaches = d.byCat.filter((c) => c.budget && c.spent > c.budget);
  const headroom = d.budgetTotal - d.spent;
  const total = d.fixedTotal + d.spent;
  const fixedShare = total ? (d.fixedTotal / total) * 100 : 0;
  const tips = [];
  if (share > 45) tips.push(`${top.cat} is ${share.toFixed(0)}% of your variable spend. Review it first.`);
  breaches.forEach((c) => tips.push(`${c.cat} is ${d.money(c.spent - c.budget)} over budget. Pause it or raise the budget deliberately.`));
  if (d.profile.income && fixedShare > 0 && d.fixedTotal / d.profile.income > 0.5) tips.push('Fixed commitments exceed 50% of income, leaving little flexibility.');
  if (headroom > 0 && !breaches.length) tips.push(`You have ${d.money(headroom)} of budget headroom this month.`);
  if (!tips.length) tips.push('Add expenses and budgets to unlock insights.');
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Full-Scope Analysis" onBack={d.back} />
      <div style={X.body}>
        <div style={X.grid}>
          <Stat label="Top category" value={top && top.spent ? `${top.cat} ${share.toFixed(0)}%` : '—'} />
          <Stat label="Budget breaches" value={breaches.length} color={breaches.length ? COLORS.danger : COLORS.success} />
          <Stat label="Budget headroom" value={d.money(headroom)} color={headroom < 0 ? COLORS.danger : COLORS.success} />
        </div>
        <Card>
          <p style={{ fontWeight: 600 }}>Fixed vs variable mix</p>
          <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', marginTop: 10, background: COLORS.inputBg }}>
            <div style={{ width: `${fixedShare}%`, background: COLORS.accent }} /><div style={{ flex: 1, background: COLORS.success }} />
          </div>
          <p style={{ ...X.sub, marginTop: 6 }}>Fixed {d.money(d.fixedTotal)} ({fixedShare.toFixed(0)}%) · Variable {d.money(d.spent)}</p>
        </Card>
        <Card>
          <p style={{ fontWeight: 600 }}>Spending concentration</p>
          {d.byCat.filter((c) => c.spent).sort((a, b) => b.spent - a.spent).map((c) => (
            <div key={c.cat} style={{ marginTop: 10 }}><div style={X.row}><p>{c.cat}</p><p style={X.sub}>{((c.spent / d.spent) * 100).toFixed(0)}%</p></div><Meter pct={(c.spent / d.spent) * 100} color={COLORS.accent} /></div>
          ))}
        </Card>
        <Card><p style={{ fontWeight: 600, marginBottom: 6 }}>Insights</p>{tips.map((t, i) => <p key={i} style={{ marginTop: 8 }}>• {t}</p>)}</Card>
      </div>
    </div>
  );
};

// ===== Talk to Us =====
const TalkScreen = ({ d }) => {
  const [msgs, setMsgs] = useLocal('finwise.feedback', []);
  const [t, setT] = useState('');
  const send = () => { if (!t.trim()) return d.notify('Write a message first'); setMsgs([{ id: uid(), text: t.trim(), date: today() }, ...msgs]); setT(''); d.notify('Saved on this device'); };
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Talk to Us" onBack={d.back} />
      <div style={X.body}>
        <Card>
          <textarea style={{ ...styles.input, minHeight: 90 }} value={t} onChange={(e) => setT(e.target.value)} placeholder="Feedback or a question…" />
          <button style={{ ...X.btn, marginTop: 10, width: '100%' }} onClick={send}>Send</button>
        </Card>
        {msgs.map((m) => <Card key={m.id}><p style={X.sub}>{m.date}</p><p>{m.text}</p></Card>)}
      </div>
    </div>
  );
};

// ===== Profile, settings & data portability =====
const ProfileScreen = ({ d }) => {
  const p = d.profile, set = (k, v) => d.setProfile({ ...p, [k]: v });
  const csv = () => {
    const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
    download('finwise-expenses.csv', ['date,name,category,amount,notes', ...d.expenses.map((e) => [e.date, q(e.name), e.category, e.amount, q(e.notes)].join(','))].join('\n'), 'text/csv');
  };
  const backup = () => download('finwise-backup.json', JSON.stringify({ expenses: d.expenses, fixed: d.fixed, weekly: d.weekly, budgets: d.budgets, profile: p }, null, 2), 'application/json');
  const restore = (ev) => {
    const file = ev.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const j = JSON.parse(r.result);
        if (!Array.isArray(j.expenses) || !Array.isArray(j.fixed)) throw new Error();
        d.setExpenses(j.expenses); d.setFixed(j.fixed); d.setWeekly(Array.isArray(j.weekly) ? j.weekly : []);
        d.setBudgets(j.budgets || DEF_BUD); d.setProfile({ ...DEF_PROFILE, ...(j.profile || {}) }); d.notify('Backup restored');
      } catch { d.notify('Invalid backup file'); }
    };
    r.readAsText(file);
  };
  const Toggle = ({ k, label }) => (
    <div style={{ ...X.row, padding: '8px 0' }}><p>{label}</p><input type="checkbox" checked={p[k]} onChange={(e) => set(k, e.target.checked)} style={{ width: 20, height: 20, accentColor: COLORS.accent }} /></div>
  );
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Profile & Settings" onBack={d.back} />
      <div style={X.body}>
        <Card>
          <Field label="Name"><input style={styles.input} value={p.name} onChange={(e) => set('name', e.target.value)} /></Field>
          <Field label="Email"><input style={styles.input} type="email" value={p.email} onChange={(e) => set('email', e.target.value)} /></Field>
          <Field label="Monthly income"><input style={styles.input} type="number" value={p.income} onChange={(e) => set('income', num(e.target.value))} /></Field>
          <Field label="Currency"><select style={styles.input} value={p.currency} onChange={(e) => set('currency', e.target.value)}>{Object.keys(SYM).map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Language (UI text is English for now)"><select style={styles.input} value={p.language} onChange={(e) => set('language', e.target.value)}>{['English', 'Deutsch', 'Español', 'Français', 'हिन्दी'].map((c) => <option key={c}>{c}</option>)}</select></Field>
        </Card>
        <Card>
          <Toggle k="notify" label="Notifications" /><Toggle k="compact" label="Compact mode" /><Toggle k="confirmDelete" label="Confirm before deleting" />
        </Card>
        <Card>
          <p style={{ fontWeight: 600, marginBottom: 10 }}>Your data</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button style={X.ghost} onClick={csv}>Export CSV</button>
            <button style={X.ghost} onClick={backup}>Backup JSON</button>
            <label style={{ ...X.ghost, display: 'inline-block' }}>Restore JSON<input type="file" accept="application/json" onChange={restore} style={{ display: 'none' }} /></label>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Helper Components ---
const ScreenHeader = ({ title, onBack }) => (
  <div style={styles.screenHeader}>
    <button onClick={onBack} style={styles.backBtn}>
      <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
    </button>
    <p style={styles.screenTitle}>{title}</p>
    <div style={{ width: 24 }} /> 
  </div>
);


const MenuItem = ({ icon, label, onClick }) => (
  <button style={styles.menuItem} onClick={onClick}>
    {icon && <MaterialCommunityIcons name={icon} size={22} color={COLORS.secondary} style={{ marginRight: '12px' }} />}
    <p style={styles.menuText}>{label}</p>
  </button>
);

const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div style={styles.accordionContainer}>
    <button style={styles.accordionHeader} onClick={onToggle}>
      <p style={{ ...styles.menuText, ...(isOpen ? { color: COLORS.primary } : {}) }}>{title}</p>
      <MaterialCommunityIcons name={isOpen ? "chevron-up" : "chevron-down"} size={24} color={COLORS.secondary} />
    </button>
    {isOpen && <div style={styles.accordionContent}>{children}</div>}
  </div>
);

const SubMenuItem = ({ label, highlight, onClick }) => (
  <button style={styles.subMenuItem} onClick={onClick}>
    <p style={{ ...styles.subText, ...(highlight ? { color: COLORS.primary, fontWeight: '600' } : {}) }}>{label}</p>
    {highlight && <MaterialCommunityIcons name="chevron-right" size={16} color={COLORS.secondary} />}
  </button>
);

// --- CSS Stylesheet Object ---
const styles = {
  container: {
    backgroundColor: COLORS.bg,
    color: COLORS.primary,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  screenWrapper: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: COLORS.bg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderLeft: `1px solid ${COLORS.cardBorder}`,
    borderRight: `1px solid ${COLORS.cardBorder}`,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 16px',
    borderBottom: `1px solid ${COLORS.cardBorder}`,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '1px',
    margin: 0,
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  scrollContent: {
    flex: 1,
    padding: '16px',
    paddingBottom: '80px',
    overflowY: 'auto',
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '14px 12px',
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  menuText: {
    fontSize: '15px',
    fontWeight: '500',
    color: COLORS.primary,
    margin: 0,
    flex: 1,
  },
  accordionContainer: {
    marginBottom: '10px',
    backgroundColor: COLORS.card,
    borderRadius: '10px',
    border: `1px solid ${COLORS.cardBorder}`,
    overflow: 'hidden',
  },
  accordionHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  accordionContent: {
    padding: '0 12px 12px 12px',
    borderTop: `1px solid ${COLORS.cardBorder}`,
  },
  subMenuItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #1A1A1A',
    cursor: 'pointer',
    textAlign: 'left',
  },
  subText: {
    fontSize: '14px',
    color: COLORS.secondary,
    margin: 0,
  },
  fixedList: {
    paddingTop: '8px',
  },
  fixedItemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
  },
  fixedItemText: {
    fontSize: '14px',
    color: COLORS.secondary,
    margin: 0,
  },
  fixedItemCost: {
    fontSize: '14px',
    color: COLORS.primary,
    margin: 0,
  },
  addFixedBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: '10px 0 4px 0',
    cursor: 'pointer',
  },
  divider: {
    height: '1px',
    backgroundColor: COLORS.cardBorder,
    margin: '16px 0',
  },
  footerAction: {
    position: 'sticky',
    bottom: '20px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 16px',
    marginTop: 'auto',
  },
  recordBtn: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLORS.danger,
    padding: '12px 28px',
    borderRadius: '30px',
    border: 'none',
    boxShadow: '0 4px 14px rgba(255, 69, 58, 0.4)',
    cursor: 'pointer',
  },
  recordBtnText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: '8px',
    fontSize: '15px',
    margin: '0 0 0 8px',
  },
  screenHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: `1px solid ${COLORS.cardBorder}`,
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  screenTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: COLORS.primary,
    margin: 0,
  },
  formContainer: {
    padding: '20px',
  },
  uploadArea: {
    width: '100%',
    padding: '30px',
    borderRadius: '12px',
    border: `2px dashed ${COLORS.cardBorder}`,
    backgroundColor: COLORS.card,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  uploadText: {
    color: COLORS.secondary,
    fontSize: '14px',
    marginTop: '10px',
    margin: '10px 0 0 0',
  },
  label: {
    color: COLORS.secondary,
    fontSize: '13px',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.inputBg,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: '8px',
    padding: '14px',
    color: COLORS.primary,
    fontSize: '15px',
    outline: 'none',
    marginBottom: '16px',
    boxSizing: 'border-box',
  },
  categorySelector: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  catChip: {
    padding: '8px 16px',
    borderRadius: '20px',
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.cardBorder}`,
    cursor: 'pointer',
  },
  catChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  catText: {
    fontSize: '13px',
    color: COLORS.secondary,
    margin: 0,
  },
  catTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  saveBtn: {
    width: '100%',
    backgroundColor: COLORS.accent,
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
  saveBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: '15px',
    margin: 0,
  },
  chartContainer: {
    padding: '20px',
    margin: '20px',
    backgroundColor: COLORS.card,
    borderRadius: '12px',
    border: `1px solid ${COLORS.cardBorder}`,
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
  },
  chartSubtitle: {
    fontSize: '12px',
    color: COLORS.secondary,
    marginTop: '4px',
  },
  barChart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '180px',
    marginTop: '20px',
    paddingTop: '20px',
  },
  barColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: '18px',
    borderRadius: '4px',
    transition: 'height 0.3s ease',
  },
  barLabel: {
    fontSize: '12px',
    color: COLORS.secondary,
    marginTop: '8px',
    margin: '8px 0 0 0',
  },
  statCard: {
    margin: '0 20px',
    padding: '20px',
    backgroundColor: COLORS.card,
    borderRadius: '12px',
    border: `1px solid ${COLORS.cardBorder}`,
  },
  statLabel: {
    fontSize: '13px',
    color: COLORS.secondary,
    margin: 0,
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: COLORS.success,
    marginTop: '6px',
    margin: '6px 0 0 0',
  },
};
