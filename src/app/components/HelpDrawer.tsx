import { X, MapPin, BarChart2, Table2, GitCompare, Globe, MousePointer, Filter, AlertTriangle } from "lucide-react";

interface HelpDrawerProps {
  open: boolean;
  onClose: () => void;
}

function MapIllustration() {
  return (
    <svg viewBox="0 0 320 160" className="w-full rounded-lg" style={{ background: '#1a2533' }}>
      {/* Grid lines */}
      {[40, 80, 120, 160, 200, 240, 280].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="#ffffff08" strokeWidth="1" />
      ))}
      {[40, 80, 120].map(y => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#ffffff08" strokeWidth="1" />
      ))}
      {/* Continent blobs */}
      <ellipse cx="80" cy="75" rx="50" ry="35" fill="#2a3a4a" />
      <ellipse cx="95" cy="105" rx="25" ry="18" fill="#2a3a4a" />
      <ellipse cx="175" cy="68" rx="40" ry="30" fill="#2a3a4a" />
      <ellipse cx="175" cy="110" rx="15" ry="12" fill="#2a3a4a" />
      <ellipse cx="255" cy="65" rx="30" ry="22" fill="#2a3a4a" />
      <ellipse cx="260" cy="100" rx="20" ry="16" fill="#2a3a4a" />
      <ellipse cx="145" cy="95" rx="12" ry="10" fill="#2a3a4a" />
      {/* Connection lines */}
      <line x1="78" y1="68" x2="172" y2="62" stroke="#227e9e44" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="172" y1="62" x2="252" y2="60" stroke="#227e9e44" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="78" y1="68" x2="95" y2="100" stroke="#de801144" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="252" y1="60" x2="258" y2="95" stroke="#508223" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
      {/* Markers */}
      <rect x="68" y="62" width="20" height="12" rx="2" fill="#d63b25" />
      <text x="78" y="71" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">JFK</text>
      <rect x="162" y="55" width="20" height="12" rx="2" fill="#508223" />
      <text x="172" y="64" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">LHR</text>
      <rect x="242" y="54" width="20" height="12" rx="2" fill="#de8011" />
      <text x="252" y="63" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">NRT</text>
      <rect x="85" y="94" width="20" height="12" rx="2" fill="#508223" />
      <text x="95" y="103" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">GRU</text>
      <rect x="248" y="88" width="20" height="12" rx="2" fill="#508223" />
      <text x="258" y="97" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">SYD</text>
      {/* Legend */}
      <rect x="8" y="138" width="8" height="8" rx="1" fill="#d63b25" />
      <text x="20" y="146" fontSize="7" fill="#aaa">Critical</text>
      <rect x="60" y="138" width="8" height="8" rx="1" fill="#de8011" />
      <text x="72" y="146" fontSize="7" fill="#aaa">Warning</text>
      <rect x="116" y="138" width="8" height="8" rx="1" fill="#508223" />
      <text x="128" y="146" fontSize="7" fill="#aaa">Healthy</text>
    </svg>
  );
}

