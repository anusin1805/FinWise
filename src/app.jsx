import React, { useState } from 'react';

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
}; //[cite: 16, 19]

// --- Mock Icon Components for Web ---
const MaterialCommunityIcons = ({ name, size, color }) => (
  <span style={{ fontSize: size, color, marginRight: '8px' }}>[{name}]</span>
);
const Ionicons = ({ name, size, color }) => (
  <span style={{ fontSize: size, color, marginRight: '8px' }}>[{name}]</span>
);

// --- Main App Component ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu'); //[cite: 16, 19]
  
  const navigateTo = (screen) => setCurrentScreen(screen); //[cite: 16, 19]
  const goBack = () => setCurrentScreen('Menu'); //[cite: 16, 19]

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Menu':
        return <MenuScreen navigate={navigateTo} />; //[cite: 16, 19]
      case 'NewFlexibleExpense':
        return <NewFlexibleExpenseScreen onBack={goBack} />; //[cite: 16, 19]
      case 'WeeklyVariables':
        return <WeeklyVariablesScreen onBack={goBack} />;
      case 'AnnualOverview':
        return <AnnualOverviewScreen onBack={goBack} />; //[cite: 16, 19]
      case 'BudgetHub':
        return <PlaceholderScreen title="Budget Hub" onBack={goBack} />; //[cite: 16, 19]
      default:
        return <MenuScreen navigate={navigateTo} />; //[cite: 16, 19]
    }
  };

  return (
    <div style={styles.container}>
      {renderScreen()}
    </div>
  );
}

// --- 1. The Main Menu Screen ---
const MenuScreen = ({ navigate }) => {
  const [expandedSection, setExpandedSection] = useState('Variable Expenses'); //[cite: 16, 19]

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section); //[cite: 16, 19]
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span>💰</span>
          <p style={styles.logoText}>FINWISE</p>
        </div>
        <button style={styles.iconBtn}>
          <MaterialCommunityIcons name="cog" size={24} color={COLORS.secondary} />
        </button>
      </div>

      <div style={styles.scrollContent}>
        <MenuItem 
          icon="view-dashboard-outline" 
          label="Dashboard" 
          onClick={() => navigate('Dashboard')} 
        />
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
          <SubMenuItem label="Monthly Summary" onClick={() => {}} />
        </Accordion>

        <MenuItem 
          icon="chart-bar" 
          label="Annual Overview (Aggregated)" 
          onClick={() => navigate('AnnualOverview')} 
        />

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
               <p style={{...styles.subText, color: COLORS.accent}}>Add New Fixed Expense</p>
             </button>
           </div>
        </Accordion>

        <MenuItem icon="google-analytics" label="Full-Scope Analysis" />
        <MenuItem icon="wallet-outline" label="Budget Hub" onClick={() => navigate('BudgetHub')} />
        <MenuItem icon="forum-outline" label="Talk to Us" />
        <div style={styles.divider} />
        <MenuItem icon="account-circle-outline" label="Profile" />
        <MenuItem icon="translate" label="Language: English" />
      </div>

       <div style={styles.footerAction}>
         <button style={styles.recordBtn}>
           <MaterialCommunityIcons name="microphone" size={22} color="#fff" />
           <p style={styles.recordBtnText}>Record</p>
         </button>
       </div>
    </div>
  );
};

// --- 2. Screen: New Flexible Expense (Form) ---
const NewFlexibleExpenseScreen = ({ onBack }) => {
  const [category, setCategory] = useState('Food & Dining'); //[cite: 16, 19]
  
  return (
    <div style={styles.container}>
      <ScreenHeader title="New Expense" onBack={onBack} />
      
      <div style={styles.formContainer}>
        <button style={styles.uploadArea}>
          <MaterialCommunityIcons name="camera-plus-outline" size={40} color={COLORS.secondary} />
          <p style={styles.uploadText}>Scan or Upload Bill</p>
        </button>

        <p style={styles.label}>Expense Name</p>
        <input 
          style={styles.input} 
          placeholder="e.g. Dinner at Mario's" 
        />

        <p style={styles.label}>Amount (€)</p>
        <input 
          style={styles.input} 
          placeholder="0.00" 
          type="number"
        />

        <p style={styles.label}>Category</p>
        <div style={styles.categorySelector}>
          {['Food', 'Transport', 'Leisure', 'Shopping'].map((cat) => (
            <button 
              key={cat} 
              style={{...styles.catChip, ...(category === cat ? styles.catChipActive : {})}}
              onClick={() => setCategory(cat)}
            >
              <p style={{...styles.catText, ...(category === cat ? styles.catTextActive : {})}}>{cat}</p>
            </button>
          ))}
        </div>

        <button style={styles.saveBtn}>
          <p style={styles.saveBtnText}>Save Expense</p>
        </button>
      </div>
    </div>
  );
};

