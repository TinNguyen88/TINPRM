import React from 'react';
import { Home, Users, GitBranch, Settings as SettingsIcon } from 'lucide-react';
import { AppTab } from '../../types';

interface TabBarProps {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}

const TABS: { key: AppTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-neutral-950/90 backdrop-blur border-t border-neutral-100 dark:border-neutral-800 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch max-w-md mx-auto">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                active ? 'text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-600'
              }`}
            >
              <Icon size={22} />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
