import clsx from "clsx";
import svgPaths from "./svg-filter-table-icon";
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties} className={clsx("absolute flex items-center justify-center left-[353px]", additionalClassNames)}>
      {children}
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties} className={clsx("absolute flex items-center justify-center top-[108px]", additionalClassNames)}>
      {children}
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-start justify-center rounded-[3px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#b6b2ad] border-solid border-t inset-[-1px_0_0_0] pointer-events-none rounded-[3px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0">{children}</div>
    </div>
  );
}

function HelperbuttonLegend({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute inset-[12.5%_8.34%_12.5%_8.32%]" data-name="vector">
        {children}
      </div>
    </div>
  );
}

function HelperbuttonHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex gap-[8px] items-center ml-0 mt-0 relative row-1">{children}</div>
    </div>
  );
}

function Vector({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[8.33%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        {children}
      </svg>
    </div>
  );
}
type HealthProps = {
  additionalClassNames?: string;
  additionalClassNames1?: string;
};

function Health({ children, additionalClassNames = "", additionalClassNames1 = "" }: React.PropsWithChildren<HealthProps>) {
  return (
    <div className={clsx("bg-[#5f7d4f] relative rounded-[3px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#5f7d4f] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className={clsx("content-stretch flex items-center justify-center px-[2.5px] relative", additionalClassNames)}>
          <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

function GraphRegionHelper15({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div className="absolute inset-[8.33%]" data-name="vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          {children}
        </svg>
      </div>
    </div>
  );
}
type Text2Props = {
  text: string;
  additionalClassNames?: string;
};

function Text2({ text, children, additionalClassNames = "" }: React.PropsWithChildren<Text2Props>) {
  return (
    <div className={clsx("absolute bg-white content-stretch flex flex-col gap-[10px] h-[120px] items-end justify-center left-0 p-[5px] rounded-[5px] top-0 w-[135px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#d7d7d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="relative shrink-0 w-full">
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[15px] items-end pr-[10px] relative w-full">{children}</div>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-normal leading-[normal] not-italic relative shrink-0 text-[#00688c] text-[11px] text-right underline w-full">{text}</p>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-center", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
      <p className="h-[24px] leading-[normal] not-italic relative shrink-0 text-[#222] text-[9px] text-center w-[18.156px]">{text}</p>
      <GraphRegionAlertsErrorS />
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col gap-[10px] items-center top-[6.61px]", additionalClassNames)}>
      <p className="h-[14.103px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[17.727px]">{text}</p>
      <GraphRegionAlertsWarningS />
    </div>
  );
}
type GraphRegionHelper14Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper14({ additionalClassNames = "" }: GraphRegionHelper14Props) {
  return (
    <div className={clsx("absolute rounded-[5px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#b6b2ad] border-solid inset-[-1px] pointer-events-none rounded-[6px]" />
    </div>
  );
}

function GraphRegionHelper13() {
  return (
    <div className="absolute contents left-[185px] top-0">
      <div className="absolute border border-[#508223] border-solid h-[50px] left-[185px] rounded-[5px] top-0 w-[30px]" />
      <div className="absolute border border-[#508223] border-solid h-[50px] left-[185px] rounded-[5px] top-0 w-[30px]" />
    </div>
  );
}

function GraphRegionHelper12() {
  return (
    <div className="absolute contents left-[148px] top-0">
      <div className="absolute border border-[#508223] border-solid h-[50px] left-[148px] rounded-[5px] top-0 w-[30px]" />
      <div className="absolute border border-[#508223] border-solid h-[50px] left-[148px] rounded-[5px] top-0 w-[30px]" />
    </div>
  );
}

function GraphRegionHelper11() {
  return (
    <div className="absolute contents left-[111px] top-0">
      <div className="absolute contents left-[111px] top-0">
        <div className="absolute border border-[rgba(222,128,17,0.6)] border-solid h-[50px] left-[111px] rounded-[5px] top-0 w-[30px]" />
      </div>
    </div>
  );
}

function GraphRegionHelper10() {
  return (
    <div className="absolute contents left-[74px] top-0">
      <div className="absolute contents left-[74px] top-0">
        <div className="absolute border border-[rgba(222,128,17,0.6)] border-solid h-[50px] left-[74px] rounded-[5px] top-0 w-[30px]" />
      </div>
    </div>
  );
}

function GraphRegionHelper9() {
  return (
    <div className="absolute contents left-[37px] top-0">
      <div className="absolute border border-[#508223] border-solid h-[50px] left-[37px] rounded-[5px] top-0 w-[30px]" />
    </div>
  );
}

function GraphRegionHelper8() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute border border-[#508223] border-solid h-[50px] left-0 rounded-[5px] top-0 w-[30px]" />
    </div>
  );
}
type GraphRegionTextProps = {
  text: string;
  additionalClassNames?: string;
};

function GraphRegionText({ text, additionalClassNames = "" }: GraphRegionTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-center", additionalClassNames)}>
      <p className="h-[23px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[18px]">{text}</p>
      <Success className="relative shrink-0 size-[14px]" />
    </div>
  );
}
type GraphRegionHelper7Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper7({ additionalClassNames = "" }: GraphRegionHelper7Props) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="flex-none h-px rotate-[25.36deg] skew-x-[1.08deg] w-[103.81px]">
        <div className="relative size-full">
          <div className="absolute inset-[-1.33px_-1.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 106.477 2.66667">
              <path d={svgPaths.p2cb9c380} fill="var(--stroke-0, #B6B2AD)" id="Line 69" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type GraphRegionHelper6Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper6({ additionalClassNames = "" }: GraphRegionHelper6Props) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="flex-none h-px rotate-[38.21deg] skew-x-[1.37deg] w-[71.884px]">
        <div className="relative size-full">
          <div className="absolute inset-[-1.33px_-1.85%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74.551 2.66667">
              <path d={svgPaths.p56c6a00} fill="var(--stroke-0, #B6B2AD)" id="Line 68" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type GraphRegionHelper5Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper5({ additionalClassNames = "" }: GraphRegionHelper5Props) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="flex-none h-px rotate-[66.68deg] skew-x-[1.05deg] w-[48.415px]">
        <div className="relative size-full">
          <div className="absolute inset-[-1.33px_-2.75%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.0813 2.66667">
              <path d={svgPaths.p30383680} fill="var(--stroke-0, #B6B2AD)" id="Line 67" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type GraphRegionHelper4Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper4({ additionalClassNames = "" }: GraphRegionHelper4Props) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="flex-none h-px rotate-[112.21deg] skew-x-[-1.01deg] w-[48.024px]">
        <div className="relative size-full">
          <div className="absolute inset-[-1.33px_-2.78%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.6909 2.66667">
              <path d={svgPaths.p244d48f0} fill="var(--stroke-0, #B6B2AD)" id="Line 66" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type GraphRegionHelper3Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper3({ additionalClassNames = "" }: GraphRegionHelper3Props) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="flex-none h-px rotate-[141.29deg] skew-x-[-1.38deg] w-[71.094px]">
        <div className="relative size-full">
          <div className="absolute inset-[-1.33px_-1.88%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73.7611 2.66667">
              <path d={svgPaths.p3fa1aa80} fill="var(--stroke-0, #B6B2AD)" id="Line 65" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type GraphRegionHelper2Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper2({ additionalClassNames = "" }: GraphRegionHelper2Props) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="flex-none h-px rotate-[154.4deg] skew-x-[-1.09deg] w-[102.899px]">
        <div className="relative size-full">
          <div className="absolute inset-[-1.33px_-1.3%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 105.566 2.66667">
              <path d={svgPaths.pb71cb80} fill="var(--stroke-0, #B6B2AD)" id="Line 50" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type GraphRegionHelper1Props = {
  additionalClassNames?: string;
};

function GraphRegionHelper1({ additionalClassNames = "" }: GraphRegionHelper1Props) {
  return (
    <div className={clsx("absolute rounded-[3px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#b6b2ad] border-solid inset-[-1px] pointer-events-none rounded-[4px]" />
    </div>
  );
}

function GraphRegionAlertsErrorS() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <div className="absolute flex inset-[8.33%] items-center justify-center">
        <div className="-scale-y-100 flex-none rotate-180 size-[20px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.667 11.667">
              <path d={svgPaths.p1018c00} fill="var(--fill-0, #D63B25)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function GraphRegionAlertsWarningS() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <div className="absolute inset-[8.34%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.666 11.666">
          <path d={svgPaths.p7609c00} fill="var(--fill-0, #AC630C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}
type GraphRegionHelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function GraphRegionHelper({ text, text1, additionalClassNames = "" }: GraphRegionHelperProps) {
  return (
    <div className={clsx("leading-[normal] not-italic relative shrink-0 text-[0px] text-black", additionalClassNames)}>
      <p className="mb-0 text-[11px]">{text}</p>
      <p className="text-[#665f5b] text-[9px]">{text1}</p>
    </div>
  );
}

function LegendFutureTrailingIcon02Warning() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]">
      <div className="absolute left-0 size-[16px] top-0" data-name="Alerts / warning-s-24">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Alerts / warning-s-24">
            <path d={svgPaths.p31df3d00} fill="var(--fill-0, #AC630C)" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SearchVector() {
  return (
    <div className="relative shrink-0 size-[9px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <path d={svgPaths.p24a580} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}
type SearchLeftTextProps = {
  text: string;
};

function SearchLeftText({ text }: SearchLeftTextProps) {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[9px] top-[8px]">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="left icon">
        <div className="absolute inset-[3%]" data-name="magnify">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8 18.8">
            <path clipRule="evenodd" d={svgPaths.p351faf00} fill="var(--fill-0, #AEA8A2)" fillRule="evenodd" id="magnify" />
          </svg>
        </div>
      </div>
      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#665f5b] text-[14px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type SearchProps = {
  className?: string;
  state?: "Enabled" | "Default";
};

function Search({ className, state = "Default" }: SearchProps) {
  const isDefault = state === "Default";
  return (
    <div className={className || "h-[35px] relative w-[196px]"}>
      {isDefault && (
        <>
          <div className="absolute bg-white border border-[#bcb6b1] border-solid inset-0 rounded-[3px]" data-name="container" />
          <SearchLeftText text="Find resource on map" />
        </>
      )}
      {state === "Enabled" && (
        <div className="absolute contents left-0 top-0">
          <div className="absolute bg-white border border-[#bcb6b1] border-solid inset-0 rounded-[3px]" data-name="container" />
          <SearchLeftText text="New" />
          <div className="absolute flex h-[17.007px] items-center justify-center left-[69px] top-[10px] w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[17.007px]">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0074 1">
                    <line id="Line 155" stroke="var(--stroke-0, #222222)" x2="17.0074" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-white content-stretch flex flex-col gap-[24px] items-start left-px p-[10px] rounded-[3px] top-[37px] w-[195px]">
            <div aria-hidden="true" className="absolute border border-[#bcb6b1] border-solid inset-[-1px] pointer-events-none rounded-[4px]" />
            <div className="content-stretch flex gap-[7px] items-start relative shrink-0">
              <Health>
                <SearchVector />
                <div className="bg-white content-stretch flex h-[8px] items-center justify-center p-[2px] relative rounded-[5px] shrink-0">
                  <p className="font-medium font-medium leading-[12px] not-italic relative shrink-0 text-[#508223] text-[7px] text-center whitespace-nowrap">ePOP</p>
                </div>
                <p className="font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">DXB</p>
              </Health>
              <p className="font-normal leading-[12px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">New York (LGA)</p>
            </div>
            <div className="content-stretch flex gap-[7px] items-start relative shrink-0">
              <Health additionalClassNames="w-[38px]" additionalClassNames1="w-full">
                <SearchVector />
                <p className="font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">DXB</p>
              </Health>
              <p className="font-normal leading-[12px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">Newport (CWL)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowsCaretDown({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[20px]"} data-name="arrows/caret down">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5">
          <path d="M0 0H10L5 5L0 0Z" fill="var(--fill-0, #222222)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Success({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[20px]"} data-name="success">
      <Vector>
        <path clipRule="evenodd" d={svgPaths.p1e5f5780} fill="var(--fill-0, #508223)" fillRule="evenodd" id="Vector" />
      </Vector>
    </div>
  );
}

function Error({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[20px]"} data-name="error">
      <Vector>
        <path clipRule="evenodd" d={svgPaths.p6a7d580} fill="var(--fill-0, #D63B25)" fillRule="evenodd" id="Vector" />
      </Vector>
    </div>
  );
}
type LegendProps = {
  className?: string;
  state?: "Expanded" | "Collapsed";
};

function Legend({ className, state = "Expanded" }: LegendProps) {
  if (state === "Collapsed") {
    return (
      <div className={className || "h-[163px] relative w-[135px]"} data-name="State=Collapsed">
        <div className="absolute contents left-0 top-0">
          <Text2 text="How is this calculated?" additionalClassNames="opacity-0">
            <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
              <Error className="relative shrink-0 size-[16px]" />
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">Critical</p>
            </div>
            <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
              <LegendFutureTrailingIcon02Warning />
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">Warning</p>
            </div>
            <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
              <Success className="relative shrink-0 size-[16px]" />
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">Healthy</p>
            </div>
          </Text2>
        </div>
        <button className="absolute bg-[#eee] content-stretch cursor-pointer flex items-center justify-center left-0 p-[10px] rounded-[5px] top-[123px] w-[135px]">
          <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[5px]" />
          <HelperbuttonHelper>
            <HelperbuttonLegend>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3336 12">
                <path d={svgPaths.p1b2b2880} fill="var(--fill-0, #161513)" id="vector" />
              </svg>
            </HelperbuttonLegend>
            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Legend</p>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <ArrowsCaretDown className="overflow-clip relative size-[20px]" />
              </div>
            </div>
          </HelperbuttonHelper>
        </button>
      </div>
    );
  }
  return (
    <button className={className || "block cursor-pointer h-[163px] relative w-[135px]"} data-name="State=Expanded">
      <div className="absolute contents left-0 top-0">
        <Text2 text="How is this calculated?">
          <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
            <Error className="relative shrink-0 size-[16px]" />
            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Critical</p>
          </div>
          <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
            <LegendFutureTrailingIcon02Warning />
            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Warning</p>
          </div>
          <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
            <Success className="relative shrink-0 size-[16px]" />
            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Healthy</p>
          </div>
        </Text2>
      </div>
      <div className="absolute bg-[#eee] content-stretch flex items-center justify-center left-0 p-[10px] rounded-[5px] top-[123px] w-[135px]">
        <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <HelperbuttonHelper>
          <HelperbuttonLegend>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0004 18">
              <path d={svgPaths.p2c32df00} fill="var(--fill-0, #161513)" id="vector" />
            </svg>
          </HelperbuttonLegend>
          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Legend</p>
          <ArrowsCaretDown className="overflow-clip relative shrink-0 size-[20px]" />
        </HelperbuttonHelper>
      </div>
    </button>
  );
}

export default function GraphRegion() {
  return (
    <div className="relative size-full" data-name="Graph/Region">
      <div className="absolute contents inset-0">
        <div className="absolute contents inset-0">
          <div className="absolute contents inset-0">
            <div className="absolute contents inset-0">
              <div className="absolute contents inset-0">
                <div className="absolute contents inset-0">
                  <div aria-hidden="true" className="absolute border-[#b6b2ad] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none" />
                  <div className="absolute contents left-0 top-0">
                    <div className="absolute contents left-0 top-0">
                      <div className="absolute bg-white h-[527px] left-0 top-0 w-[1155px]" data-name="2560px-BlankMap-World-Flattened 1" />
                    </div>
                  </div>
                  <div className="absolute contents left-[195px] top-[33px]">
                    <div className="absolute flex h-[114px] items-center justify-center left-[727px] top-[211px] w-[108px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
                      <div className="flex-none rotate-[46.55deg]">
                        <div className="h-0 relative w-[157.035px]">
                          <div className="absolute inset-[-2.67px_-1.7%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 162.368 5.33333">
                              <path d={svgPaths.p2b059800} fill="var(--stroke-0, #D63B25)" id="Line 51" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute contents left-[452px] top-[43px]">
                      <div className="absolute bg-[#f1efed] content-stretch flex flex-col h-[62px] items-start left-[452px] p-[10px] rounded-[6px] top-[43px]">
                        <div aria-hidden="true" className="absolute border border-[#de8011] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <Wrapper>
                          <GraphRegionHelper15>
                            <path d={svgPaths.p36fdd780} fill="var(--fill-0, #161513)" id="vector" />
                          </GraphRegionHelper15>
                          <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
                            <GraphRegionHelper text="Backbone" text1="Some info. here" additionalClassNames="w-[67px]" />
                            <GraphRegionAlertsWarningS />
                          </div>
                        </Wrapper>
                      </div>
                    </div>
                    <div className="absolute contents left-[195px] top-[33px]">
                      <Wrapper3 additionalClassNames="h-[61px] top-[104px] w-[170px]">
                        <div className="flex-none rotate-[160.26deg]">
                          <div className="h-0 relative w-[180.613px]">
                            <div className="absolute inset-[-2.67px_-1.48%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 185.946 5.33333">
                                <path d={svgPaths.p3afd2cf0} fill="var(--stroke-0, #DE8011)" id="Line 55" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Wrapper3>
                      <Wrapper2 additionalClassNames="h-[49px] left-[721px] w-[127px]">
                        <div className="flex-none rotate-[158.9deg]">
                          <div className="h-0 relative w-[136.125px]">
                            <div className="absolute inset-[-2.67px_-1.96%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 141.458 5.33333">
                                <path d={svgPaths.p1e06dd80} fill="var(--stroke-0, #DE8011)" id="Line 58" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Wrapper2>
                      <Wrapper2 additionalClassNames="h-[57px] left-[278px] w-[75px]">
                        <div className="flex-none rotate-[37.23deg]">
                          <div className="h-0 relative w-[94.202px]">
                            <div className="absolute inset-[-2.67px_-2.83%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.5352 5.33333">
                                <path d={svgPaths.p10ce5f0} fill="var(--stroke-0, #508223)" id="Line 52" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Wrapper2>
                      <Wrapper2 additionalClassNames="h-[49px] left-[278px] w-[443px]">
                        <div className="flex-none rotate-[6.31deg]">
                          <div className="h-0 relative w-[445.702px]">
                            <div className="absolute inset-[-2.67px_-0.6%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 451.035 5.33333">
                                <path d={svgPaths.p14244e80} fill="var(--stroke-0, #508223)" id="Line 68" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Wrapper2>
                      <div className="absolute flex h-[53px] items-center justify-center left-[522.29px] top-[104px] w-[199.424px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
                        <div className="flex-none rotate-[14.17deg]">
                          <div className="h-[2.909px] relative w-[204.95px]">
                            <div className="absolute inset-[-91.68%_-1.3%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 210.283 8.24202">
                                <g id="Line 65">
                                  <path d={svgPaths.p38405600} fill="var(--stroke-0, #D63B25)" />
                                  <path d={svgPaths.p38405600} fill="var(--stroke-1, #508223)" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Wrapper3 additionalClassNames="h-[85px] top-[80px] w-[401px]">
                        <div className="flex-none rotate-[168.03deg]">
                          <div className="h-0 relative w-[409.91px]">
                            <div className="absolute inset-[-2.67px_-0.65%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 415.243 5.33333">
                                <path d={svgPaths.p2544b800} fill="var(--stroke-0, #508223)" id="Line 64" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Wrapper3>
                      <div className="absolute contents left-[754px] top-[33px]">
                        <div className="absolute bg-[#f1efed] content-stretch flex flex-col h-[75px] items-start left-[754px] p-[10px] rounded-[6px] top-[33px] w-[161px]">
                          <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[6px]" />
                          <Wrapper>
                            <div className="relative shrink-0 size-[24px]" data-name="adapter">
                              <div className="absolute bottom-1/4 left-[8.33%] right-[8.34%] top-1/4" data-name="vector">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 12">
                                  <path d={svgPaths.p1fd1400} fill="var(--fill-0, #161513)" id="vector" />
                                </svg>
                              </div>
                            </div>
                            <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
                              <div className="leading-[normal] not-italic relative shrink-0 text-[0px] text-black w-[112px]">
                                <p className="font-normal mb-0 text-[11px]">Customer Network (VPN/FastConnect)</p>
                                <p className="text-[#665f5b] text-[9px]">Some info. here</p>
                              </div>
                              <Success className="relative shrink-0 size-[14px]" />
                            </div>
                          </Wrapper>
                        </div>
                      </div>
                      <div className="absolute contents left-[195px] top-[42px]">
                        <div className="absolute bg-[#f1efed] content-stretch flex flex-col h-[66px] items-start left-[195px] p-[10px] rounded-[6px] top-[42px] w-[166px]">
                          <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[6px]" />
                          <Wrapper>
                            <GraphRegionHelper15>
                              <path d={svgPaths.pc763800} fill="var(--fill-0, #161513)" id="vector" />
                            </GraphRegionHelper15>
                            <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
                              <GraphRegionHelper text="Internet" text1="Some info. here" additionalClassNames="w-[78px]" />
                              <Success className="relative shrink-0 size-[14px]" />
                            </div>
                          </Wrapper>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute contents left-[325px] top-[155px]">
                    <div className="absolute content-stretch flex flex-col h-[78px] items-start left-[325px] p-[10px] rounded-[6px] top-[155px]">
                      <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[6px]" />
                      <div className="h-[56px] relative shrink-0 w-[147px]">
                        <div className="absolute contents left-0 top-0">
                          <div className="absolute bg-[rgba(255,255,255,0.1)] border border-[#d63b25] border-solid h-[56px] left-0 rounded-[5px] top-0 w-[36px]" />
                          <div className="absolute contents left-[3px] top-[3px]">
                            <div className="absolute contents left-[3px] top-[3px]">
                              <div className="absolute bg-[rgba(214,59,37,0)] border border-[#d63b25] border-solid h-[50px] left-[3px] rounded-[5px] top-[3px] w-[30px]" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute content-stretch flex items-center left-[46px] top-[8px]">
                          <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
                            <GraphRegionHelper text="POP-2" text1="Some info. here" additionalClassNames="w-[67px]" />
                            <GraphRegionAlertsErrorS />
                          </div>
                        </div>
                        <div className="absolute content-stretch flex flex-col items-center left-[6px] top-[8px]">
                          <p className="h-[25px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[24px]">BLD 22</p>
                          <GraphRegionAlertsErrorS />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[109px] size-[24px] top-[149px]" data-name="Future / Trailing Icon / 02. Warning" />
                  <div className="-translate-x-1/2 absolute bg-[#f5f4f2] bottom-[93.55%] content-stretch flex items-center left-[calc(50%+369.5px)] px-[10px] py-[5px] rounded-[5px] top-[1.33%]">
                    <div aria-hidden="true" className="absolute border border-[#bcb6b1] border-solid inset-0 pointer-events-none rounded-[5px]" />
                    <Wrapper>
                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                        <div className="col-1 content-stretch flex items-center ml-0 mt-0 relative row-1">
                          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#312d2a] text-[14px] whitespace-nowrap">Showing data for Aug 18, 2023 23:55pm UTC (Latest)</p>
                        </div>
                      </div>
                      <div className="relative shrink-0 size-[16px]" data-name="refresh">
                        <div className="absolute inset-[16.67%_9.56%_12.5%_8.33%]" data-name="vector">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1381 11.3333">
                            <path clipRule="evenodd" d={svgPaths.p27766f00} fill="var(--fill-0, #161513)" fillRule="evenodd" id="vector" />
                          </svg>
                        </div>
                      </div>
                    </Wrapper>
                  </div>
                  <Wrapper3 additionalClassNames="h-[87px] top-[221px] w-[160px]">
                    <div className="flex-none rotate-[28.54deg]">
                      <div className="h-0 relative w-[182.124px]">
                        <div className="absolute inset-[-2.67px_-1.46%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 187.457 5.33333">
                            <path d={svgPaths.p2bdaca00} fill="var(--stroke-0, #D63B25)" id="Line 50" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Wrapper3>
                  <div className="absolute flex h-[62px] items-center justify-center left-[201px] top-[221px] w-[152px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
                    <div className="flex-none rotate-[-22.19deg]">
                      <div className="h-0 relative w-[164.158px]">
                        <div className="absolute inset-[-2.67px_-1.62%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169.492 5.33333">
                            <path d={svgPaths.p2ed5d780} fill="var(--stroke-0, #508223)" id="Line 69" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute contents inset-[58.54%_43.75%_6.14%_32.99%]">
              <div className="absolute contents inset-[58.54%_43.75%_6.14%_32.99%]">
                <GraphRegionHelper1 additionalClassNames="inset-[58.54%_43.75%_6.14%_32.99%]" />
              </div>
              <Wrapper1 additionalClassNames="inset-[60.31%_60.64%_31.53%_33.77%]">
                <GraphRegionHelper text="AD-2" text1="Some info. here" additionalClassNames="w-[65px]" />
                <GraphRegionAlertsErrorS />
              </Wrapper1>
              <div className="absolute contents inset-[61.68%_46.25%_9.08%_35.24%]">
                <div className="absolute contents inset-[61.68%_53.91%_27.33%_42.97%]">
                  <GraphRegionHelper1 additionalClassNames="bg-white inset-[61.68%_53.91%_27.33%_42.97%]" />
                  <div className="absolute contents inset-[62.27%_54.17%_27.92%_43.23%]">
                    <div className="absolute contents inset-[62.27%_54.17%_27.92%_43.23%]">
                      <GraphRegionHelper1 additionalClassNames="bg-white inset-[62.27%_54.17%_27.92%_43.23%]" />
                    </div>
                  </div>
                </div>
                <GraphRegionHelper2 additionalClassNames="inset-[72.67%_55.47%_18.89%_36.55%]" />
                <GraphRegionHelper3 additionalClassNames="inset-[72.67%_55.47%_18.89%_39.76%]" />
                <GraphRegionHelper4 additionalClassNames="inset-[72.67%_55.47%_18.89%_42.97%]" />
                <GraphRegionHelper5 additionalClassNames="inset-[72.67%_53.82%_18.89%_44.53%]" />
                <GraphRegionHelper6 additionalClassNames="inset-[72.67%_50.61%_18.89%_44.53%]" />
                <GraphRegionHelper7 additionalClassNames="inset-[72.67%_47.4%_18.89%_44.53%]" />
                <div className="absolute inset-[81.11%_46.25%_9.08%_35.24%] rounded-[3px]">
                  <div aria-hidden="true" className="absolute border-[#b6b2ad] border-solid border-t inset-[-1px_0_0_0] pointer-events-none rounded-[3px]" />
                  <div className="absolute contents left-0 top-0">
                    <div className="absolute bg-white border border-[#508223] border-solid h-[50px] left-0 rounded-[5px] top-0 w-[30px]" />
                  </div>
                  <div className="absolute contents left-[37px] top-0">
                    <div className="absolute bg-white border border-[#508223] border-solid h-[50px] left-[37px] rounded-[5px] top-0 w-[30px]" />
                  </div>
                  <div className="absolute contents left-[74px] top-0">
                    <div className="absolute contents left-[74px] top-0">
                      <div className="absolute bg-white border border-[rgba(222,128,17,0.6)] border-solid h-[50px] left-[74px] rounded-[5px] top-0 w-[30px]" />
                    </div>
                  </div>
                  <div className="absolute contents left-[111px] top-0">
                    <div className="absolute contents left-[111px] top-0">
                      <div className="absolute bg-white border border-[rgba(222,128,17,0.6)] border-solid h-[50px] left-[111px] rounded-[5px] top-0 w-[30px]" />
                    </div>
                  </div>
                  <div className="absolute contents left-[148px] top-0">
                    <div className="absolute bg-white border border-[#508223] border-solid h-[50px] left-[148px] rounded-[5px] top-0 w-[30px]" />
                  </div>
                  <div className="absolute contents left-[185px] top-0">
                    <div className="absolute bg-white border border-[#508223] border-solid h-[50px] left-[185px] rounded-[5px] top-0 w-[30px]" />
                  </div>
                  <GraphRegionText text="BLD 09" additionalClassNames="left-[6.48px] top-[5.61px]" />
                  <GraphRegionText text="BLD 10" additionalClassNames="left-[43.48px] top-[5.61px]" />
                  <GraphRegionText text="BLD 13" additionalClassNames="left-[154.48px] top-[5.61px]" />
                  <GraphRegionText text="BLD 14" additionalClassNames="left-[190.48px] top-[5.61px]" />
                  <div className="absolute content-stretch flex flex-col items-center left-[79.48px] top-[5.61px]">
                    <p className="h-[23px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[20px]">BLD 11</p>
                    <GraphRegionAlertsWarningS />
                  </div>
                  <div className="absolute content-stretch flex flex-col items-center left-[116.48px] top-[5.61px]">
                    <p className="h-[22px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[19px]">BLD 12</p>
                    <GraphRegionAlertsWarningS />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute contents inset-[50.66%_16.23%_6.14%_5.85%]">
              <div className="absolute contents inset-[50.66%_70.88%_14.02%_5.85%]">
                <GraphRegionHelper1 additionalClassNames="inset-[50.66%_70.88%_14.02%_5.85%]" />
              </div>
              <div className="absolute content-stretch flex inset-[52.43%_87.77%_39.41%_6.63%] items-center">
                <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
                  <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
                    <GraphRegionHelper text="AD-1" text1="Some info. here" additionalClassNames="w-[65px]" />
                    <GraphRegionAlertsWarningS />
                  </div>
                </div>
              </div>
              <div className="absolute contents inset-[58.54%_16.23%_6.14%_60.5%]">
                <div className="absolute contents inset-[58.54%_16.23%_6.14%_60.5%]">
                  <GraphRegionHelper1 additionalClassNames="inset-[58.54%_16.23%_6.14%_60.5%]" />
                </div>
                <div className="absolute contents inset-[72.67%_18.74%_9.08%_62.76%]">
                  <div className="absolute inset-[81.11%_18.74%_9.08%_62.76%] rounded-[3px]">
                    <div aria-hidden="true" className="absolute border-[#b6b2ad] border-solid border-t inset-[-1px_0_0_0] pointer-events-none rounded-[3px]" />
                    <GraphRegionHelper8 />
                    <GraphRegionHelper9 />
                    <GraphRegionHelper10 />
                    <GraphRegionHelper11 />
                    <GraphRegionHelper12 />
                    <GraphRegionHelper13 />
                    <GraphRegionText text="BLD 16" additionalClassNames="left-[5.72px] top-[6.61px]" />
                    <GraphRegionText text="BLD 17" additionalClassNames="left-[42.72px] top-[6.61px]" />
                    <div className="absolute content-stretch flex flex-col items-center left-[78.72px] top-[6.61px]">
                      <p className="h-[22px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[21px]">BLD 18</p>
                      <GraphRegionAlertsWarningS />
                    </div>
                    <div className="absolute content-stretch flex flex-col items-center left-[115.72px] top-[6.61px]">
                      <p className="h-[22px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[20px]">BLD 19</p>
                      <GraphRegionAlertsWarningS />
                    </div>
                    <GraphRegionText text="BLD 20" additionalClassNames="left-[153.72px] top-[6.61px]" />
                    <GraphRegionText text="BLD 21" additionalClassNames="left-[191.72px] top-[6.61px]" />
                  </div>
                  <GraphRegionHelper2 additionalClassNames="inset-[72.67%_27.95%_18.89%_64.06%]" />
                  <GraphRegionHelper3 additionalClassNames="inset-[72.67%_27.95%_18.89%_67.27%]" />
                  <GraphRegionHelper4 additionalClassNames="inset-[72.67%_27.95%_18.89%_70.49%]" />
                  <GraphRegionHelper5 additionalClassNames="inset-[72.67%_26.3%_18.89%_72.05%]" />
                  <GraphRegionHelper6 additionalClassNames="inset-[72.67%_23.09%_18.89%_72.05%]" />
                  <GraphRegionHelper7 additionalClassNames="inset-[72.67%_19.88%_18.89%_72.05%]" />
                </div>
                <Wrapper1 additionalClassNames="inset-[60.31%_33.12%_31.53%_61.28%]">
                  <GraphRegionHelper text="AD-3" text1="Some info. here" additionalClassNames="w-[65px]" />
                  <GraphRegionAlertsWarningS />
                </Wrapper1>
              </div>
              <div className="absolute contents inset-[54.32%_73.39%_16.96%_8.11%]">
                <div className="absolute contents inset-[54.32%_81.27%_35.88%_16.13%]">
                  <div className="absolute contents inset-[54.32%_81.27%_35.88%_16.13%]">
                    <div className="absolute contents inset-[54.32%_81.27%_35.88%_16.13%]">
                      <GraphRegionHelper14 additionalClassNames="inset-[54.32%_81.27%_35.88%_16.13%]" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-[73.23%_73.39%_16.96%_8.11%]">
                  <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
                  <GraphRegionHelper8 />
                  <GraphRegionHelper9 />
                  <GraphRegionHelper10 />
                  <GraphRegionHelper11 />
                  <GraphRegionHelper12 />
                  <GraphRegionHelper13 />
                  <GraphRegionText text="BLD 02" additionalClassNames="left-[6.18px] top-[5.61px]" />
                  <GraphRegionText text="BLD 03" additionalClassNames="gap-px left-[43.18px] top-[5.61px]" />
                  <div className="absolute content-stretch flex flex-col items-start left-[154.18px] top-[6.61px]">
                    <p className="h-[23px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[18px]">BLD 06</p>
                    <Success className="relative shrink-0 size-[14px]" />
                  </div>
                  <GraphRegionText text="BLD 07" additionalClassNames="left-[191.18px] top-[7.61px]" />
                  <Text text="BLD 04" additionalClassNames="left-[80.18px]" />
                  <Text text="BLD 05" additionalClassNames="left-[117.18px]" />
                </div>
                <GraphRegionHelper2 additionalClassNames="inset-[64.79%_82.6%_26.77%_9.41%]" />
                <GraphRegionHelper3 additionalClassNames="inset-[64.79%_82.6%_26.77%_12.62%]" />
                <GraphRegionHelper4 additionalClassNames="inset-[64.79%_82.6%_26.77%_15.83%]" />
                <GraphRegionHelper5 additionalClassNames="inset-[64.79%_80.95%_26.77%_17.4%]" />
                <GraphRegionHelper6 additionalClassNames="inset-[64.79%_77.74%_26.77%_17.4%]" />
                <GraphRegionHelper7 additionalClassNames="inset-[64.79%_74.53%_26.77%_17.4%]" />
              </div>
            </div>
          </div>
          <div className="absolute contents inset-[28.01%_28.48%_57.08%_60.07%]">
            <div className="absolute content-stretch flex flex-col inset-[28.01%_28.48%_57.08%_60.07%] items-start p-[10px] rounded-[6px]">
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
                    <GraphRegionHelper text="POP-1" text1="Some info. here" additionalClassNames="w-[67px]" />
                    <Success className="relative shrink-0 size-[14px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-[22.77%_1.03%_20.68%_95.18%]" data-name="Zoom">
            <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
            <div className="absolute contents inset-0" data-name="Zoom bar">
              <div className="absolute flex inset-[0_0_10.07%_0] items-center justify-center">
                <div className="-rotate-90 flex-none h-[44px] w-[268px]">
                  <div className="content-stretch flex flex-col items-start relative size-full" data-name="Slider - Single">
                    <div className="h-[44px] relative shrink-0 w-full" data-name=". Single Slider">
                      <div className="absolute h-[20px] left-0 right-[20%] top-[12px]" data-name="Thumb + Track">
                        <div className="absolute bg-[rgba(49,45,42,0.15)] h-[2px] left-[90.49%] right-[-25%] rounded-br-[2px] rounded-tr-[2px] top-[9px]" data-name="Well" />
                        <div className="absolute bg-[rgba(49,45,42,0.15)] h-[2px] left-0 right-[20.4px] rounded-bl-[2px] rounded-tl-[2px] top-[9px]" data-name="Track" />
                        <div className="absolute bg-white border-2 border-[#161513] border-solid right-[182.4px] rounded-[6px] size-[20px] top-0" data-name="Thumb" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-white border border-[rgba(22,21,19,0.5)] border-solid inset-[91.61%_6.82%_0_11.36%] rounded-[4px]" data-name="Input">
                <div className="absolute h-[10px] left-[11.96px] top-[5px] w-[19px]" data-name=".Input Content/Label Top/Complex/Enabled">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Oracle_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] left-[4.54px] not-italic overflow-hidden text-[#161513] text-[10px] text-center text-ellipsis top-[7px] w-[33px] whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                    <p className="leading-[12px] overflow-hidden">10%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GraphRegionHelper14 additionalClassNames="bg-[rgba(255,255,255,0.1)] inset-[53.73%_81.01%_35.29%_15.87%]" />
        <div className="absolute contents inset-[55.49%_81.71%_37.3%_16.73%]">
          <Text1 text="BLD 01" additionalClassNames="inset-[55.49%_81.71%_37.3%_16.73%]" />
        </div>
        <div className="absolute contents inset-[63.57%_54.63%_29.22%_43.8%]">
          <Text1 text="BLD 08" additionalClassNames="inset-[63.57%_54.63%_29.22%_43.8%]" />
        </div>
        <div className="absolute contents inset-[61.8%_26.39%_27.21%_70.48%]">
          <GraphRegionHelper1 additionalClassNames="bg-[rgba(255,255,255,0.1)] inset-[61.8%_26.39%_27.21%_70.48%]" />
          <div className="absolute contents inset-[62.39%_26.66%_27.8%_70.74%]">
            <div className="absolute contents inset-[62.39%_26.66%_27.8%_70.74%]">
              <GraphRegionHelper1 additionalClassNames="inset-[62.39%_26.66%_27.8%_70.74%]" />
            </div>
          </div>
          <div className="absolute contents inset-[63.37%_27.18%_29.42%_71.26%]">
            <div className="absolute content-stretch flex flex-col inset-[63.37%_27.18%_29.42%_71.26%] items-center">
              <div aria-hidden="true" className="absolute border-[#b6b2ad] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
              <p className="h-[24px] leading-[normal] not-italic relative shrink-0 text-[#222] text-[9px] text-center w-[18.156px]">BLD 15</p>
              <GraphRegionAlertsErrorS />
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[31.78%_36.66%_60.63%_61.62%]">
          <div className="absolute content-stretch flex flex-col inset-[31.78%_36.66%_60.63%_61.62%] items-center">
            <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
            <p className="h-[24px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[20px]">BLD 23</p>
            <Success className="relative shrink-0 size-[16px]" />
          </div>
        </div>
      </div>
      <Legend className="absolute inset-[62.81%_4.3%_6.26%_84.08%]" state="Collapsed" />
      <div className="absolute flex inset-[40.23%_37.44%_41.56%_44.15%] items-center justify-center">
        <div className="flex-none h-px rotate-[155.84deg] w-[234.546px]">
          <div className="relative size-full">
            <div className="absolute inset-[-2.67px_-1.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 239.88 5.33333">
                <path d={svgPaths.p1d89a80} fill="var(--stroke-0, #DE8011)" id="Line 51" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Search className="absolute h-[35px] left-[13px] top-[12px] w-[196px]" />
    </div>
  );
}