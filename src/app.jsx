import React, { useState, useEffect, createContext, useContext } from 'react';

// --- Theme & Colors ---
const COLORS = {
  bg: '#050505',
  card: '#121212',
  cardBorder: '#2A2A2A',
  primary: '#FFFFFF',
  secondary: '#A0A0A0',
  accent: '#5E5CE6',     
  danger: '#FF453A',     
  success: '#32D74B',    
  warning: '#FF9F0A',
  inputBg: '#1C1C1E',
  overlay: 'rgba(0,0,0,0.6)'
};

// --- Advanced Inline SVG Icons ---
const Icon = ({ name, size = 22, color = COLORS.secondary, style }) => {
  const paths = {
    'cog': <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>,
    'dashboard': <path d="M13 3v6h8V3h-8m2 2h4v2h-4V5M3 3v10h8V3H3m2 2h4v6H5V5m8 6v10h8V11h-8m2 2h4v6h-4v-6M3 15v6h8v-6H3m2 2h4v2H5v-2Z"/>,
    'chart': <path d="M22 21H2V3h2v16h18v2M6 10h3v7H6v-7m5-5h3v12h-3V5m5 3h3v9h-3V8Z"/>,
    'plus': <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/>,
    'mic': <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3m6 10a1 1 0 0 0-2 0a4 4 0 0 1-8 0a1 1 0 0 0-2 0a6 6 0 0 0 5 5.91V20H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-2.09A6 6 0 0 0 18 12Z"/>,
    'camera': <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 14H4V7h4.05l1.83-2h4.24l1.83 2H20v12M12 8a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"/>,
    'wallet': <path d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9m-9-2h10V8H12v8m4-2.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3Z"/>,
    'user': <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6m0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22Z"/>,
    'network': <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>,
    'database': <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4"/>,
    'chevron-up': <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"/>,
    'chevron-down': <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41Z"/>,
    'chevron-right': <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41Z"/>,
    'arrow-back': <path d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      {paths[name] || <circle cx="12" cy="12" r="10" fill={color} />}
    </svg>
  );
};

// --- Mock Contexts for System Architecture ---
const AuthContext = createContext({ user: null, isAuthenticated: false });
const AppDataContext = createContext({ isReady: false, p2pConnected: false });

// Mock Hooks simulating repository structure
const useCurrentUser = () => useContext(AuthContext);
const useConnectorReadiness = () => useContext(AppDataContext);

// --- Core App Component ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu');
  const [authStatus, setAuthStatus] = useState({ user: { name: 'Admin', role: 'owner' }, isAuthenticated: true });
  const [appDataStatus, setAppDataStatus] = useState({ isReady: false, p2pConnected: false });

  // Simulate Readiness Schedule & P2P Connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppDataStatus({ isReady: true, p2pConnected: true });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (screen) => setCurrentScreen(screen);
  const goBack = () => setCurrentScreen('Menu');

  return (
    <AuthContext.Provider value={authStatus}>
      <AppDataContext.Provider value={appDataStatus}>
        <div style={styles.container}>
          <div style={styles.screenWrapper}>
            <SystemStatusBar />
            {currentScreen === 'Menu' && <MenuScreen navigate={navigateTo} />}
            {currentScreen === 'NewFlexibleExpense' && <NewFlexibleExpenseScreen onBack={goBack} />}
            {currentScreen === 'WeeklyVariables' && <WeeklyVariablesScreen onBack={goBack} />}
            {currentScreen === 'AnnualOverview' && <AnnualOverviewScreen onBack={goBack} />}
            {['Dashboard', 'BudgetHub', 'Profile'].includes(currentScreen) && (
              <PlaceholderScreen title={currentScreen} onBack={goBack} />
            )}
          </div>
        </div>
      </AppDataContext.Provider>
    </AuthContext.Provider>
  );
}

