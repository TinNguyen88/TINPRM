import { Customer, NextActionType, PIPELINE_STATUSES, Settings, CustomerStatus } from '../types';
import { isBeforeToday, isToday, daysBetween, todayISO } from '../utils/date';
import { sortCustomersDefault } from './customer';

// ---- GOAL ----

export interface GoalSummary {
  goalAmount: number;
  currentAUM: number;
  remainingAUM: number;
  progressPercent: number; // 0–100, đã chặn trần
  daysRemaining: number; // có thể âm nếu đã qua Goal End Date
}

/** Revision 01: Current AUM = SUM(customer.currentAUM), không lọc theo status. */
export function getCurrentAUM(customers: Customer[]): number {
  return customers.reduce((sum, c) => sum + (c.currentAUM || 0), 0);
}

export function getGoalSummary(customers: Customer[], settings: Settings): GoalSummary {
  const currentAUM = getCurrentAUM(customers);
  const remainingAUM = Math.max(0, settings.goalAmount - currentAUM);
  const progressPercent =
    settings.goalAmount > 0 ? Math.min(100, Math.round((currentAUM / settings.goalAmount) * 100)) : 0;
  const daysRemaining = daysBetween(todayISO(), settings.goalEndDate);
  return { goalAmount: settings.goalAmount, currentAUM, remainingAUM, progressPercent, daysRemaining };
}

// ---- TODAY'S ACTIONS ----

export interface TodayActions {
  calls: Customer[];
  meetings: Customer[];
  followUps: Customer[];
  overdue: Customer[];
}

const TYPE_TO_KEY: Record<NextActionType, keyof Omit<TodayActions, 'overdue'>> = {
  Call: 'calls',
  Meeting: 'meetings',
  'Follow Up': 'followUps',
};

/** Derived từ Customer — không lưu trữ riêng (Revision 07 / quyết định Phase 1 mục 2). */
export function getTodayActions(customers: Customer[]): TodayActions {
  const result: TodayActions = { calls: [], meetings: [], followUps: [], overdue: [] };

  for (const c of customers) {
    if (!c.nextFollowUpDate || !c.nextActionType) continue;

    if (isBeforeToday(c.nextFollowUpDate)) {
      result.overdue.push(c);
    } else if (isToday(c.nextFollowUpDate)) {
      result[TYPE_TO_KEY[c.nextActionType]].push(c);
    }
  }

  return result;
}

// ---- PIPELINE SNAPSHOT ----

export type PipelineSnapshot = { status: CustomerStatus; count: number }[];

export function getPipelineSnapshot(customers: Customer[]): PipelineSnapshot {
  return PIPELINE_STATUSES.map((status) => ({
    status,
    count: customers.filter((c) => c.status === status).length,
  }));
}

// ---- TOP PRIORITIES ----

/** Tối đa 5 khách, dùng lại đúng thứ tự sort mặc định (Revision 04) — không tạo logic sắp xếp riêng. */
export function getTopPriorities(customers: Customer[], limit = 5): Customer[] {
  return sortCustomersDefault(customers).slice(0, limit);
}
