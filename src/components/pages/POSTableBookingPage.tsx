import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { DiningTable } from '../../types';
import {
  CalendarCheck,
  Users,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  Plus,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const POSTableBookingPage: React.FC = () => {
  const { diningTables, setDiningTables, addToast, setActivePage } = useTheme();

  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [selectedTableForBooking, setSelectedTableForBooking] = useState<DiningTable | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Form inputs
  const [patronName, setPatronName] = useState('');
  const [patronPhone, setPatronPhone] = useState('');
  const [bookingTime, setBookingTime] = useState('19:00');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [specialRequest, setSpecialRequest] = useState('');

  const sections = ['All', 'Main Hall', 'Neon Balcony', 'VIP Booth', 'Cyber Bar'];

  const filtered = diningTables.filter(
    (t) => selectedSection === 'All' || t.section === selectedSection
  );

  const openBookingModal = (table: DiningTable) => {
    setSelectedTableForBooking(table);
    setGuestsCount(Math.min(2, table.capacity));
    setPatronName('');
    setPatronPhone('');
    setSpecialRequest('');
    setIsBookingModalOpen(true);
  };

  const handleSaveBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTableForBooking) return;

    if (!patronName.trim() || !patronPhone.trim()) {
      addToast({
        type: 'warning',
        title: 'Missing Fields',
        message: 'Please provide customer name and phone number.',
      });
      return;
    }

    // Capacity validation
    if (guestsCount > selectedTableForBooking.capacity) {
      addToast({
        type: 'danger',
        title: 'Exceeds Table Capacity',
        message: `Table #${selectedTableForBooking.number} seats maximum ${selectedTableForBooking.capacity} guests.`,
      });
      return;
    }

    setDiningTables((prev) =>
      prev.map((tbl) =>
        tbl.id === selectedTableForBooking.id
          ? {
              ...tbl,
              status: 'Reserved',
              currentBooking: {
                customerName: patronName.trim(),
                phone: patronPhone.trim(),
                time: bookingTime,
                guests: guestsCount,
                specialRequest: specialRequest.trim() || undefined,
              },
            }
          : tbl
      )
    );

    addToast({
      type: 'success',
      title: 'Table Reserved Successfully',
      message: `Table #${selectedTableForBooking.number} booked for ${patronName} at ${bookingTime}.`,
    });

    setIsBookingModalOpen(false);
  };

  const toggleTableStatus = (tableId: string, newStatus: DiningTable['status']) => {
    setDiningTables((prev) =>
      prev.map((tbl) => {
        if (tbl.id === tableId) {
          return {
            ...tbl,
            status: newStatus,
            currentBooking: newStatus === 'Available' ? undefined : tbl.currentBooking,
          };
        }
        return tbl;
      })
    );

    addToast({
      type: 'info',
      title: 'Table Status Updated',
      message: `Table status changed to ${newStatus}.`,
    });
  };

  const availableCount = diningTables.filter((t) => t.status === 'Available').length;
  const occupiedCount = diningTables.filter((t) => t.status === 'Occupied').length;
  const reservedCount = diningTables.filter((t) => t.status === 'Reserved').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Restaurant Table Booking &amp; Floor Plan</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              SECTOR 7 FLOOR
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time floor occupancy, VIP reservations, capacity validation, and dining schedule allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('pos-customer')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/40 transition-colors cursor-pointer"
          >
            Open Order POS
          </button>
        </div>
      </div>

      {/* 3 Status Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Available Tables
          </span>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums">
            {availableCount} <span className="text-sm font-normal text-slate-400">Ready for walk-ins</span>
          </div>
        </CyberCard>

        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Occupied Tables
          </span>
          <div className="text-2xl font-bold text-cyan-400 tabular-nums">
            {occupiedCount} <span className="text-sm font-normal text-slate-400">Currently dining</span>
          </div>
        </CyberCard>

        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Reserved Bookings
          </span>
          <div className="text-2xl font-bold text-amber-400 tabular-nums">
            {reservedCount} <span className="text-sm font-normal text-slate-400">Upcoming reservations</span>
          </div>
        </CyberCard>
      </div>

      {/* Main Floor Plan Grid */}
      <CyberCard title="Dining Room Floor Layout">
        {/* Section filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-slate-800">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedSection === sec
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tbl) => {
            const statusConfig = {
              Available: {
                border: 'border-emerald-500/30 hover:border-emerald-400',
                badge: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
                glow: 'hover:shadow-emerald-500/10',
              },
              Occupied: {
                border: 'border-cyan-500/40 bg-[#0e1726]',
                badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
                glow: 'hover:shadow-cyan-500/10',
              },
              Reserved: {
                border: 'border-amber-500/40 bg-[#17130b]',
                badge: 'bg-amber-950/60 text-amber-400 border-amber-500/30',
                glow: 'hover:shadow-amber-500/10',
              },
            }[tbl.status];

            return (
              <div
                key={tbl.id}
                className={`cyber-card p-4 rounded-lg border transition-all flex flex-col justify-between ${statusConfig.border} ${statusConfig.glow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sm text-slate-100">
                      Table #{tbl.number}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusConfig.badge}`}>
                      {tbl.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      Cap: {tbl.capacity} pax
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[11px] font-mono text-slate-400">{tbl.section}</span>
                  </div>

                  {/* Booking details if reserved or occupied */}
                  {tbl.currentBooking ? (
                    <div className="p-2.5 rounded bg-[#090f18] border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-200">{tbl.currentBooking.customerName}</strong>
                        <span className="font-mono text-cyan-400 text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {tbl.currentBooking.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3" /> {tbl.currentBooking.phone}
                      </p>
                      {tbl.currentBooking.specialRequest && (
                        <p className="text-[10px] text-amber-300 italic pt-1">
                          "{tbl.currentBooking.specialRequest}"
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-slate-500 text-xs italic">
                      No current reservation
                    </div>
                  )}
                </div>

                {/* Table Actions */}
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-1">
                  {tbl.status === 'Available' ? (
                    <>
                      <button
                        onClick={() => openBookingModal(tbl)}
                        className="flex-1 py-1 px-2 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors cursor-pointer"
                      >
                        + Book Table
                      </button>
                      <button
                        onClick={() => toggleTableStatus(tbl.id, 'Occupied')}
                        className="py-1 px-2 text-xs rounded bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Seat walk-in patrons directly"
                      >
                        Seat Now
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleTableStatus(tbl.id, 'Available')}
                        className="flex-1 py-1 px-2 text-xs font-semibold rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Free Up Table
                      </button>
                      {tbl.status === 'Reserved' && (
                        <button
                          onClick={() => toggleTableStatus(tbl.id, 'Occupied')}
                          className="py-1 px-2 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer"
                        >
                          Check In
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CyberCard>

      {/* Reservation Booking Modal */}
      {selectedTableForBooking && (
        <Modal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          title={`Reserve Table #${selectedTableForBooking.number} (${selectedTableForBooking.section})`}
          size="md"
        >
          <form onSubmit={handleSaveBooking} className="space-y-4">
            <div className="p-3 rounded bg-[#090f18] border border-cyan-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Maximum Seating Capacity:</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {selectedTableForBooking.capacity} Guests
              </span>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Patron Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Elena Rostova"
                value={patronName}
                onChange={(e) => setPatronName(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 019-2831"
                  value={patronPhone}
                  onChange={(e) => setPatronPhone(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Time Slot
                </label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Guest Party Size (Max {selectedTableForBooking.capacity})
              </label>
              <input
                type="number"
                min="1"
                max={selectedTableForBooking.capacity}
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Special Requests / Dietary Notes
              </label>
              <textarea
                rows={2}
                placeholder="Window view, birthday celebration, high chair needed..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
