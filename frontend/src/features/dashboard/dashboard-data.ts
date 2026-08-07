export interface DashboardData {
  relationshipName: string;
  anniversary: string;
  anniversaryCountdownDays: number;
  nextDate: {
    title: string;
    when: string;
    details: string;
  };
  reminders: Array<{ label: string; due: string }>;
  bucketList: {
    completed: number;
    total: number;
    items: string[];
  };
  memories: Array<{ title: string; note: string }>;
  actions: string[];
}

export async function getDashboardData(): Promise<DashboardData> {
  return {
    relationshipName: 'Ava & Noah',
    anniversary: 'October 14',
    anniversaryCountdownDays: 68,
    nextDate: {
      title: 'Sunset picnic',
      when: 'Friday • 7:30 PM',
      details: 'Bring a blanket, favorite snacks, and your favorite playlist.',
    },
    reminders: [
      { label: 'Send a voice note', due: 'Today' },
      { label: 'Book restaurant table', due: 'Tomorrow' },
      { label: 'Write two gratitude lines', due: 'This week' },
    ],
    bucketList: {
      completed: 4,
      total: 8,
      items: ['Watch the sunrise together', 'Take a weekend train trip', 'Learn a dance routine', 'Create a shared photo book'],
    },
    memories: [
      { title: 'First winter walk', note: 'Hot cocoa and quiet conversation by the river.' },
      { title: 'Home-cooked dinner', note: 'A candlelit night that felt like a little holiday.' },
    ],
    actions: ['Plan a date', 'Share a memory', 'Add a reminder', 'Open journal'],
  };
}
