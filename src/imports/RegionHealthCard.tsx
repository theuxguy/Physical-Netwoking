import clsx from "clsx";
import svgPaths from "./svg-issues-summary-icons";
type Frame626607ButtonProps = {
  additionalClassNames?: string;
};

function Frame626607Button({ children, additionalClassNames = "" }: React.PropsWithChildren<Frame626607ButtonProps>) {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[36px]">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="Icon">
            <div className={clsx("absolute", additionalClassNames)}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                {children}
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.5)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(228,238,224,0.8)] content-stretch flex flex-col items-start justify-between p-[12px] relative rounded-[8px] size-full">
      <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.12)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="relative shrink-0" data-name="Status badges*">
        <div className="content-stretch flex items-start relative">
          <div className="bg-[#436b1d] relative rounded-[12px] shrink-0" data-name="Badge - Light">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[12px] py-[4px] relative">
                <div className="flex flex-col font-['OracleBrand_VF_Tb:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="leading-[16px]">Healthy 86%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] min-w-full not-italic relative shrink-0 text-[#161513] text-[16px] w-[min-content]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        Region: Dubai
      </p>
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <Frame626607Button additionalClassNames="inset-[8.33%_8.34%_8.33%_8.32%]">
          <path d={svgPaths.p2a52b300} fill="var(--fill-0, #161513)" id="vector" />
        </Frame626607Button>
        <Frame626607Button additionalClassNames="inset-[8.33%]">
          <path clipRule="evenodd" d={svgPaths.p1e36a00} fill="var(--fill-0, #161513)" fillRule="evenodd" id="vector" />
        </Frame626607Button>
      </div>
    </div>
  );
}