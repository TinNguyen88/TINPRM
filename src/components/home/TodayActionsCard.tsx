import React from 'react';
import { Phone, Users, Bell, AlertTriangle } from 'lucide-react';
import { TodayActions } from '../../domain/dashboard';
import { Card } from '../ui/Card';

interface TodayActionsCardProps {
  actions: TodayActions;
  onSelectCustomer: (id: string) => void;
}

export const TodayActionsCard: React.FC<TodayActionsCardProps> = ({ actions, onSelectCustomer }) => {
  const rows = [
    { key: 'calls', label: 'Calls', icon: Phone, list: actions.calls, danger: false },
    { key: 'meetings', label: 'Meetings', icon: Users, list: actions.meetings, danger: false },
    { key: 'followUps', label: 'Follow Ups', icon: Bell, list: actions.followUps, danger: false },
    { key: 'overdue', label: 'Overdue', icon: AlertTriangle, list: actions.overdue, danger: true },
  ] as const;

  return (
    <Card className="flex flex-col gap-3">
      <span className="text-[13px] font-medium text-neutral-400 uppercase tracking-wide">Hôm nay</span>
      <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
        {rows.map(({ key, label, icon: Icon, list, danger }) => (
          <div key={key} className="py-2.5 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 text-[15px] font-medium ${
                  danger && list.length > 0 ? 'text-red-600 dark:text-red-400' : 'text-neutral-900 dark:text-white'
                }`}
              >
                <Icon size={17} /> {label}
              </span>
              <span
                className={`text-[15px] font-semibold ${
                  danger && list.length > 0 ? 'text-red-600 dark:text-red-400' : 'text-neutral-500'
                }`}
              >
                {list.length}
              </span>
            </div>
            {list.length > 0 && (
              <div className="flex flex-col gap-1 mt-1.5 pl-6">
                {list.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCustomer(c.id)}
                    className="text-left text-[13px] text-neutral-500 dark:text-neutral-400 active:text-neutral-900 dark:active:text-white"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
