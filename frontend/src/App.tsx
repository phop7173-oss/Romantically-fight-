import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppRoutes } from './routes';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,107,138,0.18),_transparent_45%),linear-gradient(135deg,_#111827,_#1f2937)] text-slate-50">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <AppRoutes />
      </motion.div>
    </div>
  );
}

export default App;
