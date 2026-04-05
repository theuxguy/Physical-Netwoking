import svgPaths from "./svg-customer-vpn-adapter-icon";

export default function Frame() {
  return (
    <div className="bg-white dark:bg-[#2a2a2a] content-stretch flex flex-col items-start p-[10px] relative rounded-[6px] size-full">
      <div aria-hidden="true" className="absolute border border-[#508223] dark:border-[#6ba32e] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="content-stretch flex items-center relative shrink-0">
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[24px]" data-name="adapter">
            <div className="absolute bottom-1/4 left-[8.33%] right-[8.34%] top-1/4" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 12">
                <path d={svgPaths.p1fd1400} fill="var(--fill-0, #161513)" className="dark:fill-white" id="vector" />
              </svg>
            </div>
          </div>
          <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black dark:text-white w-[112px]">Customer Network (VPN/FastConnect)</p>
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
  );
}