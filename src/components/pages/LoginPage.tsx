import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { ShieldCheck, Lock, Mail, ArrowRight, ShieldAlert, Key } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setActivePage, addToast } = useTheme();

  const [email, setEmail] = useState('admin@cyber-template.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Authentication Successful',
      message: 'Logged in as Operator Zero (Level 4 Admin).',
    });
    setActivePage('dashboard');
  };

  const prefillDemo = () => {
    setEmail('admin@cyber-template.io');
    setPassword('CyberSecret2026!');
    addToast({
      type: 'info',
      title: 'Demo Credentials Prefilled',
      message: 'Demo administrator credentials populated.',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[550px] p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Branding header */}
        <div className="text-center space-y-1">
          <div className="inline-flex w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 items-center justify-center font-mono font-black text-black text-xl shadow-lg shadow-cyan-500/30 mb-2">
            CY
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-100">
            Cyber Terminal Access
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to initialize secure operations console and POS terminal suite.
          </p>
        </div>

        {/* Security / Backend Architecture Notice */}
        <div className="p-3 rounded-lg bg-[#090f19] border border-cyan-500/20 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold mb-0.5">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frontend Simulation Mode</span>
          </div>
          This login demonstrates client-side workflow. In production, this form must submit to an authenticated backend route (<code className="text-cyan-400">/api/auth/login</code>) with HTTP-only cookies and bcrypt hashing.
        </div>

        {/* Login Card */}
        <CyberCard>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Operator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-9 pe-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono uppercase text-slate-400">
                  Access Key Passphrase
                </label>
                <button
                  type="button"
                  onClick={prefillDemo}
                  className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  Prefill Demo Key
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-9 pe-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-800 accent-cyan-400 w-3.5 h-3.5"
                />
                <span>Remember Terminal</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  addToast({
                    type: 'info',
                    title: 'Key Recovery',
                    message: 'Recovery challenge sent to administrator hardware key.',
                  });
                }}
                className="text-slate-400 hover:text-cyan-400 font-mono text-[11px]"
              >
                Forgot passphrase?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
            >
              <span>Authenticate &amp; Launch Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 mt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <span>Don't have an operator identity? </span>
            <button
              onClick={() => setActivePage('register')}
              className="text-cyan-400 hover:underline font-mono font-semibold cursor-pointer"
            >
              Register New Profile →
            </button>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
