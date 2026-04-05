import buttonSvgPaths from "../../imports/svg-tooltip-button-icons";
import { useState } from "react";
import { useNavigate } from "react-router";

type GeneralHealthTooltipProps = {
  component: string;
  healthStatus: string;
  reasons?: string[];
  position: { x: number; y: number };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  regionCode?: string;
};

export function GeneralHealthTooltip({ component, healthStatus, reasons, position, onMouseEnter, onMouseLeave, regionCode }: GeneralHealthTooltipProps) {
  const [expandedButton, setExpandedButton] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Don't show tooltip for healthy status
  if (healthStatus === "Healthy") {
    return null;
  }

  const statusColor = healthStatus === "Critical" ? "#d63b25" : "#ac630c";
  const reasonText = reasons && reasons.length > 0
    ? `on account of ${reasons.join(", ")} being in ${healthStatus} state.`
    : `due to ${healthStatus.toLowerCase()} conditions.`;

  return (
    <div 
      className="fixed z-[1000] pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        maxWidth: '180px'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white dark:bg-[#2a2a2a] content-stretch flex items-start p-[10px] rounded-[3px]">
        <div aria-hidden="true" className="absolute border border-[#bcb6b1] dark:border-[#505050] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] dark:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.4)]" />
        <div className="content-stretch flex flex-col items-start min-h-px min-w-px relative">
          <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#161513] dark:text-white text-[11px] w-full" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
            <p className="mb-0">
              <span className="leading-[18px]">{`${component} is `}</span>
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic" style={{ color: statusColor }}>{healthStatus}</span>
              <span className="leading-[18px]">{` ${reasonText}`}</span>
            </p>
            <p className="leading-[18px] mb-0">&nbsp;</p>
            <div className="flex items-center justify-start">
              <div 
                className={`relative rounded-[12px] shrink-0 cursor-pointer hover:bg-[rgba(22,21,19,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 ${expandedButton ? 'pr-[4px]' : ''}`}
                onMouseEnter={() => {
                  if (hoverTimer) clearTimeout(hoverTimer);
                  const timer = setTimeout(() => {
                    setExpandedButton(true);
                  }, 1000);
                  setHoverTimer(timer);
                }}
                onMouseLeave={() => {
                  if (hoverTimer) clearTimeout(hoverTimer);
                  setExpandedButton(false);
                }}
                onClick={(e) => {
                  console.log('Check button clicked for:', component);
                  e.stopPropagation();
                  if (regionCode) {
                    navigate(`/region/${regionCode}`);
                  }
                }}
              >
                <div className="content-stretch flex items-center justify-center overflow-clip p-[4px] relative rounded-[inherit] gap-[2px]">
                  <div className="relative shrink-0 size-[12px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                      <path clipRule="evenodd" d={buttonSvgPaths.p2f8eab00} className="fill-[#161513] dark:fill-white" fillRule="evenodd" />
                    </svg>
                  </div>
                  {expandedButton && (
                    <span className="font-['Inter',sans-serif] font-normal text-[9px] text-[#161513] dark:text-white whitespace-nowrap">
                      Check
                    </span>
                  )}
                </div>
                <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.5)] dark:border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[12px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}