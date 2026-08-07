import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, error, className = '', ...props }, ref) {
  return (
    <label className="block w-full text-sm text-slate-200">
      {label ? <span className="mb-2 block">{label}</span> : null}
      <input
        ref={ref}
        className={`w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm outline-none transition focus:border-brand-400 ${error ? 'border-rose-400' : ''} ${className}`.trim()}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-rose-400">{error}</span> : null}
    </label>
  );
});

export default Input;
