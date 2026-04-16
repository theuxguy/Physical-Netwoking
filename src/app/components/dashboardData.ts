export type Region = "APAC" | "EMEA" | "LATAM" | "NA";
export type Status = "critical" | "warning" | "healthy";

export type DashboardItem = {
  id: string;
  type: "region" | "country" | "center";
  region: Region;
  regionLabel: string;
  country?: string;
  center?: string;
};

export const REGIONS: { value: Region; label: string }[] = [
  { value: "APAC", label: "APAC — Asia Pacific" },
  { value: "EMEA", label: "EMEA — Europe, Middle East & Africa" },
  { value: "LATAM", label: "LATAM — Latin America" },
  { value: "NA",   label: "NA — North America" },
];

export const COUNTRIES: Record<Region, string[]> = {
  APAC: [
    "Australia", "China", "Hong Kong", "India", "Indonesia",
    "Japan", "Malaysia", "New Zealand", "Philippines", "Singapore",
    "South Korea", "Taiwan", "Thailand", "Vietnam",
  ],
  EMEA: [
    "Bahrain", "Egypt", "France", "Germany", "Israel",
    "Italy", "Kenya", "Netherlands", "Nigeria", "Poland",
    "Saudi Arabia", "South Africa", "Spain", "Sweden",
    "Switzerland", "Turkey", "UAE", "United Kingdom",
  ],
  LATAM: [
    "Argentina", "Brazil", "Chile", "Colombia", "Costa Rica",
    "Ecuador", "Mexico", "Panama", "Peru", "Uruguay",
  ],
  NA: ["Canada", "Mexico", "United States"],
};

export const CENTERS: Record<string, string[]> = {
  Australia:       ["Sydney DC-1", "Melbourne DC-1", "Perth DC-1"],
  China:           ["Beijing DC-1", "Shanghai DC-1", "Guangzhou DC-1", "Shenzhen DC-1"],
  "Hong Kong":     ["Hong Kong DC-1", "Hong Kong DC-2"],
  India:           ["Mumbai DC-1", "Mumbai DC-2", "Chennai DC-1", "Bangalore DC-1", "Hyderabad DC-1"],
  Indonesia:       ["Jakarta DC-1", "Jakarta DC-2"],
  Japan:           ["Tokyo DC-1", "Tokyo DC-2", "Osaka DC-1"],
  Malaysia:        ["Kuala Lumpur DC-1", "Kuala Lumpur DC-2"],
  "New Zealand":   ["Auckland DC-1"],
  Philippines:     ["Manila DC-1", "Manila DC-2"],
  Singapore:       ["Singapore DC-1", "Singapore DC-2", "Singapore DC-3"],
  "South Korea":   ["Seoul DC-1", "Seoul DC-2", "Busan DC-1"],
  Taiwan:          ["Taipei DC-1", "Taipei DC-2"],
  Thailand:        ["Bangkok DC-1", "Bangkok DC-2"],
  Vietnam:         ["Ho Chi Minh DC-1", "Hanoi DC-1"],
  Bahrain:         ["Manama DC-1"],
  Egypt:           ["Cairo DC-1", "Cairo DC-2"],
  France:          ["Paris DC-1", "Paris DC-2", "Marseille DC-1"],
  Germany:         ["Frankfurt DC-1", "Frankfurt DC-2", "Berlin DC-1", "Munich DC-1"],
  Israel:          ["Tel Aviv DC-1", "Jerusalem DC-1"],
  Italy:           ["Milan DC-1", "Rome DC-1"],
  Kenya:           ["Nairobi DC-1"],
  Netherlands:     ["Amsterdam DC-1", "Amsterdam DC-2", "Rotterdam DC-1"],
  Nigeria:         ["Lagos DC-1", "Abuja DC-1"],
  Poland:          ["Warsaw DC-1", "Krakow DC-1"],
  "Saudi Arabia":  ["Riyadh DC-1", "Riyadh DC-2", "Jeddah DC-1"],
  "South Africa":  ["Johannesburg DC-1", "Cape Town DC-1"],
  Spain:           ["Madrid DC-1", "Barcelona DC-1"],
  Sweden:          ["Stockholm DC-1", "Gothenburg DC-1"],
  Switzerland:     ["Zurich DC-1", "Geneva DC-1"],
  Turkey:          ["Istanbul DC-1", "Istanbul DC-2", "Ankara DC-1"],
  UAE:             ["Dubai DC-1", "Dubai DC-2", "Abu Dhabi DC-1"],
  "United Kingdom":["London DC-1", "London DC-2", "London DC-3", "Manchester DC-1"],
  Argentina:       ["Buenos Aires DC-1", "Buenos Aires DC-2"],
  Brazil:          ["São Paulo DC-1", "São Paulo DC-2", "Rio de Janeiro DC-1", "Brasília DC-1"],
  Chile:           ["Santiago DC-1", "Santiago DC-2"],
  Colombia:        ["Bogotá DC-1", "Medellín DC-1"],
  "Costa Rica":    ["San José DC-1"],
  Ecuador:         ["Quito DC-1", "Guayaquil DC-1"],
  Mexico:          ["Mexico City DC-1", "Mexico City DC-2", "Monterrey DC-1", "Guadalajara DC-1"],
  Panama:          ["Panama City DC-1"],
  Peru:            ["Lima DC-1", "Lima DC-2"],
  Uruguay:         ["Montevideo DC-1"],
  Canada:          ["Toronto DC-1", "Toronto DC-2", "Montreal DC-1", "Vancouver DC-1", "Calgary DC-1"],
  "United States": [
    "Ashburn DC-1", "Ashburn DC-2", "Chicago DC-1", "Dallas DC-1", "Dallas DC-2",
    "Los Angeles DC-1", "New York DC-1", "New York DC-2", "Phoenix DC-1",
    "San Jose DC-1", "San Jose DC-2", "Seattle DC-1",
  ],
};

