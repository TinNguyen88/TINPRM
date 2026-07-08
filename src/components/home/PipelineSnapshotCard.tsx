import React from 'react';
import { PipelineSnapshot } from '../../domain/dashboard';
import { Card } from '../ui/Card';

export const PipelineSnapshotCard: React.FC<{ snapshot: PipelineSnapshot }> = ({ snapshot }) => {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-[13px] font-medium text-neutral-400 uppercase tracking-wide">Pipeline</span>
      <div className="grid grid-cols-3 gap-3">
        {snapshot.map(({ status, count }) => (
          <div key={status} className="flex flex-col items-center gap-0.5 py-2">
            <span className="text-[22px] font-semibold text-neutral-900 dark:text-white leading-none">{count}</span>
            <span className="text-[12px] text-neutral-500 dark:text-neutral-400 text-center">{status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
