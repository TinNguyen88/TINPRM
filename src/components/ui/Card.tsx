import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...rest }) => {
  return (
    <div
      className={`bg-white dark:bg-neutral-900 rounded-2xl shadow-sm shadow-black/5 border border-neutral-100 dark:border-neutral-800 p-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
