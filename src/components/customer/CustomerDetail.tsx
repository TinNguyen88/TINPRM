import React, { useState } from 'react';
import { ArrowLeft, Pencil, Trash2, CheckCircle2, Phone } from 'lucide-react';
import { Customer } from '../../types';
import { formatVND } from '../../utils/currency';
import { formatDateVN, formatRelativeDate } from '../../utils/date';
import { StatusBadge, PriorityBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CustomerForm } from './CustomerForm';

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
  onUpdate: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  onBack,
  onUpdate,
  onDelete,
  onComplete,
}) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="p-4">
        <button
          onClick={() => setEditing(false)}
          className="flex items-center gap-1 text-[15px] text-neutral-500 mb-4"
        >
          <ArrowLeft size={18} /> Hủy sửa
        </button>
        <CustomerForm
          initial={customer}
          onSubmit={(updated) => {
            onUpdate(updated);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  const hasNextAction = Boolean(customer.nextActionType && customer.nextFollowUpDate);

  return (
    <div className="p-4 flex flex-col gap-5 pb-10">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-[15px] text-neutral-500">
          <ArrowLeft size={18} /> Quay lại
        </button>
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-1 text-[15px] text-neutral-900 dark:text-white font-medium"
        >
          <Pencil size={16} /> Sửa
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-neutral-900 dark:text-white">{customer.name}</h1>
          <p className="text-[15px] text-neutral-500 mt-0.5">{customer.phone}</p>
        </div>
        <a
          href={`tel:${customer.phone}`}
          className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shrink-0"
          aria-label={`Gọi ${customer.name}`}
        >
          <Phone size={20} />
        </a>
      </div>

      <div className="flex items-center gap-2">
        <StatusBadge status={customer.status} />
        <PriorityBadge priority={customer.priority} />
      </div>

      <DetailRow label="Nguồn" value={customer.source} />
      <DetailRow label="Potential AUM" value={formatVND(customer.potentialAUM)} />
      <DetailRow label="Current AUM" value={formatVND(customer.currentAUM)} />
      <DetailRow
        label="Next Action"
        value={hasNextAction ? `${customer.nextActionType} — ${formatRelativeDate(customer.nextFollowUpDate)}` : 'Không có'}
      />
      <DetailRow label="Last Contact" value={formatDateVN(customer.lastContact)} />
      {customer.note && <DetailRow label="Note" value={customer.note} multiline />}

      {hasNextAction && (
        <Button
          className="flex items-center justify-center gap-2"
          onClick={() => onComplete(customer.id)}
        >
          <CheckCircle2 size={18} /> Complete hành động
        </Button>
      )}

      <button
        onClick={() => {
          if (confirm(`Xóa khách hàng "${customer.name}"? Không thể hoàn tác.`)) {
            onDelete(customer.id);
            onBack();
          }
        }}
        className="flex items-center justify-center gap-2 text-red-600 text-[15px] font-medium py-2"
      >
        <Trash2 size={16} /> Xóa khách hàng
      </button>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string; multiline?: boolean }> = ({
  label,
  value,
  multiline,
}) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[12px] font-medium text-neutral-400 uppercase tracking-wide">{label}</span>
    <span className={`text-[16px] text-neutral-900 dark:text-white ${multiline ? 'whitespace-pre-wrap' : ''}`}>
      {value}
    </span>
  </div>
);
