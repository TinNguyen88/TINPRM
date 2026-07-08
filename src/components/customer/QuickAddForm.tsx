import React, { useState } from 'react';
import { Customer, CUSTOMER_SOURCES, POTENTIAL_AUM_PRESETS } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { generateCustomerId } from '../../domain/customer';
import { nowISODateTime } from '../../utils/date';

interface QuickAddFormProps {
  onSubmit: (customer: Customer) => void;
  onCancel: () => void;
  onSwitchToFull: (draft: { name: string; phone: string; source: Customer['source']; potentialAUM: number }) => void;
}

/**
 * Theo yêu cầu "lưu khách trong dưới 20 giây": chỉ 4 trường, phần còn lại dùng mặc định.
 * Priority mặc định Medium, Status mặc định Lead, currentAUM = 0, không có Next Action.
 */
export const QuickAddForm: React.FC<QuickAddFormProps> = ({ onSubmit, onCancel, onSwitchToFull }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState<Customer['source']>('Referral');
  const [potentialAUM, setPotentialAUM] = useState<number>(POTENTIAL_AUM_PRESETS[0].value);

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const now = nowISODateTime();
    const customer: Customer = {
      id: generateCustomerId(),
      name: name.trim(),
      phone: phone.trim(),
      source,
      potentialAUM,
      currentAUM: 0,
      priority: 'Medium',
      status: 'Lead',
      nextActionType: null,
      nextFollowUpDate: null,
      lastContact: null,
      note: '',
      createdAt: now,
      updatedAt: now,
    };
    onSubmit(customer);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Customer Name" value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
      <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" required />
      <Select
        label="Source"
        value={source}
        onChange={(e) => setSource(e.target.value as Customer['source'])}
        options={CUSTOMER_SOURCES.map((s) => ({ value: s, label: s }))}
      />
      <Select
        label="Potential AUM"
        value={String(potentialAUM)}
        onChange={(e) => setPotentialAUM(Number(e.target.value))}
        options={POTENTIAL_AUM_PRESETS.map((p) => ({ value: String(p.value), label: p.label }))}
      />

      <div className="flex gap-3">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" className="flex-1" disabled={!canSubmit}>
          Save
        </Button>
      </div>

      <button
        type="button"
        onClick={() => onSwitchToFull({ name, phone, source, potentialAUM })}
        className="text-[13px] text-neutral-500 dark:text-neutral-400 text-center underline"
      >
        Nhập chi tiết đầy đủ
      </button>
    </form>
  );
};
