import React, { useState } from 'react';
import {
  Customer,
  CUSTOMER_SOURCES,
  ALL_STATUSES,
  PRIORITIES,
  NEXT_ACTION_TYPES,
  POTENTIAL_AUM_PRESETS,
  NextActionType,
} from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { parseVNDInput, formatVND } from '../../utils/currency';
import { generateCustomerId } from '../../domain/customer';
import { nowISODateTime } from '../../utils/date';

interface CustomerFormProps {
  initial?: Partial<Customer>;
  onSubmit: (customer: Customer) => void;
  onCancel: () => void;
}

const CUSTOM_POTENTIAL_KEY = 'custom';

export const CustomerForm: React.FC<CustomerFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [phone, setPhone] = useState(initial?.phone ?? '');
  const [source, setSource] = useState<Customer['source']>(initial?.source ?? 'Referral');
  const [status, setStatus] = useState<Customer['status']>(initial?.status ?? 'Lead');
  const [priority, setPriority] = useState<Customer['priority']>(initial?.priority ?? 'Medium');

  const initialPreset = initial
    ? POTENTIAL_AUM_PRESETS.find((p) => p.value === initial.potentialAUM)
    : undefined;
  const [potentialPresetKey, setPotentialPresetKey] = useState<string>(
    initial ? (initialPreset ? String(initialPreset.value) : CUSTOM_POTENTIAL_KEY) : String(POTENTIAL_AUM_PRESETS[0].value)
  );
  const [potentialCustom, setPotentialCustom] = useState<string>(
    initial && !initialPreset ? String(initial.potentialAUM) : ''
  );

  const [currentAUM, setCurrentAUM] = useState<string>(initial ? String(initial.currentAUM) : '0');

  const [nextActionType, setNextActionType] = useState<NextActionType | ''>(initial?.nextActionType ?? '');
  const [nextFollowUpDate, setNextFollowUpDate] = useState<string>(initial?.nextFollowUpDate ?? '');
  const [note, setNote] = useState(initial?.note ?? '');

  const resolvedPotentialAUM =
    potentialPresetKey === CUSTOM_POTENTIAL_KEY ? parseVNDInput(potentialCustom) : Number(potentialPresetKey);

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && resolvedPotentialAUM > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const now = nowISODateTime();
    const customer: Customer = {
      id: initial?.id ?? generateCustomerId(),
      name: name.trim(),
      phone: phone.trim(),
      source,
      potentialAUM: resolvedPotentialAUM,
      currentAUM: parseVNDInput(currentAUM),
      priority,
      status,
      nextActionType: nextActionType || null,
      nextFollowUpDate: nextActionType ? nextFollowUpDate || null : null,
      lastContact: initial?.lastContact ?? null,
      note: note.trim(),
      createdAt: initial?.createdAt ?? now,
      updatedAt: now,
    };
    onSubmit(customer);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8">
      <Input label="Tên khách hàng" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" />

      <Select
        label="Nguồn"
        value={source}
        onChange={(e) => setSource(e.target.value as Customer['source'])}
        options={CUSTOMER_SOURCES.map((s) => ({ value: s, label: s }))}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">Potential AUM</label>
        <Select
          value={potentialPresetKey}
          onChange={(e) => setPotentialPresetKey(e.target.value)}
          options={[
            ...POTENTIAL_AUM_PRESETS.map((p) => ({ value: String(p.value), label: p.label })),
            { value: CUSTOM_POTENTIAL_KEY, label: 'Custom Value' },
          ]}
        />
        {potentialPresetKey === CUSTOM_POTENTIAL_KEY && (
          <Input
            placeholder="Nhập số tiền (VND)"
            value={potentialCustom}
            onChange={(e) => setPotentialCustom(e.target.value)}
            inputMode="numeric"
          />
        )}
        <span className="text-[12px] text-neutral-400">{formatVND(resolvedPotentialAUM)}</span>
      </div>

      <Input
        label="Current AUM (doanh số thực tế)"
        value={currentAUM}
        onChange={(e) => setCurrentAUM(e.target.value)}
        inputMode="numeric"
      />

      <Select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Customer['priority'])}
        options={PRIORITIES.map((p) => ({ value: p, label: p }))}
      />

      <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as Customer['status'])}
        options={ALL_STATUSES.map((s) => ({ value: s, label: s }))}
      />

      <Select
        label="Next Action"
        value={nextActionType}
        onChange={(e) => setNextActionType(e.target.value as NextActionType | '')}
        options={[{ value: '', label: 'Không có' }, ...NEXT_ACTION_TYPES.map((t) => ({ value: t, label: t }))]}
      />

      {nextActionType && (
        <Input
          label="Next Follow Up"
          type="date"
          value={nextFollowUpDate}
          onChange={(e) => setNextFollowUpDate(e.target.value)}
          required
        />
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[15px] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" className="flex-1" disabled={!canSubmit}>
          Lưu
        </Button>
      </div>
    </form>
  );
};