// Short 3-letter codes for health label badges
export const COUNTRY_CODES: Record<string, string> = {
  Australia: "AUS", China: "CHN", "Hong Kong": "HKG", India: "IND",
  Indonesia: "IDN", Japan: "JPN", Malaysia: "MYS", "New Zealand": "NZL",
  Philippines: "PHL", Singapore: "SGP", "South Korea": "KOR", Taiwan: "TWN",
  Thailand: "THA", Vietnam: "VNM",
  Bahrain: "BHR", Egypt: "EGY", France: "FRA", Germany: "DEU",
  Israel: "ISR", Italy: "ITA", Kenya: "KEN", Netherlands: "NLD",
  Nigeria: "NGA", Poland: "POL", "Saudi Arabia": "SAU", "South Africa": "ZAF",
  Spain: "ESP", Sweden: "SWE", Switzerland: "CHE", Turkey: "TUR",
  UAE: "UAE", "United Kingdom": "GBR",
  Argentina: "ARG", Brazil: "BRA", Chile: "CHL", Colombia: "COL",
  "Costa Rica": "CRI", Ecuador: "ECU", Mexico: "MEX", Panama: "PAN",
  Peru: "PER", Uruguay: "URY",
  Canada: "CAN", "United States": "USA",
};

// Short codes for data centers
export function centerCode(name: string): string {
  // "São Paulo DC-1" → "SAO1", "London DC-2" → "LON2", etc.
  const match = name.match(/^(.+?)\s+DC-(\d+)$/);
  if (!match) return name.slice(0, 4).toUpperCase();
  const city = match[1]
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-zA-Z\s]/g, "")
    .trim()
    .split(/\s+/)[0]
    .slice(0, 3)
    .toUpperCase();
  return `${city}${match[2]}`;
}

export function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return (Math.sin(Math.abs(hash)) * 10000) % 1;
}

export function getStatus(seed: string): Status {
  const r = Math.abs(seededRandom(seed));
  if (r < 0.33) return "critical";
  if (r < 0.66) return "warning";
  return "healthy";
}

export function worstStatus(statuses: Status[]): Status {
  if (statuses.includes("critical")) return "critical";
  if (statuses.includes("warning")) return "warning";
  return "healthy";
}

export const MONITORING_METRICS = [
  "CPU Utilization", "Memory Usage", "Packet Loss", "Latency (ms)",
  "Throughput (Gbps)", "Error Rate", "Uptime", "Link Utilization",
];

