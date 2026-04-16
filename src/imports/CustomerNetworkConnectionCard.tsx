import svgPaths from "./svg-internet-connection-icon";

export default function Frame() {
  return (
    <div className="bg-[#f1efed] content-stretch flex flex-col items-start p-[10px] relative rounded-[6px] size-full">
      <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="content-stretch flex items-center relative shrink-0">
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[24px]" data-name="domain">
            <div className="absolute inset-[8.33%]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d={svgPaths.pc763800} fill="var(--fill-0, #161513)" id="vector" />
              </svg>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
            <div className="leading-[normal] not-italic relative shrink-0 text-[0px] text-black w-[78px]">
              <p className="mb-0 text-[11px]">Internet</p>
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
  );
}