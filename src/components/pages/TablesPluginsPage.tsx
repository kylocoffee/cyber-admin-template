import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Search,
  ArrowUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const TablesPluginsPage: React.FC = () => {
  const { dataRecords, addToast } = useTheme();

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortField, setSortField] = useState<'code' | 'name' | 'budget' | 'assignedDate'>('code');
  const [sortAsc, setSortAsc] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Code', 'Project Name', 'Department', 'Role', 'Status', 'Budget (USD)', 'Assigned Date'];
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
    const csvString = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const encoded = encodeURI(csvString);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `cyber_datatable_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'CSV File Downloaded',
      message: `Exported ${filtered.length} rows to CSV.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>DataTables Plugin (Search, Sort &amp; Export)</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              DATATABLES PRO
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic client-side dataset table with multi-column sorting, live query filtering, page sizing, and CSV exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      <CyberCard title="Interactive DataTables Grid">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono text-slate-400">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#080d15] border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value={5}>5 entries</option>
              <option value={10}>10 entries</option>
              <option value={25}>25 entries</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#080d15] border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono ms-2"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search all records..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#080d15] border border-slate-800 rounded ps-8 pe-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#080d16] text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
              <tr>
                <th
                  onClick={() => handleSort('code')}
                  className="py-2.5 px-3 text-start cursor-pointer hover:text-cyan-300"
                >
                  <div className="flex items-center gap-1">
                    <span>Code</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-2.5 px-3 text-start cursor-pointer hover:text-cyan-300"
                >
                  <div className="flex items-center gap-1">
                    <span>Project Unit</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 text-start">Department</th>
                <th className="py-2.5 px-3 text-start">Role</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th
                  onClick={() => handleSort('budget')}
                  className="py-2.5 px-3 text-end cursor-pointer hover:text-cyan-300"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Budget Allocation</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-300">
                      {row.code}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-200">
                      {row.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                      {row.department}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {row.role}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${
                          row.status === 'Active'
                            ? 'border-emerald-500/30 bg-emerald-950/60 text-emerald-400'
                            : row.status === 'Pending'
                            ? 'border-amber-500/30 bg-amber-950/60 text-amber-400'
                            : 'border-rose-500/30 bg-rose-950/60 text-rose-400'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-end font-mono font-semibold text-slate-200 tabular-nums">
                      ${row.budget.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} entries
          </span>

          <div className="flex items-center gap-1 font-mono">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-800 bg-[#090e17] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded border transition-colors cursor-pointer text-xs ${
                  currentPage === i + 1
                    ? 'border-cyan-400 bg-cyan-950 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-[#090e17] text-slate-400 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-800 bg-[#090e17] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CyberCard>
    </div>
  );
};
