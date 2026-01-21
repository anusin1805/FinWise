import React, { useState } from 'react';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

// --- Color Palette ---
const COLORS = {
  bg: '#050505',
  card: '#121212',
  cardBorder: '#2A2A2A',
  primary: '#FFFFFF',
  secondary: '#A0A0A0',
  accent: '#5E5CE6',     // Purple-ish accent for active states
  danger: '#FF453A',     // Red for record/delete
  success: '#32D74B',    // Green for positive stats
  inputBg: '#1C1C1E',
};

// --- Main App Component ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu'); // Default to Menu
  
  // Navigation Helper
  const navigateTo = (screen) => setCurrentScreen(screen);
  const goBack = () => setCurrentScreen('Menu');

  // Render the current screen based on state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Menu':
        return <MenuScreen navigate={navigateTo} />;
      case 'NewFlexibleExpense':
        return <NewFlexibleExpenseScreen onBack={goBack} />;
      case 'AnnualOverview':
        return <AnnualOverviewScreen onBack={goBack} />;
      case 'BudgetHub':
        return <PlaceholderScreen title="Budget Hub" onBack={goBack} />;
      // Add other cases as needed
      default:
        return <MenuScreen navigate={navigateTo} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderScreen()}
    </SafeAreaView>
  );
}

// --- 1. The Main Menu Screen ---
const MenuScreen = ({ navigate }) => {
  const [expandedSection, setExpandedSection] = useState('Variable Expenses');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <FontAwesome5 name="piggy-bank" size={20} color={COLORS.primary} />
          <p style={styles.logoText}>FINWISE</p>
        </div>
        <button>
          <MaterialCommunityIcons name="cog" size={24} color={COLORS.secondary} />
        </button>
      </div>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
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
          <SubMenuItem label="Weekly Variables (editable)" onClick={() => {}} />
          <SubMenuItem label="Monthly Summary" onClick={() => {}} />
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
               <p style={[styles.subText, {color: COLORS.accent}]}>Add New Fixed Expense</p>
             </button>
           </div>
        </Accordion>

        {/* 5-9 Other Menu Items */}
        <MenuItem icon="google-analytics" label="Full-Scope Analysis" />
        <MenuItem icon="wallet-outline" label="Budget Hub" onClick={() => navigate('BudgetHub')} />
        <MenuItem icon="forum-outline" label="Talk to Us" />
        
        <div style={styles.divider} />

        <MenuItem icon="account-circle-outline" label="Profile" />
        <MenuItem icon="translate" label="Language: English" />

      </ScrollView>

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

// --- 2. Screen: New Flexible Expense (Form) ---
const NewFlexibleExpenseScreen = ({ onBack }) => {
  const [category, setCategory] = useState('Food & Dining');
  
  return (
    <div style={styles.container}>
      <ScreenHeader title="New Expense" onBack={onBack} />
      
      <ScrollView style={styles.formContainer}>
        {/* Bill Upload Area */}
        <button style={styles.uploadArea}>
          <MaterialCommunityIcons name="camera-plus-outline" size={40} color={COLORS.secondary} />
          <p style={styles.uploadText}>Scan or Upload Bill</p>
        </button>

        {/* Form Fields */}
        <p style={styles.label}>Expense Name</p>
        <p input 
          style={styles.input} 
          placeholder="e.g. Dinner at Mario's" 
          placeholderTextColor="#555"
        />

        <p style={styles.label}>Amount (€)</p>
        <pInput 
          style={styles.input} 
          placeholder="0.00" 
          inputType="numeric"
          placeholderTextColor="#555"
        />

        <p style={styles.label}>Category</p>
        <div style={styles.categorySelector}>
          {['Food', 'Transport', 'Leisure', 'Shopping'].map((cat) => (
            <button 
              key={cat} 
              style={[styles.catChip, category === cat && styles.catChipActive]}
              onClick={() => setCategory(cat)}
            >
              <p style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</p>
            </button>
          ))}
        </div>

        <button style={styles.saveBtn}>
          <p style={styles.saveBtnText}>Save Expense</p>
        </button>

      </ScrollView>
    </div>
  );
};

// --- 3. Screen: Annual Overview (Graph) ---
const AnnualOverviewScreen = ({ onBack }) => {
  // Mock data for the graph
  const data = [40, 65, 30, 85, 50, 70];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div style={styles.container}>
      <ScreenHeader title="Annual Overview" onBack={onBack} />
      
      <div style={styles.chartContainer}>
        <p style={styles.chartTitle}>Total Expenses (Aggregated)</p>
        <p style={styles.chartSubtitle}>Fixed + Variable</p>
        
        <div style={styles.barChart}>
          {data.map((h, i) => (
            <div key={i} style={styles.barColumn}>
              <div style={[styles.bar, { height: h * 2, backgroundColor: h > 60 ? COLORS.danger : COLORS.accent }]} />
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
);

const PlaceholderScreen = ({ title, onBack }) => (
  <div style={styles.container}>
    <ScreenHeader title={title} onBack={onBack} />
    <div style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <p style={{color: COLORS.secondary}}>Feature coming soon</p>
    </div>
  </div>
);

const MenuItem = ({ icon, label, onClick }) => (
  <button style={styles.menuItem} onClick={onClick}>
    {icon && <MaterialCommunityIcons name={icon} size={22} color={COLORS.secondary} style={styles.menuIcon} />}
    <p style={styles.menuText}>{label}</p>
  </button>
);

const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div style={styles.accordionContainer}>
    <button style={styles.accordionHeader} onClick={onToggle}>
      <p style={[styles.menuText, isOpen && {color: COLORS.primary}]}>{title}</p>
      <MaterialCommunityIcons name={isOpen ? "chevron-up" : "chevron-down"} size={24} color={COLORS.secondary} />
    </button>
    {isOpen && <div style={styles.accordionContent}>{children}</div}
  </div>
);

const SubMenuItem = ({ label, highlight, onClick }) => (
  <button style={styles.subMenuItem} onClick={onClick}>
    <p style={[styles.subText, highlight && {color: COLORS.primary, fontWeight: '600'}]}>{label}</p>
    {highlight && <MaterialCommunityIcons name="chevron-right" size={16} color={COLORS.secondary} />}
  </button>
);

// --- Styles ---
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoText: { color: COLORS.primary, fontSize: 18, fontWeight: 'bold', marginLeft: 10, letterSpacing: 1 },
  
  // Menu
  scrollContent: { padding: 20, paddingBottom: 100 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  menuIcon: { marginRight: 15 },
  menuText: { color: COLORS.secondary, fontSize: 16, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#222', marginVertical: 20 },

  // Accordion
  accordionContainer: { marginBottom: 15 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  accordionContent: { 
    backgroundColor: COLORS.card, 
    borderRadius: 12, 
    padding: 10, 
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.cardBorder 
  },
  subMenuItem: { paddingVertical: 12, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' },
  subText: { color: COLORS.secondary, fontSize: 14 },
  
  // Fixed List
  fixedList: { paddingHorizontal: 5 },
  fixedItemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#222' },
  fixedItemText: { color: '#ccc', fontSize: 14 },
  fixedItemCost: { color: '#666', fontSize: 14 },
  addFixedBtn: { flexDirection: 'row', alignItems: 'center', paddingTop: 15 },

  // Screen Headers
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: COLORS.card,
  },
  screenTitle: { color: COLORS.primary, fontSize: 18, fontWeight: '600' },
  backBtn: { padding: 5 },

  // Forms
  formContainer: { padding: 20 },
  uploadArea: {
    height: 150,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.inputBg,
  },
  uploadText: { color: COLORS.secondary, marginTop: 10 },
  label: { color: COLORS.secondary, marginBottom: 8, fontSize: 14 },
  input: {
    backgroundColor: COLORS.inputBg,
    color: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  categorySelector: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 },
  catChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#444',
    marginRight: 10,
    marginBottom: 10,
  },
  catChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  catText: { color: COLORS.secondary },
  catTextActive: { color: '#fff', fontWeight: 'bold' },
  saveBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  saveBtnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  // Graph
  chartContainer: { margin: 20, padding: 20, backgroundColor: COLORS.card, borderRadius: 16 },
  chartTitle: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  chartSubtitle: { color: COLORS.secondary, fontSize: 12, marginBottom: 20 },
  barChart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 200 },
  barColumn: { alignItems: 'center' },
  bar: { width: 12, borderRadius: 6, marginBottom: 8 },
  barLabel: { color: COLORS.secondary, fontSize: 12 },
  statCard: { marginHorizontal: 20, padding: 20, backgroundColor: '#1F1F22', borderRadius: 12, alignItems: 'center' },
  statLabel: { color: COLORS.secondary, fontSize: 14 },
  statValue: { color: COLORS.primary, fontSize: 24, fontWeight: 'bold', marginTop: 5 },

  // Footer Action
  footerAction: { position: 'absolute', bottom: 30, right: 20 },
  recordBtn: { 
    backgroundColor: COLORS.danger, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 30,
    shadowColor: COLORS.danger,
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  recordBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
});
