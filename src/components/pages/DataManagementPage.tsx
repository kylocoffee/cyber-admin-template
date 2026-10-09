import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { DataRecord } from '../../types';
import {
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const DataManagementPage: React.FC = () => {
  const { dataRecords, setDataRecords, addToast } = useTheme();

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortField, setSortField] = useState<'code' | 'name' | 'budget'>('code');
  const [sortAsc, setSortAsc] = useState(true);

  // Modal states for Create/Edit & Delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<DataRecord | null>(null);

  // Form fields
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState<DataRecord['department']>('Engineering');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<DataRecord['status']>('Active');
  const [budget, setBudget] = useState(50000);

  const departments = ['All', 'Engineering', 'CyberSec', 'Operations', 'Finance', 'Design'];

  const filtered = dataRecords
    .filter((r) => {
      const matchDept = departmentFilter === 'All' || r.department === departmentFilter;
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.code.toLowerCase().includes(search.toLowerCase()) ||
        r.role.toLowerCase().includes(search.toLowerCase());
      return matchDept && matchSearch;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  const openCreateModal = () => {
    setEditingRecord(null);
    setCode(`DEV-${Math.floor(100 + Math.random() * 900)}`);
    setName('');
    setDepartment('Engineering');
    setRole('Core Module');
    setStatus('Active');
    setBudget(75000);
    setIsModalOpen(true);
  };

  const openEditModal = (rec: DataRecord) => {
    setEditingRecord(rec);
    setCode(rec.code);
    setName(rec.name);
    setDepartment(rec.department);
    setRole(rec.role);
    setStatus(rec.status);
    setBudget(rec.budget);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingRecord) {
      setDataRecords((prev) =>
        prev.map((r) =>
          r.id === editingRecord.id
            ? { ...r, code, name: name.trim(), department, role: role.trim(), status, budget }
            : r
        )
      );
      addToast({
        type: 'success',
        title: 'Record Updated',
        message: `Changes to record ${code} saved to localStorage.`,
      });
    } else {
      const newRec: DataRecord = {
        id: 'rec-' + Date.now(),
        code,
        name: name.trim(),
        department,
        role: role.trim(),
        status,
        budget,
        assignedDate: new Date().toISOString().split('T')[0],
      };
      setDataRecords((prev) => [newRec, ...prev]);
      addToast({
        type: 'success',
        title: 'Record Created',
        message: `New record ${code} created successfully.`,
      });
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (!recordToDelete) return;
    setDataRecords((prev) => prev.filter((r) => r.id !== recordToDelete.id));
    addToast({
      type: 'danger',
      title: 'Record Purged',
      message: `Record ${recordToDelete.code} was deleted permanently.`,
    });
    setRecordToDelete(null);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Code', 'Name', 'Department', 'Role', 'Status', 'Budget', 'Date'];
    const rows = filtered.map((r) => [
      r.id,
      r.code,
      `"${r.name}"`,
      r.department,
      `"${r.role}"`,
      r.status,
      r.budget,
      r.assignedDate,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `cyber_data_records_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'CSV File Exported',
      message: `${filtered.length} records saved to disk.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Full CRUD Data Management Suite</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              PERSISTENT STORE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete Create, Read, Update, Delete engine with localStorage persistence, search, sorting, and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-1.5 text-xs font-semibold rounded border border-slate-700 bg-slate-850 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={openCreateModal}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            + Add New Record
          </button>
        </div>
      </div>

      <CyberCard title={`System Records (${filtered.length})`}>
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDepartmentFilter(d)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  departmentFilter === d
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search code, unit, role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded ps-8 pe-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#080d16] text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-2.5 px-3 text-start">Code</th>
                <th className="py-2.5 px-3 text-start">Project / Service Name</th>
                <th className="py-2.5 px-3 text-start">Department</th>
                <th className="py-2.5 px-3 text-start">Role Function</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-end">Budget Quota</th>
                <th className="py-2.5 px-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
              {filtered.map((rec) => {
                const statusBadge = {
                  Active: 'border-emerald-500/30 bg-emerald-950/60 text-emerald-400',
                  Pending: 'border-amber-500/30 bg-amber-950/60 text-amber-400',
                  Suspended: 'border-rose-500/30 bg-rose-950/60 text-rose-400',
                }[rec.status];

                return (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-300">
                      {rec.code}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-200">
                      {rec.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                      {rec.department}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {rec.role}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${statusBadge}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-end font-mono font-bold text-slate-100 tabular-nums">
                      ${rec.budget.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-end">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(rec)}
                          className="p-1 rounded text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 cursor-pointer"
                          title="Edit record"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setRecordToDelete(rec)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CyberCard>

      {/* Add / Edit Record Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRecord ? `Edit Record ${code}` : 'Create New Record'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Record Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="Engineering">Engineering</option>
                <option value="CyberSec">CyberSec</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Project / Microservice Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus Engine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Role Function
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Budget Allocation (USD)
            </label>
            <input
              type="number"
              min="0"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
              className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer"
            >
              Save Directive
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      {recordToDelete && (
        <Modal
          isOpen={!!recordToDelete}
          onClose={() => setRecordToDelete(null)}
          title="Confirm Permanent Deletion"
          size="sm"
          footer={
            <>
              <button
                onClick={() => setRecordToDelete(null)}
                className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded bg-rose-600 text-white font-bold hover:bg-rose-500 cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Record
              </button>
            </>
          }
        >
          <p className="text-xs text-slate-300 leading-relaxed">
            Are you sure you want to delete <strong className="text-white">{recordToDelete.name} ({recordToDelete.code})</strong>? This will remove the item from local storage.
          </p>
        </Modal>
      )}
    </div>
  );
};
