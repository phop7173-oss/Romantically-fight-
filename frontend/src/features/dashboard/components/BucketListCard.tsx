import { DashboardCard } from './DashboardCard';

interface BucketListCardProps {
  completed: number;
  total: number;
  items: string[];
}

export function BucketListCard({ completed, total, items }: BucketListCardProps) {
  const progress = Math.round((completed / total) * 100);

  return (
    <DashboardCard title="Bucket list progress" subtitle="A future of shared adventures">
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-semibold text-white">{completed}/{total}</p>
          <p className="text-sm text-slate-400">{progress}% complete</p>
        </div>
        <div className="h-2 rounded-full bg-slate-800">
          <div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-pink-300" style={{ width: `${progress}%` }} />
        </div>
        <ul className="space-y-2 text-sm text-slate-400">
          {items.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </DashboardCard>
  );
}
