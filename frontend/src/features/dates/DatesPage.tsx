import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDate, deleteDate, listDates, updateDate, type CoupleDate } from '../../api/dates';
import { Button, Card, Modal } from '../../components/ui';
import DateForm, { type DateFormValues } from './DateForm';

function formatWhen(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function DatesPage() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<CoupleDate | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: dates, isLoading, isError, error } = useQuery({
    queryKey: ['dates'],
    queryFn: listDates,
  });

  const invalidateDates = () => {
    queryClient.invalidateQueries({ queryKey: ['dates'] });
  };

  const createMutation = useMutation({
    mutationFn: (values: DateFormValues) =>
      createDate({
        title: values.title,
        scheduledAt: new Date(values.scheduledAt).toISOString(),
        details: values.details.trim() ? values.details : null,
      }),
    onSuccess: () => {
      setIsOpen(false);
      setErrorMessage(null);
      invalidateDates();
    },
    onError: (mutationError: Error) => setErrorMessage(mutationError.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: DateFormValues }) =>
      updateDate(id, {
        title: values.title,
        scheduledAt: new Date(values.scheduledAt).toISOString(),
        details: values.details.trim() ? values.details : null,
      }),
    onSuccess: () => {
      setIsOpen(false);
      setEditing(null);
      setErrorMessage(null);
      invalidateDates();
    },
    onError: (mutationError: Error) => setErrorMessage(mutationError.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteDate(id),
    onSuccess: () => {
      setErrorMessage(null);
      invalidateDates();
    },
    onError: (mutationError: Error) => setErrorMessage(mutationError.message),
  });

  const openCreate = () => {
    setEditing(null);
    setErrorMessage(null);
    setIsOpen(true);
  };

  const openEdit = (date: CoupleDate) => {
    setEditing(date);
    setErrorMessage(null);
    setIsOpen(true);
  };

  const handleSubmit = (values: DateFormValues) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  if (isLoading) {
    return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-300">Loading your dates...</div>;
  }

  if (isError || !dates) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-rose-300">
        {(error as Error)?.message ?? 'We could not load your dates right now.'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-pink-200">Shared calendar</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Planned dates</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">Plan the moments that keep your relationship alive.</p>
          </div>
          <Button variant="primary" onClick={openCreate}>
            Plan a date
          </Button>
        </div>
      </header>

      {errorMessage && !isOpen ? (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">{errorMessage}</div>
      ) : null}

      {dates.length === 0 ? (
        <Card>
          <h2 className="text-lg font-semibold text-white">No dates planned yet</h2>
          <p className="mt-2 text-sm text-slate-400">Plan your first date to see it appear here.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {dates.map((date) => (
            <Card key={date.id} className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{date.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{formatWhen(date.scheduledAt)}</p>
                {date.details ? <p className="mt-1 text-sm text-slate-300">{date.details}</p> : null}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => openEdit(date)}>
                  Edit
                </Button>
                <Button variant="secondary" onClick={() => deleteMutation.mutate(date.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editing ? 'Edit date' : 'Plan a date'}>
        <DateForm
          initialValues={editing ? { title: editing.title, scheduledAt: editing.scheduledAt, details: editing.details } : null}
          submitLabel={editing ? 'Save changes' : 'Create date'}
          isPending={createMutation.isPending || updateMutation.isPending}
          error={errorMessage}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
