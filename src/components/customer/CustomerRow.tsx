import React from 'react';
import { Phone } from 'lucide-react';
import { Customer } from '../../types';
import { formatVNDShort } from '../../utils/currency';
import { formatRelativeDate, isBeforeToday } from '../../utils/date';
import { StatusBadge, PriorityBadge } from '../ui/Badge';

interface CustomerRowProps {
  customer: Customer;
  onClick: () => void;
}

export const CustomerRow: React.FC<CustomerRowProps> = ({ customer, onClick }) => {
  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 flex items-stretch">
      <button
        onClick={onClick}
        className="flex-1 text-left p-4 flex flex-col gap-1.5 active:bg-neutral-50 dark:active:bg-neutral-800 rounded-l-2xl"
      >
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold text-neutral-900 dark:text-white">{customer.name}</span>
          <PriorityBadge priority={customer.priority} />
        </div>
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 dark:text-neutral-400">
          <span>{formatVNDShort(customer.potentialAUM)}</span>
          <span>·</span>
          <StatusBadge status={customer.status} />
        </div>
        {customer.nextFollowUpDate && (
          <div
            className={`text-[13px] font-medium ${
              isBeforeToday(customer.nextFollowUpDate)
                ? 'text-red-600 dark:text-red-400'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {customer.nextActionType}: {formatRelativeDate(customer.nextFollowUpDate)}
          </div>
        )}
      </button>
      <a
        href={`tel:${customer.phone}`}
        onClick={(e) => e.stopPropagation()}
        className="w-14 flex items-center justify-center border-l border-neutral-100 dark:border-neutral-800 text-neutral-400 active:text-neutral-900 dark:active:text-white"
        aria-label={`Gọi ${customer.name}`}
      >
        <Phone size={19} />
      </a>
    </div>
  );
};
