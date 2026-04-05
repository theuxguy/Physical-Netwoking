export function ChartSection() {
  return (
    <div className="px-6 pt-4">
      {/* Chart container */}
      <div className="relative bg-[rgba(34,126,158,0.05)] border border-[#b6b2ad] rounded-lg p-4 h-[120px]">
        {/* Y-axis label */}
        <div className="absolute left-2 top-2 text-xs text-gray-600">
          Incident count (in thousands)
        </div>
        
        {/* Chart placeholder - will be filled with actual chart later */}
        <div className="h-full flex items-end justify-between px-8">
          {/* Placeholder for chart bars/lines */}
        </div>
        
        {/* Timeline markers would go at the bottom */}
      </div>
    </div>
  );
}