// --- 3. Screen: Weekly Variables ---
const WeeklyVariablesScreen = ({ onBack }) => {
  const [variables, setVariables] = useState(() => {
    const saved = localStorage.getItem('weeklyVariables'); //[cite: 16, 19]
    return saved ? JSON.parse(saved) : [
      { id: 1, label: 'Groceries', amount: '150.00' }, //[cite: 16, 19]
      { id: 2, label: 'Transport', amount: '50.00' }, //[cite: 16, 19]
      { id: 3, label: 'Entertainment', amount: '100.00' }, //[cite: 16, 19]
      { id: 4, label: 'Coffee/Snacks', amount: '25.00' }, //[cite: 16, 19]
    ];
  });

  const handleChange = (id, text) => {
    setVariables(variables.map(item => 
      item.id === id ? { ...item, amount: text } : item //[cite: 16, 19]
    ));
  };

  const handleSave = () => {
    localStorage.setItem('weeklyVariables', JSON.stringify(variables)); //[cite: 16, 19]
    alert("Weekly budget updated successfully!"); //[cite: 16, 19]
    onBack(); //[cite: 16, 19]
  };

  return (
    <div style={styles.container}>
      <ScreenHeader title="Weekly Variables" onBack={onBack} />
      <div style={styles.formContainer}>
        <p style={{ color: COLORS.secondary, marginBottom: '20px', fontSize: '14px' }}>
          Adjust your expected weekly spending limits here.
        </p>

        {variables.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px' }}>
            <label style={styles.label}>{item.label} (€)</label>
            <input 
              type="number"
              value={item.amount}
              onChange={(e) => handleChange(item.id, e.target.value)}
              style={styles.input}
            />
          </div>
        ))}
        <button onClick={handleSave} style={styles.saveBtn}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

