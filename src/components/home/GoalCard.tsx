import React from 'react';
import { GoalSummary } from '../../domain/dashboard';
import { formatVND } from '../../utils/currency';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export const GoalCard: React.FC<{ summary: GoalSummary }> = ({ summary }) => {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-[13px] font-medium text-neutral-400 uppercase tracking-wide">Goal AUM</span>
      <span className="text-[28px] font-semibold text-neutral-900 dark:text-white leading-none">
        {formatVND(summary.goalAmount)}
      </span>

      <div className="flex justify-between text-[14px] text-neutral-500 dark:text-neutral-400 mt-1">
        <span>Hiện tại: {formatVND(summary.currentAUM)}</span>
        <span>Còn lại: {formatVND(summary.remainingAUM)}</span>
      </div>

      <ProgressBar percent={summary.progressPercent} />
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-neutral-400">{summary.progressPercent}%</span>
        <span
          className={`text-[13px] font-medium ${
            summary.daysRemaining < 0 ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          {summary.daysRemaining < 0
            ? `Quá hạn ${Math.abs(summary.daysRemaining)} ngày`
            : `Còn ${summary.daysRemaining} ngày`}
        </span>
      </div>
    </Card>
  );
};