function IncidentChartIllustration() {
  const bars = [
    { h: 30, c: 20, w: 10 }, { h: 45, c: 30, w: 15 }, { h: 20, c: 12, w: 8 },
    { h: 60, c: 40, w: 20 }, { h: 35, c: 25, w: 10 }, { h: 75, c: 50, w: 25 },
    { h: 50, c: 35, w: 15 }, { h: 40, c: 28, w: 12 }, { h: 55, c: 38, w: 17 },
    { h: 25, c: 18, w: 7 }, { h: 65, c: 45, w: 20 }, { h: 42, c: 30, w: 12 },
  ];
  const base = 110;
  const barW = 16;
  const gap = 8;
  const startX = 36;
  return (
    <svg viewBox="0 0 320 130" className="w-full rounded-lg" style={{ background: '#0f1923' }}>
      {/* Y axis */}
      <line x1="34" y1="10" x2="34" y2="112" stroke="#404040" strokeWidth="1" />
      <line x1="34" y1="112" x2="310" y2="112" stroke="#404040" strokeWidth="1" />
      {[0, 20, 40].map((v, i) => (
        <g key={v}>
          <line x1="34" y1={112 - i * 40} x2="310" y2={112 - i * 40} stroke="#2a2a2a" strokeWidth="1" />
          <text x="28" y={115 - i * 40} textAnchor="end" fontSize="7" fill="#666">{v}</text>
        </g>
      ))}
      {bars.map((b, i) => {
        const x = startX + i * (barW + gap);
        const critH = (b.c / 80) * 100;
        const warnH = ((b.h - b.c) / 80) * 100;
        const healthH = (b.w / 80) * 100;
        return (
          <g key={i}>
            <rect x={x} y={base - critH} width={barW} height={critH} fill="#e85540" />
            <rect x={x} y={base - critH - warnH} width={barW} height={warnH} fill="#ff981e" />
            <rect x={x} y={base - critH - warnH - healthH} width={barW} height={healthH} fill="#508223" />
          </g>
        );
      })}
      {/* Blue window */}
      <rect x="226" y="10" width="20" height="102" fill="transparent" stroke="#4db8e8" strokeWidth="2" rx="3" />
      {/* Labels */}
      <text x="172" y="126" textAnchor="middle" fontSize="7" fill="#666">Time →</text>
      <text x="236" y="8" textAnchor="middle" fontSize="6" fill="#4db8e8">▼ Drag</text>
    </svg>
  );
}

function ComparisonIllustration() {
  return (
    <svg viewBox="0 0 320 100" className="w-full rounded-lg" style={{ background: '#1a2533' }}>
      {/* Left map (historical) */}
      <rect x="4" y="4" width="150" height="75" rx="6" fill="#1e2d3d" stroke="#de8011" strokeWidth="1.5" />
      <text x="79" y="18" textAnchor="middle" fontSize="7" fill="#de8011" fontWeight="bold">Historical · Aug 11</text>
      <ellipse cx="60" cy="50" rx="30" ry="18" fill="#2a3a4a" />
      <ellipse cx="115" cy="48" rx="22" ry="14" fill="#2a3a4a" />
      <rect x="50" y="44" width="16" height="9" rx="2" fill="#d63b25" />
      <text x="58" y="51" textAnchor="middle" fontSize="5" fill="white">JFK</text>
      <rect x="108" y="43" width="16" height="9" rx="2" fill="#de8011" />
      <text x="116" y="50" textAnchor="middle" fontSize="5" fill="white">LHR</text>
      <text x="79" y="88" textAnchor="middle" fontSize="6" fill="#666">Orange window position</text>
      {/* Divider */}
      <line x1="160" y1="4" x2="160" y2="95" stroke="#404040" strokeWidth="1" strokeDasharray="4,3" />
      {/* Right map (blue/current) */}
      <rect x="166" y="4" width="150" height="75" rx="6" fill="#1e2d3d" stroke="#227e9e" strokeWidth="1.5" />
      <text x="241" y="18" textAnchor="middle" fontSize="7" fill="#5ba8d0" fontWeight="bold">Current · Aug 18</text>
      <ellipse cx="220" cy="50" rx="30" ry="18" fill="#2a3a4a" />
      <ellipse cx="275" cy="48" rx="22" ry="14" fill="#2a3a4a" />
      <rect x="210" y="44" width="16" height="9" rx="2" fill="#508223" />
      <text x="218" y="51" textAnchor="middle" fontSize="5" fill="white">JFK</text>
      <rect x="268" y="43" width="16" height="9" rx="2" fill="#508223" />
      <text x="276" y="50" textAnchor="middle" fontSize="5" fill="white">LHR</text>
      <text x="241" y="88" textAnchor="middle" fontSize="6" fill="#666">Blue window position</text>
    </svg>
  );
}

