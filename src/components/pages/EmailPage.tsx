import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { EmailItem } from '../../types';
import {
  Inbox,
  Send,
  FileText,
  Trash2,
  Star,
  Search,
  Plus,
  Paperclip,
  CheckCircle2,
  ArrowLeft,
  Reply,
  Archive,
} from 'lucide-react';

export const EmailPage: React.FC = () => {
  const { emails, setEmails, activePage, setActivePage, addToast } = useTheme();

  const [activeFolder, setActiveFolder] = useState<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [search, setSearch] = useState('');

  // Compose form states
  const [isComposing, setIsComposing] = useState(activePage === 'email-compose');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const filteredEmails = emails.filter((e) => {
    const matchFolder = e.folder === activeFolder;
    const matchSearch =
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.sender.toLowerCase().includes(search.toLowerCase()) ||
      e.snippet.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  const handleSelectEmail = (email: EmailItem) => {
    // mark read
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
    );
    setSelectedEmail(email);
    setIsComposing(false);
  };

  const toggleStar = (e: React.MouseEvent, emailId: string) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === emailId ? { ...item, isStarred: !item.isStarred } : item))
    );
  };

  const deleteEmail = (emailId: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === emailId ? { ...e, folder: 'trash' } : e))
    );
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
    addToast({
      type: 'info',
      title: 'Email Moved to Trash',
      message: 'Message archived to trash folder.',
    });
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !subject.trim()) {
      addToast({
        type: 'warning',
        title: 'Validation Error',
        message: 'Recipient address and subject are required.',
      });
      return;
    }

    const newEmail: EmailItem = {
      id: 'em-' + Date.now(),
      sender: 'Operator Zero (You)',
      senderEmail: 'admin@cyber-template.io',
      avatar: 'OP',
      subject: subject.trim(),
      snippet: body.substring(0, 80) + '...',
      content: body.trim(),
      timestamp: 'Just now',
      isRead: true,
      isStarred: false,
      folder: 'sent',
    };

    setEmails((prev) => [newEmail, ...prev]);

    addToast({
      type: 'success',
      title: 'Email Dispatched',
      message: `Message sent to ${recipient}. Added to Sent folder.`,
    });

    setRecipient('');
    setSubject('');
    setBody('');
    setIsComposing(false);
    setActiveFolder('sent');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Communications Hub</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              SECURE MAIL
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Encrypted client mailboxes, telemetry notices, and ticket communication dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsComposing(true);
              setSelectedEmail(null);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Compose Message
          </button>
        </div>
      </div>

      {/* Main Mail Grid: Sidebar folder list (left) + Mail List or Reader (right) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Folders Column */}
        <div className="space-y-4">
          <CyberCard noPadding>
            <div className="p-3 border-b border-slate-800">
              <button
                onClick={() => {
                  setIsComposing(true);
                  setSelectedEmail(null);
                }}
                className="w-full py-2 px-3 rounded-md bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Email
              </button>
            </div>

            <div className="p-2 space-y-1">
              {[
                { id: 'inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" />, count: emails.filter((e) => e.folder === 'inbox' && !e.isRead).length },
                { id: 'sent', label: 'Sent Mail', icon: <Send className="w-4 h-4" /> },
                { id: 'drafts', label: 'Drafts', icon: <FileText className="w-4 h-4" />, count: emails.filter((e) => e.folder === 'drafts').length },
                { id: 'trash', label: 'Trash', icon: <Trash2 className="w-4 h-4" /> },
              ].map((folder) => {
                const isActive = activeFolder === folder.id && !isComposing;
                return (
                  <button
                    key={folder.id}
                    onClick={() => {
                      setActiveFolder(folder.id as any);
                      setIsComposing(false);
                      setSelectedEmail(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {folder.icon}
                      <span>{folder.label}</span>
                    </div>
                    {folder.count !== undefined && folder.count > 0 && (
                      <span className="font-mono text-[10px] bg-cyan-950 text-cyan-400 px-1.5 py-0.2 rounded">
                        {folder.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </CyberCard>
        </div>

        {/* Right Content Area (3 columns) */}
        <div className="md:col-span-3">
          {/* View 1: Compose Form */}
          {isComposing ? (
            <CyberCard
              title="Compose New Message"
              action={
                <button
                  onClick={() => setIsComposing(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              }
            >
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    To: (Recipient Email) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@enterprise-client.io"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scheduled Firmware Update Confirmation"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Message Body
                  </label>
                  <textarea
                    rows={8}
                    required
                    placeholder="Write your email message here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full bg-[#080d15] border border-slate-800 rounded p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Paperclip className="w-4 h-4 text-cyan-400" />
                    <span>Attach telemetry or CSV log</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsComposing(false)}
                      className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Email
                    </button>
                  </div>
                </div>
              </form>
            </CyberCard>
          ) : selectedEmail ? (
            /* View 2: Email Details View */
            <CyberCard
              title={
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
                    title="Back to inbox"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="truncate">{selectedEmail.subject}</span>
                </div>
              }
              action={
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => deleteEmail(selectedEmail.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 cursor-pointer"
                    title="Delete email"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              }
            >
              <div className="space-y-4">
                {/* Email Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300 font-mono">
                      {selectedEmail.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">
                        {selectedEmail.sender}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        &lt;{selectedEmail.senderEmail}&gt;
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {selectedEmail.timestamp}
                  </span>
                </div>

                {/* Email Content */}
                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line py-2 min-h-48 font-sans">
                  {selectedEmail.content}
                </div>

                {/* Reply shortcut */}
                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => {
                      setRecipient(selectedEmail.senderEmail);
                      setSubject(`Re: ${selectedEmail.subject}`);
                      setIsComposing(true);
                      setSelectedEmail(null);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    Reply
                  </button>
                </div>
              </div>
            </CyberCard>
          ) : (
            /* View 3: Email Inbox List */
            <CyberCard
              title={`${activeFolder.toUpperCase()} (${filteredEmails.length})`}
              action={
                <div className="relative w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute start-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search mail..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#080d15] border border-slate-800 rounded ps-8 pe-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              }
              noPadding
            >
              {filteredEmails.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">
                  <Inbox className="w-8 h-8 mx-auto mb-2 opacity-30 text-cyan-400" />
                  No messages found in this mailbox folder.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80">
                  {filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => handleSelectEmail(email)}
                      className={`p-3.5 flex items-start gap-3 hover:bg-slate-800/40 transition-colors cursor-pointer ${
                        !email.isRead ? 'bg-[#0f1826]' : 'bg-[#0a0f18]'
                      }`}
                    >
                      <button
                        onClick={(e) => toggleStar(e, email.id)}
                        className={`p-0.5 cursor-pointer ${
                          email.isStarred ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs truncate ${
                              !email.isRead
                                ? 'font-bold text-slate-100'
                                : 'text-slate-300 font-medium'
                            }`}
                          >
                            {email.sender}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 tabular-nums">
                            {email.timestamp}
                          </span>
                        </div>
                        <p
                          className={`text-xs truncate ${
                            !email.isRead ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                          }`}
                        >
                          {email.subject}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {email.snippet}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CyberCard>
          )}
        </div>
      </div>
    </div>
  );
};
