import React from 'react';
import { useAppData } from '../state/AppContext';
import { getGoalSummary, getTodayActions, getPipelineSnapshot, getTopPriorities } from '../domain/dashboard';
import { AppTab } from '../types';
import { GoalCard } from '../components/home/GoalCard';
import { TodayActionsCard } from '../components/home/TodayActionsCard';
import { PipelineSnapshotCard } from '../components/home/PipelineSnapshotCard';
import { TopPrioritiesCard } from '../components/home/TopPrioritiesCard';
import { QuickActionsCard } from '../components/home/QuickActionsCard';

interface HomeScreenProps {
  onSelectCustomer: (id: string) => void;
  onAddCustomer: () => void;
  onNavigateTab: (tab: AppTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCustomer, onAddCustomer, onNavigateTab }) => {
  const { data } = useAppData();

  const goalSummary = getGoalSummary(data.customers, data.settings);
  const todayActions = getTodayActions(data.customers);
  const pipelineSnapshot = getPipelineSnapshot(data.customers);
  const topPriorities = getTopPriorities(data.customers);

  return (
    <div className="p-4 flex flex-col gap-4 pb-6">
      <h1 className="text-[22px] font-semibold text-neutral-900 dark:text-white px-1">TinPRM</h1>
      <GoalCard summary={goalSummary} />
      <TodayActionsCard actions={todayActions} onSelectCustomer={onSelectCustomer} />
      <PipelineSnapshotCard snapshot={pipelineSnapshot} />
      <TopPrioritiesCard customers={topPriorities} onSelectCustomer={onSelectCustomer} />
      <QuickActionsCard
        onAddCustomer={onAddCustomer}
        onGoCustomers={() => onNavigateTab('customers')}
        onGoPipeline={() => onNavigateTab('pipeline')}
      />
    </div>
  );
};
