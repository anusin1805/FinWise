import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- Color Palette ---
const COLORS = {
  bg: '#050505',
  card: '#121212',
  cardBorder: '#2A2A2A',
  primary: '#FFFFFF',
  secondary: '#A0A0A0',
  accent: '#5E5CE6',
  danger: '#FF453A',
  success: '#32D74B',
  inputBg: '#1C1C1E',
  warning: '#FF9F0A',
};

// --- Custom Hook: Local Storage ---
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };
  return [storedValue, setValue];
}

// --- Web SVG Icons ---
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
    'delete': <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/>,
    'pencil': <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"/>,
    'download': <path d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7Z"/>,
    'upload': <path d="M9 16h6v-6h4l-7-7-7 7h4v6m-4 2h14v2H5v-2Z"/>,
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

// --- Main App Component & Global State ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu');
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  // Persistence States
  const [settings, setSettings] = useLocalStorage('finwise_settings', {
    name: 'User',
    email: '',
    income: 4000,
    currency: '€',
    language: 'English',
    notifications: true,
    compact: false,
    deleteConfirm: true,
  });

  const [expenses, setExpenses] = useLocalStorage('finwise_expenses', [
    { id: '1', name: 'Groceries', amount: 85.50, category: 'Food', date: new Date().toISOString(), notes: '', image: null }
  ]);

  const [fixedExpenses, setFixedExpenses] = useLocalStorage('finwise_fixed', [
    { id: 'f1', name: 'Home Rent', amount: 1200, dueDate: '1' },
    { id: 'f2', name: 'Internet', amount: 50, dueDate: '15' }
  ]);

  const [budgets, setBudgets] = useLocalStorage('finwise_budgets', {
    Food: 400, Transport: 150, Leisure: 200, Shopping: 250
  });

  // Navigation Helpers
  const navigateTo = (screen, context = null) => {
    if (context?.editId) setEditingExpenseId(context.editId);
    else setEditingExpenseId(null);
    setCurrentScreen(screen);
  };
  const goBack = () => setCurrentScreen('Menu');

  // Shared Data Calculation logic
  const totalFixed = fixedExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const currentMonthExpenses = expenses.filter(e => new Date(e.date).getMonth() === new Date().getMonth());
  const totalVariable = currentMonthExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const remainingIncome = settings.income - totalFixed - totalVariable;

  // Screen Switcher
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Menu':
        return <MenuScreen navigate={navigateTo} fixedExpenses={fixedExpenses} settings={settings} />;
      case 'Dashboard':
        return <DashboardScreen onBack={goBack} navigate={navigateTo} settings={settings} expenses={currentMonthExpenses} totalFixed={totalFixed} totalVariable={totalVariable} remainingIncome={remainingIncome} budgets={budgets} />;
      case 'NewFlexibleExpense':
        return <ExpenseFormScreen onBack={goBack} expenses={expenses} setExpenses={setExpenses} editId={editingExpenseId} settings={settings} />;
      case 'WeeklyVariables':
        return <WeeklyVariablesScreen onBack={goBack} budgets={budgets} setBudgets={setBudgets} settings={settings} />;
      case 'AnnualOverview':
        return <AnnualOverviewScreen onBack={goBack} expenses={expenses} fixedExpenses={fixedExpenses} settings={settings} />;
      case 'BudgetHub':
        return <BudgetHubScreen onBack={goBack} fixedExpenses={fixedExpenses} setFixedExpenses={setFixedExpenses} budgets={budgets} setBudgets={setBudgets} settings={settings} currentMonthExpenses={currentMonthExpenses} />;
      case 'FullScopeAnalysis':
        return <FullScopeAnalysisScreen onBack={goBack} expenses={expenses} totalFixed={totalFixed} totalVariable={totalVariable} settings={settings} budgets={budgets} />;
      case 'Profile':
        return <ProfileSettingsScreen onBack={goBack} settings={settings} setSettings={setSettings} expenses={expenses} fixedExpenses={fixedExpenses} budgets={budgets} setExpenses={setExpenses} setFixedExpenses={setFixedExpenses} setBudgets={setBudgets} />;
      case 'TalkToUs':
        return <PlaceholderScreen title="Talk to Us" onBack={goBack} />;
      default:
        return <MenuScreen navigate={navigateTo} fixedExpenses={fixedExpenses} settings={settings} />;
    }
  };

  return (
    <div style={styles.container}>
      {renderScreen()}
    </div>
  );
}

