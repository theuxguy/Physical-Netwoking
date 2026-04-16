import svgPaths from "./svg-warning-indicator-icon";

export default function Health() {
  return (
    <div className="bg-[#ac630c] relative rounded-[3px] size-full" data-name="Health">
      <div aria-hidden="true" className="absolute border border-[#ac630c] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[5px] items-center justify-center px-[2.5px] relative size-full">
          <div className="relative shrink-0 size-[10px]" data-name="Alerts / warning-s-24">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
              <g id="Alerts / warning-s-24">
                <path d={svgPaths.pcef2880} fill="var(--fill-0, white)" id="Vector" />
              </g>
            </svg>
          </div>
          <p className="font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">NRT</p>
        </div>
      </div>
    </div>
  );
}