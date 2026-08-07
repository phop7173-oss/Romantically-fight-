import { DashboardCard } from './DashboardCard';
import { Button } from '../../../components/ui';

interface QuickActionsCardProps {
  actions: string[];
}

export function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <DashboardCard title="Quick actions" subtitle="Small next steps for your relationship">
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button key={action} variant="secondary">
            {action}
          </Button>
        ))}
      </div>
    </DashboardCard>
  );
}