// --- Status Bar (Mocking DB & P2P Networking) ---
const SystemStatusBar = () => {
  const { isReady, p2pConnected } = useConnectorReadiness();
  return (
    <div style={styles.statusBar}>
      <div style={styles.statusBadge}>
        <Icon name="database" size={14} color={isReady ? COLORS.success : COLORS.warning} />
        <span style={styles.statusText}>{isReady ? 'PG-Lite Ready' : 'Syncing DB...'}</span>
      </div>
      <div style={styles.statusBadge}>
        <Icon name="network" size={14} color={p2pConnected ? COLORS.accent : COLORS.secondary} />
        <span style={styles.statusText}>{p2pConnected ? 'P2P Active' : 'Offline'}</span>
      </div>
    </div>
  );
};

// --- 1. Main Menu Screen ---
const MenuScreen = ({ navigate }) => {
  const { user } = useCurrentUser();
  const [expandedSection, setExpandedSection] = useState('Variable Expenses');

  return (
    <>
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span style={{ fontSize: '22px', marginRight: '10px' }}>💰</span>
          <div>
            <p style={styles.logoText}>FINWISE</p>
            <p style={styles.greetingText}>Welcome back, {user?.name}</p>
          </div>
        </div>
        <button style={styles.iconBtn}>
          <Icon name="cog" size={24} color={COLORS.secondary} />
        </button>
      </div>

      <div style={styles.scrollContent}>
        <MenuItem icon="dashboard" label="Dashboard" onClick={() => navigate('Dashboard')} />

        <Accordion title="Variable Expenses" isOpen={expandedSection === 'Variable Expenses'} onToggle={() => setExpandedSection(expandedSection === 'Variable Expenses' ? null : 'Variable Expenses')}>
          <SubMenuItem label="New Flexible Expense" highlight onClick={() => navigate('NewFlexibleExpense')} />
          <SubMenuItem label="Weekly Variables" onClick={() => navigate('WeeklyVariables')} />
        </Accordion>

        <MenuItem icon="chart" label="Annual Overview (Aggregated)" onClick={() => navigate('AnnualOverview')} />

        <Accordion title="Fixed Expenses" isOpen={expandedSection === 'Fixed Expenses'} onToggle={() => setExpandedSection(expandedSection === 'Fixed Expenses' ? null : 'Fixed Expenses')}>
          <div style={styles.fixedList}>
            {['TV Subscription', 'Gym Membership', 'Rent'].map((item, index) => (
              <div key={index} style={styles.fixedItemRow}>
                <p style={styles.fixedItemText}>{item}</p>
                <p style={styles.fixedItemCost}>€--.--</p>
              </div>
            ))}
            <button style={styles.addFixedBtn}>
              <Icon name="plus" size={16} color={COLORS.accent} />
              <p style={{ ...styles.subText, color: COLORS.accent, marginLeft: '6px' }}>Add Fixed Expense</p>
            </button>
          </div>
        </Accordion>

        <MenuItem icon="wallet" label="Budget Hub" onClick={() => navigate('BudgetHub')} />
        
        <div style={styles.divider} />
        <MenuItem icon="user" label="Profile & Identity Gate" onClick={() => navigate('Profile')} />
      </div>

      <div style={styles.footerAction}>
        <button style={styles.recordBtn}>
          <Icon name="mic" size={22} color="#fff" />
          <p style={styles.recordBtnText}>Smart Record</p>
        </button>
      </div>
    </>
  );
};

// --- 2. Screen: New Flexible Expense ---
const NewFlexibleExpenseScreen = ({ onBack }) => {
  const [category, setCategory] = useState('Food');
  return (
    <>
      <ScreenHeader title="New Expense" onBack={onBack} />
      <div style={styles.formContainer}>
        <button style={styles.uploadArea}>
          <Icon name="camera" size={40} color={COLORS.secondary} />
          <p style={styles.uploadText}>Scan Receipt via WebWorker</p>
        </button>
        <p style={styles.label}>Expense Name</p>
        <input style={styles.input} placeholder="e.g. Dinner at Mario's" />
        <p style={styles.label}>Amount (€)</p>
        <input style={styles.input} type="number" placeholder="0.00" />
        
        <p style={styles.label}>Category</p>
        <div style={styles.categorySelector}>
          {['Food', 'Transport', 'Leisure', 'Shopping'].map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ ...styles.catChip, ...(category === cat ? styles.catChipActive : {}) }}>
              <p style={{ ...styles.catText, ...(category === cat ? styles.catTextActive : {}) }}>{cat}</p>
            </button>
          ))}
        </div>
        <button style={styles.saveBtn} onClick={onBack}>
          <p style={styles.saveBtnText}>Commit to DB</p>
        </button>
      </div>
    </>
  );
};

