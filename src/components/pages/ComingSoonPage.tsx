import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Clock, Send, ArrowLeft } from 'lucide-react';

export const ComingSoonPage: React.FC = () => {
  const { setActivePage, addToast } = useTheme();

  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => ({
        ...prev,
        seconds: prev.seconds > 0 ? prev.seconds - 1 : 59,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    addToast({
      type: 'success',
      title: 'Subscribed to Cyber Dispatch',
      message: `${email} registered for module launch announcements.`,
    });
    setEmail('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
        <Clock className="w-8 h-8 animate-pulse" />
      </div>

      <div>
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
          SYSTEM COMPONENT IN PREPARATION
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-100 mt-2">
          Autonomous POS Satellite Mesh
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
          We are deploying low-latency decentralized offline sync for roaming mobile food truck terminals and stadium kiosks.
        </p>
      </div>

      {/* Countdown Timers */}
      <div className="grid grid-cols-4 gap-3 max-w-sm w-full font-mono">
        {[
          { label: 'Days', val: timeLeft.days },
          { label: 'Hours', val: timeLeft.hours },
          { label: 'Mins', val: timeLeft.minutes },
          { label: 'Secs', val: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="cyber-card p-3 rounded-lg border border-cyan-500/30 bg-[#0d1421] text-center"
          >
            <span className="text-2xl font-bold text-cyan-400 tabular-nums block">
              {item.val.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Subscribe Form */}
      <form onSubmit={handleSubscribe} className="flex max-w-md w-full gap-2">
        <input
          type="email"
          required
          placeholder="Enter operator email for launch dispatch..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
        />
        <button
          type="submit"
          className="px-4 py-2 text-xs font-bold rounded bg-cyan-500 text-black uppercase tracking-wider hover:bg-cyan-400 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          Notify Me
        </button>
      </form>

      <button
        onClick={() => setActivePage('dashboard')}
        className="text-xs text-cyan-400 hover:underline font-mono cursor-pointer flex items-center gap-1 pt-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Return to Command Dashboard
      </button>
    </div>
  );
};
