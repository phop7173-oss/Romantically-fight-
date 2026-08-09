import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '../../components/ui';

const dateFormSchema = z.object({
  title: z.string().trim().min(1, 'Please enter a title.'),
  scheduledAt: z.string().min(1, 'Please choose a date and time.'),
  details: z.string().trim().optional().default(''),
});

export type DateFormValues = z.infer<typeof dateFormSchema>;

type DateFormProps = {
  initialValues: { title: string; scheduledAt: string; details: string | null } | null;
  submitLabel: string;
  isPending: boolean;
  error?: string | null;
  onSubmit: (values: DateFormValues) => void;
};

function toDateTimeLocal(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function DateForm({ initialValues, submitLabel, isPending, error, onSubmit }: DateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateFormValues>({
    resolver: zodResolver(dateFormSchema),
    defaultValues: initialValues
      ? { title: initialValues.title, scheduledAt: toDateTimeLocal(initialValues.scheduledAt), details: initialValues.details ?? '' }
      : { title: '', scheduledAt: '', details: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input label="Title" {...register('title')} error={errors.title?.message} placeholder="Picnic in the park" />
      <Input label="When" type="datetime-local" {...register('scheduledAt')} error={errors.scheduledAt?.message} />
      <Input label="Details" {...register('details')} error={errors.details?.message} placeholder="Optional notes" />
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
