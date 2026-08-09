import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import AuthPage from './features/auth/AuthPage';
import DashboardPage from './features/dashboard/DashboardPage';
import DatesPage from './features/dates/DatesPage';
import PlaceholderPage from './features/placeholder/PlaceholderPage';
import SharedLayout from './components/layout/SharedLayout';
import { useAuthStore } from './store/useAuthStore';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<SharedLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dates"
          element={
            <ProtectedRoute>
              <DatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foundation"
          element={
            <ProtectedRoute>
              <PlaceholderPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
