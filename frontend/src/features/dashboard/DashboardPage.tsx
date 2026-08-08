import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../../api/dashboard';
import { OverviewCard } from './components/OverviewCard';
import { NextDateCard } from './components/NextDateCard';

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-300">Loading your shared dashboard...</div>;
  }

  if (isError || !data) {
    return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-rose-300">{(error as Error)?.message ?? 'We could not load your dashboard right now.'}</div>;
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
          <OverviewCard name={data.coupleName} anniversary={data.anniversary} daysLeft={data.anniversaryCountdownDays} />
          <div className="grid gap-4 lg:grid-cols-2">
            {data.nextDate ? (
              <NextDateCard title={data.nextDate.title} when={data.nextDate.when} details={data.nextDate.details ?? 'No details provided.'} />
            ) : (
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">
                <h2 className="text-lg font-semibold text-white">No upcoming date planned</h2>
                <p className="mt-2 text-sm text-slate-400">Your next date will appear here once one is scheduled.</p>
              </div>
            )}
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">
              <h2 className="text-lg font-semibold text-white">Reminders</h2>
              <p className="mt-2 text-sm text-slate-400">This section is not yet backed by persisted content.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">
            <h2 className="text-lg font-semibold text-white">Bucket list</h2>
            <p className="mt-2 text-sm text-slate-400">Bucket list persistence is not implemented yet.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">
            <h2 className="text-lg font-semibold text-white">Memories</h2>
            <p className="mt-2 text-sm text-slate-400">Memory storage is not implemented yet.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">
            <h2 className="text-lg font-semibold text-white">Quick actions</h2>
            <p className="mt-2 text-sm text-slate-400">Quick actions are currently placeholders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