export const METRIC_VALUES: Record<string, Record<Status, string>> = {
  "CPU Utilization":   { critical: "94%",    warning: "82%",   healthy: "41%"   },
  "Memory Usage":      { critical: "91%",    warning: "76%",   healthy: "38%"   },
  "Packet Loss":       { critical: "3.2%",   warning: "0.8%",  healthy: "0.0%"  },
  "Latency (ms)":      { critical: "142ms",  warning: "67ms",  healthy: "12ms"  },
  "Throughput (Gbps)": { critical: "0.4",    warning: "2.1",   healthy: "8.7"   },
  "Error Rate":        { critical: "2.1%",   warning: "0.4%",  healthy: "0.0%"  },
  "Uptime":            { critical: "14h 22m",warning: "3d 7h", healthy: "28d 4h"},
  "Link Utilization":  { critical: "98%",    warning: "71%",   healthy: "34%"   },
};

export const ISSUE_DESCRIPTIONS: Record<"critical" | "warning", string[]> = {
  critical: [
    "Interface down — no link detected",
    "BGP session dropped",
    "Hardware failure on primary card",
    "Routing loop detected",
    "Power supply unit failure",
  ],
  warning: [
    "Packet loss exceeding threshold (>0.1%)",
    "CPU utilization above 80%",
    "Memory usage at 75%",
    "High latency on upstream link",
    "Fan speed degraded",
  ],
};

// Geographic centers [longitude, latitude] for map rendering
export const COUNTRY_COORDS: Record<string, [number, number]> = {
  Australia: [133, -27], China: [104, 35], "Hong Kong": [114.2, 22.3], India: [78, 22],
  Indonesia: [118, -2], Japan: [138, 37], Malaysia: [110, 4], "New Zealand": [172, -42],
  Philippines: [122, 12], Singapore: [103.8, 1.3], "South Korea": [128, 36], Taiwan: [121, 24],
  Thailand: [101, 15], Vietnam: [107, 14],
  Bahrain: [50.5, 26], Egypt: [30, 27], France: [2, 46], Germany: [10, 51],
  Israel: [35, 31], Italy: [12, 43], Kenya: [38, 0], Netherlands: [5.3, 52],
  Nigeria: [8, 9], Poland: [20, 52], "Saudi Arabia": [45, 24], "South Africa": [25, -30],
  Spain: [-3.7, 40], Sweden: [18, 63], Switzerland: [8, 47], Turkey: [35, 39],
  UAE: [54, 24], "United Kingdom": [-2, 54],
  Argentina: [-64, -34], Brazil: [-51, -14], Chile: [-70, -35], Colombia: [-74, 4],
  "Costa Rica": [-84, 10], Ecuador: [-78, -2], Mexico: [-99, 23], Panama: [-80, 9],
  Peru: [-76, -10], Uruguay: [-56, -33],
  Canada: [-96, 60], "United States": [-100, 38],
};

// Viewport for each region: center [lng, lat] and projectionScale
export const REGION_VIEWPORTS: Record<Region, { center: [number, number]; scale: number }> = {
  APAC:  { center: [120, 5],   scale: 340 },
  EMEA:  { center: [22, 28],   scale: 290 },
  LATAM: { center: [-65, -15], scale: 440 },
  NA:    { center: [-100, 52], scale: 420 },
};

