import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { CalendarEvent } from '../../types';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { calendarEvents, setCalendarEvents, addToast } = useTheme();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-10-18');
  const [time, setTime] = useState('14:00 UTC');
  const [category, setCategory] = useState<CalendarEvent['category']>('Deployment');
  const [description, setDescription] = useState('');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: CalendarEvent = {
      id: 'ev-' + Date.now(),
      title: title.trim(),
      date,
      time,
      category,
      description: description.trim(),
    };

    setCalendarEvents((prev) => [newEvent, ...prev]);

    addToast({
      type: 'success',
      title: 'Calendar Event Staged',
      message: `${title} scheduled for ${date}.`,
    });

    setTitle('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  const deleteEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    addToast({
      type: 'info',
      title: 'Event Deleted',
      message: 'Scheduled entry removed from calendar.',
    });
    setSelectedEvent(null);
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Operations Schedule &amp; Calendar</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              OCTOBER 2026
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deployments schedule, security audit deadlines, and client milestone calendar with persistent storage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            + Schedule Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Monthly Matrix (2 cols) */}
        <CyberCard
          title="October 2026 Operational Schedule"
          className="lg:col-span-2"
          action={
            <div className="flex items-center gap-1">
              <button className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-200 px-2">October</span>
              <button className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          }
        >
          {/* Day of Week headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] text-slate-500 uppercase pb-2 border-b border-slate-800">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-1 pt-2">
            {/* Blank leading days for Oct 2026 (Starts on Thursday) */}
            <div className="h-20 p-1 rounded bg-[#080c14]/40 opacity-20" />
            <div className="h-20 p-1 rounded bg-[#080c14]/40 opacity-20" />
            <div className="h-20 p-1 rounded bg-[#080c14]/40 opacity-20" />
            <div className="h-20 p-1 rounded bg-[#080c14]/40 opacity-20" />

            {daysInMonth.map((day) => {
              const dateStr = `2026-10-${day.toString().padStart(2, '0')}`;
              const eventsOnDay = calendarEvents.filter((e) => e.date === dateStr);
              const isToday = day === 9; // Today Oct 09 2026

              return (
                <div
                  key={day}
                  className={`h-20 p-1.5 rounded border flex flex-col justify-between transition-colors overflow-hidden ${
                    isToday
                      ? 'border-cyan-400 bg-cyan-950/30'
                      : 'border-slate-800/80 bg-[#090f18] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isToday ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-mono bg-cyan-500 text-black px-1 rounded font-bold">
                        NOW
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-y-auto">
                    {eventsOnDay.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className="text-[10px] font-mono truncate px-1 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer"
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CyberCard>

        {/* Upcoming Events Agenda (1 col) */}
        <CyberCard title={`Agenda Schedule (${calendarEvents.length})`}>
          <div className="space-y-3">
            {calendarEvents.map((ev) => {
              const categoryBadge = {
                Deployment: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40',
                'Client Review': 'border-purple-500/40 text-purple-300 bg-purple-950/40',
                'Security Audit': 'border-rose-500/40 text-rose-300 bg-rose-950/40',
                'Design Sync': 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40',
              }[ev.category];

              return (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="p-3 rounded-lg border border-slate-800 bg-[#090f19] hover:border-cyan-500/40 transition-colors cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${categoryBadge}`}>
                      {ev.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{ev.date}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100">{ev.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{ev.description}</p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ev.time}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEvent(ev.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </CyberCard>
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule Calendar Event"
        size="md"
      >
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cluster 04 Security Audit"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Scheduled Date (YYYY-MM-DD)
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-[#080d15] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="Deployment">Deployment</option>
              <option value="Client Review">Client Review</option>
              <option value="Security Audit">Security Audit</option>
              <option value="Design Sync">Design Sync</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Description &amp; Runbook Notes
            </label>
            <textarea
              rows={3}
              placeholder="Operational details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
