import React from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'danger' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30',
      outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50',
      danger: 'bg-alert-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
