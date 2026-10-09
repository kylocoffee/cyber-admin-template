import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Globe, Server, Activity, RefreshCw, CheckCircle2 } from 'lucide-react';

interface NodeLocation {
  id: string;
  name: string;
  x: number; // SVG percentage
  y: number;
  region: string;
  ping: string;
  status: 'Nominal' | 'Heavy Load';
  activeRequests: number;
}

export const MapPage: React.FC = () => {
  const { addToast } = useTheme();

  const [nodes, setNodes] = useState<NodeLocation[]>([
    { id: 'n-1', name: 'Singapore (Asia-SE1)', x: 74, y: 58, region: 'Asia Pacific', ping: '12ms', status: 'Nominal', activeRequests: 1420 },
    { id: 'n-2', name: 'Tokyo (Asia-NE1)', x: 82, y: 40, region: 'Asia Pacific', ping: '28ms', status: 'Nominal', activeRequests: 2180 },
    { id: 'n-3', name: 'Frankfurt (Europe-W3)', x: 51, y: 32, region: 'Europe Central', ping: '110ms', status: 'Nominal', activeRequests: 3040 },
    { id: 'n-4', name: 'N. Virginia (US-East4)', x: 26, y: 38, region: 'North America', ping: '180ms', status: 'Nominal', activeRequests: 4890 },
    { id: 'n-5', name: 'London (Europe-W2)', x: 47, y: 30, region: 'Europe West', ping: '105ms', status: 'Nominal', activeRequests: 1980 },
    { id: 'n-6', name: 'Sydney (Aus-SE1)', x: 86, y: 78, region: 'Oceania', ping: '94ms', status: 'Nominal', activeRequests: 890 },
  ]);

  const [selectedNode, setSelectedNode] = useState<NodeLocation>(nodes[0]);

  const handlePingMesh = () => {
    addToast({
      type: 'info',
      title: 'Global Pings Transmitted',
      message: 'ICMP echo probes confirmed 100% packet return across all 6 edge nodes.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Global Cyber Node Operations Map</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              WORLD MESH
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Interactive planetary routing map displaying active edge data centers, latency telemetry, and POS gateway links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePingMesh}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Ping Global Mesh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vector Map Canvas (2 columns) */}
        <CyberCard
          title="Planetary Node Telemetry Grid"
          subtitle="Click on any glowing edge node to inspect local cluster metrics"
          className="lg:col-span-2"
        >
          <div className="relative w-full aspect-video bg-[#080d16] border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center p-4">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            {/* Stylized Vector World Continents SVG */}
            <svg viewBox="0 0 1000 500" className="w-full h-full opacity-40">
              <path
                d="M150,120 Q200,80 300,100 T400,180 T300,280 T180,220 Z M220,300 Q280,320 270,440 T210,480 T190,360 Z M450,110 Q550,80 620,140 T540,240 T460,180 Z M640,90 Q780,80 880,140 T840,280 T680,240 Z M480,260 Q580,270 560,420 T480,450 T450,330 Z M760,340 Q880,330 890,440 T780,450 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />
            </svg>

            {/* Interactive Node Markers */}
            {nodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-20"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-6 h-6 rounded-full animate-ping opacity-75 ${
                        isSelected ? 'bg-cyan-400' : 'bg-emerald-400'
                      }`}
                    />
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                        isSelected
                          ? 'bg-cyan-400 border-white ring-4 ring-cyan-500/30'
                          : 'bg-emerald-500 border-slate-900'
                      }`}
                    />
                  </div>
                  <span className="hidden sm:block absolute top-4 start-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold text-slate-300 bg-black/80 px-1.5 py-0.5 rounded border border-slate-800">
                    {node.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </CyberCard>

        {/* Selected Node Details Card (1 column) */}
        <CyberCard
          title={`Cluster Inspector: ${selectedNode.name}`}
          subtitle={`Node ID: ${selectedNode.id}`}
        >
          <div className="space-y-4">
            <div className="p-3 rounded bg-[#090f19] border border-cyan-500/30 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Region:</span>
                <span className="text-slate-200">{selectedNode.region}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Ping Latency:</span>
                <span className="text-cyan-400 font-bold">{selectedNode.ping}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Health State:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedNode.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Requests:</span>
                <span className="text-slate-200 tabular-nums">
                  {selectedNode.activeRequests.toLocaleString()} req/s
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Edge ingress is automatically load-balanced across healthy nodes with zero downtime and automatic session stickiness.
            </p>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
