import clsx from "clsx";
import svgPaths from "./svg-close-icon";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center px-[10px] py-[7px] relative size-full">{children}</div>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("bg-[rgba(255,255,255,0.1)] relative shrink-0 w-full", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-0 border-[#d5d5d5] border-solid inset-0 pointer-events-none" />
      <Wrapper>
        <div className="bg-[rgba(80,130,35,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
          <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[3px]" />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] text-[11px] whitespace-nowrap">{"Healthy"}</p>
        </div>
      </Wrapper>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
      <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-end size-full">
          <div className="content-stretch flex items-center justify-end p-[10px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="PSFT/Icons/24/RW CrossRed">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPaths.p31782000} fill="var(--fill-0, #222222)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(214,59,37,0.2)] h-[38px] relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">TOR</p>
          </div>
        </div>
      </div>
      <Helper additionalClassNames="h-[70px]" />
      <div className="bg-[rgba(255,255,255,0.1)] h-[57px] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-0 border-[#d5d5d5] border-solid inset-0 pointer-events-none" />
        <Wrapper>
          <div className="bg-[rgba(214,59,37,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
            <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#d63b25] text-[11px] whitespace-nowrap">Critical</p>
          </div>
        </Wrapper>
      </div>
      <Helper additionalClassNames="h-[77px]" />
    </div>
  );
}