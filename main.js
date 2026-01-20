import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ArrowLeft, Settings, Camera, Mic, PiggyBank, BarChart3, Wallet, MessageSquare, User, Globe } from 'lucide-react';

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
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu');
  
  const navigateTo = (screen) => setCurrentScreen(screen);
  const goBack = () => setCurrentScreen('Menu');

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
      case 'Dashboard':
        return <PlaceholderScreen title="Dashboard" onBack={goBack} />;
      default:
        return <MenuScreen navigate={navigateTo} />;
    }
  };

  return (
    <div style={{ 
      backgroundColor: COLORS.bg, 
      minHeight: '100vh',
      color: COLORS.primary,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {renderScreen()}
    </div>
  );
}

const MenuScreen = ({ navigate }) => {
  const [expandedSection, setExpandedSection] = useState('Variable Expenses');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        padding: '40px 20px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid #222`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PiggyBank size={20} color={COLORS.primary} />
          <span style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' }}>FINWISE</span>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Settings size={24} color={COLORS.secondary} />
        </button>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Dashboard */}
        <MenuItem 
          icon={<BarChart3 size={22} color={COLORS.secondary} />}
          label="Dashboard" 
          onPress={() => navigate('Dashboard')} 
        />

        {/* Variable Expenses */}
        <Accordion 
          title="Variable Expenses" 
          isOpen={expandedSection === 'Variable Expenses'}
          onToggle={() => toggleSection('Variable Expenses')}
        >
          <SubMenuItem 
            label="New Flexible Expense" 
            highlight 
            onPress={() => navigate('NewFlexibleExpense')} 
          />
          <SubMenuItem label="Weekly Variables (editable)" onPress={() => {}} />
          <SubMenuItem label="Monthly Summary" onPress={() => {}} />
        </Accordion>

        {/* Annual Overview */}
        <MenuItem 
          icon={<BarChart3 size={22} color={COLORS.secondary} />}
          label="Annual Overview (Aggregated)" 
          onPress={() => navigate('AnnualOverview')} 
        />

        {/* Fixed Expenses */}
        <Accordion 
          title="Fixed Expenses" 
          isOpen={expandedSection === 'Fixed Expenses'}
          onToggle={() => toggleSection('Fixed Expenses')}
        >
          <div style={{ padding: '0 5px' }}>
            {['TV Subscription', 'Gym Membership', 'Home Rent / Loan', 'Car Fuel', 'Grocery'].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid #222'
              }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>{item}</span>
                <span style={{ color: '#666', fontSize: '14px' }}>€--.--</span>
              </div>
            ))}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: COLORS.accent,
              padding: '15px 0',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              <span style={{ fontSize: '20px' }}>+</span>
              <span>Add New Fixed Expense</span>
            </button>
          </div>
        </Accordion>

        {/* Other Menu Items */}
        <MenuItem icon={<BarChart3 size={22} color={COLORS.secondary} />} label="Full-Scope Analysis" />
        <MenuItem icon={<Wallet size={22} color={COLORS.secondary} />} label="Budget Hub" onPress={() => navigate('BudgetHub')} />
        <MenuItem icon={<MessageSquare size={22} color={COLORS.secondary} />} label="Talk to Us" />
        
        <div style={{ height: '1px', backgroundColor: '#222', margin: '20px 0' }} />

        <MenuItem icon={<User size={22} color={COLORS.secondary} />} label="Profile" />
        <MenuItem icon={<Globe size={22} color={COLORS.secondary} />} label="Language: English" />
      </div>

      {/* Footer Record Button */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '20px'
      }}>
        <button style={{
          backgroundColor: COLORS.danger,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '30px',
          border: 'none',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: `0 4px 20px ${COLORS.danger}66`
        }}>
          <Mic size={22} />
          <span>Record</span>
        </button>
      </div>
    </div>
  );
};