// --- 3. Screen: Weekly Variables ---
const WeeklyVariablesScreen = ({ onBack }) => {
  const [variables, setVariables] = useState([
    { id: 1, label: 'Groceries', amount: '150.00' },
    { id: 2, label: 'Transport', amount: '50.00' },
  ]);

  return (
    <>
      <ScreenHeader title="Weekly Variables" onBack={onBack} />
      <div style={{ padding: '20px' }}>
        <p style={styles.subText}>Adjust expected weekly spending limits.</p>
        <br />
        {variables.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px' }}>
            <label style={styles.label}>{item.label} (€)</label>
            <input type="number" value={item.amount} onChange={(e) => setVariables(variables.map(v => v.id === item.id ? { ...v, amount: e.target.value } : v))} style={styles.input} />
          </div>
        ))}
        <button onClick={onBack} style={styles.saveBtn}>Save Settings</button>
      </div>
    </>
  );
};

// --- 4. Screen: Annual Overview ---
const AnnualOverviewScreen = ({ onBack }) => {
  const data = [40, 65, 30, 85, 50, 70];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <>
      <ScreenHeader title="Annual Overview" onBack={onBack} />
      <div style={styles.chartContainer}>
        <p style={styles.chartTitle}>Aggregated Ledger</p>
        <p style={styles.chartSubtitle}>Computed from PGLite Replica</p>
        <div style={styles.barChart}>
          {data.map((h, i) => (
            <div key={i} style={styles.barColumn}>
              <div style={{ ...styles.bar, height: `${h * 2}px`, backgroundColor: h > 60 ? COLORS.danger : COLORS.accent }} />
              <p style={styles.barLabel}>{months[i]}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.statCard}>
        <p style={styles.statLabel}>Year to Date Sync</p>
        <p style={styles.statValue}>€ 14,250.00</p>
      </div>
    </>
  );
};

// --- Helper Components ---
const ScreenHeader = ({ title, onBack }) => (
  <div style={styles.screenHeader}>
    <button onClick={onBack} style={styles.iconBtn}>
      <Icon name="arrow-back" size={24} color={COLORS.primary} />
    </button>
    <p style={styles.screenTitle}>{title}</p>
    <div style={{ width: 24 }} /> 
  </div>
);

const PlaceholderScreen = ({ title, onBack }) => (
  <>
    <ScreenHeader title={title} onBack={onBack} />
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
      <p style={{ color: COLORS.secondary }}>Module initializing...</p>
    </div>
  </>
);

const MenuItem = ({ icon, label, onClick }) => (
  <button style={styles.menuItem} onClick={onClick}>
    <Icon name={icon} size={22} color={COLORS.secondary} style={{ marginRight: '12px' }} />
    <p style={styles.menuText}>{label}</p>
  </button>
);

const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div style={styles.accordionContainer}>
    <button style={styles.accordionHeader} onClick={onToggle}>
      <p style={{ ...styles.menuText, ...(isOpen ? { color: COLORS.primary } : {}) }}>{title}</p>
      <Icon name={isOpen ? "chevron-up" : "chevron-down"} size={22} color={COLORS.secondary} />
    </button>
    {isOpen && <div style={styles.accordionContent}>{children}</div>}
  </div>
);

