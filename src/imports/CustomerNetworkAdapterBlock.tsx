import svgPaths from "./svg-customer-network-adapter-icon";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#f1efed] content-stretch flex flex-col h-[75px] items-start left-0 p-[10px] rounded-[6px] top-0 w-[161px]">
        <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="content-stretch flex items-center relative shrink-0">
          <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[24px]" data-name="adapter">
              <div className="absolute bottom-1/4 left-[8.33%] right-[8.34%] top-1/4" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 12">
                  <path d={svgPaths.p1fd1400} fill="var(--fill-0, #161513)" id="vector" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
              <div className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[0px] text-black w-[112px]">
                <p className="font-['Inter:Regular',sans-serif] font-normal mb-0 text-[11px]">Customer Network (VPN/FastConnect)</p>
                <p className="text-[#665f5b] text-[9px]">Some info. here</p>
              </div>
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