function TableIllustration() {
  const rows = [
    { region: 'JFK (New York)', ad1: 'Critical', ad2: 'Healthy', ad3: 'Warning' },
    { region: 'LHR (London)', ad1: 'Healthy', ad2: 'Healthy', ad3: 'Healthy' },
    { region: 'NRT (Tokyo)', ad1: 'Warning', ad2: 'Critical', ad3: 'Healthy' },
  ];
  const colorMap: Record<string, string> = { Critical: '#d63b2522', Warning: '#de801122', Healthy: '#50822222' };
  const textMap: Record<string, string> = { Critical: '#d63b25', Warning: '#ac630c', Healthy: '#508223' };
  return (
    <svg viewBox="0 0 320 95" className="w-full rounded-lg" style={{ background: '#111827' }}>
      {/* Header */}
      <rect x="0" y="0" width="320" height="18" fill="#1e2a38" />
      <line x1="0" y1="18" x2="320" y2="18" stroke="#2a3a4a" strokeWidth="1" />
      <text x="70" y="12" fontSize="7" fill="#888" fontWeight="bold">Region</text>
      <text x="145" y="12" fontSize="7" fill="#888" fontWeight="bold">AD-1</text>
      <text x="200" y="12" fontSize="7" fill="#888" fontWeight="bold">AD-2</text>
      <text x="255" y="12" fontSize="7" fill="#888" fontWeight="bold">AD-3</text>
      {/* Rows */}
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="0" y={18 + i * 25} width="320" height="25" fill={i % 2 === 0 ? '#111827' : '#161f2e'} />
          <line x1="0" y1={43 + i * 25} x2="320" y2={43 + i * 25} stroke="#1e2a38" strokeWidth="1" />
          <text x="8" y={34 + i * 25} fontSize="7" fill="#ccc">{r.region}</text>
          {[r.ad1, r.ad2, r.ad3].map((s, j) => (
            <g key={j}>
              <rect x={135 + j * 55} y={22 + i * 25} width="40" height="14" rx="2" fill={colorMap[s]} />
              <rect x={135 + j * 55} y={22 + i * 25} width="40" height="14" rx="2" fill="none" stroke={textMap[s]} strokeWidth="0.5" />
              <text x={155 + j * 55} y={32 + i * 25} textAnchor="middle" fontSize="6" fill={textMap[s]}>{s}</text>
            </g>
          ))}
        </g>
      ))}
      {/* Hover hint */}
      <rect x="135" y="22" width="40" height="14" rx="2" fill="none" stroke="#227e9e" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="155" y1="36" x2="155" y2="50" stroke="#227e9e" strokeWidth="0.8" strokeDasharray="2,2" />
      <rect x="120" y="50" width="70" height="16" rx="3" fill="#1a1a1a" />
      <text x="155" y="61" textAnchor="middle" fontSize="6" fill="white">Hover for details</text>
    </svg>
  );
}

