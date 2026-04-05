import svgPaths from "../../imports/svg-issues-chart-icons";
import { useState } from "react";
import { motion } from "motion/react";

interface IssuesChartProps {
  component: string;
  metric: string;
  category: string;
}

export function IssuesChart({ component, metric, category }: IssuesChartProps) {
  const [hoveredBar, setHoveredBar] = useState<{ label: string; type: 'warning' | 'critical'; count: number } | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: 'type' | 'startTime' | 'endTime' | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // Generate random but consistent data based on component + category + metric combination
  const generateChartData = () => {
    const buildings = ['JFP', 'FFP', 'TFP', 'JFA', 'JFS', 'JFT', 'CFR'];
    
    // Create a simple hash from the combination to seed random values
    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    
    // Use component + category + metric as seed
    const seed = hashCode(`${component}-${category}-${metric}`);
    
    // Simple seeded random number generator
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index * 12345) * 10000;
      return x - Math.floor(x);
    };
    
    return buildings.map((building, index) => {
      // Generate random critical (0-25) and warning (0-20) counts
      const critical = Math.floor(seededRandom(index * 2) * 26);
      const warning = Math.floor(seededRandom(index * 2 + 1) * 21);
      
      return {
        label: building,
        critical,
        warning
      };
    });
  };

  const chartData = generateChartData();

  const maxValue = 30;
  const chartHeight = 124;

  // Default to the first bar with critical issues
  const defaultInsight = chartData.find(d => d.critical > 0) || chartData[0];
  const displayInsight = hoveredBar || { label: defaultInsight.label, type: 'critical' as const, count: defaultInsight.critical };

  // Generate dynamic issues data based on component and metric
  const generateIssuesData = () => {
    const buildings = ['JFP', 'FFP', 'TFP', 'JFA', 'JFS', 'JFT', 'CFR', 'TFA', 'TFR', 'JFR'];
    const locations = ['DXB/AD2/AD11', 'DXB/AD2/AD21', 'DXB/AD2/AD31', 'DXB/AD2/AD33', 'DXB/AD2/AC21', 'DXB/AD2/AD15', 'DXB/AD2/AD25', 'DXB/AD2/AD35', 'DXB/AD2/AD45', 'DXB/AD2/AC31'];
    
    // Generate different descriptions based on component and metric
    const getDescription = (buildingIndex: number) => {
      const building = buildings[buildingIndex];
      const metricLower = metric.toLowerCase();
      
      if (category === 'CFAB') {
        if (metric === 'Availability') {
          const descriptions = [
            `Optical signal degradation detected on ${component} uplinks in ${building} - Tx power below threshold`,
            `${component} link flapping between spine switches in ${building} - 47 state changes in 2 hours`,
            `Transceiver failure on ${component} port in ${building} - DDM alerts showing high temperature`,
            `Multiple ${component} interfaces down in ${building} due to fiber connector issues`,
            `${component} redundancy compromised in ${building} - primary path unavailable`,
            `${component} spine-leaf connectivity lost in ${building} - BGP session down`,
            `Optical transceiver DOM warnings in ${building} - ${component} power levels degraded`,
            `${component} uplink port error-disabled in ${building} - excessive CRC errors detected`,
            `Fabric module failure detected on ${component} in ${building} - forwarding capacity reduced`,
            `Link aggregation failure in ${building} - LACP negotiation timeout`
          ];
          return descriptions[buildingIndex];
        } else if (metric === 'Performance') {
          const descriptions = [
            `${component} fabric experiencing high CRC error rate in ${building} - 0.3% packet corruption`,
            `Excessive packet loss on ${component} cluster links in ${building} - drops exceed 2% threshold`,
            `${component} congestion detected in ${building} - buffer utilization at 89%`,
            `High latency on ${component} inter-switch links in ${building} - 15ms average (normal: 2ms)`,
            `${component} ECMP path imbalance in ${building} - single link carrying 78% of traffic`,
            `${component} queue depth saturation in ${building} - packet drops during bursts`,
            `Abnormal ${component} jitter detected in ${building} - variance exceeding 5ms`,
            `${component} forwarding plane oversubscription in ${building} - 4:1 ratio exceeded`,
            `PFC storms detected on ${component} in ${building} - lossless traffic impacted`,
            `${component} flow control enabled on multiple ports in ${building} - congestion spreading`
          ];
          return descriptions[buildingIndex];
        } else {
          const descriptions = [
            `${component} port errors increasing in ${building} - alignment and FCS errors detected`,
            `${component} switch memory utilization critical in ${building} - 94% capacity`,
            `Abnormal ${component} control plane CPU usage in ${building} - sustained at 85%`,
            `${component} spanning tree topology change in ${building} - multiple TCN BPDUs received`,
            `${component} MAC address table overflow in ${building} - learning disabled on ports`,
            `${component} environmental sensors warning in ${building} - airflow restricted`,
            `Firmware bug detected on ${component} switches in ${building} - vendor advisory issued`,
            `${component} ASIC parity errors in ${building} - potential hardware failure`,
            `Packet buffer memory leak on ${component} in ${building} - restart recommended`,
            `${component} multicast routing table corruption in ${building} - protocol reset required`
          ];
          return descriptions[buildingIndex];
        }
      } else if (category === 'JFAB') {
        if (metric === 'Availability') {
          const descriptions = [
            `${component} inter-building fiber path down between ${building} and IAD12 - possible fiber cut`,
            `BGP adjacency failure on ${component} metro links at ${building} - peering session timeout`,
            `${component} cross-connect failure in ${building} meet-me room - carrier escalation required`,
            `Redundant ${component} path unavailable for ${building} - single point of failure condition`,
            `${component} dark fiber link loss between ${building} and adjacent DC - optical power -28dBm`,
            `WAN circuit outage affecting ${component} at ${building} - carrier ticket opened`,
            `${component} DWDM channel failure in ${building} - wavelength de-provisioned`,
            `Metro ring protection switch triggered for ${component} at ${building} - backup path active`,
            `${component} border router failure in ${building} - redundancy compromised`,
            `Optical amplifier failure on ${component} span to ${building} - signal loss detected`
          ];
          return descriptions[buildingIndex];
        } else if (metric === 'Performance') {
          const descriptions = [
            `${component} metro ring experiencing intermittent packet loss at ${building} - 1.2% drops`,
            `Route flapping detected on ${component} at ${building} - BGP routes withdrawn 23 times`,
            `${component} WAN circuit saturation at ${building} - sustained 95% utilization for 3 hours`,
            `Asymmetric routing detected on ${component} paths from ${building} - 45ms latency variance`,
            `${component} QoS policy violation in ${building} - priority traffic being dropped`,
            `Inter-DC replication delays on ${component} from ${building} - 200ms RTT measured`,
            `${component} path MTU issues detected at ${building} - fragmentation occurring`,
            `Chromatic dispersion exceeding limits on ${component} to ${building} - BER degradation`,
            `${component} traffic engineering failure in ${building} - suboptimal paths selected`,
            `BGP dampening triggered on ${component} routes from ${building} - stability issues`
          ];
          return descriptions[buildingIndex];
        } else {
          const descriptions = [
            `${component} route instability at ${building} - prefix churn affecting 145 routes`,
            `${component} MPLS label allocation exhaustion in ${building} - path setup failures`,
            `Unusual ${component} traffic patterns at ${building} - potential DDoS or security incident`,
            `${component} protocol errors at ${building} - malformed OSPF LSAs detected`,
            `${component} tunnel establishment failures from ${building} - IPsec negotiation timeouts`,
            `Route dampening penalties accumulating on ${component} at ${building} - suppression risk`,
            `${component} AS path prepending misconfiguration in ${building} - traffic imbalance`,
            `${component} BFD session failures on ${component} links at ${building} - fast failover not working`,
            `${component} routing policy conflict detected in ${building} - unexpected behavior`,
            `MPLS TE tunnel bandwidth reservation failures for ${component} at ${building}`
          ];
          return descriptions[buildingIndex];
        }
      } else if (category === 'FFAB') {
        if (metric === 'Availability') {
          const descriptions = [
            `${component} load balancer health checks failing in ${building} - 3 of 8 backend servers unreachable`,
            `${component} frontend port exhaustion in ${building} - NAT pool depleted`,
            `Multiple ${component} ToR uplinks down in ${building} - redundancy degraded to single path`,
            `${component} VLAN configuration mismatch detected in ${building} - trunking errors`,
            `${component} server-facing interfaces flapping in ${building} - NIC driver issues suspected`,
            `${component} virtual chassis split-brain in ${building} - duplicate IPs detected`,
            `Firewall insertion failures on ${component} path in ${building} - traffic bypassing security`,
            `${component} overlay network partition in ${building} - VXLAN tunnel failures`,
            `Service chain breakage on ${component} in ${building} - NFV components unreachable`,
            `${component} anycast gateway failure in ${building} - default route unavailable`
          ];
          return descriptions[buildingIndex];
        } else if (metric === 'Performance') {
          const descriptions = [
            `${component} experiencing microburst traffic in ${building} - 10Gbps spikes causing drops`,
            `High packet reordering on ${component} paths in ${building} - TCP retransmissions elevated`,
            `${component} queue depth exceeded in ${building} - tail drop active on priority queues`,
            `${component} flow table capacity reached in ${building} - new connections being rejected`,
            `Abnormal ${component} broadcast storm in ${building} - 340k PPS broadcast traffic`,
            `${component} TCP session establishment delays in ${building} - SYN queue overflow`,
            `East-west traffic congestion on ${component} in ${building} - cross-rack bottleneck`,
            `${component} elephant flow detection in ${building} - single stream consuming 40% capacity`,
            `Packet pacing issues on ${component} NICs in ${building} - bursty behavior observed`,
            `${component} load balancer overload in ${building} - connection table at 98% capacity`
          ];
          return descriptions[buildingIndex];
        } else {
          const descriptions = [
            `${component} ACL rule hit rate anomaly in ${building} - unexpected deny patterns`,
            `${component} ARP table overflow in ${building} - cache thrashing detected`,
            `${component} multicast replication issues in ${building} - IGMP snooping failures`,
            `${component} VXLAN tunnel instability in ${building} - VTEP unreachability events`,
            `${component} sFlow sampling showing asymmetric flows in ${building} - routing inconsistency`,
            `Security group rule limits exceeded on ${component} in ${building} - policy changes blocked`,
            `${component} MAC move events excessive in ${building} - possible network loop`,
            `DHCP snooping database corruption on ${component} in ${building} - legitimate clients blocked`,
            `${component} storm control threshold misconfigured in ${building} - valid traffic dropped`,
            `IPv6 ND cache exhaustion on ${component} in ${building} - neighbor discovery failing`
          ];
          return descriptions[buildingIndex];
        }
      } else if (category === 'TOR') {
        if (metric === 'Availability') {
          const descriptions = [
            `${component} switch stack member failure in ${building} - stack ports down, operating in standalone mode`,
            `${component} port channel degraded in ${building} - 2 of 4 LACP members inactive`,
            `${component} dual-homed server connectivity lost to one ${component} in ${building} - bond interface degraded`,
            `${component} uplink redundancy failure in ${building} - single fabric connection remaining`,
            `${component} port suspended due to error-disable in ${building} - UDLD aggressive triggered`,
            `Server NIC team failure connected to ${component} in ${building} - single link active`,
            `${component} power supply redundancy lost in ${building} - PSU-1 failed, running on PSU-2`,
            `SFP module failure on ${component} in ${building} rack R23 - port down`,
            `${component} console access lost in ${building} - management interface unresponsive`,
            `Firmware upgrade failure on ${component} in ${building} - rolled back to previous version`
          ];
          return descriptions[buildingIndex];
        } else if (metric === 'Performance') {
          const descriptions = [
            `${component} port saturation in ${building} rack R15 - sustained 98% utilization on 25G interfaces`,
            `${component} experiencing high CPU due to control plane policing in ${building} - ARP storms`,
            `${component} optic RX power degraded in ${building} - signal at -15dBm (warning threshold -14dBm)`,
            `${component} interface errors spiking in ${building} - input discards and runts detected`,
            `${component} LLDP neighbor instability in ${building} - host NICs repeatedly resetting`,
            `Packet buffering issues on ${component} in ${building} - output drops during peak hours`,
            `Experiencing slow LACP convergence in ${building} - 8 second failover time`,
            `Jumbo frame fragmentation on ${component} links in ${building} - MTU mismatch suspected`,
            `Backplane bandwidth saturation in ${building} - internal congestion`,
            `Receive buffer overruns on ${component} server ports in ${building} - NIC tuning needed`
          ];
          return descriptions[buildingIndex];
        } else {
          const descriptions = [
            `${component} power supply redundancy lost in ${building} - PSU-2 failed, operating on single PSU`,
            `${component} temperature sensors critical in ${building} - ambient temp 42°C (threshold 40°C)`,
            `${component} firmware mismatch detected in ${building} stack - version inconsistency causing issues`,
            `${component} TCAM utilization critical in ${building} - 92% capacity, ACL optimization needed`,
            `${component} SFP compatibility warning in ${building} - non-approved transceiver detected`,
            `Fan module degraded on ${component} in ${building} - operating at reduced RPM`,
            `${component} memory utilization warning in ${building} - 88% used, approaching threshold`,
            `Configuration drift detected on ${component} in ${building} - manual changes outside automation`,
            `${component} logging buffer overflow in ${building} - critical messages being dropped`,
            `SNMP timeout issues on ${component} in ${building} - monitoring gaps detected`
          ];
          return descriptions[buildingIndex];
        }
      }
      
      return `${component} ${metricLower} issue in ${building}`;
    };

    // Generate varied timestamps
    const generateTimestamp = (dayOffset: number, hour: number, minute: number) => {
      const days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const baseDate = new Date(2023, 7, 31); // Aug 31, 2023
      const date = new Date(baseDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      const dayName = days[date.getDay()];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      const hourStr = hour.toString().padStart(2, '0');
      const minStr = minute.toString().padStart(2, '0');
      return `${dayName}, ${month} ${day}, ${year} ${hourStr}:${minStr}`;
    };

    const types: Array<'Critical' | 'Warning'> = ['Critical', 'Critical', 'Critical', 'Critical', 'Warning', 'Critical', 'Warning', 'Critical', 'Warning', 'Critical'];

    return Array.from({ length: 10 }, (_, index) => ({
      type: types[index],
      description: getDescription(index),
      startTime: generateTimestamp(0, index * 2, index * 5),
      endTime: generateTimestamp(2, 0, 12)
    }));
  };

  const issuesData = generateIssuesData();

  // Sorting logic
  const handleSort = (key: 'type' | 'startTime' | 'endTime') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedIssuesData = [...issuesData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const direction = sortConfig.direction === 'asc' ? 1 : -1;

    if (sortConfig.key === 'type') {
      // Critical comes before Warning
      const order = { Critical: 1, Warning: 2 };
      return (order[a.type] - order[b.type]) * direction;
    } else if (sortConfig.key === 'startTime' || sortConfig.key === 'endTime') {
      // Parse date strings for comparison
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return (dateA.getTime() - dateB.getTime()) * direction;
    }

    return 0;
  });

  const SortIcon = ({ column }: { column: 'type' | 'startTime' | 'endTime' }) => {
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
    <div className="bg-white dark:bg-[#1a1a1a] p-6 border-b border-[#d8d8d8] dark:border-[#404040]">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] px-2 py-1 rounded">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#d63b25] dark:text-[#e85540] leading-[16px]">
                Critical
              </p>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#161513] dark:text-white leading-[20px]">
              {component} Insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-['Inter:Regular',sans-serif] text-[12px] leading-[20px] dark:text-[#e0e0e0] border border-[#d8d8d8] dark:border-[#404040] rounded p-3"><span className="text-[#222] dark:text-white">{displayInsight.label} Performance</span><span> has a high number ({displayInsight.count}) of </span><span className={displayInsight.type === 'critical' ? 'text-[#d63b25] dark:text-[#e85540]' : 'text-[#de8011] dark:text-[#ff981e]'}>{displayInsight.type.charAt(0).toUpperCase() + displayInsight.type.slice(1)}</span><span> issues.</span></p>
            
          </div>
        </div>

        {/* Chart */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            {/* Y-axis and bars */}
            <div className="flex gap-5">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between items-end text-[11px] text-[#665f5b] dark:text-[#999] font-['Inter:Regular',sans-serif] h-[124px]">
                <p>30</p>
                <p>25</p>
                <p>20</p>
                <p>15</p>
                <p>10</p>
                <p>5</p>
                <p>0</p>
              </div>

              {/* Chart area */}
              <div className="flex-1 relative">
                {/* Grid line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#b9b9b9] dark:bg-[#505050]" />
                
                {/* Bars */}
                <div className="flex justify-around items-end h-[124px]">
                  {chartData.map((data, index) => {
                    const warningHeight = (data.warning / maxValue) * chartHeight;
                    const criticalHeight = (data.critical / maxValue) * chartHeight;
                    const hasWarning = data.warning > 0;
                    const hasCritical = data.critical > 0;
                    
                    return (
                      <div key={index} className="flex flex-col items-center justify-end">
                        <div className="flex flex-col w-10">
                          {hasWarning && (
                            <motion.div 
                              className={`bg-[#de8011] dark:bg-[#ff981e] w-full border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] ${hasCritical ? 'rounded-t-[3px]' : 'rounded-[3px]'} origin-bottom`}
                              style={{ height: `${warningHeight}px` }}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ 
                                duration: 0.25, 
                                delay: 0.25 + (index * 0.03), 
                                ease: "easeOut" 
                              }}
                              onMouseEnter={() => setHoveredBar({ label: data.label, type: 'warning', count: data.warning })}
                              onMouseLeave={() => setHoveredBar(null)}
                            />
                          )}
                          {hasCritical && (
                            <motion.div 
                              className={`bg-[#d63b25] dark:bg-[#e85540] w-full border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] ${hasWarning ? 'rounded-b-[3px]' : 'rounded-[3px]'} origin-bottom`}
                              style={{ height: `${criticalHeight}px` }}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ 
                                duration: 0.25, 
                                delay: index * 0.03, 
                                ease: "easeOut" 
                              }}
                              onMouseEnter={() => setHoveredBar({ label: data.label, type: 'critical', count: data.critical })}
                              onMouseLeave={() => setHoveredBar(null)}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical grid line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[#b9b9b9] dark:bg-[#505050]" />
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex gap-5 mt-2">
              <div className="w-[30px]" /> {/* Spacer for Y-axis */}
              <div className="flex-1 flex justify-around">
                {chartData.map((data, index) => (
                  <p key={index} className="text-[11px] text-[#665f5b] dark:text-[#999] font-['Inter:Regular',sans-serif] text-center w-10">
                    {data.label}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-[12px] text-[#161513] dark:text-[#e0e0e0] font-['Inter:Regular',sans-serif] text-center">
            Total critical and warning issues in {component} by building
          </p>
        </div>

        {/* Issues Table */}
        <div className="border border-[#d5d5d5] dark:border-[#404040] rounded overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f8f8f8] dark:bg-[#2a2a2a]">
                <th 
                  onClick={() => handleSort('type')}
                  className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[10px] text-center font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black dark:text-white w-[73px] cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#333333]"
                >
                  Type
                  <SortIcon column="type" />
                </th>
                <th className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[10px] text-left font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black dark:text-white">Issues</th>
                <th 
                  onClick={() => handleSort('startTime')}
                  className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[7px] text-left font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black dark:text-white cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#333333]"
                >
                  Start time
                  <SortIcon column="startTime" />
                </th>
                <th 
                  onClick={() => handleSort('endTime')}
                  className="border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[7px] text-left font-['Inter:Medium',sans-serif] font-medium text-[14px] text-black dark:text-white cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#333333]"
                >
                  End time
                  <SortIcon column="endTime" />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedIssuesData.map((issue, index) => (
                <tr key={index} className="bg-white dark:bg-[#1a1a1a] hover:bg-[rgba(34,126,158,0.05)] dark:hover:bg-[rgba(34,126,158,0.1)]">
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px] text-center">
                    <div className="flex items-center justify-center">
                      <TypeBadge type={issue.type} />
                    </div>
                  </td>
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[7px] font-['Inter:Regular',sans-serif] text-[14px] text-[#161513] dark:text-white">
                    {issue.description}
                  </td>
                  <td className="border-r border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px] font-['Inter:Regular',sans-serif] text-[14px] text-[#161513] dark:text-white">
                    {issue.startTime}
                  </td>
                  <td className="border-b border-[#d7d7d7] dark:border-[#404040] px-[10px] py-[8px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-['Inter:Regular',sans-serif] text-[14px] text-[#161513] dark:text-white">
                        {issue.endTime}
                      </span>
                      <button className="flex items-center gap-1 bg-transparent border border-[#00688c] dark:border-[#4db8e8] hover:bg-[rgba(0,104,140,0.1)] dark:hover:bg-[rgba(77,184,232,0.1)] px-2 py-1 rounded text-[#00688c] dark:text-[#4db8e8] font-['Inter:Regular',sans-serif] text-[11px] whitespace-nowrap">
                        View incidents
                        
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type TypeBadgeProps = {
  type: 'Critical' | 'Warning';
};

function TypeBadge({ type }: TypeBadgeProps) {
  const isCritical = type === 'Critical';
  
  return (
    <div className={`${isCritical ? 'bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)]' : 'bg-[rgba(222,128,17,0.2)] dark:bg-[rgba(222,128,17,0.15)]'} content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0`}>
      <div aria-hidden="true" className={`absolute border ${isCritical ? 'border-[#d63b25] dark:border-[#d63b25]' : 'border-[#ac630c] dark:border-[#de8011]'} border-solid inset-0 pointer-events-none rounded-[3px]`} />
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 ${isCritical ? 'text-[#d63b25] dark:text-[#e85540]' : 'text-[#ac630c] dark:text-[#ff981e]'} text-[11px] whitespace-nowrap`}>
        {type}
      </p>
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
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 ${style.text} text-[11px] whitespace-nowrap`}>
        {status}
      </p>
    </div>
  );
}