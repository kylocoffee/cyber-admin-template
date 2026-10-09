import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { Eye, Download, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
  resolution: string;
}

export const GalleryPage: React.FC = () => {
  const { addToast } = useTheme();

  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    { id: 'g-1', title: 'Mainframe Server Core', category: 'Hardware', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80', resolution: '3840x2160' },
    { id: 'g-2', title: 'Cyberpunk Tokyo Night', category: 'Synth Art', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', resolution: '2560x1440' },
    { id: 'g-3', title: 'Holographic Circuit Board', category: 'Hardware', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', resolution: '1920x1080' },
    { id: 'g-4', title: 'Neon High-Rise Architecture', category: 'Architecture', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80', resolution: '3840x2160' },
    { id: 'g-5', title: 'Neural Visor HUD Interface', category: 'UI Design', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', resolution: '1920x1080' },
    { id: 'g-6', title: 'Quantum Storage Array', category: 'Hardware', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', resolution: '2560x1440' },
  ];

  const categories = ['All', 'Hardware', 'Synth Art', 'Architecture', 'UI Design'];

  const filtered = galleryItems.filter(
    (g) => filter === 'All' || g.category === filter
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Media Gallery &amp; Lightbox</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              LIGHTBOX 5
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Categorized high-definition image gallery with fullscreen lightbox preview and category filtering.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              filter === c
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="cyber-card rounded-lg overflow-hidden border border-slate-800 hover:border-cyan-400/60 transition-all cursor-pointer group flex flex-col"
          >
            <div className="aspect-video relative overflow-hidden bg-black">
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="p-2 rounded-full bg-cyan-500 text-black">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <span className="text-[10px] font-mono text-cyan-400">{item.category}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{item.resolution}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-mono text-slate-400">
                {selectedItem.category} · {selectedItem.resolution}
              </span>
              <button
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Download Initiated',
                    message: `Downloading ${selectedItem.title}...`,
                  });
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Original Asset
              </button>
            </div>
          }
        >
          <div className="rounded-lg overflow-hidden border border-slate-800 bg-black aspect-video">
            <img
              src={selectedItem.url}
              alt={selectedItem.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