// --- 4. Screen: Annual Overview (Graph) ---
const AnnualOverviewScreen = ({ onBack }) => {
  const data = [40, 65, 30, 85, 50, 70]; //[cite: 16, 19]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; //[cite: 16, 19]

  return (
    <div style={styles.container}>
      <ScreenHeader title="Annual Overview" onBack={onBack} />
      
      <div style={styles.chartContainer}>
        <p style={styles.chartTitle}>Total Expenses (Aggregated)</p>
        <p style={styles.chartSubtitle}>Fixed + Variable</p>
        
        <div style={styles.barChart}>
          {data.map((h, i) => (
            <div key={i} style={styles.barColumn}>
              <div style={{...styles.bar, height: h * 2, backgroundColor: h > 60 ? COLORS.danger : COLORS.accent }} />
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
    <div style={{width: 24}} /> 
  </div>
); //[cite: 16, 19]

const PlaceholderScreen = ({ title, onBack }) => (
  <div style={styles.container}>
    <ScreenHeader title={title} onBack={onBack} />
    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <p style={{color: COLORS.secondary}}>Feature coming soon</p>
    </div>
  </div>
); //[cite: 16, 19]

const MenuItem = ({ icon, label, onClick }) => (
  <button style={styles.menuItem} onClick={onClick}>
    {icon && <MaterialCommunityIcons name={icon} size={22} color={COLORS.secondary} />}
    <p style={styles.menuText}>{label}</p>
  </button>
); //[cite: 16, 19]

const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div style={styles.accordionContainer}>
    <button style={styles.accordionHeader} onClick={onToggle}>
      <p style={{...styles.menuText, color: isOpen ? COLORS.primary : COLORS.secondary}}>{title}</p>
      <MaterialCommunityIcons name={isOpen ? "chevron-up" : "chevron-down"} size={24} color={COLORS.secondary} />
    </button>
    {isOpen && <div style={styles.accordionContent}>{children}</div>}
  </div>
); //[cite: 16, 19]

const SubMenuItem = ({ label, highlight, onClick }) => (
  <button style={styles.subMenuItem} onClick={onClick}>
    <p style={{...styles.subText, color: highlight ? COLORS.primary : COLORS.secondary, fontWeight: highlight ? '600' : 'normal'}}>{label}</p>
    {highlight && <MaterialCommunityIcons name="chevron-right" size={16} color={COLORS.secondary} />}
  </button>
); //[cite: 16, 19]

// --- Styles Definition (Previously Missing) ---
const styles = {
  container: {
    backgroundColor: COLORS.bg,
    color: COLORS.primary,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: COLORS.card,
    borderBottom: `1px solid ${COLORS.cardBorder}`
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: '20px',
    margin: 0
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '15px 0',
    background: 'none',
    border: 'none',
    borderBottom: `1px solid ${COLORS.cardBorder}`,
    cursor: 'pointer',
    textAlign: 'left'
  },
  menuText: {
    fontSize: '16px',
    color: COLORS.primary,
    margin: 0
  },
  accordionContainer: {
    borderBottom: `1px solid ${COLORS.cardBorder}`
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '15px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  accordionContent: {
    paddingLeft: '20px',
    paddingBottom: '10px'
  },
  subMenuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  subText: {
    fontSize: '14px',
    margin: 0
  },
  fixedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  fixedItemRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  fixedItemText: {
    color: COLORS.secondary,
    margin: 0,
    fontSize: '14px'
  },
  fixedItemCost: {
    color: COLORS.primary,
    margin: 0,
    fontSize: '14px'
  },
  addFixedBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 0',
    marginTop: '10px'
  },
  divider: {
    height: '1px',
    backgroundColor: COLORS.cardBorder,
    margin: '20px 0'
  },
  footerAction: {
    padding: '20px',
    borderTop: `1px solid ${COLORS.cardBorder}`,
    backgroundColor: COLORS.card
  },
  recordBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '15px',
    backgroundColor: COLORS.danger,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  recordBtnText: {
    margin: 0,
    marginLeft: '10px'
  },
  screenHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: COLORS.card,
    borderBottom: `1px solid ${COLORS.cardBorder}`
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: COLORS.primary
  },
  screenTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0
  },
  formContainer: {
    padding: '20px'
  },
  uploadArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '120px',
    backgroundColor: COLORS.card,
    border: `1px dashed ${COLORS.secondary}`,
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  uploadText: {
    color: COLORS.secondary,
    marginTop: '10px'
  },
  label: {
    color: COLORS.secondary,
    marginBottom: '8px',
    fontSize: '14px',
    display: 'block'
  },
  input: {
    backgroundColor: COLORS.inputBg,
    color: COLORS.primary,
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #333',
    width: '100%',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '20px'
  },
  categorySelector: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '30px'
  },
  catChip: {
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: '20px',
    padding: '10px 15px',
    cursor: 'pointer'
  },
  catChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent
  },
  catText: {
    color: COLORS.secondary,
    margin: 0
  },
  catTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  saveBtn: {
    backgroundColor: COLORS.accent,
    padding: '15px',
    borderRadius: '10px',
    border: 'none',
    width: '100%',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  chartContainer: {
    padding: '20px',
    backgroundColor: COLORS.card,
    margin: '20px',
    borderRadius: '10px'
  },
  chartTitle: {
    margin: 0,
    fontWeight: 'bold'
  },
  chartSubtitle: {
    color: COLORS.secondary,
    fontSize: '12px',
    marginTop: '5px',
    marginBottom: '20px'
  },
  barChart: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '200px'
  },
  barColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bar: {
    width: '20px',
    borderRadius: '5px 5px 0 0'
  },
  barLabel: {
    color: COLORS.secondary,
    fontSize: '12px',
    marginTop: '10px'
  },
  statCard: {
    padding: '20px',
    backgroundColor: COLORS.card,
    margin: '0 20px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statLabel: {
    color: COLORS.secondary,
    margin: 0
  },
  statValue: {
    color: COLORS.success,
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0
  }
};
