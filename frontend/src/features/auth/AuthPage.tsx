import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, createInvite, acceptInvite } from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';
import { Button, Card, Input } from '../../components/ui';

export default function AuthPage() {
  const navigate = useNavigate();
  const { setAuth, user } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteToken, setInviteToken] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      setMessage('Registration complete.');
      navigate('/dashboard');
    },
    onError: (error: Error) => setMessage(error.message),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      setMessage('Signed in.');
      navigate('/dashboard');
    },
    onError: (error: Error) => setMessage(error.message),
  });

  const inviteMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => createInvite({ email }, useAuthStore.getState().token ?? ''),
    onSuccess: () => {
      setMessage('Invitation created.');
    },
    onError: (error: Error) => setMessage(error.message),
  });

  const acceptMutation = useMutation({
    mutationFn: ({ token }: { token: string }) => acceptInvite({ token }, useAuthStore.getState().token ?? ''),
    onSuccess: () => {
      setMessage('Invitation accepted.');
    },
    onError: (error: Error) => setMessage(error.message),
  });

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 lg:px-8">
      <Card>
        <h1 className="text-3xl font-semibold">Authentication and couple linking</h1>
        <p className="mt-2 text-sm text-slate-400">This view is the first integration point for registration, login, and invitation flows.</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <div className="mb-4 flex gap-2">
            <Button variant={mode === 'register' ? 'primary' : 'secondary'} onClick={() => setMode('register')}>
              Register
            </Button>
            <Button variant={mode === 'login' ? 'primary' : 'secondary'} onClick={() => setMode('login')}>
              Login
            </Button>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (mode === 'register') {
                registerMutation.mutate({ name, email, password });
              } else {
                loginMutation.mutate({ email, password });
              }
            }}
            className="space-y-3"
          >
            {mode === 'register' ? <Input label="Name" value={name} onChange={(event) => setName(event.target.value)} /> : null}
            <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <Button type="submit" className="w-full">
              {mode === 'register' ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          {message ? <p className="mt-3 text-sm text-slate-300">{message}</p> : null}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Couple linking</h2>
          <p className="mt-2 text-sm text-slate-400">Authenticated users can create invitations and accept them through the protected flow.</p>
          <div className="mt-4 space-y-3">
            <Input label="Invite email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} />
            <Button variant="secondary" onClick={() => inviteMutation.mutate({ email: inviteEmail })}>
              Create invitation
            </Button>
            <Input label="Invitation token" value={inviteToken} onChange={(event) => setInviteToken(event.target.value)} />
            <Button variant="secondary" onClick={() => acceptMutation.mutate({ token: inviteToken })}>
              Accept invitation
            </Button>
            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-400">
              {user ? `Signed in as ${user.email} with coupleId ${user.coupleId ?? 'none'}` : 'Sign in to unlock invitation actions.'}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
