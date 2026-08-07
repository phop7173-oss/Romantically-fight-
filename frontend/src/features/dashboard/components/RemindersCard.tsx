import { DashboardCard } from './DashboardCard';

interface ReminderItem {
  label: string;
  due: string;
}

interface RemindersCardProps {
  reminders: ReminderItem[];
}

export function RemindersCard({ reminders }: RemindersCardProps) {
  return (
    <DashboardCard title="Reminders" subtitle="Gentle nudges for your shared rhythm">
      <ul className="space-y-2">
        {reminders.map((item) => (
          <li key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm">
            <span className="text-slate-200">{item.label}</span>
            <span className="text-slate-400">{item.due}</span>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
