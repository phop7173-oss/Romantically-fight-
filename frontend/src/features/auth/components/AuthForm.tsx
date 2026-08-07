import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Input } from '../../../components/ui';

type AuthMode = 'login' | 'register';

type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onSubmit: (values: AuthFormValues) => void;
  isPending: boolean;
  error?: string | null;
};

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email.'),
  password: z.string().min(8, 'Use at least 8 characters.'),
});

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email.'),
  password: z.string().min(8, 'Use at least 8 characters.'),
});

export default function AuthForm({ mode, onModeChange, onSubmit, isPending, error }: AuthFormProps) {
  const schema = mode === 'register' ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="mb-4 flex gap-2">
        <Button type="button" variant={mode === 'register' ? 'primary' : 'secondary'} onClick={() => onModeChange('register')}>
          Register
        </Button>
        <Button type="button" variant={mode === 'login' ? 'primary' : 'secondary'} onClick={() => onModeChange('login')}>
          Login
        </Button>
      </div>

      {mode === 'register' ? <Input label="Name" {...register('name')} error={errors.name?.message} /> : null}
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Sign in'}
      </Button>
    </form>
  );
}
