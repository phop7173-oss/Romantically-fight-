import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  accent?: string;
}

export function DashboardCard({ title, subtitle, children, accent = 'from-brand-500/20 to-transparent' }: DashboardCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft ${accent}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {children}
    </motion.article>
  );
}