// --- 1. Main Menu Screen ---
const MenuScreen = ({ navigate, fixedExpenses, settings }) => {
  const [expandedSection, setExpandedSection] = useState('Variable Expenses');
  const toggleSection = (section) => setExpandedSection(expandedSection === section ? null : section);

  return (
    <div style={styles.screenWrapper}>
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span style={{ fontSize: '20px', marginRight: '8px' }}>💰</span>
          <p style={styles.logoText}>FINWISE</p>
        </div>
        <button style={styles.iconBtn} onClick={() => navigate('Profile')}>
          <MaterialCommunityIcons name="cog" size={24} color={COLORS.secondary} />
        </button>
      </div>

      <div style={styles.scrollContent}>
        <MenuItem icon="view-dashboard-outline" label="Dashboard" onClick={() => navigate('Dashboard')} />

        <Accordion title="Variable Expenses" isOpen={expandedSection === 'Variable Expenses'} onToggle={() => toggleSection('Variable Expenses')}>
          <SubMenuItem label="New Flexible Expense" highlight onClick={() => navigate('NewFlexibleExpense')} />
          <SubMenuItem label="Weekly Variables (editable)" onClick={() => navigate('WeeklyVariables')} />
          <SubMenuItem label="Monthly Summary" onClick={() => navigate('AnnualOverview')} />
        </Accordion>

        <MenuItem icon="chart-bar" label="Annual Overview (Aggregated)" onClick={() => navigate('AnnualOverview')} />

        <Accordion title="Fixed Expenses" isOpen={expandedSection === 'Fixed Expenses'} onToggle={() => toggleSection('Fixed Expenses')}>
          <div style={styles.fixedList}>
            {fixedExpenses.map((item) => (
              <div key={item.id} style={styles.fixedItemRow}>
                <p style={styles.fixedItemText}>{item.name}</p>
                <p style={styles.fixedItemCost}>{settings.currency}{Number(item.amount).toFixed(2)}</p>
              </div>
            ))}
            <button style={styles.addFixedBtn} onClick={() => navigate('BudgetHub')}>
              <MaterialCommunityIcons name="plus" size={16} color={COLORS.accent} />
              <p style={{ ...styles.subText, color: COLORS.accent, marginLeft: '6px' }}>Manage Fixed Expenses</p>
            </button>
          </div>
        </Accordion>

        <MenuItem icon="google-analytics" label="Full-Scope Analysis" onClick={() => navigate('FullScopeAnalysis')} />
        <MenuItem icon="wallet-outline" label="Budget Hub" onClick={() => navigate('BudgetHub')} />
        <MenuItem icon="forum-outline" label="Talk to Us" onClick={() => navigate('TalkToUs')} />
        
        <div style={styles.divider} />
        <MenuItem icon="account-circle-outline" label="Profile & Settings" onClick={() => navigate('Profile')} />
      </div>

      <div style={styles.footerAction}>
        <button style={styles.recordBtn} onClick={() => navigate('NewFlexibleExpense')}>
          <MaterialCommunityIcons name="microphone" size={22} color="#fff" />
          <p style={styles.recordBtnText}>Record</p>
        </button>
      </div>
    </div>
  );
};

