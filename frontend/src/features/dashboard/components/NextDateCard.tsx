import { DashboardCard } from './DashboardCard';

interface NextDateCardProps {
  title: string;
  when: string;
  details: string;
}

export function NextDateCard({ title, when, details }: NextDateCardProps) {
  return (
    <DashboardCard title="Next planned date" subtitle="A warm moment to look forward to">
      <div className="space-y-3">
        <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-4">
          <p className="text-sm text-pink-200">{title}</p>
          <p className="mt-1 text-xl font-semibold text-white">{when}</p>
        </div>
        <p className="text-sm text-slate-400">{details}</p>
      </div>
    </DashboardCard>
  );
}
