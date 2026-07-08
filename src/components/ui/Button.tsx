import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-neutral-900 text-white active:bg-neutral-700 dark:bg-white dark:text-neutral-900',
  secondary: 'bg-neutral-100 text-neutral-900 active:bg-neutral-200 dark:bg-neutral-800 dark:text-white',
  danger: 'bg-red-600 text-white active:bg-red-700',
  ghost: 'bg-transparent text-neutral-900 dark:text-white',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...rest }) => {
  return (
    <button
      className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-colors disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
