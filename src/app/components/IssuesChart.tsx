import svgPaths from "../../imports/svg-issues-chart-icons";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface IssuesChartProps {
  component: string;
  metric: string;
  category: string;
}

export function IssuesChart({ component, metric, category }: IssuesChartProps) {
  const [hoveredBar, setHoveredBar] = useState<{ label: string; type: 'warning' | 'critical'; count: number } | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: 'severity' | 'confidenceScore' | 'startTime' | 'endTime' | null;
    direction: 'asc' | 'desc';
  }>({ key: 'severity', direction: 'asc' });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  type TimeInterval = 'Days' | 'Hours' | 'Minutes';
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('Minutes');

  // Search / filter state
  type FilterPanel = 'Severity' | 'Confidence score' | 'Type' | 'Status' | 'Issues' | 'Start & end time' | null;
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFilterPanel, setActiveFilterPanel] = useState<FilterPanel>(null);
  const [filterSeverity, setFilterSeverity] = useState<Set<'Critical' | 'Warning'>>(new Set());
  const [filterConfidence, setFilterConfidence] = useState<[number, number]>([0, 100]);
  const [filterTypes, setFilterTypes] = useState<Set<IssueTypeValue>>(new Set());
  const [filterStatus, setFilterStatus] = useState<Set<'Resolved' | 'Unresolved' | 'Unknown'>>(new Set());
  const [filterIssueText, setFilterIssueText] = useState('');
  const [filterTimeFrom, setFilterTimeFrom] = useState('');
  const [filterTimeTo, setFilterTimeTo] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);
  const [barFilter, setBarFilter] = useState<{ barIndex: number; label: string; severity: 'Critical' | 'Warning' } | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueRow | null>(null);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [showBehaviorGraph, setShowBehaviorGraph] = useState(false);

  useEffect(() => { setShowLocationMap(false); setShowBehaviorGraph(false); }, [selectedIssue]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setOpenMenuIndex(null);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setActiveFilterPanel(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Generate time-bucketed chart data driven by timeInterval selection
  const generateChartData = () => {
    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };
    const seed = hashCode(`${component}-${category}-${metric}`);
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index * 12345) * 10000;
      return x - Math.floor(x);
    };

    const chartBaseDate = new Date(2023, 7, 18); // Aug 18, 2023 — shared reference

    if (timeInterval === 'Days') {
      // 14 bars — one per day over the last 2 weeks
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return Array.from({ length: 14 }, (_, i) => {
        const bucketStart = chartBaseDate.getTime() + i * 86400000;
        const bucketEnd   = bucketStart + 86400000;
        const d = new Date(bucketStart);
        const fullLabel = `${months[d.getMonth()]} ${d.getDate()}`;
        const critical = Math.floor(seededRandom(i * 2) * 26);
        const warning  = Math.floor(seededRandom(i * 2 + 1) * 21);
        return { label: fullLabel, critical, warning, fullLabel, bucketStart, bucketEnd };
      });
    }

    if (timeInterval === 'Hours') {
      // 24 bars — one per hour over the last 24 hours, sparse (issues don't occur every hour)
      return Array.from({ length: 24 }, (_, i) => {
        const bucketStart = chartBaseDate.getTime() + i * 3600000;
        const bucketEnd   = bucketStart + 3600000;
        const fullLabel = `${String(i).padStart(2, '0')}:00`;
        // label every 4 hours to prevent overlap
        const label = i % 4 === 0 ? fullLabel : '';
        // ~50% of hours have no issues; max ~12 per bar
        const cr = seededRandom(i * 2);
        const wr = seededRandom(i * 2 + 1);
        const critical = cr > 0.50 ? Math.floor(cr * 12) : 0;
        const warning  = wr > 0.52 ? Math.floor(wr * 10) : 0;
        return { label, critical, warning, fullLabel, bucketStart, bucketEnd };
      });
    }

    // Minutes: 32 bars × 15 min = last 8 hours, very sparse (most buckets have no issues)
    const numBars = 32;
    const refHour = 16; // reference end time: 16:00
    return Array.from({ length: numBars }, (_, i) => {
      const minutesFromStart = i * 15;
      const startMinutes = refHour * 60 - (numBars - 1) * 15;
      const totalMinutes = startMinutes + minutesFromStart;
      const bucketStart = chartBaseDate.getTime() + totalMinutes * 60000;
      const bucketEnd   = bucketStart + 15 * 60000;
      const h = Math.floor(totalMinutes / 60) % 24;
      const m = totalMinutes % 60;
      const fullLabel = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      // label only on full hours
      const label = m === 0 ? `${String(h).padStart(2, '0')}:00` : '';
      // ~65% of 15-min buckets have no issues; max ~6 per bar
      const cr = seededRandom(i * 2);
      const wr = seededRandom(i * 2 + 1);
      const critical = cr > 0.65 ? Math.ceil(cr * 5) : 0;
      const warning  = wr > 0.70 ? Math.ceil(wr * 4) : 0;
      return { label, critical, warning, fullLabel, bucketStart, bucketEnd };
    });
  };

  const chartData = generateChartData();

  const maxValue = timeInterval === 'Days' ? 30 : timeInterval === 'Hours' ? 12 : 6;
  const chartHeight = 124;

  // Default to the time window with the highest critical count
  const defaultInsight = chartData.reduce((best, d) => d.critical > best.critical ? d : best, chartData[0]);
  const displayInsight = hoveredBar || { label: defaultInsight.fullLabel, type: 'critical' as const, count: defaultInsight.critical };

  // Generate dynamic issues data based on component, metric, severity, confidence, and issue type
  const generateIssuesData = (chartData: { bucketStart: number; bucketEnd: number; critical: number; warning: number }[]): IssueRow[] => {
    const buildings = ['JFP', 'FFP', 'TFP', 'JFA', 'JFS', 'JFT', 'CFR', 'TFA', 'TFR', 'JFR'];

    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };
    const seed = hashCode(`${component}-${category}-${metric}-confidence`);
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index * 9999) * 10000;
      return x - Math.floor(x);
    };

    const types: Array<'Critical' | 'Warning'> = ['Critical', 'Critical', 'Critical', 'Critical', 'Warning', 'Critical', 'Warning', 'Critical', 'Warning', 'Critical'];
    const issueTypes: Array<IssueTypeValue> = [
      'Physical', 'Likely physical', 'Ambiguous', 'Physical', 'Likely transient',
      'Likely physical', 'Ambiguous', 'Likely transient', 'Physical', 'Likely transient'
    ];
    const confidenceScores = Array.from({ length: 10 }, (_, i) => Math.round(50 + seededRandom(i) * 50));

    const getDescription = (i: number, severity: 'Critical' | 'Warning', confidence: number, issueType: IssueTypeValue): string => {
      const b = buildings[i];
      const isPhysical = issueType === 'Physical' || issueType === 'Likely physical';
      const qualifier = confidence > 80 ? '' : confidence > 60 ? 'Suspected: ' : 'Possible: ';

      type Pools = { 'phy-crit': string[]; 'phy-warn': string[]; 'sw-crit': string[]; 'sw-warn': string[] };
      const allPools: Record<string, Pools> = {
        'CFAB-Availability': {
          'phy-crit': [
            `Fiber break on ${component} uplink in ${b} — complete Rx signal loss`,
            `SFP hardware failure on ${component} in ${b} — DOM threshold breached, port offline`,
            `Physical port damage on ${component} in ${b} — Rx power on 4 interfaces at -40dBm`,
            `${component} linecard failure in ${b} — 16 ports offline, RMA in progress`,
            `Backplane hardware fault on ${component} in ${b} — forwarding ASIC unresponsive`,
            `Fiber cable crush on ${component} path in ${b} — OTDR confirms break at 42m`,
            `PSU failure on ${component} in ${b} — chassis on single power supply`,
          ],
          'phy-warn': [
            `Optical signal degradation on ${component} uplink in ${b} — Tx power approaching threshold`,
            `SFP DOM temperature warning on ${component} in ${b} — 68°C (limit 70°C)`,
            `${component} Rx power at -13.5dBm in ${b} — warning threshold is -14dBm`,
            `Fiber bend radius concern on ${component} in ${b} — Rx power trending down`,
            `${component} PSU at 88% capacity in ${b} — redundancy at risk`,
            `Dirty fiber connector on ${component} in ${b} — optical margin reduced by 3dB`,
            `SFP bias current out of range on ${component} in ${b} — transceiver degrading`,
          ],
          'sw-crit': [
            `${component} link flapping in ${b} — 47 state changes in 2 hours`,
            `LACP negotiation failure on ${component} in ${b} — port channel down`,
            `${component} BFD session lost in ${b} — fast failover triggered`,
            `${component} VPC peer-link failure in ${b} — split-brain active`,
            `BGP session torn down on ${component} in ${b} — prefixes withdrawn`,
            `${component} OSPF adjacency lost in ${b} — LSA flood in progress`,
            `UDLD error-disable on ${component} in ${b} — unidirectional link confirmed`,
          ],
          'sw-warn': [
            `${component} interface error rate elevated in ${b} — input discards trending up`,
            `Intermittent LLDP adjacency loss on ${component} in ${b} — 4 drops in 1 hour`,
            `${component} OSPF neighbor instability in ${b} — adjacency reset 3 times today`,
            `${component} port channel imbalance in ${b} — LACP hash skew detected`,
            `BGP soft reset on ${component} in ${b} — policy update causing brief churn`,
            `${component} auto-negotiation mismatch in ${b} — duplex errors on 2 ports`,
            `Jumbo frame fragmentation on ${component} in ${b} — MTU mismatch on 1 link`,
          ],
        },
        'CFAB-Performance': {
          'phy-crit': [
            `Optical amplifier failure on ${component} path in ${b} — signal at -28dBm`,
            `Transceiver hardware fault causing CRC storms on ${component} in ${b}`,
            `Physical media failure on ${component} in ${b} — 3% sustained packet loss`,
            `${component} optical power collapse in ${b} — 12dB sudden loss on 3 paths`,
            `Fiber splice degradation on ${component} in ${b} — high CRC error rate`,
          ],
          'phy-warn': [
            `${component} Tx power drift in ${b} — 2dB below nominal, approaching threshold`,
            `SFP aging on ${component} in ${b} — BER trending up`,
            `Optical return loss elevated on ${component} in ${b} — connector inspect recommended`,
            `Physical media CRC rate increasing on ${component} in ${b} — 0.1% threshold approaching`,
            `${component} SFP end-of-life indicators in ${b} — 92% laser hours consumed`,
          ],
          'sw-crit': [
            `${component} forwarding ASIC dropped 3.2% of frames in ${b} — hardware queue overflow`,
            `${component} PFC deadlock detected in ${b} — lossless traffic halted`,
            `Buffer overflow on ${component} spine ports in ${b} — tail drop active at 99%`,
            `${component} control plane CPU at 98% in ${b} — forwarding performance degraded`,
            `${component} fabric congestion at 95% in ${b} — 2% sustained packet drop`,
          ],
          'sw-warn': [
            `${component} buffer utilization at 78% in ${b} — approaching burst threshold`,
            `ECMP path imbalance on ${component} in ${b} — one link carrying 65% of traffic`,
            `Abnormal jitter on ${component} fabric in ${b} — p99 latency at 4.8ms (normal 1ms)`,
            `${component} flow table utilization at 82% in ${b} — new flows may be slow-pathed`,
            `PFC pause frame rate increasing on ${component} in ${b} — congestion building`,
          ],
        },
        'CFAB-Other': {
          'phy-crit': [
            `${component} PSU failure in ${b} — single-PSU operation, no redundancy`,
            `Fan module hardware failure on ${component} in ${b} — CPU throttling due to heat`,
            `${component} ASIC parity error in ${b} — hardware fault flag raised, TAC engaged`,
            `Physical memory fault on ${component} in ${b} — ECC errors uncorrectable`,
            `Cooling hardware degradation on ${component} in ${b} — ambient 45°C, limit 40°C`,
          ],
          'phy-warn': [
            `${component} PSU fan degraded in ${b} — operating at reduced RPM`,
            `Ambient temperature warning on ${component} in ${b} — 37°C (threshold 40°C)`,
            `${component} TCAM utilization at 88% in ${b} — approaching expansion threshold`,
            `Fan speed anomaly on ${component} in ${b} — one fan at 60% rated speed`,
            `Power draw on ${component} in ${b} — 94% of rated capacity sustained`,
          ],
          'sw-crit': [
            `${component} control plane crash loop in ${b} — process restarting every 90s`,
            `Config corruption detected on ${component} in ${b} — running vs startup divergence`,
            `${component} software bug triggered memory leak in ${b} — OOM condition imminent`,
            `Routing table corruption on ${component} in ${b} — protocol reset required`,
            `${component} ARP storm detected in ${b} — CPU at 96% processing requests`,
          ],
          'sw-warn': [
            `${component} memory utilization at 88% in ${b} — approaching swap threshold`,
            `Configuration drift on ${component} in ${b} — 3 ACL changes outside automation`,
            `${component} syslog rate 1800/min in ${b} — approaching buffer capacity`,
            `${component} BGP dampening triggered in ${b} — route suppression active`,
            `Firmware advisory on ${component} in ${b} — vendor patch recommended`,
          ],
        },
        'JFAB-Availability': {
          'phy-crit': [
            `Fiber cut on inter-building ${component} path between ${b} and IAD12 — OTDR confirmed`,
            `DWDM transponder hardware failure on ${component} in ${b} — wavelength lost`,
            `Optical amplifier failure on ${component} metro span in ${b} — link down`,
            `Physical cross-connect damage in ${b} meet-me room — ${component} path severed`,
            `Dark fiber path loss on ${component} between ${b} and adjacent DC — -35dBm`,
          ],
          'phy-warn': [
            `Optical power degradation on ${component} inter-building path in ${b} — -24dBm (threshold -26dBm)`,
            `DWDM SFP aging on ${component} in ${b} — Tx power drifting below nominal`,
            `${component} fiber path optical margin at 2dB in ${b} — below 4dB design threshold`,
            `Physical patch panel connector wear on ${component} in ${b} — 1dB insertion loss`,
            `${component} ROADM channel power drift in ${b} — 1.5dB below target`,
          ],
          'sw-crit': [
            `BGP adjacency failure on ${component} metro links at ${b} — session timeout`,
            `${component} MPLS label distribution lost in ${b} — LDP session down, tunnels failing`,
            `IS-IS adjacency failure on ${component} at ${b} — routing blackhole forming`,
            `${component} BFD session flap cascade in ${b} — 12 paths deactivated`,
            `${component} RSVP-TE path teardown in ${b} — all TE tunnels down`,
          ],
          'sw-warn': [
            `Route flapping on ${component} at ${b} — 23 BGP prefix withdrawals in 1 hour`,
            `${component} BGP hold timer approaching in ${b} — keepalive delay detected`,
            `IS-IS LSP flooding storm on ${component} at ${b} — topology instability`,
            `${component} MPLS label allocation at 78% in ${b} — approaching exhaustion`,
            `${component} BFD interval mismatch with peer at ${b} — false positive failovers possible`,
          ],
        },
        'JFAB-Performance': {
          'phy-crit': [
            `Optical dispersion limit exceeded on ${component} span to ${b} — BER at 1e-7`,
            `Fiber PMD causing packet corruption on ${component} path to ${b} — 2% frame loss`,
            `Physical impairment on DWDM channel in ${b} — ${component} throughput halved`,
            `Fiber attenuation increase on ${component} path in ${b} — 4dB above baseline`,
            `Optical power level collapse on ${component} in ${b} — 10dB sudden loss`,
          ],
          'phy-warn': [
            `${component} WAN SFP Tx power drift in ${b} — 1.5dB below nominal`,
            `Optical margin declining on ${component} path at ${b} — 3dB remaining (min 4dB)`,
            `${component} fiber span BER trending up at ${b} — currently 3e-12`,
            `${component} chromatic dispersion compensation drifting in ${b} — latency variance`,
            `${component} optic aging causing jitter increase at ${b} — p99 at 3ms (was 1ms)`,
          ],
          'sw-crit': [
            `${component} WAN circuit at 98% utilization for 3 hours at ${b} — congestion collapse`,
            `BGP route churn flooding ${component} FIB at ${b} — convergence time 45s`,
            `${component} QoS policy inversion at ${b} — critical traffic being dropped first`,
            `Asymmetric routing causing ${component} TCP penalty at ${b} — 45ms one-way delta`,
            `${component} jitter exceeding SLA at ${b} — voice traffic unusable (50ms variance)`,
          ],
          'sw-warn': [
            `${component} WAN utilization at 82% in ${b} — 3-day trend predicts saturation`,
            `Route flapping on ${component} paths at ${b} — 12 BGP updates in last hour`,
            `${component} inter-DC replication latency 180ms at ${b} — normal is 80ms`,
            `${component} DSCP remarking at ${b} — priority traffic competing with bulk`,
            `${component} jitter at ${b} above baseline — p95 latency 8ms (normal 2ms)`,
          ],
        },
        'JFAB-Other': {
          'phy-crit': [
            `${component} WAN router PSU failure in ${b} — circuit down, carrier engaged`,
            `Physical cross-connect pulled in ${b} — ${component} path severed at patch panel`,
            `${component} line card hardware failure in ${b} — WAN interfaces offline`,
            `Physical DWDM shelf failure in ${b} — all wavelengths on ${component} path lost`,
            `${component} optical chassis overheating in ${b} — thermal shutdown triggered`,
          ],
          'phy-warn': [
            `${component} WAN SFP end-of-life in ${b} — 90% laser hours consumed`,
            `Connector corrosion on ${component} WAN port in ${b} — periodic signal drop`,
            `${component} optical shelf ambient temperature at 38°C in ${b} — threshold 40°C`,
            `${component} WAN chassis fan degraded in ${b} — airflow below spec`,
            `${component} WAN transceiver DOM alert in ${b} — Rx power 1dB below nominal`,
          ],
          'sw-crit': [
            `${component} routing protocol process crash in ${b} — BGP/OSPF restarting`,
            `${component} MPLS forwarding plane failure in ${b} — all VPNs impacted`,
            `${component} WAN config corruption in ${b} — running config diverged from intended`,
            `${component} prefix hijack detected at ${b} — BGP security event raised`,
            `${component} authentication failure with BGP peer at ${b} — session rejected`,
          ],
          'sw-warn': [
            `${component} BGP prefix count at ${b} approaching policy limit — 92% full`,
            `${component} route policy misconfiguration at ${b} — unintended routes exported`,
            `${component} NTP synchronization drift at ${b} — 250ms offset from stratum 1`,
            `${component} ACL hit counter anomaly at ${b} — unexpected deny patterns`,
            `${component} flow export (NetFlow) gap at ${b} — 4-hour visibility outage`,
          ],
        },
        'FFAB-Availability': {
          'phy-crit': [
            `${component} ToR uplink SFP failure in ${b} — server rack isolated`,
            `Physical NIC failure on servers behind ${component} in ${b} — 8 hosts offline`,
            `${component} switch PSU failure in ${b} — operating on single power`,
            `Fiber patch cord failure on ${component} server port in ${b} — link down`,
            `${component} backplane hardware failure in ${b} — forwarding stopped`,
          ],
          'phy-warn': [
            `${component} server-facing SFP DOM warning in ${b} — Rx power at -12dBm`,
            `Physical cable quality issue on ${component} uplink in ${b} — high CRC rate`,
            `${component} PSU operating near capacity in ${b} — 91% load, no headroom`,
            `${component} port flap in ${b} rack R22 — 5 link events in 4 hours`,
            `Fan degradation on ${component} in ${b} — airflow reduced by 30%`,
          ],
          'sw-crit': [
            `${component} VXLAN tunnel failure in ${b} — overlay network partitioned`,
            `${component} anycast gateway unreachable in ${b} — default route missing for VMs`,
            `LACP negotiation failure on ${component} in ${b} — bond interface down`,
            `${component} virtual chassis split-brain in ${b} — duplicate IPs detected`,
            `${component} SDN controller disconnected in ${b} — flow rules stale`,
          ],
          'sw-warn': [
            `${component} VLAN membership drift in ${b} — 2 ports on wrong VLAN`,
            `${component} overlay network VTEP relearn storm in ${b} — MAC instability`,
            `${component} IGMP snooping failure in ${b} — multicast flooding to all ports`,
            `${component} STP inconsistency in ${b} — non-designated port in forwarding`,
            `${component} ARP table utilization at 84% in ${b} — overflow risk`,
          ],
        },
        'FFAB-Performance': {
          'phy-crit': [
            `Physical NIC overload on servers behind ${component} in ${b} — 25G link at 100% rx`,
            `${component} server port SFP transceiver failure causing CRC storms in ${b}`,
            `Cable physical damage causing packet corruption on ${component} in ${b} — 4% loss`,
            `${component} backplane performance degradation in ${b} — internal congestion 95%`,
            `${component} SFP Rx overload in ${b} — power exceeding receiver max`,
          ],
          'phy-warn': [
            `${component} server NIC Rx power near threshold in ${b} — -13dBm (limit -14dBm)`,
            `Physical layer CRC errors trending on ${component} in ${b} — 2 ports affected`,
            `${component} SFP Tx power drift in ${b} — 1dB below nominal`,
            `${component} backplane utilization at 78% in ${b} — physical capacity concern`,
            `${component} SFP end-of-life approaching in ${b} — plan 90-day replacement`,
          ],
          'sw-crit': [
            `${component} east-west congestion in ${b} — cross-rack bottleneck at 99%`,
            `Elephant flow monopolizing ${component} uplink in ${b} — 87% of bandwidth`,
            `${component} broadcast storm from misconfigured host in ${b} — 340k PPS`,
            `${component} load balancer session table full in ${b} — new connections rejected`,
            `Microbursts on ${component} in ${b} — 10Gbps spikes every 30s, tail drop active`,
          ],
          'sw-warn': [
            `${component} east-west traffic at 72% in ${b} — trending toward congestion`,
            `${component} load balancer pool member health degrading in ${b} — 2 of 8 suspect`,
            `Elephant flow detected on ${component} in ${b} — consuming 35% of uplink`,
            `${component} flow table at 76% in ${b} — eviction rate increasing`,
            `${component} TCP retransmit rate at 1.8% in ${b} — above 1% baseline`,
          ],
        },
        'FFAB-Other': {
          'phy-crit': [
            `${component} switch hardware failure in ${b} — chassis unresponsive`,
            `${component} PSU redundancy lost in ${b} — operating on single PSU`,
            `${component} ASIC hardware error in ${b} — ECC uncorrectable, TAC engaged`,
            `Power delivery failure to ${component} in ${b} — circuit breaker tripped`,
            `${component} hardware fault causing MAC table corruption in ${b}`,
          ],
          'phy-warn': [
            `${component} ambient temperature at 37°C in ${b} — threshold is 40°C`,
            `${component} PSU efficiency declining in ${b} — 88% load factor`,
            `Fan speed warning on ${component} in ${b} — one fan at 55% rated RPM`,
            `${component} TCAM utilization at 89% in ${b} — approaching limit`,
            `${component} hardware warranty expiry in ${b} — EoL device in production`,
          ],
          'sw-crit': [
            `${component} control plane process crash in ${b} — switch management unresponsive`,
            `${component} MAC table completely flushed in ${b} — flooding all ports`,
            `${component} ACL policy error in ${b} — critical traffic inadvertently denied`,
            `${component} DHCP snooping database corruption in ${b} — clients blocked`,
            `${component} ARP storm consuming CPU in ${b} — 98% control plane utilization`,
          ],
          'sw-warn': [
            `${component} firmware version mismatch in ${b} stack — inconsistency detected`,
            `${component} syslog rate elevated in ${b} — 1200 messages/min`,
            `${component} MAC move events elevated in ${b} — possible loop or NIC issue`,
            `${component} CPU utilization at 78% in ${b} — above baseline`,
            `${component} multicast group table at 82% in ${b} — pruning may be needed`,
          ],
        },
        'TOR-Availability': {
          'phy-crit': [
            `${component} switch stack member hardware failure in ${b} — operating standalone`,
            `SFP module failure on ${component} in ${b} rack R23 — port offline`,
            `Physical port damage on ${component} in ${b} — connector cracked, interface down`,
            `${component} PSU failure in ${b} — single PSU operating, no redundancy`,
            `${component} optic hardware failure in ${b} rack R08 — Rx signal lost`,
          ],
          'phy-warn': [
            `${component} SFP DOM warning in ${b} — Rx power at -13.2dBm (threshold -14dBm)`,
            `Fiber patch cord quality issue on ${component} in ${b} — intermittent signal`,
            `${component} PSU fan degraded in ${b} — single PSU at 88% capacity`,
            `${component} optic Rx power trending down in ${b} — 0.5dB/week decline`,
            `${component} stack cable wear detected in ${b} — replace at next window`,
          ],
          'sw-crit': [
            `${component} port channel down in ${b} — all LACP members inactive`,
            `${component} stack split-brain in ${b} — dual master condition active`,
            `UDLD error-disable on ${component} in ${b} — unidirectional link confirmed`,
            `${component} STP topology change loop in ${b} — reconvergence failed`,
            `${component} dual-homed server lost connectivity in ${b} — both bonds down`,
          ],
          'sw-warn': [
            `${component} port channel member count reduced in ${b} — 2 of 4 LACP active`,
            `${component} LLDP neighbor instability in ${b} — 6 resets in last hour`,
            `${component} STP topology change in ${b} — non-designated port state change`,
            `${component} stack member health degraded in ${b} — one member in reduced state`,
            `${component} MAC table near capacity in ${b} — 88% full`,
          ],
        },
        'TOR-Performance': {
          'phy-crit': [
            `${component} 25G port at 100% Rx utilization in ${b} rack R15 — hardware overload`,
            `SFP Rx power overload on ${component} in ${b} — optical input exceeding receiver`,
            `${component} backplane physical throughput exhausted in ${b} — drop rate 8%`,
            `Physical media CRC storm on ${component} in ${b} — 5% frame error rate`,
            `Optical fiber stress causing BER elevation on ${component} in ${b} — above 1e-9`,
          ],
          'phy-warn': [
            `${component} Rx power at -14.5dBm in ${b} — below -14dBm warning threshold`,
            `${component} SFP Tx power drifting in ${b} — 1.5dB below spec`,
            `Physical CRC errors on ${component} in ${b} — 0.08% error rate, trending up`,
            `${component} optic DOM temperature elevated in ${b} — 66°C (limit 70°C)`,
            `${component} backplane utilization at 81% in ${b} — peak headroom low`,
          ],
          'sw-crit': [
            `${component} ARP storm consuming CPU in ${b} — control plane at 96%`,
            `Broadcast storm from ${component} in ${b} — 280k PPS broadcast traffic`,
            `${component} port buffer overflow in ${b} — output drops active on all ports`,
            `Elephant flow on ${component} in ${b} — single VM consuming 80% of uplink`,
            `${component} ECMP hash collision in ${b} — 90% of flows on one uplink`,
          ],
          'sw-warn': [
            `${component} port utilization at 87% in ${b} — trending toward saturation`,
            `${component} output drops during peak in ${b} — 0.3% loss rate for 15min daily`,
            `${component} CPU utilization elevated in ${b} — 72% due to ARP processing`,
            `${component} buffer depth growing in ${b} — p95 queue length 12KB (was 2KB)`,
            `Jumbo frame MTU mismatch on ${component} in ${b} — fragmentation occasional`,
          ],
        },
        'TOR-Other': {
          'phy-crit': [
            `${component} PSU failure in ${b} — chassis running on single PSU`,
            `Fan tray hardware failure on ${component} in ${b} — thermal shutdown imminent`,
            `${component} ASIC hardware fault in ${b} — ECC uncorrectable errors`,
            `${component} power delivery failure in ${b} rack R11 — circuit breaker tripped`,
            `${component} stack cable hardware failure in ${b} — member isolated`,
          ],
          'phy-warn': [
            `${component} temperature sensors warning in ${b} — ambient 39°C (threshold 40°C)`,
            `${component} fan speed degraded in ${b} — operating at 65% rated RPM`,
            `${component} TCAM utilization at 91% in ${b} — approaching hard limit`,
            `${component} memory utilization at 87% in ${b} — approaching threshold`,
            `${component} PSU operating at 92% capacity in ${b} — no headroom for surge`,
          ],
          'sw-crit': [
            `${component} firmware crash in ${b} — switch in boot loop`,
            `${component} configuration corruption in ${b} — startup config overwritten`,
            `${component} MAC table corruption in ${b} — flooding all unknown unicast`,
            `${component} spanning tree root election failure in ${b} — loop forming`,
            `${component} DHCP relay agent failure in ${b} — new hosts not getting IPs`,
          ],
          'sw-warn': [
            `${component} firmware version mismatch in ${b} stack — inconsistency detected`,
            `${component} config backup failed in ${b} — last backup 4 days ago`,
            `${component} NTP drift in ${b} — 220ms offset from stratum 2`,
            `Configuration drift on ${component} in ${b} — manual change outside automation`,
            `${component} CPU utilization at 76% in ${b} — above 70% baseline`,
          ],
        },
      };

      const metricKey = (metric === 'Availability' || metric === 'Performance') ? metric : 'Other';
      const catKey = `${category}-${metricKey}`;
      const pools: Pools = allPools[catKey] ?? allPools['TOR-Other'];
      const poolKey = `${isPhysical ? 'phy' : 'sw'}-${severity === 'Critical' ? 'crit' : 'warn'}` as keyof Pools;
      const pool = pools[poolKey];
      return qualifier + pool[i % pool.length];
    };

    const statuses: Array<'Resolved' | 'Unresolved' | 'Unknown'> = Array.from({ length: 10 }, (_, i) => {
      const r = seededRandom(i + 200);
      return r < 0.35 ? 'Resolved' : r < 0.75 ? 'Unresolved' : 'Unknown';
    });

    // Assign each issue to a specific bar (matching its severity)
    const criticalBars = chartData.reduce<number[]>((acc, d, i) => d.critical > 0 ? [...acc, i] : acc, []);
    const warningBars  = chartData.reduce<number[]>((acc, d, i) => d.warning  > 0 ? [...acc, i] : acc, []);

    const barAssignments = Array.from({ length: 10 }, (_, i) => {
      const bars = types[i] === 'Critical' ? criticalBars : warningBars;
      if (bars.length === 0) return 0;
      return bars[Math.floor(seededRandom(i + 150) * bars.length)];
    });

    const formatEpoch = (epoch: number) => {
      const d = new Date(epoch);
      const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    return Array.from({ length: 10 }, (_, index) => {
      const bar = chartData[barAssignments[index]];
      const bucketDuration = bar.bucketEnd - bar.bucketStart;
      const startEpoch = bar.bucketStart + Math.floor(seededRandom(index + 160) * bucketDuration);
      const endEpoch   = startEpoch + Math.floor(seededRandom(index + 170) * 3600000) + 1800000;
      // First seen: 1–72 hours before startEpoch
      const firstSeenOffset = Math.floor(seededRandom(index + 180) * 72 * 3600000) + 3600000;
      const firstSeenEpoch  = startEpoch - firstSeenOffset;
      return {
        type: types[index],
        issueType: issueTypes[index],
        status: statuses[index],
        confidenceScore: confidenceScores[index],
        description: getDescription(index, types[index], confidenceScores[index], issueTypes[index]),
        barIndex: barAssignments[index],
        startTime: formatEpoch(startEpoch),
        endTime: formatEpoch(endEpoch),
        firstSeenTime: formatEpoch(firstSeenEpoch),
        startEpoch,
        endEpoch,
      };
    });
  };

  const issuesData = generateIssuesData(chartData);

  // Sorting logic
  const handleSort = (key: 'severity' | 'confidenceScore' | 'startTime' | 'endTime') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedIssuesData = [...issuesData].sort((a, b) => {
    if (!sortConfig.key) {
      // Default: severity asc (Critical first), then confidence desc
      const order = { Critical: 1, Warning: 2 };
      const sevDiff = order[a.type] - order[b.type];
      if (sevDiff !== 0) return sevDiff;
      return b.confidenceScore - a.confidenceScore;
    }

    const direction = sortConfig.direction === 'asc' ? 1 : -1;

    if (sortConfig.key === 'severity') {
      const order = { Critical: 1, Warning: 2 };
      const sevDiff = (order[a.type] - order[b.type]) * direction;
      if (sevDiff !== 0) return sevDiff;
      // Secondary: confidence score highest first
      return b.confidenceScore - a.confidenceScore;
    } else if (sortConfig.key === 'confidenceScore') {
      return (a.confidenceScore - b.confidenceScore) * direction;
    } else if (sortConfig.key === 'startTime' || sortConfig.key === 'endTime') {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return (dateA.getTime() - dateB.getTime()) * direction;
    }

    return 0;
  });

  const clearAllFilters = () => {
    setBarFilter(null);
    setFilterSeverity(new Set());
    setFilterConfidence([0, 100]);
    setFilterTypes(new Set());
    setFilterStatus(new Set());
    setFilterIssueText('');
    setFilterTimeFrom('');
    setFilterTimeTo('');
  };

  const isFilterActive = (opt: string): boolean => {
    switch (opt) {
      case 'Severity': return filterSeverity.size > 0;
      case 'Confidence score': return filterConfidence[0] !== 0 || filterConfidence[1] !== 100;
      case 'Type': return filterTypes.size > 0;
      case 'Status': return filterStatus.size > 0;
      case 'Issues': return filterIssueText.length > 0;
      case 'Start & end time': return filterTimeFrom !== '' || filterTimeTo !== '';
      default: return false;
    }
  };

  const filteredIssuesData = sortedIssuesData.filter(issue => {
    if (barFilter !== null && (issue.barIndex !== barFilter.barIndex || issue.type !== barFilter.severity)) return false;
    if (filterSeverity.size > 0 && !filterSeverity.has(issue.type)) return false;
    if (issue.confidenceScore < filterConfidence[0] || issue.confidenceScore > filterConfidence[1]) return false;
    if (filterTypes.size > 0 && !filterTypes.has(issue.issueType)) return false;
    if (filterStatus.size > 0 && !filterStatus.has(issue.status)) return false;
    if (filterIssueText && !issue.description.toLowerCase().includes(filterIssueText.toLowerCase())) return false;
    if (filterTimeFrom) {
      const from = new Date(filterTimeFrom).getTime();
      if (issue.startEpoch < from) return false;
    }
    if (filterTimeTo) {
      const to = new Date(filterTimeTo).getTime();
      if (issue.endEpoch > to) return false;
    }
    return true;
  });

  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (barFilter) activeChips.push({ key: 'barFilter', label: `${barFilter.severity} @ ${barFilter.label}`, clear: () => setBarFilter(null) });
  if (filterSeverity.size > 0) activeChips.push({ key: 'severity', label: `Severity: ${[...filterSeverity].join(', ')}`, clear: () => setFilterSeverity(new Set()) });
  if (filterConfidence[0] !== 0 || filterConfidence[1] !== 100) activeChips.push({ key: 'confidence', label: `Score: ${filterConfidence[0]}–${filterConfidence[1]}%`, clear: () => setFilterConfidence([0, 100]) });
  if (filterTypes.size > 0) activeChips.push({ key: 'types', label: `Type: ${[...filterTypes].join(', ')}`, clear: () => setFilterTypes(new Set()) });
  if (filterStatus.size > 0) activeChips.push({ key: 'status', label: `Status: ${[...filterStatus].join(', ')}`, clear: () => setFilterStatus(new Set()) });
  if (filterIssueText) activeChips.push({ key: 'issue', label: `"${filterIssueText}"`, clear: () => setFilterIssueText('') });
  if (filterTimeFrom || filterTimeTo) activeChips.push({ key: 'time', label: `${filterTimeFrom ? filterTimeFrom.replace('T', ' ') : '...'} → ${filterTimeTo ? filterTimeTo.replace('T', ' ') : '...'}`, clear: () => { setFilterTimeFrom(''); setFilterTimeTo(''); } });

  const SortIcon = ({ column }: { column: 'severity' | 'confidenceScore' | 'startTime' | 'endTime' }) => {
    if (sortConfig.key !== column) {
      return (
        <svg className="inline-block ml-1 w-3 h-3 opacity-30" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 3l4 5H4l4-5zm0 10l-4-5h8l-4 5z"/>
        </svg>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg className="inline-block ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 3l4 5H4l4-5z"/>
      </svg>
    ) : (
      <svg className="inline-block ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 13l-4-5h8l-4 5z"/>
      </svg>
    );
  };

  return (
    <>
    <div className="bg-white dark:bg-[#1a1a1a] p-6 border-b border-[#d8d8d8] dark:border-[#404040]">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] px-2 py-1 rounded">
              <p className="font-normal text-[12px] text-[#d63b25] dark:text-[#e85540] leading-[16px]">
                Critical
              </p>
            </div>
            <p className="font-medium font-medium text-[14px] text-[#161513] dark:text-white leading-[20px]">
              {component} Insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[12px] leading-[20px] dark:text-[#e0e0e0] border border-[#d8d8d8] dark:border-[#404040] rounded p-3"><span className="text-[#222] dark:text-white">{displayInsight.label} window</span><span> has the highest count ({displayInsight.count}) of </span><span className={displayInsight.type === 'critical' ? 'text-[#d63b25] dark:text-[#e85540]' : 'text-[#de8011] dark:text-[#ff981e]'}>{displayInsight.type.charAt(0).toUpperCase() + displayInsight.type.slice(1)}</span><span> issues.</span></p>
            
          </div>
        </div>

        {/* Chart */}
        {(() => {
          const barW  = timeInterval === 'Days' ? 'w-9' : timeInterval === 'Hours' ? 'w-4' : 'w-3';
          const caption =
            timeInterval === 'Days'    ? `Critical and warning issues in ${component} — daily (last 2 weeks)` :
            timeInterval === 'Hours'   ? `Critical and warning issues in ${component} — hourly (last 24 hours)` :
                                         `Critical and warning issues in ${component} — 15-min intervals (last 8 hours)`;
          const yLabels = timeInterval === 'Days'  ? [30, 25, 20, 15, 10,  5, 0] :
                          timeInterval === 'Hours' ? [12, 10,  8,  6,  4,  2, 0] :
                                                     [ 6,  5,  4,  3,  2,  1, 0];
          return (
            <div className="flex flex-col gap-4">
              {/* Time interval selector */}
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#665f5b] dark:text-[#999]">Time interval</span>
                <select
                  value={timeInterval}
                  onChange={(e) => { setHoveredBar(null); setBarFilter(null); setTimeInterval(e.target.value as TimeInterval); }}
                  className="text-[12px] border border-[#d8d8d8] dark:border-[#404040] rounded px-2 py-1 bg-white dark:bg-[#1a1a1a] text-[#161513] dark:text-white cursor-pointer outline-none"
                >
                  <option value="Days">Days</option>
                  <option value="Hours">Hours</option>
                  <option value="Minutes">Minutes</option>
                </select>
              </div>

              <div className="relative">
                {/* Y-axis and bars */}
                <div className="flex gap-5">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between items-end text-[12px] text-[#665f5b] dark:text-[#999] h-[124px]">
                    {yLabels.map(l => <p key={l}>{l}</p>)}
                  </div>

                  {/* Chart area */}
                  <div className="flex-1 relative">
                    {/* Baseline */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#b9b9b9] dark:bg-[#505050]" />

                    {/* Bars */}
                    <div className="flex justify-around items-end h-[124px]">
                      {chartData.map((data, index) => {
                        const total = data.warning + data.critical;
                        const cappedTotal = Math.min(total, maxValue);
                        const totalHeight = (cappedTotal / maxValue) * chartHeight;
                        const warningHeight  = total > 0 ? (data.warning  / total) * totalHeight : 0;
                        const criticalHeight = total > 0 ? (data.critical / total) * totalHeight : 0;
                        const hasWarning  = data.warning  > 0;
                        const hasCritical = data.critical > 0;
                        const isWarnSelected = barFilter?.barIndex === index && barFilter.severity === 'Warning';
                        const isCritSelected = barFilter?.barIndex === index && barFilter.severity === 'Critical';
                        const dimmed = barFilter !== null && barFilter.barIndex !== index;
                        return (
                          <div key={index} className={`flex flex-col items-center justify-end transition-opacity duration-150 ${dimmed ? 'opacity-25' : 'opacity-100'}`}>
                            <div className={`flex flex-col ${barW}`}>
                              {hasWarning && (
                                <motion.div
                                  className={`bg-[#de8011] dark:bg-[#ff981e] w-full border ${isWarnSelected ? 'border-[#de8011] dark:border-[#ff981e] ring-2 ring-[#de8011]/50 dark:ring-[#ff981e]/50' : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'} ${hasCritical ? 'rounded-t-[3px]' : 'rounded-[3px]'} origin-bottom cursor-pointer`}
                                  style={{ height: `${warningHeight}px` }}
                                  initial={{ scaleY: 0 }}
                                  animate={{ scaleY: 1 }}
                                  transition={{ duration: 0.25, delay: 0.25 + index * 0.02, ease: 'easeOut' }}
                                  onMouseEnter={() => setHoveredBar({ label: data.fullLabel, type: 'warning',  count: data.warning  })}
                                  onMouseLeave={() => setHoveredBar(null)}
                                  onClick={(e) => { e.stopPropagation(); setBarFilter(prev => prev?.barIndex === index && prev.severity === 'Warning' ? null : { barIndex: index, label: data.fullLabel, severity: 'Warning' }); }}
                                />
                              )}
                              {hasCritical && (
                                <motion.div
                                  className={`bg-[#d63b25] dark:bg-[#e85540] w-full border ${isCritSelected ? 'border-[#d63b25] dark:border-[#e85540] ring-2 ring-[#d63b25]/50 dark:ring-[#e85540]/50' : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'} ${hasWarning ? 'rounded-b-[3px]' : 'rounded-[3px]'} origin-bottom cursor-pointer`}
                                  style={{ height: `${criticalHeight}px` }}
                                  initial={{ scaleY: 0 }}
                                  animate={{ scaleY: 1 }}
                                  transition={{ duration: 0.25, delay: index * 0.02, ease: 'easeOut' }}
                                  onMouseEnter={() => setHoveredBar({ label: data.fullLabel, type: 'critical', count: data.critical })}
                                  onMouseLeave={() => setHoveredBar(null)}
                                  onClick={(e) => { e.stopPropagation(); setBarFilter(prev => prev?.barIndex === index && prev.severity === 'Critical' ? null : { barIndex: index, label: data.fullLabel, severity: 'Critical' }); }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Left axis line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[#b9b9b9] dark:bg-[#505050]" />
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="flex gap-5 mt-2">
                  <div className="w-[30px]" />
                  <div className="flex-1 flex justify-around">
                    {chartData.map((data, index) => (
                      <p key={index} className={`text-[12px] text-[#665f5b] dark:text-[#999] text-center ${barW} leading-tight`}>
                        {data.label}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-[12px] text-[#161513] dark:text-[#e0e0e0] text-center">{caption}</p>
            </div>
          );
        })()}

        {/* Search bar + Issues Table */}
        <div className="flex flex-col gap-2">
          {/* Search bar */}
          <div ref={searchRef} className="relative">
            <div
              className={`flex items-center gap-2 px-3 py-2 border rounded bg-white dark:bg-[#222] cursor-pointer flex-wrap min-h-[38px] transition-colors ${searchOpen ? 'border-[#00688c] dark:border-[#4db8e8] ring-1 ring-[#00688c]/30 dark:ring-[#4db8e8]/30' : 'border-[#d5d5d5] dark:border-[#404040]'}`}
              onClick={(e) => { e.stopPropagation(); setSearchOpen(true); setActiveFilterPanel(null); }}
            >
              <svg className="w-3.5 h-3.5 text-[#999] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {activeChips.map(chip => (
                <span key={chip.key} className="inline-flex items-center gap-1 bg-[rgba(0,104,140,0.08)] dark:bg-[rgba(77,184,232,0.12)] border border-[#00688c] dark:border-[#4db8e8] rounded-full px-2 py-0.5 text-[12px] text-[#00688c] dark:text-[#4db8e8] whitespace-nowrap">
                  {chip.label}
                  <button onClick={(e) => { e.stopPropagation(); chip.clear(); }} className="opacity-60 hover:opacity-100 text-[14px] leading-none">×</button>
                </span>
              ))}
              {activeChips.length === 0 && (
                <span className="text-[13px] text-[#999] dark:text-[#666] select-none">Filter issues...</span>
              )}
              {activeChips.length > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}
                  className="ml-auto text-[12px] text-[#999] hover:text-[#555] dark:hover:text-[#ccc] shrink-0"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Dropdown */}
            {searchOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#2a2a2a] border border-[#d5d5d5] dark:border-[#404040] rounded-md shadow-lg z-50 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {activeFilterPanel === null ? (
                  <>
                    <div className="px-3 pt-2.5 pb-1.5">
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-[#999]">Filter by</span>
                    </div>
                    <div className="border-t border-[#f0f0f0] dark:border-[#333]">
                      {(['Severity', 'Confidence score', 'Type', 'Status', 'Issues', 'Start & end time'] as const).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setActiveFilterPanel(opt)}
                          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-[#161513] dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#333] transition-colors"
                        >
                          <span>{opt}</span>
                          <div className="flex items-center gap-1.5">
                            {isFilterActive(opt) && <span className="w-1.5 h-1.5 rounded-full bg-[#00688c] dark:bg-[#4db8e8]" />}
                            <svg className="w-3 h-3 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Sub-panel header */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-[#f0f0f0] dark:border-[#333]">
                      <button
                        onClick={() => setActiveFilterPanel(null)}
                        className="flex items-center justify-center w-6 h-6 rounded hover:bg-[#f0f0f0] dark:hover:bg-[#444] text-[#555] dark:text-[#aaa]"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="text-[13px] font-medium text-[#161513] dark:text-white">{activeFilterPanel}</span>
                    </div>

                    {/* Severity */}
                    {activeFilterPanel === 'Severity' && (
                      <div className="p-3 flex flex-col gap-0.5">
                        {(['Critical', 'Warning'] as const).map(sev => (
                          <label key={sev} className="flex items-center gap-2.5 px-2 py-1.5 rounded cursor-pointer hover:bg-[#f5f5f5] dark:hover:bg-[#333]">
                            <input
                              type="checkbox"
                              checked={filterSeverity.has(sev)}
                              onChange={() => {
                                const next = new Set(filterSeverity);
                                next.has(sev) ? next.delete(sev) : next.add(sev);
                                setFilterSeverity(next);
                              }}
                              className="w-3.5 h-3.5 accent-[#00688c] cursor-pointer"
                            />
                            <span className="text-[13px] text-[#161513] dark:text-white">{sev}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Confidence score range */}
                    {activeFilterPanel === 'Confidence score' && (
                      <div className="px-5 py-4 max-w-[400px]">
                        <style>{`
                          .conf-range { position:absolute; width:100%; height:20px; pointer-events:none; appearance:none; background:transparent; outline:none; }
                          .conf-range::-webkit-slider-thumb { appearance:none; pointer-events:all; width:14px; height:14px; border-radius:50%; background:transparent; cursor:pointer; }
                          .conf-range::-moz-range-thumb { pointer-events:all; width:14px; height:14px; border-radius:50%; background:transparent; cursor:pointer; border:none; }
                        `}</style>
                        <div className="flex justify-between mb-3">
                          <span className="text-[12px] font-medium text-[#161513] dark:text-white">{filterConfidence[0]}%</span>
                          <span className="text-[12px] font-medium text-[#161513] dark:text-white">{filterConfidence[1]}%</span>
                        </div>
                        <div className="relative h-5 flex items-center">
                          <div className="absolute inset-x-0 h-[3px] rounded bg-[#e0e0e0] dark:bg-[#555]" />
                          <div
                            className="absolute h-[3px] rounded bg-[#00688c] dark:bg-[#4db8e8]"
                            style={{ left: `${filterConfidence[0]}%`, right: `${100 - filterConfidence[1]}%` }}
                          />
                          {/* Min thumb */}
                          <input
                            type="range" min={0} max={99} step={1}
                            value={filterConfidence[0]}
                            onChange={e => setFilterConfidence([Math.min(+e.target.value, filterConfidence[1] - 1), filterConfidence[1]])}
                            className="conf-range"
                            style={{ zIndex: filterConfidence[0] >= filterConfidence[1] - 2 ? 5 : 3 }}
                          />
                          {/* Max thumb */}
                          <input
                            type="range" min={1} max={100} step={1}
                            value={filterConfidence[1]}
                            onChange={e => setFilterConfidence([filterConfidence[0], Math.max(+e.target.value, filterConfidence[0] + 1)])}
                            className="conf-range"
                            style={{ zIndex: 4 }}
                          />
                          {/* Visual thumb knobs */}
                          <div className="absolute w-[14px] h-[14px] rounded-full bg-white dark:bg-[#2a2a2a] border-2 border-[#00688c] dark:border-[#4db8e8] shadow -translate-x-1/2 pointer-events-none" style={{ left: `${filterConfidence[0]}%` }} />
                          <div className="absolute w-[14px] h-[14px] rounded-full bg-white dark:bg-[#2a2a2a] border-2 border-[#00688c] dark:border-[#4db8e8] shadow -translate-x-1/2 pointer-events-none" style={{ left: `${filterConfidence[1]}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Type checkboxes */}
                    {activeFilterPanel === 'Type' && (
                      <div className="p-3 flex flex-col gap-0.5">
                        {(['Physical', 'Likely physical', 'Likely transient', 'Ambiguous'] as const).map(t => (
                          <label key={t} className="flex items-center gap-2.5 px-2 py-1.5 rounded cursor-pointer hover:bg-[#f5f5f5] dark:hover:bg-[#333]">
                            <input
                              type="checkbox"
                              checked={filterTypes.has(t)}
                              onChange={() => {
                                const next = new Set(filterTypes);
                                next.has(t) ? next.delete(t) : next.add(t);
                                setFilterTypes(next);
                              }}
                              className="w-3.5 h-3.5 accent-[#00688c] cursor-pointer"
                            />
                            <span className="text-[13px] text-[#161513] dark:text-white">{t}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Status checkboxes */}
                    {activeFilterPanel === 'Status' && (
                      <div className="p-3 flex flex-col gap-0.5">
                        {(['Resolved', 'Unresolved', 'Unknown'] as const).map(s => (
                          <label key={s} className="flex items-center gap-2.5 px-2 py-1.5 rounded cursor-pointer hover:bg-[#f5f5f5] dark:hover:bg-[#333]">
                            <input
                              type="checkbox"
                              checked={filterStatus.has(s)}
                              onChange={() => {
                                const next = new Set(filterStatus);
                                next.has(s) ? next.delete(s) : next.add(s);
                                setFilterStatus(next);
                              }}
                              className="w-3.5 h-3.5 accent-[#00688c] cursor-pointer"
                            />
                            <span className="text-[13px] text-[#161513] dark:text-white">{s}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Issues free-text */}
                    {activeFilterPanel === 'Issues' && (
                      <div className="p-3">
                        <input
                          type="text"
                          placeholder="Search issue descriptions..."
                          value={filterIssueText}
                          onChange={e => setFilterIssueText(e.target.value)}
                          autoFocus
                          className="w-full px-3 py-2 border border-[#d5d5d5] dark:border-[#404040] rounded text-[13px] text-[#161513] dark:text-white bg-white dark:bg-[#1a1a1a] outline-none focus:border-[#00688c] dark:focus:border-[#4db8e8] placeholder:text-[#999]"
                        />
                      </div>
                    )}

                    {/* Start & end time date-range */}
                    {activeFilterPanel === 'Start & end time' && (
                      <div className="p-3 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[12px] font-medium text-[#665f5b] dark:text-[#999]">From</label>
                          <input
                            type="datetime-local"
                            value={filterTimeFrom}
                            onChange={e => setFilterTimeFrom(e.target.value)}
                            className="w-full px-3 py-2 border border-[#d5d5d5] dark:border-[#404040] rounded text-[12px] text-[#161513] dark:text-white bg-white dark:bg-[#1a1a1a] outline-none focus:border-[#00688c] dark:focus:border-[#4db8e8] cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[12px] font-medium text-[#665f5b] dark:text-[#999]">To</label>
                          <input
                            type="datetime-local"
                            value={filterTimeTo}
                            onChange={e => setFilterTimeTo(e.target.value)}
                            className="w-full px-3 py-2 border border-[#d5d5d5] dark:border-[#404040] rounded text-[12px] text-[#161513] dark:text-white bg-white dark:bg-[#1a1a1a] outline-none focus:border-[#00688c] dark:focus:border-[#4db8e8] cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Issues Table */}
          <div className="border border-[#d5d5d5] dark:border-[#404040] rounded overflow-hidden" onClick={() => setOpenMenuIndex(null)}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f8f8f8] dark:bg-[#2a2a2a]">
                <th
                  onClick={() => handleSort('severity')}
                  className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[10px] text-center font-medium text-[14px] text-black dark:text-white w-[80px] cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#333333]"
                >
                  Severity
                  <SortIcon column="severity" />
                </th>
                <th
                  onClick={() => handleSort('confidenceScore')}
                  className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[10px] text-center font-medium text-[14px] text-black dark:text-white w-[120px] cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#333333]"
                >
                  <span className="relative inline-flex items-center gap-1">
                    Confidence Score
                    <span
                      className="relative inline-flex items-center"
                      onMouseEnter={() => setTooltipVisible(true)}
                      onMouseLeave={() => setTooltipVisible(false)}
                    >
                      <svg className="w-3.5 h-3.5 text-[#666] dark:text-[#999] cursor-default" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                      {tooltipVisible && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 bg-[#222] dark:bg-[#333] text-white text-[12px] rounded px-3 py-2 shadow-lg pointer-events-none">
                          Likeliness of being an issue in the physical network
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#222] dark:border-t-[#333]" />
                        </div>
                      )}
                    </span>
                  </span>
                  <SortIcon column="confidenceScore" />
                </th>
                <th className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[10px] text-left font-medium text-[14px] text-black dark:text-white w-[130px]">
                  Type
                </th>
                <th className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[10px] text-left font-medium text-[14px] text-black dark:text-white w-[100px]">
                  Status
                </th>
                <th className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[10px] text-left font-medium text-[14px] text-black dark:text-white">Issues</th>
                <th
                  onClick={() => handleSort('startTime')}
                  className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[7px] text-left font-medium text-[14px] text-black dark:text-white cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#333333]"
                >
                  Start time
                  <SortIcon column="startTime" />
                </th>
                <th
                  onClick={() => handleSort('endTime')}
                  className="border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[7px] text-left font-medium text-[14px] text-black dark:text-white cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#333333]"
                >
                  End time
                  <SortIcon column="endTime" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredIssuesData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[13px] text-[#999] dark:text-[#666]">
                    No issues match the current filters.
                  </td>
                </tr>
              )}
              {filteredIssuesData.map((issue, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedIssue(prev => prev === issue ? null : issue)}
                  className={`cursor-pointer transition-colors ${selectedIssue === issue ? 'bg-[rgba(0,104,140,0.06)] dark:bg-[rgba(77,184,232,0.08)]' : 'bg-white dark:bg-[#1a1a1a] hover:bg-[rgba(34,126,158,0.05)] dark:hover:bg-[rgba(34,126,158,0.1)]'}`}
                >
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px] text-center">
                    <div className="flex items-center justify-center">
                      <TypeBadge type={issue.type} />
                    </div>
                  </td>
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px] text-center">
                    <ConfidenceScore score={issue.confidenceScore} />
                  </td>
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px]">
                    <IssueTypeBadge type={issue.issueType} />
                  </td>
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px] text-[14px] text-[#161513] dark:text-white">
                    {issue.status}
                  </td>
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[7px]">
                    <span className="text-[14px] text-[#00688c] dark:text-[#4db8e8]">
                      {issue.description}
                    </span>
                  </td>
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px] text-[14px] text-[#161513] dark:text-white">
                    {issue.startTime}
                  </td>
                  <td className="border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] text-[#161513] dark:text-white">
                        {issue.endTime}
                      </span>
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenMenuIndex(openMenuIndex === index ? null : index); }}
                          className="flex items-center justify-center w-7 h-7 rounded hover:bg-[#f0f0f0] dark:hover:bg-[#333] text-[#555] dark:text-[#aaa] text-xl leading-none select-none"
                          title="More actions"
                        >
                          ···
                        </button>
                        {openMenuIndex === index && (
                          <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-[#2a2a2a] border border-[#d7d7d7] dark:border-[#404040] rounded shadow-lg min-w-[130px]">
                            <button
                              onClick={(e) => { e.stopPropagation(); setOpenMenuIndex(null); }}
                              className="w-full text-left px-4 py-2 text-[13px] text-[#161513] dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#333]"
                            >
                              View incident
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setOpenMenuIndex(null); }}
                              className="w-full text-left px-4 py-2 text-[13px] text-[#161513] dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#333]"
                            >
                              View logs
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>

    {/* Issue detail panel — fixed 40vw from the right, above the drawer */}
    {selectedIssue && (
      <>
        {/* Scrim — covers just the drawer area, clicking closes the panel */}
        <div
          className="fixed inset-0 z-[60]"
          onClick={() => setSelectedIssue(null)}
        />
        <div
          className="fixed top-0 right-0 bottom-0 z-[70] bg-white dark:bg-[#1a1a1a] border-l border-[#d8d8d8] dark:border-[#404040] shadow-2xl flex flex-col"
          style={{ width: '40vw', animation: 'detailSlideIn 0.25s ease-out' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#d8d8d8] dark:border-[#404040] shrink-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TypeBadge type={selectedIssue.type} />
              </div>
              <h3 className="font-semibold text-[16px] text-[#161513] dark:text-white leading-snug">
                {selectedIssue.description}
              </h3>
            </div>
            <button
              onClick={() => setSelectedIssue(null)}
              className="shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center rounded hover:bg-[#f0f0f0] dark:hover:bg-[#333] text-[#555] dark:text-[#aaa]"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Metadata */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999] mb-4">Issue details</p>
            <dl className="flex flex-col divide-y divide-[#f0f0f0] dark:divide-[#2e2e2e]">
              {[
                { label: 'Confidence Score', value: <span className={`text-[14px] tabular-nums ${selectedIssue.confidenceScore > 80 ? 'font-bold' : selectedIssue.confidenceScore > 60 ? 'font-semibold' : 'font-normal'} text-[#161513] dark:text-white`}>{selectedIssue.confidenceScore}%</span> },
                { label: 'Type',             value: <IssueTypeBadge type={selectedIssue.issueType} /> },
                { label: 'Status',           value: <span className="text-[14px] text-[#161513] dark:text-white">{selectedIssue.status}</span> },
                { label: 'Start time',       value: <span className="text-[14px] text-[#161513] dark:text-white">{selectedIssue.startTime}</span> },
                { label: 'End time',         value: <span className="text-[14px] text-[#161513] dark:text-white">{selectedIssue.endTime}</span> },
                { label: 'First seen',       value: <span className="text-[14px] text-[#161513] dark:text-white">{selectedIssue.firstSeenTime}</span> },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-[13px] text-[#665f5b] dark:text-[#999] shrink-0">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>

            {/* 2×2 cards */}
            {(() => {
              const hashCode = (str: string) => {
                let h = 0;
                for (let i = 0; i < str.length; i++) { h = Math.imul(31, h) + str.charCodeAt(i) | 0; }
                return Math.abs(h);
              };
              const seed = hashCode(selectedIssue.description);
              const sr = (i: number) => { const x = Math.sin(seed + i * 7919) * 10000; return x - Math.floor(x); };

              const latency    = (sr(0) * 180 + 5).toFixed(1);
              const throughput = sr(1) > 0.5
                ? `${(sr(1) * 9 + 1).toFixed(1)} Gbps`
                : `${(sr(1) * 900 + 100).toFixed(0)} Mbps`;
              const packetLoss = (sr(2) * 5).toFixed(2);
              const errorRate  = (sr(3) * 3).toFixed(2);

              const spikeSecs = Math.floor(sr(4) * 115) + 5;
              const observations = [
                `Latency spike for ${spikeSecs} seconds`,
                'Sudden packet drop burst',
                'CPU/network utilization spike',
                'Traffic surge causing temporary queuing',
                'Link up/down repeatedly',
                'Error rate oscillates every few minutes',
                'Latency alternates between normal and high',
                'Traffic rerouting back and forth',
              ];
              const observation = observations[Math.floor(sr(5) * observations.length)];

              const affectedPorts = Math.floor(sr(6) * 8) + 1;
              const affectedHosts = Math.floor(sr(7) * 24) + 1;
              const disruptions   = ['Low', 'Medium', 'High'];
              const disruption    = disruptions[Math.floor(sr(8) * 3)];
              const impacts       = ['None', 'Degraded', 'Down'];
              const impact        = impacts[Math.floor(sr(9) * 3)];

              const signalLevels = ['-8.2', '-11.4', '-14.1', '-6.9', '-18.3'];
              const signal       = signalLevels[Math.floor(sr(10) * signalLevels.length)];
              const linkSpeeds   = ['1 Gbps', '10 Gbps', '25 Gbps', '100 Gbps'];
              const linkSpeed    = linkSpeeds[Math.floor(sr(11) * linkSpeeds.length)];
              const protocols    = ['BGP', 'OSPF', 'IS-IS', 'LACP', 'STP'];
              const protocol     = protocols[Math.floor(sr(12) * protocols.length)];
              const protoStates  = ['UP', 'DOWN', 'FLAPPING'];
              const protoState   = protoStates[Math.floor(sr(13) * 3)];
              const protoColor   = protoState === 'UP' ? 'text-[#508223] dark:text-[#7bb434]' : protoState === 'DOWN' ? 'text-[#d63b25] dark:text-[#e85540]' : 'text-[#de8011] dark:text-[#ff981e]';

              const actions = [
                'Inspect and reseat SFP transceiver. Check DOM thresholds and replace if outside spec.',
                'Review LACP port-channel member states. Re-enable error-disabled ports after root cause is identified.',
                'Trace fiber path with OTDR. Schedule physical inspection and cable replacement.',
                'Collect syslog and CPU traces. Open TAC case if hardware fault flag persists.',
                'Verify BGP keepalive timers and peer reachability. Check for route policy misconfigurations.',
                'Audit ARP table for flooding sources. Apply rate limiting on the affected VLAN.',
                'Review buffer utilization and QoS policy. Adjust scheduling weights for lossless traffic.',
              ];
              const action = actions[Math.floor(sr(14) * actions.length)];

              const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
                <div className="border border-[#e8e8e8] dark:border-[#2e2e2e] rounded-lg p-4 flex flex-col gap-3 bg-[#fafafa] dark:bg-[#222]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">{title}</p>
                  {children}
                </div>
              );

              const MetricRow = ({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) => (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] text-[#665f5b] dark:text-[#999]">{label}</span>
                  <span className={`text-[13px] font-medium tabular-nums text-[#161513] dark:text-white ${valueClass ?? ''}`}>{value}</span>
                </div>
              );

              // Location data for Physical issues
              const isPhysical = selectedIssue.issueType === 'Physical';
              const rackNames    = ['R01', 'R04', 'R07', 'R11', 'R14', 'R19', 'R23', 'R28'];
              const deviceNames  = ['sw-tor-01', 'sw-tor-02', 'sw-fab-01', 'sw-fab-02', 'sw-edge-01', 'rtr-core-01'];
              const portNames    = ['Eth1/1', 'Eth1/4', 'Eth2/1', 'Te0/0/1', 'Hu0/0/4', 'Gi1/0/24', 'Eth1/48'];
              const numLocations = Math.floor(sr(15) * 3) + 1;
              const locations = Array.from({ length: numLocations }, (_, i) => ({
                rack:   rackNames[Math.floor(sr(16 + i * 3)     * rackNames.length)],
                device: deviceNames[Math.floor(sr(17 + i * 3)   * deviceNames.length)],
                port:   portNames[Math.floor(sr(18 + i * 3)     * portNames.length)],
              }));

              return (
                <div className="flex flex-col gap-3 mt-5">
                  {/* Recommended Action — full width */}
                  <Card title="Recommended Action">
                    <p className="text-[12px] text-[#161513] dark:text-[#e0e0e0] leading-relaxed">{action}</p>
                  </Card>

                  {/* 2×2 grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <Card title="Behavior">
                      <MetricRow label="Latency"      value={`${latency} ms`} />
                      <MetricRow label="Throughput"   value={throughput} />
                      <MetricRow label="Packet Loss"  value={`${packetLoss}%`} />
                      <MetricRow label="Error Rate"   value={`${errorRate}%`} />
                      <div className="pt-1 border-t border-[#e8e8e8] dark:border-[#2e2e2e]">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999] mb-1.5">Observations</p>
                        <p className="text-[12px] text-[#161513] dark:text-[#e0e0e0] leading-snug">{observation}</p>
                      </div>
                      <button
                        onClick={() => setShowBehaviorGraph(v => !v)}
                        className="text-[12px] text-[#00688c] dark:text-[#4db8e8] hover:underline text-left mt-1"
                      >
                        {showBehaviorGraph ? 'Hide graph' : 'Show graph'}
                      </button>
                      {showBehaviorGraph && (
                        <BehaviorGraph description={selectedIssue.description} observation={observation} />
                      )}
                    </Card>

                    <Card title="Impact">
                      <MetricRow label="Affected Ports" value={String(affectedPorts)} />
                      <MetricRow label="Affected Hosts" value={String(affectedHosts)} />
                      <MetricRow
                        label="Traffic Disruption"
                        value={disruption}
                        valueClass={disruption === 'High' ? 'text-[#d63b25] dark:text-[#e85540]' : disruption === 'Medium' ? 'text-[#de8011] dark:text-[#ff981e]' : 'text-[#508223] dark:text-[#7bb434]'}
                      />
                      <MetricRow
                        label="Service Impact"
                        value={impact}
                        valueClass={impact === 'Down' ? 'text-[#d63b25] dark:text-[#e85540]' : impact === 'Degraded' ? 'text-[#de8011] dark:text-[#ff981e]' : 'text-[#665f5b] dark:text-[#999]'}
                      />
                    </Card>

                    <Card title="Diagnostics">
                      <MetricRow label="Signal Level" value={`${signal} dBm`} />
                      <MetricRow label="Link Speed"   value={linkSpeed} />
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] text-[#665f5b] dark:text-[#999]">Protocol</span>
                        <span className="text-[13px] font-medium text-[#161513] dark:text-white">{protocol}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] text-[#665f5b] dark:text-[#999]">State</span>
                        <span className={`text-[13px] font-semibold ${protoColor}`}>{protoState}</span>
                      </div>
                    </Card>

                    {/* Location card — Physical issues only */}
                    {isPhysical ? (
                      <Card title="Location">
                        <div className="flex flex-col gap-2">
                          {locations.map((loc, i) => (
                            <div key={i} className={`flex flex-col gap-1 ${i > 0 ? 'pt-2 border-t border-[#e8e8e8] dark:border-[#2e2e2e]' : ''}`}>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[12px] text-[#665f5b] dark:text-[#999]">Rack</span>
                                <span className="text-[13px] font-medium font-mono text-[#161513] dark:text-white">{loc.rack}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[12px] text-[#665f5b] dark:text-[#999]">Device</span>
                                <span className="text-[13px] font-medium font-mono text-[#161513] dark:text-white">{loc.device}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[12px] text-[#665f5b] dark:text-[#999]">Port</span>
                                <span className="text-[13px] font-medium font-mono text-[#161513] dark:text-white">{loc.port}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowLocationMap(v => !v)}
                          className="text-[12px] text-[#00688c] dark:text-[#4db8e8] hover:underline text-left mt-1"
                        >
                          {showLocationMap ? 'Hide location' : 'Show location'}
                        </button>
                      </Card>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Floor plan — full width, shown on demand */}
                  {isPhysical && showLocationMap && (
                    <Card title="Data Center Floor Plan">
                      <DCFloorMap locations={locations} severity={selectedIssue.type} />
                    </Card>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
        <style>{`
          @keyframes detailSlideIn {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
        `}</style>
      </>
    )}
    </>
  );
}

function BehaviorGraph({ description, observation }: { description: string; observation: string }) {
  const N = 52;
  const W = 280, H = 90;
  const CL = 30, CR = 272, CT = 6, CB = 66;
  const CW = CR - CL, CH = CB - CT;

  const hc = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0; return Math.abs(h); };
  const seed = hc(description);
  const sr = (i: number) => { const x = Math.sin(seed + i * 7919) * 10000; return x - Math.floor(x); };
  const nx = (i: number, a: number) => (sr(i + 600) - 0.5) * 2 * a;

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  const aC = isDark ? '#3a3a3a' : '#e0e0e0';
  const lC = isDark ? '#666'    : '#bbb';
  const gC = isDark ? '#262626' : '#f3f3f3';

  const toY = (v: number, lo: number, hi: number) =>
    CT + Math.max(0, Math.min(1, (hi - v) / (hi - lo))) * CH;
  const toX = (i: number) => CL + (i / (N - 1)) * CW;

  const linePath = (data: number[], lo: number, hi: number) =>
    data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v, lo, hi).toFixed(1)}`).join(' ');

  const stepPath = (data: number[], lo: number, hi: number) => {
    let d = `M ${toX(0).toFixed(1)} ${toY(data[0], lo, hi).toFixed(1)}`;
    for (let i = 1; i < data.length; i++)
      d += ` H ${toX(i).toFixed(1)} V ${toY(data[i], lo, hi).toFixed(1)}`;
    return d;
  };

  const areaStr = (p: string) => `${p} L ${CR} ${CB} L ${CL} ${CB} Z`;

  const chartWrap = (
    seriesEl: React.ReactNode,
    metricLabel: string,
    ticks: number[],
    lo: number,
    hi: number,
    unit: string,
    stepLabels?: [string, string]
  ) => (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-2" style={{ display: 'block' }}>
      {ticks.filter(t => t > lo).map(t => (
        <line key={t} x1={CL} y1={toY(t, lo, hi)} x2={CR} y2={toY(t, lo, hi)} stroke={gC} strokeWidth="0.75" />
      ))}
      {ticks.map(t => (
        <text key={t} x={CL - 2} y={toY(t, lo, hi) + 2} textAnchor="end" fontSize="5" fill={lC}>
          {stepLabels ? (t === hi ? stepLabels[1] : stepLabels[0]) : `${t}${unit}`}
        </text>
      ))}
      <line x1={CL} y1={CT} x2={CL} y2={CB} stroke={aC} strokeWidth="0.75" />
      <line x1={CL} y1={CB} x2={CR} y2={CB} stroke={aC} strokeWidth="0.75" />
      {seriesEl}
      <text x={CL + 2} y={H - 2} fontSize="5" fill={lC}>{metricLabel}</text>
      <text x={CR} y={H - 2} textAnchor="end" fontSize="5" fill={lC}>Time →</text>
    </svg>
  );

  const single = (data: number[], lo: number, hi: number, color: string, isStep = false) => {
    const p = isStep ? stepPath(data, lo, hi) : linePath(data, lo, hi);
    return (
      <>
        <path d={areaStr(p)} fill={color} opacity="0.14" />
        <path d={p} fill="none" stroke={color} strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round" />
      </>
    );
  };

  const dual = (d1: number[], d2: number[], lo: number, hi: number, c1: string, c2: string, l1: string, l2: string) => (
    <>
      <path d={areaStr(linePath(d1, lo, hi))} fill={c1} opacity="0.1" />
      <path d={linePath(d1, lo, hi)} fill="none" stroke={c1} strokeWidth="1.25" strokeLinejoin="round" />
      <path d={areaStr(linePath(d2, lo, hi))} fill={c2} opacity="0.1" />
      <path d={linePath(d2, lo, hi)} fill="none" stroke={c2} strokeWidth="1.25" strokeLinejoin="round" />
      <line x1={CR - 76} y1={CT + 4} x2={CR - 68} y2={CT + 4} stroke={c1} strokeWidth="1.5" />
      <text x={CR - 66} y={CT + 7} fontSize="5" fill={lC}>{l1}</text>
      <line x1={CR - 38} y1={CT + 4} x2={CR - 30} y2={CT + 4} stroke={c2} strokeWidth="1.5" />
      <text x={CR - 28} y={CT + 7} fontSize="5" fill={lC}>{l2}</text>
    </>
  );

  const obs = observation;

  if (obs.startsWith('Latency spike')) {
    const data = Array.from({ length: N }, (_, i) => {
      const base = 18 + nx(i, 3);
      if (i >= 26 && i <= 38)
        return Math.max(base, base + 195 * Math.sin(((i - 26) / 12) * Math.PI) + nx(i + 100, 18));
      return Math.max(8, base);
    });
    return chartWrap(single(data, 0, 220, '#00688c'), 'Latency (ms)', [0, 50, 100, 150, 200], 0, 220, 'ms');
  }

  if (obs === 'Sudden packet drop burst') {
    const data = Array.from({ length: N }, (_, i) =>
      (i >= 21 && i <= 29) ? Math.min(100, 58 + nx(i + 100, 24)) : Math.max(0, nx(i, 0.8))
    );
    return chartWrap(single(data, 0, 100, '#d63b25'), 'Packet Loss (%)', [0, 25, 50, 75, 100], 0, 100, '%');
  }

  if (obs === 'CPU/network utilization spike') {
    const data = Array.from({ length: N }, (_, i) => {
      const base = 32 + nx(i, 6);
      if (i >= 22 && i <= 35)
        return Math.min(100, base + 63 * Math.sin(((i - 22) / 13) * Math.PI) + nx(i + 100, 5));
      return Math.max(15, base);
    });
    return chartWrap(single(data, 0, 100, '#de8011'), 'Utilization (%)', [0, 25, 50, 75, 100], 0, 100, '%');
  }

  if (obs === 'Traffic surge causing temporary queuing') {
    const traffic = Array.from({ length: N }, (_, i) => {
      const base = 35 + nx(i, 5);
      return (i >= 18 && i <= 38) ? Math.min(100, base + 52 * Math.sin(((i - 18) / 20) * Math.PI)) : Math.max(18, base);
    });
    const queue = Array.from({ length: N }, (_, i) =>
      i < 18 ? Math.max(0, nx(i + 200, 1.5))
      : i <= 42 ? Math.min(100, (i - 18) * 3.2 + nx(i + 200, 5))
      : Math.max(0, 76 - (i - 42) * 9 + nx(i + 200, 4))
    );
    return chartWrap(
      dual(traffic, queue, 0, 100, '#00688c', '#de8011', 'Link Util', 'Queue'),
      'Traffic & Queue Depth', [0, 25, 50, 75, 100], 0, 100, '%'
    );
  }

  if (obs === 'Link up/down repeatedly') {
    const numTrans = 5 + Math.floor(sr(700) * 3);
    const transPts = Array.from({ length: numTrans }, (_, i) =>
      Math.floor(3 + (i / numTrans) * (N - 8) + sr(701 + i) * 5)
    ).sort((a, b) => a - b);
    let st = 1;
    const data = Array.from({ length: N }, (_, i) => {
      if (transPts.includes(i)) st = st === 1 ? 0 : 1;
      return st;
    });
    return chartWrap(single(data, 0, 1, '#508223', true), 'Link State', [0, 1], 0, 1, '', ['DOWN', 'UP']);
  }

  if (obs === 'Error rate oscillates every few minutes') {
    const data = Array.from({ length: N }, (_, i) =>
      Math.max(0, (Math.sin((i / N) * Math.PI * 7) * 0.5 + 0.5) * (8 + nx(i, 2)) + nx(i + 300, 0.4))
    );
    return chartWrap(single(data, 0, 12, '#d63b25'), 'Error Rate (%)', [0, 3, 6, 9, 12], 0, 12, '%');
  }

  if (obs === 'Latency alternates between normal and high') {
    const data = Array.from({ length: N }, (_, i) =>
      Math.max(8, Math.floor(i / 10) % 2 === 0 ? 20 + nx(i, 3) : 130 + nx(i, 14))
    );
    return chartWrap(single(data, 0, 160, '#00688c'), 'Latency (ms)', [0, 40, 80, 120, 160], 0, 160, 'ms');
  }

  // Traffic rerouting back and forth
  const pathA = Array.from({ length: N }, (_, i) =>
    Math.max(10, Math.floor(i / 14) % 2 === 0 ? 65 + nx(i, 8) : 28 + nx(i, 6))
  );
  const pathB = pathA.map((v, i) => Math.max(10, Math.min(92, 95 - v + nx(i + 400, 6))));
  return chartWrap(
    dual(pathA, pathB, 0, 100, '#00688c', '#de8011', 'Path A', 'Path B'),
    'Traffic Split (%)', [0, 25, 50, 75, 100], 0, 100, '%'
  );
}

function DCFloorMap({
  locations,
  severity,
}: {
  locations: { rack: string; device: string; port: string }[];
  severity: 'Critical' | 'Warning';
}) {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  const affectedSet = new Set(locations.map(l => l.rack));

  // 28 racks in a 4×7 grid
  const RACKS_PER_ROW = 7;
  const TOTAL_RACKS = 28;
  const RW = 24, RH = 14, GX = 3, X0 = 5;
  // y-top of each row; 12px aisle gap between rows
  const ROW_Y = [6, 32, 58, 84];

  const affStroke  = severity === 'Critical' ? '#d63b25' : '#de8011';
  const affFill    = severity === 'Critical'
    ? (isDark ? 'rgba(214,59,37,0.22)' : 'rgba(214,59,37,0.1)')
    : (isDark ? 'rgba(222,128,17,0.22)' : 'rgba(222,128,17,0.1)');
  const affText    = severity === 'Critical'
    ? (isDark ? '#e85540' : '#d63b25')
    : (isDark ? '#ff981e' : '#ac630c');
  const naffStroke = isDark ? '#3c3c3c' : '#d8d8d8';
  const naffFill   = isDark ? 'rgba(255,255,255,0.03)' : '#f2f2f2';
  const naffText   = isDark ? '#4a4a4a' : '#c0c0c0';
  const floorBg    = isDark ? '#1a1a1a' : '#fafafa';
  const floorBord  = isDark ? '#2e2e2e' : '#e0e0e0';
  const aisleBg    = isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)';
  const aisleText  = isDark ? '#3a3a3a' : '#d8d8d8';
  const legendTxt  = isDark ? '#666' : '#999';

  // Aisle bands sit in the 30px gap between rows: row[i] bottom = ROW_Y[i]+RH, row[i+1] top = ROW_Y[i+1]
  const aisles = [
    { y: ROW_Y[0] + RH, h: ROW_Y[1] - (ROW_Y[0] + RH), label: 'HOT AISLE' },
    { y: ROW_Y[1] + RH, h: ROW_Y[2] - (ROW_Y[1] + RH), label: 'COLD AISLE' },
    { y: ROW_Y[2] + RH, h: ROW_Y[3] - (ROW_Y[2] + RH), label: 'HOT AISLE' },
  ];

  // viewBox: width = X0 + 7*(RW+GX) - GX + X0 = 7+7*40-4+7 = 290; height = last row bottom + bottom pad + legend
  const VW = X0 + RACKS_PER_ROW * (RW + GX) - GX + X0; // 290
  const VH = ROW_Y[3] + RH + 8 + 14; // 162

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ display: 'block' }}>
      {/* Floor background */}
      <rect x="1" y="1" width={VW - 2} height={ROW_Y[3] + RH + 6} rx="4" fill={floorBg} stroke={floorBord} strokeWidth="1" />

      {/* Aisle bands */}
      {aisles.map(({ y, h, label }) => (
        <g key={y}>
          <rect x="1" y={y} width={VW - 2} height={h} fill={aisleBg} />
          <text x={VW / 2} y={y + h / 2 + 2} textAnchor="middle" fontSize="4" fill={aisleText} fontWeight="700" letterSpacing="0.8">
            {label}
          </text>
        </g>
      ))}

      {/* Racks */}
      {Array.from({ length: TOTAL_RACKS }, (_, idx) => {
        const rack = `R${String(idx + 1).padStart(2, '0')}`;
        const row  = Math.floor(idx / RACKS_PER_ROW);
        const col  = idx % RACKS_PER_ROW;
        const x    = X0 + col * (RW + GX);
        const y    = ROW_Y[row];
        const aff  = affectedSet.has(rack);
        return (
          <g key={rack}>
            <rect
              x={x} y={y} width={RW} height={RH} rx="2"
              fill={aff ? affFill : naffFill}
              stroke={aff ? affStroke : naffStroke}
              strokeWidth={aff ? 1.25 : 0.75}
            />
            <text
              x={x + RW / 2} y={y + RH / 2 + 1.8}
              textAnchor="middle" fontSize="4.5"
              fill={aff ? affText : naffText}
              fontWeight={aff ? '700' : '400'}
            >
              {rack}
            </text>
            {/* Affected indicator dot */}
            {aff && <circle cx={x + RW - 3} cy={y + 3} r="1.5" fill={affStroke} />}
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(5, ${ROW_Y[3] + RH + 7})`}>
        <circle cx="2.5" cy="0" r="2" fill={affStroke} />
        <text x="6.5" y="2.5" fontSize="5" fill={legendTxt}>Affected</text>
        <rect x="40" y="-3.5" width="6" height="4.5" rx="1" fill={naffFill} stroke={naffStroke} strokeWidth="0.6" />
        <text x="49" y="2.5" fontSize="5" fill={legendTxt}>Unaffected</text>
      </g>
    </svg>
  );
}

interface IssueRow {
  type: 'Critical' | 'Warning';
  issueType: IssueTypeValue;
  status: 'Resolved' | 'Unresolved' | 'Unknown';
  confidenceScore: number;
  description: string;
  barIndex: number;
  startTime: string;
  endTime: string;
  firstSeenTime: string;
  startEpoch: number;
  endEpoch: number;
}

type TypeBadgeProps = {
  type: 'Critical' | 'Warning';
};

function TypeBadge({ type }: TypeBadgeProps) {
  const isCritical = type === 'Critical';
  
  return (
    <div className={`${isCritical ? 'bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)]' : 'bg-[rgba(222,128,17,0.2)] dark:bg-[rgba(222,128,17,0.15)]'} content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0`}>
      <div aria-hidden="true" className={`absolute border ${isCritical ? 'border-[#d63b25] dark:border-[#d63b25]' : 'border-[#ac630c] dark:border-[#de8011]'} border-solid inset-0 pointer-events-none rounded-[3px]`} />
      <p className={`font-normal leading-[normal] not-italic relative shrink-0 ${isCritical ? 'text-[#d63b25] dark:text-[#e85540]' : 'text-[#ac630c] dark:text-[#ff981e]'} text-[12px] whitespace-nowrap`}>
        {type}
      </p>
    </div>
  );
}

function ConfidenceScore({ score }: { score: number }) {
  const weight = score > 80 ? 'font-bold' : score > 60 ? 'font-semibold' : 'font-normal';
  return (
    <span className={`text-[13px] tabular-nums text-[#161513] dark:text-white ${weight}`}>
      {score}%
    </span>
  );
}

type IssueTypeValue = 'Likely physical' | 'Likely transient' | 'Ambiguous' | 'Physical';

function IssueTypeBadge({ type }: { type: IssueTypeValue }) {
  const isRed = type === 'Physical' || type === 'Likely physical';
  const bg     = isRed ? 'bg-[rgba(214,59,37,0.1)]'   : 'bg-[rgba(100,116,139,0.1)]';
  const border = isRed ? 'border-[#d63b25]'            : 'border-[#64748b]';
  const text   = isRed ? 'text-[#d63b25] dark:text-[#e85540]' : 'text-[#64748b] dark:text-[#94a3b8]';
  return (
    <div className={`inline-flex items-center ${bg} border ${border} rounded px-[6px] py-[3px]`}>
      <span className={`text-[12px] font-normal whitespace-nowrap ${text}`}>{type}</span>
    </div>
  );
}

type StatusBadgeProps = {
  status: 'Healthy' | 'Warning' | 'Critical';
};

function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Healthy: {
      bg: 'bg-[rgba(80,130,35,0.2)] dark:bg-[rgba(80,130,35,0.15)]',
      border: 'border-[#508223] dark:border-[#6b9e2f]',
      text: 'text-[#508223] dark:text-[#7bb434]'
    },
    Warning: {
      bg: 'bg-[rgba(222,128,17,0.2)] dark:bg-[rgba(222,128,17,0.15)]',
      border: 'border-[#ac630c] dark:border-[#de8011]',
      text: 'text-[#ac630c] dark:text-[#ff981e]'
    },
    Critical: {
      bg: 'bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)]',
      border: 'border-[#d63b25] dark:border-[#d63b25]',
      text: 'text-[#d63b25] dark:text-[#e85540]'
    }
  };

  const style = styles[status];

  return (
    <div className={`${style.bg} content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0`}>
      <div aria-hidden="true" className={`absolute border ${style.border} border-solid inset-0 pointer-events-none rounded-[3px]`} />
      <p className={`font-normal leading-[normal] not-italic relative shrink-0 ${style.text} text-[12px] whitespace-nowrap`}>
        {status}
      </p>
    </div>
  );
}