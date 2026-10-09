import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Sparkles,
  Image as ImageIcon,
  Download,
  Eye,
  RefreshCw,
  Layers,
  Wand2,
  ShieldAlert,
} from 'lucide-react';

interface GeneratedAsset {
  id: string;
  prompt: string;
  style: string;
  ratio: string;
  imageUrl: string;
  date: string;
}

export const AiImagePage: React.FC = () => {
  const { addToast } = useTheme();

  const [prompt, setPrompt] = useState('Futuristic Tokyo street with neon holographic signs and flying transport');
  const [selectedStyle, setSelectedStyle] = useState('Cyberpunk 2077');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [negativePrompt, setNegativePrompt] = useState('blurry, low quality, artifacts, watermark');
  const [isGenerating, setIsGenerating] = useState(false);

  const [gallery, setGallery] = useState<GeneratedAsset[]>([
    {
      id: 'img-1',
      prompt: 'Futuristic Tokyo street with neon holographic signs and flying transport',
      style: 'Cyberpunk 2077',
      ratio: '16:9',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
      date: 'Today 10:14 AM',
    },
    {
      id: 'img-2',
      prompt: 'Bioluminescent cybernetic food platter in high-tech kitchen terminal',
      style: 'Photorealistic 8K',
      ratio: '1:1',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      date: 'Yesterday',
    },
    {
      id: 'img-3',
      prompt: 'Isometric holographic server core room with glowing cyan bus architecture',
      style: 'Isometric 3D',
      ratio: '4:3',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      date: 'Oct 07',
    },
  ]);

  const styles = ['Cyberpunk 2077', 'Photorealistic 8K', 'Synthwave Neon', 'Isometric 3D', 'Sci-Fi Blueprint'];
  const ratios = ['1:1', '16:9', '4:3', '9:16'];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);

    setTimeout(() => {
      const newAsset: GeneratedAsset = {
        id: 'img-' + Date.now(),
        prompt: prompt.trim(),
        style: selectedStyle,
        ratio: aspectRatio,
        imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
        date: 'Just now',
      };

      setGallery((prev) => [newAsset, ...prev]);
      setIsGenerating(false);

      addToast({
        type: 'success',
        title: 'Cyber Asset Generated',
        message: `Synthesized image for "${prompt.slice(0, 30)}...".`,
      });
    }, 1500);
  };

  const downloadAsset = (asset: GeneratedAsset) => {
    addToast({
      type: 'info',
      title: 'Download Initiated',
      message: `Exporting asset (${asset.ratio}) at 2048x2048 resolution.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber AI Image &amp; Asset Studio</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              SYNTH GEN
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate high-resolution visual assets, UI textures, isometric diagrams, and cyberpunk illustrations.
          </p>
        </div>
      </div>

      {/* Production Backend Notice */}
      <div className="p-3 rounded-lg bg-[#090f19] border border-cyan-500/20 flex items-start gap-3 text-xs">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Architecture Notice: </strong>
          Interactive generator UI demo. When integrating in production, configure the image generation pipeline through a server-side proxy route (<code className="text-cyan-400">/api/generate-image</code>) or Gemini Imagen SDK adapter on the server.
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Generator Form (1 column) */}
        <CyberCard title="Synthesis Parameters">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Prompt Description *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your desired sci-fi subject, lighting, angle..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Artistic Aesthetic Style
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {styles.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedStyle(s)}
                    className={`py-1.5 px-2 text-[11px] font-mono rounded border transition-colors cursor-pointer text-start truncate ${
                      selectedStyle === s
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-[#080d15] text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {ratios.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setAspectRatio(r)}
                    className={`py-1 px-2 text-xs font-mono rounded border transition-colors cursor-pointer ${
                      aspectRatio === r
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-[#080d15] text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Negative Prompt Exclusions
              </label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-400 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-2.5 px-3 rounded-md bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 disabled:opacity-40"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Synthesizing Neural Asset...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Cyber Asset
                </>
              )}
            </button>
          </form>
        </CyberCard>

        {/* Right Column: Generated Gallery (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <CyberCard title={`Generated Asset Gallery (${gallery.length})`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((asset) => (
                <div
                  key={asset.id}
                  className="cyber-card rounded-lg border border-slate-800 overflow-hidden group flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={asset.imageUrl}
                      alt={asset.prompt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 start-2 flex gap-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-cyan-400 border border-cyan-500/30">
                        {asset.style}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-slate-300 border border-slate-700">
                        {asset.ratio}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-sans">
                      "{asset.prompt}"
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                      <span>{asset.date}</span>
                      <button
                        onClick={() => downloadAsset(asset)}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
