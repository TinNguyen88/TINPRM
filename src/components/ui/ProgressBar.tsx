import React from 'react';

export const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
      <div
        className="h-full rounded-full bg-neutral-900 dark:bg-white transition-[width] duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
