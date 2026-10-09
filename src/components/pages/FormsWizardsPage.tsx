import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Server,
  Shield,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const FormsWizardsPage: React.FC = () => {
  const { addToast } = useTheme();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [clusterName, setClusterName] = useState('Nexus-Prime-01');
  const [region, setRegion] = useState('asia-southeast1');
  const [replicaCount, setReplicaCount] = useState(3);
  const [authType, setAuthType] = useState('OAuth2 + WebAuthn FIDO2');
  const [encryptionStandard, setEncryptionStandard] = useState('AES-256-GCM');

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeploy = () => {
    addToast({
      type: 'success',
      title: 'Cluster Deployed Successfully',
      message: `${clusterName} successfully initialized with ${replicaCount} replicas.`,
    });
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Multi-Step Wizard Engine</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              3-STEP PIPELINE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sequential form stepper with stage validation barriers, state persistence, and review confirmation.
          </p>
        </div>
      </div>

      <CyberCard noPadding>
        {/* Wizard Stepper Header */}
        <div className="p-6 border-b border-slate-800 bg-[#080d16]">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-slate-800 -z-0" />
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-cyan-400 transition-all duration-300 -z-0"
              style={{
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
              }}
            />

            {[
              { num: 1, title: 'Cluster Infrastructure', icon: <Server className="w-4 h-4" /> },
              { num: 2, title: 'Security & Auth', icon: <Shield className="w-4 h-4" /> },
              { num: 3, title: 'Review & Launch', icon: <CheckCircle2 className="w-4 h-4" /> },
            ].map((s) => {
              const isPassed = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div key={s.num} className="flex flex-col items-center gap-2 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPassed
                        ? 'bg-emerald-500 text-black'
                        : isCurrent
                        ? 'bg-cyan-500 text-black ring-4 ring-cyan-500/20'
                        : 'bg-[#0b1019] border border-slate-700 text-slate-400'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : s.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider hidden sm:inline ${
                      isCurrent ? 'text-cyan-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Step Body */}
        <div className="p-6 max-w-xl mx-auto min-h-80 flex flex-col justify-between">
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Step 1: Configure Cluster Infrastructure
              </h3>
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Cluster Deployment Identifier *
                </label>
                <input
                  type="text"
                  value={clusterName}
                  onChange={(e) => setClusterName(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Availability Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="asia-southeast1">asia-southeast1 (Singapore)</option>
                  <option value="asia-northeast1">asia-northeast1 (Tokyo)</option>
                  <option value="europe-west3">europe-west3 (Frankfurt)</option>
                  <option value="us-east4">us-east4 (N. Virginia)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Replication Worker Nodes: {replicaCount} Nodes
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={replicaCount}
                  onChange={(e) => setReplicaCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Step 2: Security &amp; Identity Cryptography
              </h3>
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Authentication Standard
                </label>
                <select
                  value={authType}
                  onChange={(e) => setAuthType(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option>OAuth2 + WebAuthn FIDO2</option>
                  <option>mTLS Certificate Handshake</option>
                  <option>Zero-Trust JWT Token Pair</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Data-At-Rest Encryption
                </label>
                <select
                  value={encryptionStandard}
                  onChange={(e) => setEncryptionStandard(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option>AES-256-GCM</option>
                  <option>ChaCha20-Poly1305</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Step 3: Verification &amp; Final Deployment Review
              </h3>
              <div className="p-4 rounded-lg bg-[#080d15] border border-slate-800 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Cluster Name:</span>
                  <span className="text-cyan-400 font-bold">{clusterName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Primary Region:</span>
                  <span className="text-slate-200">{region}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Node Nodes:</span>
                  <span className="text-emerald-400 font-bold">{replicaCount} Active Replicas</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Auth Method:</span>
                  <span className="text-slate-200">{authType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Encryption:</span>
                  <span className="text-slate-200">{encryptionStandard}</span>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-bold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleDeploy}
                className="px-4 py-2 text-xs font-bold rounded bg-emerald-500 text-black hover:bg-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <Check className="w-3.5 h-3.5" />
                Confirm &amp; Deploy Cluster
              </button>
            )}
          </div>
        </div>
      </CyberCard>
    </div>
  );
};
