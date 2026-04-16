import svgPaths from "./svg-health-success-icon";

export default function Health() {
  return (
    <div className="bg-[#5f7d4f] relative rounded-[3px] size-full" data-name="Health">
      <div aria-hidden="true" className="absolute border border-[#5f7d4f] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[2.5px] relative size-full">
          <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
            <div className="relative shrink-0 size-[9px]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d={svgPaths.p24a580} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <p className="font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">FRA</p>
          </div>
        </div>
      </div>
    </div>
  );
}