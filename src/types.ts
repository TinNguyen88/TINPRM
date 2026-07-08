// Data Model — đúng theo PRD đã chốt (Phase 1 + Phase 2 + Revisions).
// Không có entity Task hay Goal riêng — cả hai đều derived / nằm trong Settings.

export type CustomerSource =
  | 'EB5'
  | 'Referral'
  | 'Old Customer'
  | 'Colleague'
  | 'Networking'
  | 'SME'
  | 'Other';

export const CUSTOMER_SOURCES: CustomerSource[] = [
  'EB5',
  'Referral',
  'Old Customer',
  'Colleague',
  'Networking',
  'SME',
  'Other',
];

export type CustomerStatus =
  | 'Lead'
  | 'Contacted'
  | 'Meeting'
  | 'Proposal'
  | 'Negotiation'
  | 'Closed'
  | 'Lost';

// Đúng thứ tự Pipeline — dùng để hiển thị Pipeline Snapshot và màn hình Pipeline.
export const PIPELINE_STATUSES: CustomerStatus[] = [
  'Lead',
  'Contacted',
  'Meeting',
  'Proposal',
  'Negotiation',
  'Closed',
];

export const ALL_STATUSES: CustomerStatus[] = [...PIPELINE_STATUSES, 'Lost'];

export type NextActionType = 'Call' | 'Meeting' | 'Follow Up';

export const NEXT_ACTION_TYPES: NextActionType[] = ['Call', 'Meeting', 'Follow Up'];

export type Priority = 'High' | 'Medium' | 'Low';

export const PRIORITIES: Priority[] = ['High', 'Medium', 'Low'];

// Mốc Potential AUM — R04: bỏ mốc 20B+, thêm Custom Value.
export const POTENTIAL_AUM_PRESETS: { label: string; value: number }[] = [
  { label: '500M', value: 500_000_000 },
  { label: '1B', value: 1_000_000_000 },
  { label: '2B', value: 2_000_000_000 },
  { label: '5B', value: 5_000_000_000 },
  { label: '10B', value: 10_000_000_000 },
  { label: '20B', value: 20_000_000_000 },
];

export interface Customer {
  id: string;
  name: string;
  phone: string;
  source: CustomerSource;
  potentialAUM: number;
  currentAUM: number; // Revision 02 — mặc định 0
  priority: Priority; // Revision 03
  status: CustomerStatus;
  nextActionType: NextActionType | null;
  nextFollowUpDate: string | null; // ISO date string 'YYYY-MM-DD', null = không có việc kế tiếp
  lastContact: string | null; // ISO date string
  note: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

export type GoalPeriodPreset = 30 | 60 | 90 | 365 | 'custom';

export interface Settings {
  goalAmount: number;
  goalPeriodDays: number | null; // null khi Custom (không quy về số ngày cố định)
  goalStartDate: string; // ISO date
  goalEndDate: string; // ISO date
  theme: 'light' | 'dark' | 'system';
}

export interface AppData {
  schemaVersion: number;
  customers: Customer[];
  settings: Settings;
}

export const CURRENT_SCHEMA_VERSION = 1;

export type AppTab = 'home' | 'customers' | 'pipeline' | 'settings';
