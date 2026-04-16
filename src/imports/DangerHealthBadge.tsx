import svgPaths from "./svg-danger-indicator-icon";

export default function Health() {
  return (
    <div className="bg-[#d63b25] relative rounded-[3px] size-full" data-name="Health">
      <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[2.5px] relative size-full">
          <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
            <div className="relative shrink-0 size-[10px]" data-name="error">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                <g id="error">
                  <path clipRule="evenodd" d={svgPaths.p1a4c9d80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
                </g>
              </svg>
            </div>
            <p className="font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">DXB</p>
          </div>
        </div>
      </div>
    </div>
  );
}