// --- 2. Dashboard Screen (Replaces Placeholder) ---
const DashboardScreen = ({ onBack, navigate, settings, expenses, totalFixed, totalVariable, remainingIncome, budgets }) => {
  const totalBudget = Object.values(budgets).reduce((a,b) => a+b, 0);
  const budgetUtilization = totalBudget > 0 ? (totalVariable / totalBudget) * 100 : 0;

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Dashboard" onBack={onBack} />
      <div style={styles.scrollContent}>
        
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Remaining Monthly Income</p>
          <p style={{...styles.statValue, color: remainingIncome < 0 ? COLORS.danger : COLORS.success}}>
            {settings.currency}{remainingIncome.toFixed(2)}
          </p>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '12px'}}>
            <div>
              <p style={styles.subText}>Income: {settings.currency}{settings.income}</p>
              <p style={styles.subText}>Fixed: -{settings.currency}{totalFixed}</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <p style={styles.subText}>Variable: -{settings.currency}{totalVariable.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div style={styles.chartContainer}>
          <p style={styles.chartTitle}>Variable Budget Utilization</p>
          <p style={styles.chartSubtitle}>{budgetUtilization.toFixed(1)}% of {settings.currency}{totalBudget} limit</p>
          <ProgressBar progress={budgetUtilization} color={budgetUtilization > 90 ? COLORS.danger : COLORS.accent} />
        </div>

        <div style={styles.chartContainer}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p style={styles.chartTitle}>Recent Transactions</p>
            <button style={styles.backBtn} onClick={() => navigate('NewFlexibleExpense')}><MaterialCommunityIcons name="plus" color={COLORS.accent}/></button>
          </div>
          {expenses.slice(-3).reverse().map(exp => (
            <div key={exp.id} style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${COLORS.cardBorder}`}}>
              <div onClick={() => navigate('NewFlexibleExpense', {editId: exp.id})} style={{cursor: 'pointer'}}>
                <p style={{margin: 0, fontSize: '14px', color: COLORS.primary}}>{exp.name}</p>
                <p style={{margin: 0, fontSize: '12px', color: COLORS.secondary}}>{exp.category} • {new Date(exp.date).toLocaleDateString()}</p>
              </div>
              <p style={{margin: 0, fontSize: '14px', fontWeight: 'bold', color: COLORS.danger}}>-{settings.currency}{Number(exp.amount).toFixed(2)}</p>
            </div>
          ))}
          {expenses.length === 0 && <p style={styles.subText}>No recent transactions.</p>}
        </div>
      </div>
    </div>
  );
};

// --- 3. Expense Form Screen (Add/Edit, Speech, Image) ---
const ExpenseFormScreen = ({ onBack, expenses, setExpenses, editId, settings }) => {
  const isEdit = !!editId;
  const existing = isEdit ? expenses.find(e => e.id === editId) : null;
  
  const [name, setName] = useState(existing?.name || '');
  const [amount, setAmount] = useState(existing?.amount || '');
  const [category, setCategory] = useState(existing?.category || 'Food');
  const [date, setDate] = useState(existing?.date ? existing.date.split('T')[0] : new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState(existing?.notes || '');
  const [imagePreview, setImagePreview] = useState(existing?.image || null);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  const handleSave = () => {
    if (!name || !amount) { setError("Name and Amount are required."); return; }
    const newExpense = {
      id: isEdit ? editId : Date.now().toString(),
      name, amount: Number(amount), category, date: new Date(date).toISOString(), notes, image: imagePreview
    };

    if (isEdit) {
      setExpenses(expenses.map(e => e.id === editId ? newExpense : e));
    } else {
      setExpenses([...expenses, newExpense]);
    }
    onBack();
  };

  const handleDelete = () => {
    if(settings.deleteConfirm && !window.confirm("Delete this expense?")) return;
    setExpenses(expenses.filter(e => e.id !== editId));
    onBack();
  };

  const startSpeechToText = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Speech-to-text not supported in this browser."); return; }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setName(prev => prev ? prev + ' ' + transcript : transcript);
    };
    recognition.start();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title={isEdit ? "Edit Expense" : "New Expense"} onBack={onBack}>
        {isEdit && <button style={styles.backBtn} onClick={handleDelete}><MaterialCommunityIcons name="delete" color={COLORS.danger}/></button>}
      </ScreenHeader>
      
      <div style={styles.scrollContent}>
        {error && <p style={{color: COLORS.danger, fontSize: '13px', marginBottom: '10px'}}>{error}</p>}
        
        <input type="file" accept="image/*,application/pdf" style={{display: 'none'}} ref={fileInputRef} onChange={handleImageUpload} />
        <button style={styles.uploadArea} onClick={() => fileInputRef.current.click()}>
          {imagePreview ? (
            <img src={imagePreview} alt="Bill Preview" style={{width: '100%', maxHeight: '120px', objectFit: 'contain'}} />
          ) : (
             <>
               <MaterialCommunityIcons name="camera-plus-outline" size={40} color={COLORS.secondary} />
               <p style={styles.uploadText}>Scan or Upload Bill</p>
             </>
          )}
        </button>

        <div style={{display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '16px'}}>
          <div style={{flex: 1}}>
            <p style={styles.label}>Expense Name</p>
            <input style={{...styles.input, marginBottom: 0}} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Dinner" />
          </div>
          <button style={{...styles.iconBtn, backgroundColor: COLORS.card, padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.cardBorder}`}} onClick={startSpeechToText}>
            <MaterialCommunityIcons name="microphone" color={COLORS.accent} />
          </button>
        </div>

        <p style={styles.label}>Amount ({settings.currency})</p>
        <input style={styles.input} type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" />

        <p style={styles.label}>Date</p>
        <input style={styles.input} type="date" value={date} onChange={e=>setDate(e.target.value)} />

        <p style={styles.label}>Category</p>
        <div style={styles.categorySelector}>
          {['Food', 'Transport', 'Leisure', 'Shopping'].map((cat) => (
            <button key={cat} style={{...styles.catChip, ...(category === cat ? styles.catChipActive : {})}} onClick={() => setCategory(cat)}>
              <p style={{...styles.catText, ...(category === cat ? styles.catTextActive : {})}}>{cat}</p>
            </button>
          ))}
        </div>

        <p style={styles.label}>Notes</p>
        <textarea style={{...styles.input, minHeight: '60px', resize: 'vertical'}} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Additional details..." />

        <button style={styles.saveBtn} onClick={handleSave}>
          <p style={styles.saveBtnText}>{isEdit ? 'Update Expense' : 'Save Expense'}</p>
        </button>
      </div>
    </div>
  );
};

