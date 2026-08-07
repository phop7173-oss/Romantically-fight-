import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { useAuthStore } from '../../store/useAuthStore';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/foundation', label: 'Foundation' },
];

export default function SharedLayout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-pink-200">Romantically</p>
          <h2 className="text-xl font-semibold">Shared space</h2>
        </div>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-brand-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
