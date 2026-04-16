import svgPaths from "./svg-pop3-block-icons";

function AlertsErrorS() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <div className="absolute flex inset-[8.33%] items-center justify-center">
        <div className="-scale-y-100 flex-none rotate-180 size-[20px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block size-[14px]" fill="none" preserveAspectRatio="none" viewBox="0 0 11.667 11.667">
              <path d={svgPaths.p1018c00} fill="var(--fill-0, #D63B25)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white dark:bg-[#2a2a2a] content-stretch flex flex-col h-[78px] items-start left-0 p-[10px] rounded-[6px] top-0">
        <div aria-hidden="true" className="absolute border border-[#d63b25] dark:border-[#e85540] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="h-[56px] relative shrink-0 w-[147px]">
          <div className="absolute contents left-0 top-0">
            <div className="absolute bg-[rgba(255,255,255,0.1)] border border-[#d63b25] dark:border-[#e85540] border-solid h-[56px] left-0 rounded-[5px] top-0 w-[36px]" />
            <div className="absolute contents left-[3px] top-[3px]">
              <div className="absolute contents left-[3px] top-[3px]">
                <div className="absolute bg-[rgba(214,59,37,0)] border border-[#d63b25] dark:border-[#e85540] border-solid h-[50px] left-[3px] rounded-[5px] top-[3px] w-[30px]" />
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-[46px] top-[8px]">
            <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
              <p className="leading-[normal] not-italic relative shrink-0 text-[11px] text-black dark:text-white w-[67px]">POP-2</p>
              <AlertsErrorS />
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-center left-[6px] top-[8px]">
            <p className="h-[25px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black dark:text-white text-center w-[24px]">BLD 22</p>
            <AlertsErrorS />
          </div>
        </div>
      </div>
    </div>
  );
}