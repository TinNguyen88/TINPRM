import React from 'react';
import { UserPlus, Users, GitBranch } from 'lucide-react';
import { Card } from '../ui/Card';

interface QuickActionsCardProps {
  onAddCustomer: () => void;
  onGoCustomers: () => void;
  onGoPipeline: () => void;
}

export const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onAddCustomer,
  onGoCustomers,
  onGoPipeline,
}) => {
  return (
    <Card className="flex gap-2.5">
      <QuickActionButton icon={UserPlus} label="Add Customer" onClick={onAddCustomer} />
      <QuickActionButton icon={Users} label="Customers" onClick={onGoCustomers} />
      <QuickActionButton icon={GitBranch} label="Pipeline" onClick={onGoPipeline} />
    </Card>
  );
};

const QuickActionButton: React.FC<{
  icon: React.FC<{ size?: number }>;
  label: string;
  onClick: () => void;
}> = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 active:bg-neutral-100 dark:active:bg-neutral-700"
  >
    <Icon size={20} />
    <span className="text-[12px] font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
  </button>
);
