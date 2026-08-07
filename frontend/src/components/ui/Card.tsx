import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20 ${className}`.trim()}>{children}</div>;
}
