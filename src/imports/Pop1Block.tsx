import svgPaths from "./svg-pop1-adapter-icon";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute content-stretch flex flex-col inset-0 items-start p-[10px] rounded-[6px]">
        <div aria-hidden="true" className="absolute border border-[#b6b2ad] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
        <div className="h-[56px] relative shrink-0 w-[113px]">
          <div className="absolute contents left-0 top-0">
            <div className="absolute contents left-0 top-0">
              <div className="absolute bg-[rgba(255,255,255,0.1)] border border-[#508223] border-solid h-[56px] left-0 rounded-[5px] top-0 w-[36px]" />
              <div className="absolute contents left-[3px] top-[3px]">
                <div className="absolute contents left-[3px] top-[3px]">
                  <div className="absolute bg-[rgba(222,128,17,0)] border border-[#508223] border-solid h-[50px] left-[3px] rounded-[5px] top-[3px] w-[30px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute h-[45px] left-[46px] top-[5.5px] w-[67px]">
            <div className="absolute content-stretch flex flex-col gap-[5px] items-start justify-center left-0 top-0">
              <div className="leading-[normal] not-italic relative shrink-0 text-[0px] text-black w-[67px]">
                <p className="mb-0 text-[11px]">POP-1</p>
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