import { DashboardCard } from './DashboardCard';

interface OverviewCardProps {
  name: string;
  anniversary: string;
  daysLeft: number;
}

export function OverviewCard({ name, anniversary, daysLeft }: OverviewCardProps) {
  return (
    <DashboardCard title="Relationship overview" subtitle="Your shared story at a glance">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-400">Connected as</p>
          <p className="text-2xl font-semibold text-white">{name}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Anniversary</p>
            <p className="mt-1 text-lg font-semibold text-white">{anniversary}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Countdown</p>
            <p className="mt-1 text-lg font-semibold text-white">{daysLeft} days</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
