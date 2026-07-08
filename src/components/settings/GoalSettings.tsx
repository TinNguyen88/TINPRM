import React, { useState } from 'react';
import { Settings } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { parseVNDInput, formatVND } from '../../utils/currency';
import { addDaysISO } from '../../utils/date';

interface GoalSettingsProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
}

const PERIOD_OPTIONS = [
  { value: '30', label: '30 ngày' },
  { value: '60', label: '60 ngày' },
  { value: '90', label: '90 ngày' },
  { value: '365', label: '1 năm' },
  { value: 'custom', label: 'Custom' },
];

export const GoalSettings: React.FC<GoalSettingsProps> = ({ settings, onSave }) => {
  const [goalAmountStr, setGoalAmountStr] = useState(String(settings.goalAmount));
  const [periodOption, setPeriodOption] = useState<string>(
    settings.goalPeriodDays ? String(settings.goalPeriodDays) : 'custom'
  );
  const [startDate, setStartDate] = useState(settings.goalStartDate);
  const [endDate, setEndDate] = useState(settings.goalEndDate);
  const [theme, setTheme] = useState<Settings['theme']>(settings.theme);
  const [saved, setSaved] = useState(false);

  const handlePeriodChange = (value: string) => {
    setPeriodOption(value);
    if (value !== 'custom') {
      setEndDate(addDaysISO(startDate, Number(value)));
    }
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    if (periodOption !== 'custom') {
      setEndDate(addDaysISO(value, Number(periodOption)));
    }
  };

  const handleSave = () => {
    onSave({
      goalAmount: parseVNDInput(goalAmountStr),
      goalPeriodDays: periodOption === 'custom' ? null : Number(periodOption),
      goalStartDate: startDate,
      goalEndDate: endDate,
      theme,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Goal Amount"
        value={goalAmountStr}
        onChange={(e) => setGoalAmountStr(e.target.value)}
        inputMode="numeric"
      />
      <span className="text-[12px] text-neutral-400 -mt-2">{formatVND(parseVNDInput(goalAmountStr))}</span>

      <Select
        label="Goal Period"
        value={periodOption}
        onChange={(e) => handlePeriodChange(e.target.value)}
        options={PERIOD_OPTIONS}
      />

      <Input label="Goal Start" type="date" value={startDate} onChange={(e) => handleStartDateChange(e.target.value)} />

      <Input
        label="Goal End"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        disabled={periodOption !== 'custom'}
      />

      <Select
        label="Giao diện"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Settings['theme'])}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ]}
      />

      <Button onClick={handleSave}>{saved ? 'Đã lưu ✓' : 'Lưu Goal'}</Button>
    </div>
  );
};
