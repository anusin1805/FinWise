import React, { useState } from 'react';

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

// --- Main App Component ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu');

  // Navigation Helpers
  const navigateTo = (screen) => setCurrentScreen(screen);
  const goBack = () => setCurrentScreen('Menu');

  // Screen Switcher
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Menu':
        return <MenuScreen navigate={navigateTo} />;
      case 'NewFlexibleExpense':
        return <NewFlexibleExpenseScreen onBack={goBack} />;
      case 'WeeklyVariables':
        return <WeeklyVariablesScreen onBack={goBack} />;
      case 'AnnualOverview':
        return <AnnualOverviewScreen onBack={goBack} />;
      case 'Dashboard':
        return <PlaceholderScreen title="Dashboard" onBack={goBack} />;
      case 'BudgetHub':
        return <PlaceholderScreen title="Budget Hub" onBack={goBack} />;
      case 'FullScopeAnalysis':
        return <PlaceholderScreen title="Full-Scope Analysis" onBack={goBack} />;
      case 'TalkToUs':
        return <PlaceholderScreen title="Talk to Us" onBack={goBack} />;
      case 'Profile':
        return <PlaceholderScreen title="Profile" onBack={goBack} />;
      default:
        return <MenuScreen navigate={navigateTo} />;
    }
  };

  return (
    <div style={styles.container}>
      {renderScreen()}
    </div>
  );
}

// --- 1. Main Menu Screen ---
const MenuScreen = ({ navigate }) => {
  const [expandedSection, setExpandedSection] = useState('Variable Expenses');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div style={styles.screenWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span style={{ fontSize: '20px', marginRight: '8px' }}>💰</span>
          <p style={styles.logoText}>FINWISE</p>
        </div>
        <button style={styles.iconBtn}>
          <MaterialCommunityIcons name="cog" size={24} color={COLORS.secondary} />
        </button>
      </div>

      <div style={styles.scrollContent}>
        {/* 1. Dashboard */}
        <MenuItem 
          icon="view-dashboard-outline" 
          label="Dashboard" 
          onClick={() => navigate('Dashboard')} 
        />

        {/* 2. Variable Expenses */}
        <Accordion 
          title="Variable Expenses" 
          isOpen={expandedSection === 'Variable Expenses'}
          onToggle={() => toggleSection('Variable Expenses')}
        >
          <SubMenuItem 
            label="New Flexible Expense" 
            highlight 
            onClick={() => navigate('NewFlexibleExpense')} 
          />
          <SubMenuItem 
            label="Weekly Variables (editable)" 
            onClick={() => navigate('WeeklyVariables')} 
          />
          <SubMenuItem 
            label="Monthly Summary" 
            onClick={() => navigate('AnnualOverview')} 
          />
        </Accordion>

        {/* 3. Annual Overview */}
        <MenuItem 
          icon="chart-bar" 
          label="Annual Overview (Aggregated)" 
          onClick={() => navigate('AnnualOverview')} 
        />

        {/* 4. Fixed Expenses */}
        <Accordion 
          title="Fixed Expenses" 
          isOpen={expandedSection === 'Fixed Expenses'}
          onToggle={() => toggleSection('Fixed Expenses')}
        >
          <div style={styles.fixedList}>
            {['TV Subscription', 'Gym Membership', 'Home Rent / Loan', 'Car Fuel', 'Grocery'].map((item, index) => (
              <div key={index} style={styles.fixedItemRow}>
                <p style={styles.fixedItemText}>{item}</p>
                <p style={styles.fixedItemCost}>€--.--</p>
              </div>
            ))}
            <button style={styles.addFixedBtn}>
              <MaterialCommunityIcons name="plus" size={16} color={COLORS.accent} />
              <p style={{ ...styles.subText, color: COLORS.accent, marginLeft: '6px' }}>Add New Fixed Expense</p>
            </button>
          </div>
        </Accordion>

        {/* 5-9 Other Menu Items */}
        <MenuItem 
          icon="google-analytics" 
          label="Full-Scope Analysis" 
          onClick={() => navigate('FullScopeAnalysis')} 
        />
        <MenuItem 
          icon="wallet-outline" 
          label="Budget Hub" 
          onClick={() => navigate('BudgetHub')} 
        />
        <MenuItem 
          icon="forum-outline" 
          label="Talk to Us" 
          onClick={() => navigate('TalkToUs')} 
        />
        
        <div style={styles.divider} />

        <MenuItem 
          icon="account-circle-outline" 
          label="Profile" 
          onClick={() => navigate('Profile')} 
        />
        <MenuItem icon="translate" label="Language: English" />
      </div>

      {/* Footer Record Button */}
      <div style={styles.footerAction}>
        <button style={styles.recordBtn}>
          <MaterialCommunityIcons name="microphone" size={22} color="#fff" />
          <p style={styles.recordBtnText}>Record</p>
        </button>
      </div>
    </div>
  );
};

