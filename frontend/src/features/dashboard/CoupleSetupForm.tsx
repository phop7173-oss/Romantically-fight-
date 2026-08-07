import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { createCouple } from '../../api/couples';
import { useCoupleStore } from '../../store/useCoupleStore';
import { Button, Input } from '../../components/ui';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter a couple name.'),
  partnerName: z.string().trim().min(2, 'Please enter a partner name.'),
});

type FormValues = z.infer<typeof schema>;

export default function CoupleSetupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const setProfileName = useCoupleStore((state) => state.setProfileName);

  const mutation = useMutation({
    mutationFn: createCouple,
    onSuccess: (data) => {
      setProfileName(data.name);
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate({
      name: values.name,
      members: [{ name: values.partnerName }],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      <Input label="Couple name" {...register('name')} error={errors.name?.message} placeholder="A cozy duo" />
      <Input label="Partner name" {...register('partnerName')} error={errors.partnerName?.message} placeholder="Alex" />
      {mutation.isError ? <p className="text-sm text-rose-400">{mutation.error.message}</p> : null}
      <Button type="submit" className="w-full" variant="primary">
        {mutation.isPending ? 'Saving...' : 'Create profile'}
      </Button>
    </form>
  );
}