// Viewport for zooming into a single country
export const COUNTRY_VIEWPORTS: Record<string, { center: [number, number]; scale: number }> = {
  Australia:       { center: [133, -27],  scale: 750 },
  China:           { center: [104, 36],   scale: 550 },
  "Hong Kong":     { center: [114.2, 22.3], scale: 30000 },
  India:           { center: [78, 22],    scale: 650 },
  Indonesia:       { center: [118, -3],   scale: 600 },
  Japan:           { center: [138, 37],   scale: 1400 },
  Malaysia:        { center: [110, 4],    scale: 1400 },
  "New Zealand":   { center: [172, -42],  scale: 1400 },
  Philippines:     { center: [122, 12],   scale: 1400 },
  Singapore:       { center: [103.8, 1.3], scale: 50000 },
  "South Korea":   { center: [128, 36],   scale: 2400 },
  Taiwan:          { center: [121, 24],   scale: 5000 },
  Thailand:        { center: [101, 15],   scale: 1400 },
  Vietnam:         { center: [107, 14],   scale: 1200 },
  Bahrain:         { center: [50.5, 26],  scale: 22000 },
  Egypt:           { center: [30, 27],    scale: 850 },
  France:          { center: [2, 46],     scale: 1900 },
  Germany:         { center: [10, 51],    scale: 2400 },
  Israel:          { center: [35, 31],    scale: 7500 },
  Italy:           { center: [12, 43],    scale: 1900 },
  Kenya:           { center: [38, 0],     scale: 1400 },
  Netherlands:     { center: [5.3, 52],   scale: 6500 },
  Nigeria:         { center: [8, 9],      scale: 1100 },
  Poland:          { center: [20, 52],    scale: 1900 },
  "Saudi Arabia":  { center: [45, 24],    scale: 650 },
  "South Africa":  { center: [25, -29],   scale: 950 },
  Spain:           { center: [-3.7, 40],  scale: 1700 },
  Sweden:          { center: [18, 62],    scale: 950 },
  Switzerland:     { center: [8, 47],     scale: 8000 },
  Turkey:          { center: [35, 39],    scale: 1100 },
  UAE:             { center: [54, 24],    scale: 5500 },
  "United Kingdom":{ center: [-2, 54],    scale: 2400 },
  Argentina:       { center: [-64, -34],  scale: 560 },
  Brazil:          { center: [-51, -14],  scale: 460 },
  Chile:           { center: [-70, -35],  scale: 750 },
  Colombia:        { center: [-74, 4],    scale: 1100 },
  "Costa Rica":    { center: [-84, 10],   scale: 4800 },
  Ecuador:         { center: [-78, -2],   scale: 2400 },
  Mexico:          { center: [-99, 23],   scale: 750 },
  Panama:          { center: [-80, 9],    scale: 6500 },
  Peru:            { center: [-76, -10],  scale: 850 },
  Uruguay:         { center: [-56, -33],  scale: 2400 },
  Canada:          { center: [-96, 58],   scale: 380 },
  "United States": { center: [-100, 38],  scale: 560 },
};

