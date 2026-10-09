import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { setActivePage, addToast } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = calculatePasswordStrength(password);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      addToast({
        type: 'warning',
        title: 'Terms Agreement Required',
        message: 'Please accept the operator protocol terms to register.',
      });
      return;
    }

    addToast({
      type: 'success',
      title: 'Identity Registered',
      message: `Account created for ${name}. Logging into dashboard...`,
    });
    setActivePage('dashboard');
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
            Create Operator Profile
          </h2>
          <p className="text-xs text-slate-400">
            Provision new operator access keys for Cyber Admin &amp; POS terminals.
          </p>
        </div>

        {/* Register Card */}
        <CyberCard>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Full Legal / Operator Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-9 pe-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Corporate Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="operator@cybercore.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-9 pe-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Master Security Passphrase *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="Min 8 characters, numbers & symbols..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-9 pe-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Password strength meter */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Passphrase Entropy</span>
                    <span className={strength >= 75 ? 'text-emerald-400' : 'text-amber-400'}>
                      {strength >= 75 ? 'Strong Cipher' : 'Moderate'}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength >= 75 ? 'bg-emerald-400' : strength >= 50 ? 'bg-amber-400' : 'bg-rose-500'
                      }`}
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-slate-800 accent-cyan-400 w-4 h-4 mt-0.5"
              />
              <span className="leading-relaxed">
                I accept the Cyber Protocol Terms of Service, Zero-Trust compliance agreement, and security policy.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
            >
              <span>Provision Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 mt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <span>Already have an identity? </span>
            <button
              onClick={() => setActivePage('login')}
              className="text-cyan-400 hover:underline font-mono font-semibold cursor-pointer"
            >
              Log In Instead →
            </button>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
