import svgPaths from "./svg-tooltip-button-icons";

function Button({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[20px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">{children}</div>
      <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[10px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(228,238,224,0.8)] content-stretch flex flex-col gap-[4px] items-start p-[12px] relative rounded-[8px] size-full">
      <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.12)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="relative shrink-0" data-name="Status badges*">
        <div className="content-stretch flex items-start relative">
          <div className="bg-[#436b1d] relative rounded-[10px] shrink-0" data-name="Badge - Light">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[8px] py-[4px] relative">
                <div className="flex flex-col font-['OracleBrand_VF_Tb:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="leading-[12px]">Healthy 86%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-medium font-medium leading-[21px] min-w-full not-italic relative shrink-0 text-[#161513] text-[11px] w-[min-content]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        Region: Dubai
      </p>
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <Button>
          <Icon>
            <path d={svgPaths.pea7b770} fill="var(--fill-0, #161513)" id="vector" />
          </Icon>
        </Button>
        <Button>
          <Icon>
            <path clipRule="evenodd" d={svgPaths.p2f8eab00} fill="var(--fill-0, #161513)" fillRule="evenodd" id="vector" />
          </Icon>
        </Button>
      </div>
    </div>
  );
}