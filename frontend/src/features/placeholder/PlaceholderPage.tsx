import { Card, Button } from '../../components/ui';
import { useAppStore } from '../../store/useAppStore';

export default function PlaceholderPage() {
  const { modalOpen, openModal, closeModal } = useAppStore();

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-pink-200">Foundation</p>
            <h2 className="mt-2 text-2xl font-semibold">Feature shell ready for expansion</h2>
          </div>
          <Button onClick={openModal}>Open modal</Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <p className="text-sm text-slate-400">This area is intentionally empty and reserved for future feature modules.</p>
        <div className="rounded-xl border border-dashed border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
          Reusable UI, global state, and API helpers are already connected and ready to be composed.
        </div>
      </Card>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-400">
        Modal state is driven by Zustand. Server state can be added with TanStack Query in the next layer.
      </div>

      {modalOpen ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-300">
          <p className="font-medium text-white">Modal content placeholder</p>
          <p className="mt-2 text-slate-400">This is a lightweight placeholder to show the modal foundation.</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
