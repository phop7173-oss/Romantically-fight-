import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

const highlights = [
  { title: 'Shared rituals', description: 'Celebrate your relationship with guided activities and reminders.' },
  { title: 'Private moments', description: 'Keep memories, plans, and affection notes in one secure place.' },
  { title: 'Reliable sync', description: 'Your connection stays consistent across devices and sessions.' },
];

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 lg:px-8">
      <section className="grid gap-10 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-1 text-sm text-pink-200">
            <Sparkles className="h-4 w-4" />
            Designed for modern couples
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Build a beautiful connection, one thoughtful moment at a time.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              A polished foundation for shared rituals, relationship planning, and private communication designed to grow with your love story.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="rounded-full bg-pink-500 px-5 py-3 font-medium text-white transition hover:bg-pink-400">
              Open your space
            </Link>
            <a href="#features" className="rounded-full border border-white/20 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/10">
              Explore features
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-pink-500/20 p-3 text-pink-300">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Relationship OS</p>
              <p className="text-xl font-semibold">Intentional, warm, grounded</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-emerald-400" />
                  <div>
                    <h2 className="font-medium">{item.title}</h2>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mt-10 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
