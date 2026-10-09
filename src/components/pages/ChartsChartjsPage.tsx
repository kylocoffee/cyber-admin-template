import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const ChartsChartjsPage: React.FC = () => {
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let lineChart: Chart | null = null;
    let barChart: Chart | null = null;
    let doughnutChart: Chart | null = null;

    if (lineChartRef.current) {
      lineChart = new Chart(lineChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [
            {
              label: 'Mainframe Revenue ($K)',
              data: [45, 59, 80, 81, 96, 115, 128, 142],
              borderColor: '#00f0ff',
              backgroundColor: 'rgba(0, 240, 255, 0.12)',
              fill: true,
              tension: 0.35,
              pointBackgroundColor: '#00f0ff',
            },
            {
              label: 'Operational Overhead ($K)',
              data: [28, 32, 40, 42, 45, 50, 52, 56],
              borderColor: '#f43f5e',
              backgroundColor: 'rgba(244, 63, 94, 0.05)',
              fill: true,
              tension: 0.35,
              pointBackgroundColor: '#f43f5e',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } },
            },
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
            },
          },
        },
      });
    }

    if (barChartRef.current) {
      barChart = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Meals', 'Bites', 'Drinks', 'Desserts'],
          datasets: [
            {
              label: 'POS Units Sold',
              data: [340, 280, 520, 190],
              backgroundColor: ['#00f0ff', '#10b981', '#a855f7', '#f59e0b'],
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8' },
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
            },
          },
        },
      });
    }

    if (doughnutChartRef.current) {
      doughnutChart = new Chart(doughnutChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['CyberPay NFC', 'Credit Card', 'Cash Tendered', 'Crypto'],
          datasets: [
            {
              data: [54, 28, 12, 6],
              backgroundColor: ['#00f0ff', '#3b82f6', '#10b981', '#a855f7'],
              borderColor: '#0a0e17',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } },
            },
          },
        },
      });
    }

    return () => {
      lineChart?.destroy();
      barChart?.destroy();
      doughnutChart?.destroy();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Chart.js Reactive Visualizations</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              CHART.JS 4.4
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Canvas-rendered data visualizations styled with dark cyber tokens, grid hairline borders, and neon indicators.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart (2 columns) */}
        <CyberCard
          title="Revenue & Operational Velocity"
          subtitle="Monthly net gross vs overhead run rate"
          className="lg:col-span-2"
        >
          <div className="h-72 w-full pt-2">
            <canvas ref={lineChartRef} />
          </div>
        </CyberCard>

        {/* Doughnut Chart (1 column) */}
        <CyberCard
          title="Payment Gateway Share"
          subtitle="Customer tender distribution"
        >
          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <canvas ref={doughnutChartRef} />
          </div>
        </CyberCard>
      </div>

      {/* Bar Chart Full Width */}
      <CyberCard
        title="POS Category Breakdown (Units Dispatched)"
        subtitle="Culinary units served by station"
      >
        <div className="h-64 w-full pt-2">
          <canvas ref={barChartRef} />
        </div>
      </CyberCard>
    </div>
  );
};
