import { motion } from 'framer-motion';
import CoupleSetupForm from './CoupleSetupForm';
import { useCoupleStore } from '../../store/useCoupleStore';
import { Card } from '../../components/ui';

const cards = [
  { title: 'Today', body: 'Plan a quiet dinner and share three things you appreciate about each other.' },
  { title: 'This week', body: 'Review your shared goals and keep the momentum of your connection alive.' },
  { title: 'Next milestone', body: 'Create space for a meaningful conversation and capture the vibe in your journal.' },
];

export default function DashboardPage() {
  const profileName = useCoupleStore((state) => state.profileName);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-pink-200">Couple dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold">Welcome back to {profileName}.</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          This starter view is organized for future modules like rituals, plans, chats, memory boards, and relationship insights.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-[1fr_0.7fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card>
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{card.body}</p>
              </Card>
            </motion.article>
          ))}
        </div>
        <CoupleSetupForm />
      </div>
    </div>
  );
}