const NewFlexibleExpenseScreen = ({ onBack }) => {
  const [category, setCategory] = useState('Food');
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  
  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="New Expense" onBack={onBack} />
      
      <div style={{ padding: '20px' }}>
        {/* Bill Upload Area */}
        <div style={{
          height: '150px',
          border: '1px dashed #333',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          backgroundColor: COLORS.inputBg,
          cursor: 'pointer'
        }}>
          <Camera size={40} color={COLORS.secondary} />
          <span style={{ color: COLORS.secondary, marginTop: '10px' }}>Scan or Upload Bill</span>
        </div>

        {/* Form Fields */}
        <label style={{ color: COLORS.secondary, marginBottom: '8px', fontSize: '14px', display: 'block' }}>
          Expense Name
        </label>
        <input 
          type="text"
          style={{
            backgroundColor: COLORS.inputBg,
            color: COLORS.primary,
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #333',
            width: '100%',
            fontSize: '16px',
            outline: 'none'
          }}
          placeholder="e.g. Dinner at Mario's"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <label style={{ color: COLORS.secondary, marginBottom: '8px', fontSize: '14px', display: 'block' }}>
          Amount (€)
        </label>
        <input 
          type="number"
          style={{
            backgroundColor: COLORS.inputBg,
            color: COLORS.primary,
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #333',
            width: '100%',
            fontSize: '16px',
            outline: 'none'
          }}
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label style={{ color: COLORS.secondary, marginBottom: '8px', fontSize: '14px', display: 'block' }}>
          Category
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
          {['Food', 'Transport', 'Leisure', 'Shopping'].map((cat) => (
            <button
              key={cat}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `1px solid ${category === cat ? COLORS.accent : '#444'}`,
                backgroundColor: category === cat ? COLORS.accent : 'transparent',
                color: category === cat ? '#fff' : COLORS.secondary,
                fontWeight: category === cat ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <button style={{
          backgroundColor: COLORS.primary,
          padding: '15px',
          borderRadius: '10px',
          border: 'none',
          width: '100%',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Save Expense
        </button>
      </div>
    </div>
  );
};

const AnnualOverviewScreen = ({ onBack }) => {
  const data = [40, 65, 30, 85, 50, 70];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="Annual Overview" onBack={onBack} />
      
      <div style={{
        margin: '20px',
        padding: '20px',
        backgroundColor: COLORS.card,
        borderRadius: '16px'
      }}>
        <h3 style={{ color: COLORS.primary, fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
          Total Expenses (Aggregated)
        </h3>
        <p style={{ color: COLORS.secondary, fontSize: '12px', marginBottom: '20px' }}>
          Fixed + Variable
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '200px',
          gap: '8px'
        }}>
          {data.map((h, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1
            }}>
              <div style={{
                width: '100%',
                maxWidth: '40px',
                height: `${h * 2}px`,
                backgroundColor: h > 60 ? COLORS.danger : COLORS.accent,
                borderRadius: '6px',
                marginBottom: '8px'
              }} />
              <span style={{ color: COLORS.secondary, fontSize: '12px' }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        margin: '0 20px',
        padding: '20px',
        backgroundColor: '#1F1F22',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{ color: COLORS.secondary, fontSize: '14px', margin: 0 }}>Year to Date</p>
        <p style={{ color: COLORS.primary, fontSize: '24px', fontWeight: 'bold', margin: '5px 0 0 0' }}>
          € 14,250.00
        </p>
      </div>
    </div>
  );
};

const ScreenHeader = ({ title, onBack }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '50px 20px 20px',
    backgroundColor: COLORS.card
  }}>
    <button 
      onClick={onBack}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <ArrowLeft size={24} color={COLORS.primary} />
    </button>
    <span style={{ color: COLORS.primary, fontSize: '18px', fontWeight: '600' }}>{title}</span>
    <div style={{ width: '24px' }} />
  </div>
);

const PlaceholderScreen = ({ title, onBack }) => (
  <div style={{ minHeight: '100vh' }}>
    <ScreenHeader title={title} onBack={onBack} />
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh'
    }}>
      <span style={{ color: COLORS.secondary }}>Feature coming soon</span>
    </div>
  </div>
);

const MenuItem = ({ icon, label, onPress }) => (
  <button
    onClick={onPress}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '25px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      width: '100%',
      textAlign: 'left'
    }}
  >
    {icon}
    <span style={{ color: COLORS.secondary, fontSize: '16px', fontWeight: '500' }}>{label}</span>
  </button>
);

const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div style={{ marginBottom: '15px' }}>
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '15px',
        padding: 0
      }}
    >
      <span style={{
        color: isOpen ? COLORS.primary : COLORS.secondary,
        fontSize: '16px',
        fontWeight: '500'
      }}>
        {title}
      </span>
      {isOpen ? <ChevronUp size={24} color={COLORS.secondary} /> : <ChevronDown size={24} color={COLORS.secondary} />}
    </button>
    {isOpen && (
      <div style={{
        backgroundColor: COLORS.card,
        borderRadius: '12px',
        padding: '10px',
        marginBottom: '10px',
        borderLeft: `2px solid ${COLORS.cardBorder}`
      }}>
        {children}
      </div>
    )}
  </div>
);

const SubMenuItem = ({ label, highlight, onPress }) => (
  <button
    onClick={onPress}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 10px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left'
    }}
  >
    <span style={{
      color: highlight ? COLORS.primary : COLORS.secondary,
      fontSize: '14px',
      fontWeight: highlight ? '600' : 'normal'
    }}>
      {label}
    </span>
    {highlight && <ChevronRight size={16} color={COLORS.secondary} />}
  </button>
);
