import React, { useEffect, useState } from 'react';
import { AppTab } from './types';
import { AppProvider, useAppData } from './state/AppContext';
import { TabBar } from './components/layout/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { CustomersScreen } from './screens/CustomersScreen';
import { PipelineScreen } from './screens/PipelineScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const ThemeApplier: React.FC = () => {
  const { data } = useAppData();

  useEffect(() => {
    const root = document.documentElement;
    const apply = (isDark: boolean) => root.classList.toggle('dark', isDark);

    if (data.settings.theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      apply(mq.matches);
      const listener = (e: MediaQueryListEvent) => apply(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }

    apply(data.settings.theme === 'dark');
    return undefined;
  }, [data.settings.theme]);

  return null;
};

const AppShell: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  // selectedCustomerId dùng chung cho Customers và Pipeline — mỗi tab tự quản lý
  // sub-view riêng của mình để không lẫn trạng thái giữa 2 tab khác nhau.
  const [customersSelectedId, setCustomersSelectedId] = useState<string | null>(null);
  const [pipelineSelectedId, setPipelineSelectedId] = useState<string | null>(null);
  const [quickAddRequested, setQuickAddRequested] = useState(false);

  const handleSelectFromHome = (id: string) => {
    setActiveTab('customers');
    setCustomersSelectedId(id);
  };

  const handleAddCustomerFromHome = () => {
    setActiveTab('customers');
    setQuickAddRequested(true);
  };

  const handleChangeTab = (tab: AppTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <ThemeApplier />
      <div className="max-w-md mx-auto pb-20">
        {activeTab === 'home' && (
          <HomeScreen
            onSelectCustomer={handleSelectFromHome}
            onAddCustomer={handleAddCustomerFromHome}
            onNavigateTab={handleChangeTab}
          />
        )}
        {activeTab === 'customers' && (
          <CustomersScreen
            selectedCustomerId={customersSelectedId}
            onSelectCustomer={setCustomersSelectedId}
            forceQuickAdd={quickAddRequested}
            onConsumeForceQuickAdd={() => setQuickAddRequested(false)}
          />
        )}
        {activeTab === 'pipeline' && (
          <PipelineScreen selectedCustomerId={pipelineSelectedId} onSelectCustomer={setPipelineSelectedId} />
        )}
        {activeTab === 'settings' && <SettingsScreen />}
      </div>
      <TabBar activeTab={activeTab} onChange={handleChangeTab} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
