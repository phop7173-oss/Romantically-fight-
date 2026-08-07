import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from './dashboard-data';
import { OverviewCard } from './components/OverviewCard';
import { NextDateCard } from './components/NextDateCard';
import { RemindersCard } from './components/RemindersCard';
import { BucketListCard } from './components/BucketListCard';
import { MemoriesCard } from './components/MemoriesCard';
import { QuickActionsCard } from './components/QuickActionsCard';

export default function DashboardPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  });

  if (isPending) {
    return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-300">Loading your shared dashboard...</div>;
  }

  if (isError || !data) {
    return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-rose-300">We could not load your dashboard right now.</div>;
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-pink-200">Shared dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">A calm view of your relationship</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Designed as a flexible home for future widgets, rituals, and shared planning experiences.
        </p>
      </header>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <OverviewCard name={data.relationshipName} anniversary={data.anniversary} daysLeft={data.anniversaryCountdownDays} />
          <div className="grid gap-4 lg:grid-cols-2">
            <NextDateCard title={data.nextDate.title} when={data.nextDate.when} details={data.nextDate.details} />
            <RemindersCard reminders={data.reminders} />
          </div>
        </div>

        <div className="space-y-4">
          <BucketListCard completed={data.bucketList.completed} total={data.bucketList.total} items={data.bucketList.items} />
          <MemoriesCard memories={data.memories} />
          <QuickActionsCard actions={data.actions} />
        </div>
      </div>
    </div>
  );
}
