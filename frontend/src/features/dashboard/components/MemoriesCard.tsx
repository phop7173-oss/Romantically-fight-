import { DashboardCard } from './DashboardCard';

interface MemoryItem {
  title: string;
  note: string;
}

interface MemoriesCardProps {
  memories: MemoryItem[];
}

export function MemoriesCard({ memories }: MemoriesCardProps) {
  return (
    <DashboardCard title="Recent memories" subtitle="Captured moments and bright reflections">
      <div className="space-y-3">
        {memories.map((memory) => (
          <div key={memory.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
            <p className="font-medium text-white">{memory.title}</p>
            <p className="mt-1 text-sm text-slate-400">{memory.note}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
