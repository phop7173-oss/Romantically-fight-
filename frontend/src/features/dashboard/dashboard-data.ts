export interface DashboardData {
  relationshipName: string;
  anniversary: string;
  anniversaryCountdownDays: number;
  nextDate: {
    title: string;
    when: string;
    details: string | null;
  } | null;
}

export async function getDashboardData(): Promise<DashboardData> {
  throw new Error('Dashboard data function must be replaced with API-backed implementation.');
}
