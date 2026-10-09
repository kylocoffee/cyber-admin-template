import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Tag,
  Star,
  UploadCloud,
  File,
  X,
  CreditCard,
  Phone,
  Calendar,
} from 'lucide-react';

export const FormsPluginsPage: React.FC = () => {
  const { addToast } = useTheme();

  // Tag Input State
  const [tags, setTags] = useState(['CyberSecurity', 'Bootstrap5', 'POS-Suite']);
  const [tagInput, setTagInput] = useState('');

  // Rating State
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);

  // Masked Input States
  const [creditCard, setCreditCard] = useState('');
  const [phone, setPhone] = useState('');

  // Dropzone Files State
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([
    { name: 'firmware_v3.9_checksum.sha256', size: '24 KB' },
  ]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const masked = val.replace(/(\d{4})/g, '$1 ').trim();
    setCreditCard(masked);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = val;
    if (val.length > 6) {
      formatted = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
    } else if (val.length > 3) {
      formatted = `(${val.slice(0, 3)}) ${val.slice(3)}`;
    }
    setPhone(formatted);
  };

  const handleDropzoneSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const f = files[0];
      setUploadedFiles((prev) => [
        ...prev,
        { name: f.name, size: `${Math.round(f.size / 1024)} KB` },
      ]);
      addToast({
        type: 'success',
        title: 'File Uploaded to Staging',
        message: `${f.name} staged successfully.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Form Advanced Plugins &amp; Uploaders</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              5 PLUGINS
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Input masking, interactive chip taggers, star ratings, date pickers, and drag-and-drop dropzones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tag Input Plugin */}
        <CyberCard title="1. Interactive Tag Input (Tagify)">
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Skill &amp; Keyword Tags (Press Enter)
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded bg-[#080d15] border border-slate-800 focus-within:border-cyan-400">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30"
                >
                  <span>{t}</span>
                  <button
                    onClick={() => removeTag(t)}
                    className="hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Type tag & press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 bg-transparent border-none text-xs text-slate-200 focus:outline-none min-w-[120px]"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Dynamic chip badges with keyboard Enter listeners and dismissal handlers.
            </p>
          </div>
        </CyberCard>

        {/* Input Masking Plugin */}
        <CyberCard title="2. Input Masking (Card &amp; Phone)">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Credit Card Mask (16 Digits)
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={creditCard}
                  onChange={handleCreditCardChange}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-9 pe-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Telephone Number Mask
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-[#080d15] border border-slate-800 rounded ps-9 pe-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Star Rating Plugin */}
        <CyberCard title="3. Interactive Star Rating">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400 block">
              Customer Experience Score
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setRating(star);
                      addToast({
                        type: 'info',
                        title: 'Rating Selected',
                        message: `Score rated at ${star} / 5 stars.`,
                      });
                    }}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        filled ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                );
              })}
              <span className="ms-2 font-mono text-sm font-bold text-amber-400">
                {rating}.0 / 5.0
              </span>
            </div>
          </div>
        </CyberCard>

        {/* Dropzone Upload Plugin */}
        <CyberCard title="4. Drag &amp; Drop File Dropzone">
          <div className="space-y-3">
            <label className="border-2 border-dashed border-slate-800 hover:border-cyan-400/60 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#080d15]">
              <UploadCloud className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-xs font-semibold text-slate-200">
                Drag files here or click to browse
              </span>
              <span className="text-[11px] text-slate-500 font-mono mt-1">
                Supports CSV, PDF, JSON up to 25 MB
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleDropzoneSim}
              />
            </label>

            {/* Uploaded File List */}
            <div className="space-y-1.5">
              {uploadedFiles.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded bg-[#090f19] border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <File className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate text-slate-300 font-mono">{file.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {file.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
