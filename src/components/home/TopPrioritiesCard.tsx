import React from 'react';
import { Customer } from '../../types';
import { Card } from '../ui/Card';
import { CustomerRow } from '../customer/CustomerRow';

interface TopPrioritiesCardProps {
  customers: Customer[];
  onSelectCustomer: (id: string) => void;
}

export const TopPrioritiesCard: React.FC<TopPrioritiesCardProps> = ({ customers, onSelectCustomer }) => {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-[13px] font-medium text-neutral-400 uppercase tracking-wide">Top Priorities</span>
      {customers.length === 0 ? (
        <p className="text-[14px] text-neutral-400 py-2">Chưa có khách hàng nào.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {customers.map((c) => (
            <CustomerRow key={c.id} customer={c} onClick={() => onSelectCustomer(c.id)} />
          ))}
        </div>
      )}
    </Card>
  );
};
