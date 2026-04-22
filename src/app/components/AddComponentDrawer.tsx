import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { REGIONS, COUNTRIES, CENTERS, Region, DashboardItem } from "./dashboardData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

type AddComponentDrawerProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (item: DashboardItem) => void;
};

export function AddComponentDrawer({ open, onClose, onAdd }: AddComponentDrawerProps) {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [center, setCenter] = useState("");

  const handleRegionChange = (v: string) => { setRegion(v); setCountry(""); setCenter(""); };
  const handleCountryChange = (v: string) => { setCountry(v); setCenter(""); };

  const handleAdd = () => {
    if (!region) return;
    const regionLabel = REGIONS.find((r) => r.value === region)?.label ?? region;

    let item: DashboardItem;
    if (center) {
      item = {
        id: `${region}-${country}-${center}`.toLowerCase().replace(/\s+/g, "-"),
        type: "center",
        region: region as Region,
        regionLabel,
        country,
        center,
      };
    } else if (country) {
      item = {
        id: `${region}-${country}`.toLowerCase().replace(/\s+/g, "-"),
        type: "country",
        region: region as Region,
        regionLabel,
        country,
      };
    } else {
      item = {
        id: region.toLowerCase(),
        type: "region",
        region: region as Region,
        regionLabel,
      };
    }

    onAdd(item);
    handleRegionChange("");
    onClose();
  };

  const countryOptions = region
    ? (COUNTRIES[region as Region] || []).map((c) => ({ value: c, label: c }))
    : [];

  const centerOptions = country
    ? (CENTERS[country] || []).map((c) => ({ value: c, label: c }))
    : [];

  const addingLabel = center
    ? `${center} (Center)`
    : country
    ? `${country} (Country)`
    : region
    ? `${REGIONS.find((r) => r.value === region)?.label} (Region)`
    : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-component-title"
            className="fixed right-0 top-0 bottom-0 z-50 w-[400px] bg-white dark:bg-[#1a1a1a] border-l border-[#d5d5d5] dark:border-[#333] flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d5d5d5] dark:border-[#333]">
              <h2 id="add-component-title" className="text-base font-semibold text-[#222] dark:text-white">
                Add Component
              </h2>
              <button
                onClick={onClose}
                aria-label="Close add component panel"
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors text-[#666] dark:text-[#aaa]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
              <p className="text-sm text-[#666] dark:text-[#888] leading-relaxed">
                Select a region to monitor on your dashboard. Optionally narrow down to a country or specific data center.
              </p>

              {/* Region */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="select-region" className="text-xs font-medium text-[#555] dark:text-[#aaa]">
                  Region
                </Label>
                <Select value={region} onValueChange={handleRegionChange}>
                  <SelectTrigger id="select-region" className="bg-white dark:bg-[#1a1a1a] dark:border-[#404040] dark:text-white">
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="select-country" className="text-xs font-medium text-[#555] dark:text-[#aaa]">
                  Country
                </Label>
                <Select value={country} onValueChange={handleCountryChange} disabled={!region}>
                  <SelectTrigger id="select-country" className="bg-white dark:bg-[#1a1a1a] dark:border-[#404040] dark:text-white">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Center */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="select-center" className="text-xs font-medium text-[#555] dark:text-[#aaa]">
                  Data Center
                </Label>
                <Select value={center} onValueChange={setCenter} disabled={!country}>
                  <SelectTrigger id="select-center" className="bg-white dark:bg-[#1a1a1a] dark:border-[#404040] dark:text-white">
                    <SelectValue placeholder="Select a data center" />
                  </SelectTrigger>
                  <SelectContent>
                    {centerOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preview */}
              {addingLabel && (
                <div className="mt-2 px-3 py-3 rounded-md bg-[rgba(34,126,158,0.08)] border border-[rgba(34,126,158,0.3)]">
                  <p className="text-xs text-[#555] dark:text-[#aaa] mb-0.5">Adding to dashboard</p>
                  <p className="text-sm font-medium text-[#227e9e] dark:text-[#5ba8d0]">{addingLabel}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#d5d5d5] dark:border-[#333] flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-[#555] dark:text-[#aaa] hover:text-[#222] dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!region}
                className={`px-4 py-2 text-sm rounded transition-colors
                  ${region
                    ? "bg-[#227e9e] hover:bg-[#1a6a87] text-white"
                    : "bg-[#d0d0d0] dark:bg-[#333] text-[#999] dark:text-[#555] cursor-not-allowed"
                  }`}
              >
                Add to dashboard
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
