import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { REGIONS, COUNTRIES, CENTERS, Region, DashboardItem } from "./dashboardData";

type SelectProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
};

function Select({ label, value, onChange, options, placeholder = "Select", disabled = false }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#555] dark:text-[#aaa]">{label}</label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-3 py-2.5 border rounded text-sm transition-colors text-left
            ${disabled
              ? "bg-[#f5f5f5] dark:bg-[#111] border-[#ddd] dark:border-[#333] text-[#aaa] dark:text-[#555] cursor-not-allowed"
              : "bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#404040] text-[#222] dark:text-white hover:bg-gray-50 dark:hover:bg-[#252525] cursor-pointer"
            }`}
        >
          <span className={selected ? "text-[#222] dark:text-white" : "text-[#aaa] dark:text-[#555]"}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${disabled ? "text-[#ccc] dark:text-[#444]" : "text-[#666] dark:text-[#aaa]"}`} />
        </button>

        {open && !disabled && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)} />
            <div className="absolute top-full left-0 right-0 mt-1 z-[70] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#404040] rounded-md shadow-[0px_6px_12px_0px_rgba(0,0,0,0.15)] dark:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.6)] max-h-[220px] overflow-y-auto">
              <div className="py-1">
                <button
                  className="w-full text-left px-3 py-2.5 text-sm text-[#aaa] dark:text-[#555] hover:bg-[rgba(22,21,19,0.04)] dark:hover:bg-[#252525]"
                  onClick={() => { onChange(""); setOpen(false); }}
                >
                  {placeholder}
                </button>
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { onChange(opt.value); setOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 text-sm dark:text-white hover:bg-[rgba(22,21,19,0.06)] dark:hover:bg-[#2a2a2a] transition-colors
                      ${opt.value === value ? "bg-[#e4f1f7] dark:bg-[#1e3a4a]" : ""}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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

  // Preview of what will be added
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
          />

          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-[400px] bg-white dark:bg-[#1a1a1a] border-l border-[#d5d5d5] dark:border-[#333] flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d5d5d5] dark:border-[#333]">
              <h2 className="text-base font-semibold text-[#222] dark:text-white">Add Component</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors text-[#666] dark:text-[#aaa]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
              <p className="text-sm text-[#666] dark:text-[#888] leading-relaxed">
                Select a region to add to your dashboard. Optionally narrow down to a country or specific center.
              </p>

              <Select
                label="Region"
                value={region}
                onChange={handleRegionChange}
                options={REGIONS.map((r) => ({ value: r.value, label: r.label }))}
                placeholder="Select"
              />

              <Select
                label="Country"
                value={country}
                onChange={handleCountryChange}
                options={countryOptions}
                placeholder="Select"
                disabled={!region}
              />

              <Select
                label="Center"
                value={center}
                onChange={setCenter}
                options={centerOptions}
                placeholder="Select"
                disabled={!country}
              />

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