const SubMenuItem = ({ label, highlight, onClick }) => (
  <button style={styles.subMenuItem} onClick={onClick}>
    <p style={{ ...styles.subText, ...(highlight ? { color: COLORS.primary, fontWeight: '600' } : {}) }}>{label}</p>
    {highlight && <Icon name="chevron-right" size={16} color={COLORS.secondary} />}
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
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  screenWrapper: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: COLORS.bg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: `0 0 20px ${COLORS.overlay}`,
    borderLeft: `1px solid ${COLORS.cardBorder}`,
    borderRight: `1px solid ${COLORS.cardBorder}`,
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
    backgroundColor: COLORS.card,
    borderBottom: `1px solid ${COLORS.cardBorder}`,
    fontSize: '11px',
    fontWeight: '600',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusText: { color: COLORS.secondary, textTransform: 'uppercase', letterSpacing: '0.5px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 16px', borderBottom: `1px solid ${COLORS.cardBorder}` },
  logoRow: { display: 'flex', alignItems: 'center' },
  logoText: { fontSize: '18px', fontWeight: '700', letterSpacing: '1px', margin: 0 },
  greetingText: { fontSize: '12px', color: COLORS.secondary, margin: '4px 0 0 0' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px' },
  scrollContent: { flex: 1, padding: '16px', paddingBottom: '100px', overflowY: 'auto' },
  menuItem: { width: '100%', display: 'flex', alignItems: 'center', padding: '14px 12px', backgroundColor: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' },
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
  footerAction: { position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 16px' },
  recordBtn: { display: 'flex', alignItems: 'center', backgroundColor: COLORS.accent, padding: '14px 32px', borderRadius: '30px', border: 'none', boxShadow: `0 8px 24px ${COLORS.overlay}`, cursor: 'pointer', transition: 'transform 0.2s' },
  recordBtnText: { color: '#FFF', fontWeight: '600', marginLeft: '8px', fontSize: '15px', margin: '0 0 0 8px' },
  screenHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: `1px solid ${COLORS.cardBorder}` },
  screenTitle: { fontSize: '17px', fontWeight: '600', color: COLORS.primary, margin: 0 },
  formContainer: { padding: '20px' },
  uploadArea: { width: '100%', padding: '30px', borderRadius: '12px', border: `2px dashed ${COLORS.cardBorder}`, backgroundColor: COLORS.card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', cursor: 'pointer' },
  uploadText: { color: COLORS.secondary, fontSize: '14px', marginTop: '10px', margin: '10px 0 0 0' },
  label: { color: COLORS.secondary, fontSize: '13px', marginBottom: '8px', display: 'block' },
  input: { width: '100%', backgroundColor: COLORS.inputBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: '8px', padding: '14px', color: COLORS.primary, fontSize: '15px', outline: 'none', marginBottom: '16px', boxSizing: 'border-box' },
  categorySelector: { display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' },
  catChip: { padding: '8px 16px', borderRadius: '20px', backgroundColor: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, cursor: 'pointer' },
  catChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  catText: { fontSize: '13px', color: COLORS.secondary, margin: 0 },
  catTextActive: { color: '#FFF', fontWeight: '600' },
  saveBtn: { width: '100%', backgroundColor: COLORS.success, padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '10px' },
  saveBtnText: { color: '#121212', fontWeight: '700', fontSize: '15px', margin: 0 },
  chartContainer: { padding: '20px', margin: '20px', backgroundColor: COLORS.card, borderRadius: '12px', border: `1px solid ${COLORS.cardBorder}` },
  chartTitle: { fontSize: '16px', fontWeight: '600', margin: 0 },
  chartSubtitle: { fontSize: '12px', color: COLORS.secondary, marginTop: '4px' },
  barChart: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '180px', marginTop: '20px', paddingTop: '20px' },
  barColumn: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  bar: { width: '18px', borderRadius: '4px', transition: 'height 0.3s ease' },
  barLabel: { fontSize: '12px', color: COLORS.secondary, marginTop: '8px', margin: '8px 0 0 0' },
  statCard: { margin: '0 20px', padding: '20px', backgroundColor: COLORS.card, borderRadius: '12px', border: `1px solid ${COLORS.cardBorder}` },
  statLabel: { fontSize: '13px', color: COLORS.secondary, margin: 0 },
  statValue: { fontSize: '24px', fontWeight: '700', color: COLORS.success, marginTop: '6px', margin: '6px 0 0 0' },
};
