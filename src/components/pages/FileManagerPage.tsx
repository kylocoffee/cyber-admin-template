import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Folder,
  File,
  HardDrive,
  Upload,
  Download,
  Trash2,
  FileText,
  Image,
  Archive,
  Search,
} from 'lucide-react';

export const FileManagerPage: React.FC = () => {
  const { addToast } = useTheme();

  const [activeFolder, setActiveFolder] = useState('POS Receipts');
  const [search, setSearch] = useState('');

  const [files, setFiles] = useState([
    { name: 'receipt_batch_20261009.csv', folder: 'POS Receipts', size: '1.4 MB', date: 'Today 10:45 AM', type: 'csv' },
    { name: 'daily_summary_oct08.pdf', folder: 'POS Receipts', size: '420 KB', date: 'Yesterday', type: 'pdf' },
    { name: 'firmware_v3.9.4_release.tar.gz', folder: 'Firmware Releases', size: '64.2 MB', date: 'Oct 06', type: 'archive' },
    { name: 'cluster_telemetry_dump_04.json', folder: 'Telemetry Dumps', size: '12.8 MB', date: 'Oct 05', type: 'json' },
    { name: 'enterprise_sla_agreement.pdf', folder: 'Client Contracts', size: '890 KB', date: 'Sep 28', type: 'pdf' },
  ]);

  const folders = ['POS Receipts', 'Firmware Releases', 'Telemetry Dumps', 'Client Contracts'];

  const filtered = files.filter(
    (f) => f.folder === activeFolder && f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFiles((prev) => [
        {
          name: newFile.name,
          folder: activeFolder,
          size: `${Math.round(newFile.size / 1024)} KB`,
          date: 'Just now',
          type: 'doc',
        },
        ...prev,
      ]);
      addToast({
        type: 'success',
        title: 'File Uploaded',
        message: `${newFile.name} saved to ${activeFolder}.`,
      });
    }
  };

  const deleteFile = (fileName: string) => {
    setFiles(files.filter((f) => f.name !== fileName));
    addToast({
      type: 'info',
      title: 'File Deleted',
      message: `${fileName} removed from drive.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Storage &amp; File Manager</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              NVME CLOUD DRIVE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse stored transaction ledgers, encrypted firmware packages, and customer contract archives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-cyan-500/20">
            <Upload className="w-3.5 h-3.5" />
            Upload File
            <input type="file" className="hidden" onChange={handleSimulateUpload} />
          </label>
        </div>
      </div>

      {/* Storage Quota Header */}
      <CyberCard title="Virtual NVMe Volume Quota">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-xl font-bold text-slate-100">78.4 GB</span>
              <span className="text-slate-500">used of 100.0 GB Tier</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">21.6 GB remaining for active logs</p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-[78.4%] rounded-full" />
            </div>
          </div>
        </div>
      </CyberCard>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Folders List (1 col) */}
        <CyberCard title="Folders" noPadding>
          <div className="p-2 space-y-1">
            {folders.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFolder(f)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded transition-colors text-start cursor-pointer ${
                  activeFolder === f
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Folder className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{f}</span>
              </button>
            ))}
          </div>
        </CyberCard>

        {/* Files in Folder (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <CyberCard
            title={`${activeFolder} (${filtered.length} files)`}
            action={
              <div className="relative w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute start-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter files..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-8 pe-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>
            }
          >
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No files in this folder. Click "Upload File" to add files.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#080d16] text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-2 px-3 text-start">File Name</th>
                      <th className="py-2 px-3 text-start">Size</th>
                      <th className="py-2 px-3 text-start">Modified</th>
                      <th className="py-2 px-3 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
                    {filtered.map((file, i) => (
                      <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-slate-200">
                          <div className="flex items-center gap-2">
                            <File className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                          {file.size}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">
                          {file.date}
                        </td>
                        <td className="py-2.5 px-3 text-end">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                addToast({
                                  type: 'info',
                                  title: 'Downloading File',
                                  message: `Downloading ${file.name}...`,
                                });
                              }}
                              className="p-1 rounded text-cyan-400 hover:text-white cursor-pointer"
                              title="Download"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteFile(file.name)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