export function HelpDrawer({ open, onClose }: HelpDrawerProps) {
  return (
    <>
      {/* Scrim */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-[60]"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer — always in DOM for smooth CSS transition; inert when closed */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-drawer-title"
        {...(!open ? { inert: '' } : {})}
        className="fixed top-0 right-0 bottom-0 z-[70] bg-white dark:bg-[#1a1a1a] border-l border-[#e0e0e0] dark:border-[#333] flex flex-col overflow-hidden"
        style={{
          width: '480px',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e0e0] dark:border-[#333] shrink-0">
          <div>
            <h2 id="help-drawer-title" className="text-[18px] font-semibold text-[#161513] dark:text-white">Dashboard Guide</h2>
            <p className="text-[12px] text-[#665f5b] dark:text-[#999] mt-0.5">How to use this dashboard</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close guide"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-[#665f5b] dark:text-[#999] transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-8">

          {/* Overview */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#227e9e] shrink-0" />
              <h3 className="text-[14px] font-semibold text-[#161513] dark:text-white">Overview</h3>
            </div>
            <p className="text-[13px] text-[#444] dark:text-[#bbb] leading-relaxed">
              The Physical Networking Dashboard gives you a real-time and historical view of your global network infrastructure. It surfaces health degradations across data centers, backbone connections, and availability domains — helping you identify, investigate, and compare incidents at a glance.
            </p>
          </section>

          {/* World Map */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#227e9e] shrink-0" />
              <h3 className="text-[14px] font-semibold text-[#161513] dark:text-white">World Map</h3>
            </div>
            <MapIllustration />
            <div className="flex flex-col gap-2 text-[13px] text-[#444] dark:text-[#bbb] leading-relaxed">
              <p>Each pin on the map represents a data center. Color indicates its current health status:</p>
              <ul className="flex flex-col gap-1.5 pl-1">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-2.5 h-2.5 rounded-sm bg-[#d63b25] shrink-0" /><span><strong className="text-[#161513] dark:text-white">Critical</strong> — active degradation with significant impact. Immediate attention required.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-2.5 h-2.5 rounded-sm bg-[#de8011] shrink-0" /><span><strong className="text-[#161513] dark:text-white">Warning</strong> — early signs of degradation. Monitor closely.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-2.5 h-2.5 rounded-sm bg-[#508223] shrink-0" /><span><strong className="text-[#161513] dark:text-white">Healthy</strong> — all metrics within normal operating range.</span></li>
              </ul>
              <p className="mt-1 flex items-start gap-1.5"><MousePointer className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#227e9e]" /><span>Hover over any pin to see health details and add the region to the metrics table. Scroll or pinch to zoom, click-drag to pan.</span></p>
            </div>
          </section>

          {/* Incident Count Chart */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#227e9e] shrink-0" />
              <h3 className="text-[14px] font-semibold text-[#161513] dark:text-white">Incident Count Chart</h3>
            </div>
            <IncidentChartIllustration />
            <div className="flex flex-col gap-2 text-[13px] text-[#444] dark:text-[#bbb] leading-relaxed">
              <p>The stacked bar chart shows incident volumes over time, broken down by severity. Use it to spot patterns and outliers across your monitoring window.</p>
              <ul className="flex flex-col gap-1.5 pl-1">
                <li className="flex items-start gap-2"><span className="mt-1 w-2.5 h-2.5 rounded-sm bg-[#227e9e] border-2 border-[#227e9e] shrink-0" style={{ background: 'transparent' }} /><span><strong className="text-[#161513] dark:text-white">Blue window</strong> — marks your current time selection. Drag it to navigate to any point in the timeline. The map and table update to reflect data at that position.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2.5 h-2.5 rounded-sm border-2 border-[#de8011] shrink-0" style={{ background: 'transparent' }} /><span><strong className="text-[#161513] dark:text-white">Orange window</strong> — visible in comparison mode. Drag it independently to set the historical reference point.</span></li>
              </ul>
            </div>
          </section>

          {/* Comparison View */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-[#227e9e] shrink-0" />
              <h3 className="text-[14px] font-semibold text-[#161513] dark:text-white">Comparison View</h3>
            </div>
            <ComparisonIllustration />
            <div className="flex flex-col gap-2 text-[13px] text-[#444] dark:text-[#bbb] leading-relaxed">
              <p>Click <strong className="text-[#161513] dark:text-white">"Compare with historical"</strong> in the map header to split the map into two side-by-side views.</p>
              <ul className="flex flex-col gap-1.5 pl-1">
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-[#de8011] shrink-0" /><span>The <strong className="text-[#161513] dark:text-white">left panel</strong> shows the historical snapshot at the orange window position — read-only.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-[#227e9e] shrink-0" /><span>The <strong className="text-[#161513] dark:text-white">right panel</strong> reflects the blue window position — fully interactive.</span></li>
              </ul>
              <p>Move either window in the chart below to shift the timestamp each panel reflects.</p>
            </div>
          </section>

          {/* Realm View Table */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Table2 className="w-4 h-4 text-[#227e9e] shrink-0" />
              <h3 className="text-[14px] font-semibold text-[#161513] dark:text-white">Realm & Region Metrics Table</h3>
            </div>
            <TableIllustration />
            <div className="flex flex-col gap-2 text-[13px] text-[#444] dark:text-[#bbb] leading-relaxed">
              <p>The table shows availability, performance, and reliability metrics across your availability domains (AD-1, AD-2, AD-3) for each selected region.</p>
              <ul className="flex flex-col gap-1.5 pl-1">
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-[#227e9e] shrink-0" /><span>Add regions to the table by hovering over a pin on the map and clicking the <strong className="text-[#161513] dark:text-white">+</strong> button. Up to 3 regions at a time.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-[#227e9e] shrink-0" /><span>Hover over any health cell to see a tooltip with root cause details.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-[#227e9e] shrink-0" /><span>Switch between <strong className="text-[#161513] dark:text-white">General health</strong> and <strong className="text-[#161513] dark:text-white">Backbone health</strong> using the tabs below the map.</span></li>
              </ul>
            </div>
          </section>

          {/* Issues Chart */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#227e9e] shrink-0" />
              <h3 className="text-[14px] font-semibold text-[#161513] dark:text-white">Issues & Diagnostics</h3>
            </div>
            <div className="rounded-lg border border-[#e0e0e0] dark:border-[#333] overflow-hidden">
              <div className="bg-[#fafafa] dark:bg-[#222] px-4 py-3 border-b border-[#e0e0e0] dark:border-[#333]">
                <div className="flex items-center gap-2">
                  <span className="bg-[rgba(214,59,37,0.15)] text-[#d63b25] text-[11px] px-2 py-0.5 rounded font-medium">Critical</span>
                  <span className="text-[13px] font-medium text-[#161513] dark:text-white">Component Insights</span>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2">
                {[
                  { label: 'Filter by bar', desc: 'Click a red or orange bar segment to filter the issues table to that time bucket and severity.' },
                  { label: 'Row detail panel', desc: 'Click any issue row to open a 40% panel with metadata, behavior graphs, diagnostics, and location maps for physical issues.' },
                  { label: 'Confidence score', desc: 'Indicates how certain the system is about the root cause — higher is more actionable.' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#227e9e] shrink-0" />
                    <p className="text-[13px] text-[#444] dark:text-[#bbb] leading-relaxed">
                      <strong className="text-[#161513] dark:text-white">{item.label}</strong> — {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Filter tip */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#227e9e] shrink-0" />
              <h3 className="text-[14px] font-semibold text-[#161513] dark:text-white">Filtering Issues</h3>
            </div>
            <div className="rounded-lg bg-[rgba(34,126,158,0.06)] dark:bg-[rgba(34,126,158,0.1)] border border-[#227e9e]/20 px-4 py-3 text-[13px] text-[#444] dark:text-[#bbb] leading-relaxed flex flex-col gap-2">
              <p>Use the search bar above the issues table to filter by multiple dimensions simultaneously:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {['Severity', 'Confidence score', 'Issue type', 'Status', 'Issue description', 'Start & end time'].map(f => (
                  <div key={f} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#227e9e] shrink-0" />
                    <span className="text-[12px]">{f}</span>
                  </div>
                ))}
              </div>
              <p className="mt-1">Active filters appear as removable chips. Click the <strong className="text-[#161513] dark:text-white">×</strong> on any chip to clear it.</p>
            </div>
          </section>

          {/* Bottom padding */}
          <div className="h-4" />
        </div>
      </div>
    </>
  );
}