// City coordinates [lng, lat] for each data center
export const CENTER_COORDS: Record<string, [number, number]> = {
  "Sydney DC-1": [151.2, -33.9], "Melbourne DC-1": [145.0, -37.8], "Perth DC-1": [115.9, -31.9],
  "Beijing DC-1": [116.4, 39.9], "Shanghai DC-1": [121.5, 31.2],
  "Guangzhou DC-1": [113.3, 23.1], "Shenzhen DC-1": [114.1, 22.6],
  "Hong Kong DC-1": [114.18, 22.3], "Hong Kong DC-2": [114.22, 22.3],
  "Mumbai DC-1": [72.88, 19.1], "Mumbai DC-2": [72.88, 19.1],
  "Chennai DC-1": [80.3, 13.1], "Bangalore DC-1": [77.6, 12.9], "Hyderabad DC-1": [78.5, 17.4],
  "Jakarta DC-1": [106.85, -6.2], "Jakarta DC-2": [106.85, -6.2],
  "Tokyo DC-1": [139.75, 35.68], "Tokyo DC-2": [139.75, 35.68], "Osaka DC-1": [135.5, 34.7],
  "Kuala Lumpur DC-1": [101.7, 3.15], "Kuala Lumpur DC-2": [101.7, 3.15],
  "Auckland DC-1": [174.8, -36.9],
  "Manila DC-1": [121.0, 14.6], "Manila DC-2": [121.0, 14.6],
  "Singapore DC-1": [103.82, 1.3], "Singapore DC-2": [103.82, 1.3], "Singapore DC-3": [103.82, 1.3],
  "Seoul DC-1": [126.98, 37.57], "Seoul DC-2": [126.98, 37.57], "Busan DC-1": [129.1, 35.2],
  "Taipei DC-1": [121.56, 25.04], "Taipei DC-2": [121.56, 25.04],
  "Bangkok DC-1": [100.5, 13.75], "Bangkok DC-2": [100.5, 13.75],
  "Ho Chi Minh DC-1": [106.7, 10.8], "Hanoi DC-1": [105.85, 21.03],
  "Manama DC-1": [50.6, 26.2],
  "Cairo DC-1": [31.24, 30.06], "Cairo DC-2": [31.24, 30.06],
  "Paris DC-1": [2.35, 48.86], "Paris DC-2": [2.35, 48.86], "Marseille DC-1": [5.37, 43.3],
  "Frankfurt DC-1": [8.68, 50.11], "Frankfurt DC-2": [8.68, 50.11],
  "Berlin DC-1": [13.4, 52.52], "Munich DC-1": [11.58, 48.14],
  "Tel Aviv DC-1": [34.78, 32.08], "Jerusalem DC-1": [35.22, 31.77],
  "Milan DC-1": [9.19, 45.47], "Rome DC-1": [12.5, 41.9],
  "Nairobi DC-1": [36.82, -1.29],
  "Amsterdam DC-1": [4.9, 52.37], "Amsterdam DC-2": [4.9, 52.37], "Rotterdam DC-1": [4.48, 51.92],
  "Lagos DC-1": [3.4, 6.46], "Abuja DC-1": [7.49, 9.07],
  "Warsaw DC-1": [21.02, 52.23], "Krakow DC-1": [19.94, 50.06],
  "Riyadh DC-1": [46.72, 24.69], "Riyadh DC-2": [46.72, 24.69], "Jeddah DC-1": [39.17, 21.49],
  "Johannesburg DC-1": [28.04, -26.2], "Cape Town DC-1": [18.42, -33.93],
  "Madrid DC-1": [-3.7, 40.42], "Barcelona DC-1": [2.17, 41.39],
  "Stockholm DC-1": [18.07, 59.33], "Gothenburg DC-1": [11.97, 57.71],
  "Zurich DC-1": [8.54, 47.37], "Geneva DC-1": [6.14, 46.2],
  "Istanbul DC-1": [28.98, 41.01], "Istanbul DC-2": [28.98, 41.01], "Ankara DC-1": [32.86, 39.93],
  "Dubai DC-1": [55.3, 25.2], "Dubai DC-2": [55.3, 25.2], "Abu Dhabi DC-1": [54.37, 24.47],
  "London DC-1": [-0.12, 51.5], "London DC-2": [-0.12, 51.5],
  "London DC-3": [-0.12, 51.5], "Manchester DC-1": [-2.24, 53.48],
  "Buenos Aires DC-1": [-58.38, -34.6], "Buenos Aires DC-2": [-58.38, -34.6],
  "São Paulo DC-1": [-46.63, -23.55], "São Paulo DC-2": [-46.63, -23.55],
  "Rio de Janeiro DC-1": [-43.17, -22.91], "Brasília DC-1": [-47.93, -15.78],
  "Santiago DC-1": [-70.65, -33.46], "Santiago DC-2": [-70.65, -33.46],
  "Bogotá DC-1": [-74.08, 4.71], "Medellín DC-1": [-75.56, 6.23],
  "San José DC-1": [-84.09, 9.93],
  "Quito DC-1": [-78.5, -0.22], "Guayaquil DC-1": [-79.9, -2.2],
  "Mexico City DC-1": [-99.13, 19.43], "Mexico City DC-2": [-99.13, 19.43],
  "Monterrey DC-1": [-100.32, 25.68], "Guadalajara DC-1": [-103.35, 20.66],
  "Panama City DC-1": [-79.52, 8.99],
  "Lima DC-1": [-77.04, -12.05], "Lima DC-2": [-77.04, -12.05],
  "Montevideo DC-1": [-56.19, -34.9],
  "Toronto DC-1": [-79.38, 43.65], "Toronto DC-2": [-79.38, 43.65],
  "Montreal DC-1": [-73.57, 45.5], "Vancouver DC-1": [-123.12, 49.28], "Calgary DC-1": [-114.07, 51.05],
  "Ashburn DC-1": [-77.49, 39.04], "Ashburn DC-2": [-77.49, 39.04],
  "Chicago DC-1": [-87.63, 41.88], "Dallas DC-1": [-96.8, 32.78], "Dallas DC-2": [-96.8, 32.78],
  "Los Angeles DC-1": [-118.24, 34.05], "New York DC-1": [-74.0, 40.71], "New York DC-2": [-74.0, 40.71],
  "Phoenix DC-1": [-112.07, 33.45], "San Jose DC-1": [-121.89, 37.34], "San Jose DC-2": [-121.89, 37.34],
  "Seattle DC-1": [-122.33, 47.61],
};
