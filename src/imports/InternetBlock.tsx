import svgPaths from "./svg-internet-domain-icon";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white dark:bg-[#2a2a2a] content-stretch flex flex-col h-[44px] items-start left-0 p-[10px] rounded-[6px] top-0 w-[166px]">
        <div aria-hidden="true" className="absolute border border-[#508223] dark:border-[#6ba32e] border-solid inset-0 pointer-events-none rounded-[6px] px-[0px] pt-[0px] pb-[32px] m-[0px]" />
        <div className="content-stretch flex items-center relative shrink-0">
          <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[24px]" data-name="domain">
              <div className="absolute inset-[8.33%]" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d={svgPaths.pc763800} fill="var(--fill-0, #161513)" className="dark:fill-white" id="vector" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
              <p className="leading-[normal] not-italic relative shrink-0 text-[11px] text-black dark:text-white whitespace-nowrap">Internet</p>
              <div className="relative shrink-0 size-[14px]" data-name="success">
                <div className="absolute inset-[8.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                    <path clipRule="evenodd" d={svgPaths.p1e5f5780} fill="var(--fill-0, #508223)" fillRule="evenodd" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}