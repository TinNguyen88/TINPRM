import React from 'react';
import { CustomerStatus, Priority } from '../../types';

const STATUS_CLASSES: Record<CustomerStatus, string> = {
  Lead: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  Contacted: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  Meeting: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  Proposal: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  Negotiation: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  Closed: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  Lost: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
};

const PRIORITY_CLASSES: Record<Priority, string> = {
  High: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  Low: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
};

export const StatusBadge: React.FC<{ status: CustomerStatus }> = ({ status }) => (
  <span className={`px-2 py-0.5 rounded-full text-[12px] font-medium ${STATUS_CLASSES[status]}`}>{status}</span>
);

export const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => (
  <span className={`px-2 py-0.5 rounded-full text-[12px] font-medium ${PRIORITY_CLASSES[priority]}`}>
    {priority}
  </span>
);