// --- 4. Screen: Weekly Variables ---
const WeeklyVariablesScreen = ({ onBack, budgets, setBudgets, settings }) => {
  const handleChange = (cat, val) => setBudgets({...budgets, [cat]: Number(val)});
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Category Budgets" onBack={onBack} />
      <div style={styles.scrollContent}>
        <p style={{ color: COLORS.secondary, marginBottom: '20px', fontSize: '14px' }}>Adjust your monthly category limits.</p>
        {Object.keys(budgets).map((cat) => (
          <div key={cat} style={{ marginBottom: '20px' }}>
            <label style={{ color: COLORS.secondary, marginBottom: '8px', fontSize: '14px', display: 'block' }}>{cat} Budget ({settings.currency})</label>
            <input type="number" value={budgets[cat]} onChange={(e) => handleChange(cat, e.target.value)} style={styles.input} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 5. Screen: Budget Hub ---
const BudgetHubScreen = ({ onBack, fixedExpenses, setFixedExpenses, budgets, settings, currentMonthExpenses }) => {
  const [newFixedName, setNewFixedName] = useState('');
  const [newFixedAmount, setNewFixedAmount] = useState('');
  const [newFixedDate, setNewFixedDate] = useState('1');

  const addFixed = () => {
    if(!newFixedName || !newFixedAmount) return;
    setFixedExpenses([...fixedExpenses, { id: Date.now().toString(), name: newFixedName, amount: newFixedAmount, dueDate: newFixedDate }]);
    setNewFixedName(''); setNewFixedAmount('');
  };

  const deleteFixed = (id) => setFixedExpenses(fixedExpenses.filter(f => f.id !== id));

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Budget Hub" onBack={onBack} />
      <div style={styles.scrollContent}>
        <div style={styles.chartContainer}>
          <p style={styles.chartTitle}>Category Utilization</p>
          <div style={{marginTop: '16px'}}>
            {Object.keys(budgets).map(cat => {
              const spent = currentMonthExpenses.filter(e => e.category === cat).reduce((a,b)=>a+Number(b.amount),0);
              const limit = budgets[cat];
              const pct = limit > 0 ? Math.min((spent/limit)*100, 100) : 0;
              return (
                <div key={cat} style={{marginBottom: '12px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p style={styles.subText}>{cat}</p>
                    <p style={{...styles.subText, color: pct >= 100 ? COLORS.danger : COLORS.secondary}}>{settings.currency}{spent.toFixed(0)} / {limit}</p>
                  </div>
                  <ProgressBar progress={pct} color={pct >= 100 ? COLORS.danger : COLORS.success} />
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.chartContainer}>
          <p style={styles.chartTitle}>Fixed Recurring Expenses</p>
          {fixedExpenses.map(f => (
            <div key={f.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${COLORS.cardBorder}`}}>
              <div>
                <p style={{margin: 0, fontSize: '14px'}}>{f.name}</p>
                <p style={{margin: 0, fontSize: '12px', color: COLORS.secondary}}>Due: Day {f.dueDate}</p>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <p style={{margin: 0, fontSize: '14px', color: COLORS.primary}}>{settings.currency}{Number(f.amount).toFixed(2)}</p>
                <button style={styles.backBtn} onClick={()=>deleteFixed(f.id)}><MaterialCommunityIcons name="delete" color={COLORS.danger}/></button>
              </div>
            </div>
          ))}
          <div style={{marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
             <input style={{...styles.input, flex: 2, marginBottom: 0, padding: '10px'}} placeholder="Name" value={newFixedName} onChange={e=>setNewFixedName(e.target.value)} />
             <input style={{...styles.input, flex: 1, marginBottom: 0, padding: '10px'}} type="number" placeholder="Amt" value={newFixedAmount} onChange={e=>setNewFixedAmount(e.target.value)} />
             <input style={{...styles.input, flex: 1, marginBottom: 0, padding: '10px'}} type="number" placeholder="Day" value={newFixedDate} onChange={e=>setNewFixedDate(e.target.value)} />
             <button style={{...styles.saveBtn, marginTop: 0, width: '100%'}} onClick={addFixed}><p style={styles.saveBtnText}>Add Fixed</p></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 6. Screen: Annual Overview ---
const AnnualOverviewScreen = ({ onBack, expenses, fixedExpenses, settings }) => {
  const [viewMode, setViewMode] = useState(6); // 6 or 12

  const monthlyData = useMemo(() => {
    const data = Array(viewMode).fill(0);
    const labels = [];
    const now = new Date();
    for (let i = viewMode - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(d.toLocaleString('default', { month: 'short' }));
      const monthExp = expenses.filter(e => {
        const ed = new Date(e.date);
        return ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear();
      }).reduce((a,b)=>a+Number(b.amount),0);
      data[viewMode - 1 - i] = monthExp + fixedExpenses.reduce((a,b)=>a+Number(b.amount),0);
    }
    return { data, labels };
  }, [expenses, fixedExpenses, viewMode]);

  const maxVal = Math.max(...monthlyData.data, 1);
  const ytdSpending = expenses.filter(e => new Date(e.date).getFullYear() === new Date().getFullYear()).reduce((a,b)=>a+Number(b.amount),0) + (fixedExpenses.reduce((a,b)=>a+Number(b.amount),0) * (new Date().getMonth() + 1));

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Annual Overview" onBack={onBack} />
      <div style={styles.scrollContent}>
        
        <div style={{display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px'}}>
          <button style={{...styles.catChip, ...(viewMode===6 ? styles.catChipActive : {})}} onClick={()=>setViewMode(6)}><p style={{...styles.catText, ...(viewMode===6?styles.catTextActive:{})}}>6 Months</p></button>
          <button style={{...styles.catChip, ...(viewMode===12 ? styles.catChipActive : {})}} onClick={()=>setViewMode(12)}><p style={{...styles.catText, ...(viewMode===12?styles.catTextActive:{})}}>12 Months</p></button>
        </div>

        <div style={styles.chartContainer}>
          <p style={styles.chartTitle}>Total Expenses Trend</p>
          <p style={styles.chartSubtitle}>Fixed + Variable</p>
          <div style={styles.barChart}>
            {monthlyData.data.map((h, i) => (
              <div key={i} style={styles.barColumn}>
                <div style={{...styles.bar, height: `${(h/maxVal)*120}px`, backgroundColor: h > settings.income ? COLORS.danger : COLORS.accent }} />
                <p style={styles.barLabel}>{monthlyData.labels[i]}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Year to Date (Total)</p>
          <p style={styles.statValue}>{settings.currency} {ytdSpending.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

// --- 7. Screen: Full-Scope Analysis ---
const FullScopeAnalysisScreen = ({ onBack, expenses, totalFixed, totalVariable, settings, budgets }) => {
  const totalSpend = totalFixed + totalVariable;
  const fixedMix = totalSpend > 0 ? (totalFixed / totalSpend) * 100 : 0;
  const variableMix = totalSpend > 0 ? (totalVariable / totalSpend) * 100 : 0;
  
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});
  const topCategory = Object.entries(categoryTotals).sort((a,b)=>b[1]-a[1])[0];

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Full-Scope Analysis" onBack={onBack} />
      <div style={styles.scrollContent}>
        
        <div style={styles.chartContainer}>
          <p style={styles.chartTitle}>Fixed vs Variable Mix</p>
          <div style={{display: 'flex', height: '20px', borderRadius: '10px', overflow: 'hidden', marginTop: '16px'}}>
            <div style={{width: `${fixedMix}%`, backgroundColor: COLORS.secondary}} />
            <div style={{width: `${variableMix}%`, backgroundColor: COLORS.accent}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px'}}>
            <p style={styles.subText}>Fixed: {fixedMix.toFixed(0)}%</p>
            <p style={styles.subText}>Variable: {variableMix.toFixed(0)}%</p>
          </div>
        </div>

        <div style={styles.chartContainer}>
          <p style={styles.chartTitle}>Spending Concentration</p>
          {topCategory ? (
            <p style={{fontSize: '14px', color: COLORS.primary, marginTop: '8px'}}>
              Your highest spending is in <strong style={{color: COLORS.warning}}>{topCategory[0]}</strong>, consuming {settings.currency}{topCategory[1].toFixed(2)} of your variable funds.
            </p>
          ) : <p style={styles.subText}>Not enough data yet.</p>}
        </div>

        <div style={styles.chartContainer}>
          <p style={styles.chartTitle}>Budget Headroom Insight</p>
          <p style={{fontSize: '14px', color: COLORS.primary, marginTop: '8px', lineHeight: '1.4'}}>
            {totalSpend > settings.income ? (
               <span style={{color: COLORS.danger}}>Critical: You are overspending your monthly income by {settings.currency}{(totalSpend - settings.income).toFixed(2)}. Adjust variable budgets immediately.</span>
            ) : (
               <span style={{color: COLORS.success}}>Healthy: You have a surplus of {settings.currency}{(settings.income - totalSpend).toFixed(2)} this month. Consider allocating to savings.</span>
            )}
          </p>
        </div>

      </div>
    </div>
  );
};

// --- 8. Screen: Profile & Settings ---
const ProfileSettingsScreen = ({ onBack, settings, setSettings, expenses, fixedExpenses, budgets, setExpenses, setFixedExpenses, setBudgets }) => {
  const updateSetting = (key, value) => setSettings({...settings, [key]: value});

  const exportJSON = () => {
    const data = JSON.stringify({ settings, expenses, fixedExpenses, budgets }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'finwise_backup.json';
    a.click();
  };

  const exportCSV = () => {
    let csv = 'ID,Name,Amount,Category,Date,Notes\n';
    expenses.forEach(e => { csv += `"${e.id}","${e.name}","${e.amount}","${e.category}","${e.date}","${e.notes}"\n`; });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'finwise_expenses.csv';
    a.click();
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (parsed.settings) setSettings(parsed.settings);
          if (parsed.expenses) setExpenses(parsed.expenses);
          if (parsed.fixedExpenses) setFixedExpenses(parsed.fixedExpenses);
          if (parsed.budgets) setBudgets(parsed.budgets);
          alert("Data restored successfully!");
        } catch(err) { alert("Invalid backup file."); }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Profile & Settings" onBack={onBack} />
      <div style={styles.scrollContent}>
        
        <p style={styles.label}>Name</p>
        <input style={styles.input} value={settings.name} onChange={e=>updateSetting('name', e.target.value)} />
        
        <p style={styles.label}>Monthly Income</p>
        <input style={styles.input} type="number" value={settings.income} onChange={e=>updateSetting('income', Number(e.target.value))} />
        
        <p style={styles.label}>Currency Symbol</p>
        <input style={styles.input} value={settings.currency} onChange={e=>updateSetting('currency', e.target.value)} maxLength={3}/>

        <div style={styles.divider} />
        <p style={styles.chartTitle}>Data Portability</p>
        
        <div style={{display: 'flex', gap: '10px', marginTop: '16px'}}>
          <button style={{...styles.catChip, flex: 1, display: 'flex', justifyContent: 'center', gap: '6px'}} onClick={exportJSON}>
            <MaterialCommunityIcons name="download" color={COLORS.primary} size={18} />
            <p style={{...styles.catText, color: COLORS.primary}}>Backup (JSON)</p>
          </button>
          <button style={{...styles.catChip, flex: 1, display: 'flex', justifyContent: 'center', gap: '6px'}} onClick={exportCSV}>
            <MaterialCommunityIcons name="download" color={COLORS.primary} size={18} />
            <p style={{...styles.catText, color: COLORS.primary}}>Export (CSV)</p>
          </button>
        </div>
        
        <label style={{...styles.catChip, display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px', cursor: 'pointer', backgroundColor: COLORS.cardBorder}}>
            <MaterialCommunityIcons name="upload" color={COLORS.primary} size={18} />
            <p style={{...styles.catText, color: COLORS.primary}}>Restore Backup</p>
            <input type="file" accept=".json" style={{display: 'none'}} onChange={importJSON} />
        </label>

      </div>
    </div>
  );
};

// --- Shared UI Components ---
const ScreenHeader = ({ title, onBack, children }) => (
  <div style={styles.screenHeader}>
    <button onClick={onBack} style={styles.backBtn}><Ionicons name="arrow-back" size={24} color={COLORS.primary} /></button>
    <p style={styles.screenTitle}>{title}</p>
    <div style={{ width: 24, display: 'flex', justifyContent: 'center' }}>{children}</div>
  </div>
);

const PlaceholderScreen = ({ title, onBack }) => (
  <div style={styles.screenWrapper}>
    <ScreenHeader title={title} onBack={onBack} />
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
      <p style={{ color: COLORS.secondary }}>Feature coming soon</p>
    </div>
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

const ProgressBar = ({ progress, color }) => (
  <div style={{width: '100%', height: '8px', backgroundColor: COLORS.inputBg, borderRadius: '4px', overflow: 'hidden'}}>
    <div style={{width: `${Math.min(progress, 100)}%`, height: '100%', backgroundColor: color, transition: 'width 0.3s'}} />
  </div>
);

// --- CSS Stylesheet Object ---
const styles = {
  container: { backgroundColor: COLORS.bg, color: COLORS.primary, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' },
  screenWrapper: { width: '100%', maxWidth: '480px', backgroundColor: COLORS.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', borderLeft: `1px solid ${COLORS.cardBorder}`, borderRight: `1px solid ${COLORS.cardBorder}` },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 16px', borderBottom: `1px solid ${COLORS.cardBorder}` },
  logoRow: { display: 'flex', alignItems: 'center' },
  logoText: { fontSize: '18px', fontWeight: '700', letterSpacing: '1px', margin: 0 },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  scrollContent: { flex: 1, padding: '16px', paddingBottom: '80px', overflowY: 'auto' },
  menuItem: { width: '100%', display: 'flex', alignItems: 'center', padding: '14px 12px', backgroundColor: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', textAlign: 'left' },
  menuText: { fontSize: '15px', fontWeight: '500', color: COLORS.primary, margin: 0, flex: 1 },
  accordionContainer: { marginBottom: '10px', backgroundColor: COLORS.card, borderRadius: '10px', border: `1px solid ${COLORS.cardBorder}`, overflow: 'hidden' },
  accordionHeader: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' },
  accordionContent: { padding: '0 12px 12px 12px', borderTop: `1px solid ${COLORS.cardBorder}` },
  subMenuItem: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 8px', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #1A1A1A', cursor: 'pointer', textAlign: 'left' },
  subText: { fontSize: '14px', color: COLORS.secondary, margin: 0 },
  fixedList: { paddingTop: '8px' },
  fixedItemRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0' },
  fixedItemText: { fontSize: '14px', color: COLORS.secondary, margin: 0 },
  fixedItemCost: { fontSize: '14px', color: COLORS.primary, margin: 0 },
  addFixedBtn: { display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: '10px 0 4px 0', cursor: 'pointer' },
  divider: { height: '1px', backgroundColor: COLORS.cardBorder, margin: '16px 0' },
  footerAction: { position: 'sticky', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 16px', marginTop: 'auto' },
  recordBtn: { display: 'flex', alignItems: 'center', backgroundColor: COLORS.danger, padding: '12px 28px', borderRadius: '30px', border: 'none', boxShadow: '0 4px 14px rgba(255, 69, 58, 0.4)', cursor: 'pointer' },
  recordBtnText: { color: '#FFF', fontWeight: '600', marginLeft: '8px', fontSize: '15px', margin: '0 0 0 8px' },
  screenHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: `1px solid ${COLORS.cardBorder}` },
  backBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' },
  screenTitle: { fontSize: '17px', fontWeight: '600', color: COLORS.primary, margin: 0 },
  uploadArea: { width: '100%', padding: '30px', borderRadius: '12px', border: `2px dashed ${COLORS.cardBorder}`, backgroundColor: COLORS.card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', cursor: 'pointer', overflow: 'hidden' },
  uploadText: { color: COLORS.secondary, fontSize: '14px', margin: '10px 0 0 0' },
  label: { color: COLORS.secondary, fontSize: '13px', marginBottom: '8px' },
  input: { width: '100%', backgroundColor: COLORS.inputBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px', padding: '14px', color: COLORS.primary, fontSize: '15px', outline: 'none', marginBottom: '16px', boxSizing: 'border-box' },
  categorySelector: { display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' },
  catChip: { padding: '8px 16px', borderRadius: '20px', backgroundColor: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, cursor: 'pointer' },
  catChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  catText: { fontSize: '13px', color: COLORS.secondary, margin: 0 },
  catTextActive: { color: '#FFF', fontWeight: '600' },
  saveBtn: { width: '100%', backgroundColor: COLORS.accent, padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '10px' },
  saveBtnText: { color: '#FFF', fontWeight: '600', fontSize: '15px', margin: 0 },
  chartContainer: { padding: '20px', marginBottom: '20px', backgroundColor: COLORS.card, borderRadius: '12px', border: `1px solid ${COLORS.cardBorder}` },
  chartTitle: { fontSize: '16px', fontWeight: '600', margin: 0 },
  chartSubtitle: { fontSize: '12px', color: COLORS.secondary, marginTop: '4px' },
  barChart: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '150px', marginTop: '20px', paddingTop: '20px' },
  barColumn: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  bar: { width: '18px', borderRadius: '4px', transition: 'height 0.3s ease' },
  barLabel: { fontSize: '12px', color: COLORS.secondary, margin: '8px 0 0 0' },
  statCard: { padding: '20px', backgroundColor: COLORS.card, borderRadius: '12px', border: `1px solid ${COLORS.cardBorder}`, marginBottom: '20px' },
  statLabel: { fontSize: '13px', color: COLORS.secondary, margin: 0 },
  statValue: { fontSize: '24px', fontWeight: '700', color: COLORS.success, margin: '6px 0 0 0' },
};
