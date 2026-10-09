import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Sparkles,
  Send,
  Trash2,
  Copy,
  Terminal,
  Bot,
  User,
  ShieldAlert,
  Check,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  codeSnippet?: string;
}

export const AiChatPage: React.FC = () => {
  const { addToast } = useTheme();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'Greetings Operator. I am Cyber Neural Co-Pilot v4.0. How can I assist with your administration, POS operations, or database optimizations today?',
      timestamp: '10:00 AM',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    'Analyze POS revenue spikes on Terminal 01',
    'Generate SCSS tokens for custom laser crimson theme',
    'Audit table reservations for weekend peak hours',
    'Write SQL query to index kitchen ticket wait times',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    // Simulated Cyber AI response
    setTimeout(() => {
      let replyText = '';
      let snippet: string | undefined = undefined;

      if (text.toLowerCase().includes('scss') || text.toLowerCase().includes('theme')) {
        replyText = 'Here is the requested Bootstrap 5 / SCSS design token set for your laser crimson accent configuration:';
        snippet = `$cyber-primary: #f43f5e;
$cyber-primary-glow: rgba(244, 63, 94, 0.4);
$cyber-bg-card: #141724;

.cyber-card-crimson {
  border: 1px solid rgba($cyber-primary, 0.3);
  box-shadow: 0 0 15px $cyber-primary-glow;
}`;
      } else if (text.toLowerCase().includes('pos') || text.toLowerCase().includes('terminal')) {
        replyText = 'Based on POS terminal telemetry across 24 orders, Terminal 01 shows an average checkout velocity of 42 seconds per patron with a 99.4% approval rate on CyberPay NFC.';
      } else if (text.toLowerCase().includes('sql') || text.toLowerCase().includes('ticket')) {
        replyText = 'Optimized PostgreSQL query with indexed timestamp scan to aggregate kitchen wait times:';
        snippet = `SELECT 
  table_number,
  AVG(elapsed_seconds) / 60.0 AS avg_wait_minutes,
  COUNT(id) AS total_orders
FROM kitchen_tickets
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY table_number
ORDER BY avg_wait_minutes DESC;`;
      } else {
        replyText = `Understood. Analyzing parameters for "${text}". All operational invariants verified. Telemetry logs and state vectors synchronized with edge clusters.`;
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: replyText,
        codeSnippet: snippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    addToast({
      type: 'success',
      title: 'Code Copied',
      message: 'Code snippet copied to clipboard.',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'm-init',
        sender: 'assistant',
        text: 'Session reset. Ready for new operational queries.',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber AI Conversational Terminal</span>
            <span className="text-[11px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
              NEURAL CO-PILOT
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Futuristic conversational interface with natural-language command dispatch, code generation, and diagnostic assistance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="px-3 py-1.5 text-xs font-semibold rounded border border-slate-700 bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Session
          </button>
        </div>
      </div>

      {/* Production Backend Adapter Callout */}
      <div className="p-3 rounded-lg bg-[#090f19] border border-cyan-500/20 flex items-start gap-3 text-xs">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Architecture Notice: </strong>
          Running in high-fidelity simulated demo mode. For production deployment, bind this view to your authenticated server proxy route (<code className="text-cyan-400">/api/chat</code>). Client-side API keys are strictly disallowed for zero-trust security.
        </div>
      </div>

      {/* Chat Container */}
      <CyberCard noPadding className="flex flex-col h-[560px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                  msg.sender === 'user'
                    ? 'bg-slate-700 text-white'
                    : 'bg-cyan-950 border border-cyan-500/40 text-cyan-400 shadow-sm shadow-cyan-500/20'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-xl rounded-lg p-3.5 text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500/15 border border-cyan-500/30 text-slate-100'
                    : 'bg-[#090e18] border border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                  <span>{msg.sender === 'user' ? 'Operator' : 'Cyber AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.codeSnippet && (
                  <div className="mt-2 rounded bg-[#05080f] border border-slate-800 p-2.5 font-mono text-[11px] text-cyan-300 relative group">
                    <button
                      onClick={() => copyCode(msg.codeSnippet!, msg.id)}
                      className="absolute top-2 end-2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                      title="Copy code"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <pre className="overflow-x-auto pe-8">{msg.codeSnippet}</pre>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span>Neural Co-Pilot is processing query...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts strip */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-[#080d16] flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-mono text-slate-500 shrink-0">Prompts:</span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p)}
              className="text-[11px] px-2.5 py-1 rounded bg-[#0d1421] border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-slate-800 bg-[#090f18] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type your command or question for the Cyber AI assistant..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 bg-[#060a12] border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 font-sans"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="px-4 py-2 rounded-md bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </form>
      </CyberCard>
    </div>
  );
};