// --- 2. Screen: New Flexible Expense ---
const NewFlexibleExpenseScreen = ({ onBack }) => {
  const [category, setCategory] = useState('Food');
  
  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="New Expense" onBack={onBack} />
      
      <div style={styles.formContainer}>
        {/* Bill Upload Area */}
        <button style={styles.uploadArea}>
          <MaterialCommunityIcons name="camera-plus-outline" size={40} color={COLORS.secondary} />
          <p style={styles.uploadText}>Scan or Upload Bill</p>
        </button>

        {/* Form Fields */}
        <p style={styles.label}>Expense Name</p>
        <input 
          style={styles.input} 
          placeholder="e.g. Dinner at Mario's" 
        />

        <p style={styles.label}>Amount (€)</p>
        <input 
          style={styles.input} 
          type="number"
          placeholder="0.00" 
        />

        <p style={styles.label}>Category</p>
        <div style={styles.categorySelector}>
          {['Food', 'Transport', 'Leisure', 'Shopping'].map((cat) => (
            <button 
              key={cat} 
              style={{
                ...styles.catChip,
                ...(category === cat ? styles.catChipActive : {})
              }}
              onClick={() => setCategory(cat)}
            >
              <p style={{
                ...styles.catText,
                ...(category === cat ? styles.catTextActive : {})
              }}>{cat}</p>
            </button>
          ))}
        </div>

        <button style={styles.saveBtn} onClick={onBack}>
          <p style={styles.saveBtnText}>Save Expense</p>
        </button>
      </div>
    </div>
  );
};

// --- 3. Screen: Weekly Variables ---
const WeeklyVariablesScreen = ({ onBack }) => {
  const [variables, setVariables] = useState(() => {
    const saved = localStorage.getItem('weeklyVariables');
    return saved ? JSON.parse(saved) : [
      { id: 1, label: 'Groceries', amount: '150.00' },
      { id: 2, label: 'Transport', amount: '50.00' },
      { id: 3, label: 'Entertainment', amount: '100.00' },
      { id: 4, label: 'Coffee/Snacks', amount: '25.00' },
    ];
  });

  const handleChange = (id, text) => {
    setVariables(variables.map(item => 
      item.id === id ? { ...item, amount: text } : item
    ));
  };

  const handleSave = () => {
    localStorage.setItem('weeklyVariables', JSON.stringify(variables));
    alert("Weekly budget updated successfully!");
    onBack();
  };

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Weekly Variables" onBack={onBack} />
      
      <div style={{ padding: '20px' }}>
        <p style={{ color: COLORS.secondary, marginBottom: '20px', fontSize: '14px' }}>
          Adjust your expected weekly spending limits here.
        </p>

        {variables.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px' }}>
            <label style={{ color: COLORS.secondary, marginBottom: '8px', fontSize: '14px', display: 'block' }}>
              {item.label} (€)
            </label>
            <input 
              type="number"
              value={item.amount}
              onChange={(e) => handleChange(item.id, e.target.value)}
              style={styles.input}
            />
          </div>
        ))}

        <button 
          onClick={handleSave} 
          style={styles.saveBtn}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// --- 4. Screen: Annual Overview ---
const AnnualOverviewScreen = ({ onBack }) => {
  const data = [40, 65, 30, 85, 50, 70];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div style={styles.screenWrapper}>
      <ScreenHeader title="Annual Overview" onBack={onBack} />
      
      <div style={styles.chartContainer}>
        <p style={styles.chartTitle}>Total Expenses (Aggregated)</p>
        <p style={styles.chartSubtitle}>Fixed + Variable</p>
        
        <div style={styles.barChart}>
          {data.map((h, i) => (
            <div key={i} style={styles.barColumn}>
              <div 
                style={{
                  ...styles.bar, 
                  height: `${h * 2}px`, 
                  backgroundColor: h > 60 ? COLORS.danger : COLORS.accent 
                }} 
              />
              <p style={styles.barLabel}>{months[i]}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.statCard}>
        <p style={styles.statLabel}>Year to Date</p>
        <p style={styles.statValue}>€ 14,250.00</p>
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
