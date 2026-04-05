import clsx from "clsx";
import svgPaths from "./svg-select-menu-icon";

function FilterAlt({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute inset-[8.33%_3.99%_9.92%_3.97%]" data-name="vector">
        {children}
      </div>
    </div>
  );
}
type TableText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TableText2({ text, children, additionalClassNames = "" }: React.PropsWithChildren<TableText2Props>) {
  return (
    <div className={clsx("bg-[#eee] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0", additionalClassNames)}>
      <FilterAlt>{children}</FilterAlt>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">{text}</p>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#eee] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[41px] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[10px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};
type TableHelper4Props = {
  additionalClassNames?: string;
};

function TableHelper4({ children, additionalClassNames = "" }: React.PropsWithChildren<TableHelper4Props>) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <div className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre">{children}</div>
    </Wrapper>
  );
}
type TableHelper3Props = {
  additionalClassNames?: string;
};

function TableHelper3({ children, additionalClassNames = "" }: React.PropsWithChildren<TableHelper3Props>) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <div className="font-['Helvetica_Neue:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre">{children}</div>
    </Wrapper>
  );
}
type TableText1Props = {
  text: string;
};

function TableText1({ text, children }: React.PropsWithChildren<TableText1Props>) {
  return (
    <Wrapper1>
      <FilterAlt>{children}</FilterAlt>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">{text}</p>
    </Wrapper1>
  );
}
type TableHelper2Props = {
  additionalClassNames?: string;
};

function TableHelper2({ additionalClassNames = "" }: TableHelper2Props) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}
type TableHelper1Props = {
  additionalClassNames?: string;
};

function TableHelper1({ additionalClassNames = "" }: TableHelper1Props) {
  return (
    <div className={clsx("h-[41px] relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-end size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}
type TableHelperProps = {
  text: string;
  text1: string;
};

function TableHelper({ text, text1 }: TableHelperProps) {
  return (
    <div className="bg-[#eee] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-end px-[25px] py-[10px] relative w-full">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#00688c] text-[14px] underline whitespace-nowrap">{text}</p>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="bg-[#227e9e] col-1 content-stretch flex items-center justify-center ml-0 mt-0 px-[2.5px] relative rounded-[3px] row-1">
              <div aria-hidden="true" className="absolute border border-[#00688c] border-solid inset-0 pointer-events-none rounded-[3px]" />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">{text1}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center p-[10px] relative", additionalClassNames)}>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#00688c] text-[14px] underline whitespace-nowrap">{text}</p>
    </div>
  );
}
type TableTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TableText({ text, additionalClassNames = "" }: TableTextProps) {
  return (
    <div className={clsx("bg-[#eee] relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <Text text={text} additionalClassNames="size-full" />
      </div>
    </div>
  );
}
type TableProps = {
  className?: string;
  level?: "Realm";
  type?: "Cross-region Latency";
  variable?: "Latency" | "Packet loss";
};

function Table({ className, level = "Realm", type = "Cross-region Latency", variable = "Latency" }: TableProps) {
  const isRealmAndCrossRegionLatencyAndLatency = level === "Realm" && type === "Cross-region Latency" && variable === "Latency";
  const isRealmAndCrossRegionLatencyAndPacketLoss = level === "Realm" && type === "Cross-region Latency" && variable === "Packet loss";
  return (
    <div className={className || "h-[444px] relative w-[1162px]"}>
      <div className="content-stretch flex items-start relative size-full">
        <div className="content-stretch flex items-start relative shrink-0 w-[145px]">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-l border-solid border-t inset-[-1px_0_-1px_-1px] pointer-events-none" />
          <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
            <Wrapper1>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">Region</p>
              <div className="relative shrink-0 size-[16px]" data-name="SORT">
                <div className="absolute inset-[16.67%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 16 16" : "0 0 10.6667 10.6667"}>
                    <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.p1baa3200 : svgPaths.p33861080} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #607799)" : "var(--fill-0, #665F5B)"} id="Vector" />
                  </svg>
                </div>
              </div>
            </Wrapper1>
            <TableText text="BOM" additionalClassNames="h-[41px]" />
            <TableText text="DXB" additionalClassNames="h-[41px]" />
            <div className="bg-[#eee] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <Text text="FRA" additionalClassNames="w-full" />
              </div>
            </div>
            <div className="bg-[#eee] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <Text text="IAD" additionalClassNames="w-full" />
              </div>
            </div>
            <div className="bg-[#eee] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <Text text="JNB" additionalClassNames="w-full" />
              </div>
            </div>
            <div className="bg-[#eee] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <Text text="KIX" additionalClassNames="w-full" />
              </div>
            </div>
            <TableHelper text="LGA" text1="POP" />
            <div className="bg-[#eee] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <Text text="NRT" additionalClassNames="w-full" />
              </div>
            </div>
            <TableHelper text="SEA" text1="POP" />
            <div className="bg-[#eee] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <Text text="SJC" additionalClassNames="w-full" />
              </div>
            </div>
            <TableText text="SYD" additionalClassNames="h-[32px]" />
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText1 text="BOM">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText1>
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper2 additionalClassNames="bg-[rgba(255,255,255,0.2)] h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText1 text="DXB">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText1>
          <TableHelper3 additionalClassNames="bg-[rgba(80,130,35,0.4)]">
            <p className={`leading-[normal] mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[12px]" : undefined}>
              <span className={`leading-[normal] ${isRealmAndCrossRegionLatencyAndPacketLoss ? "" : "text-[12px]"}`}>{isRealmAndCrossRegionLatencyAndPacketLoss ? " " : "   "}</span>
              <span className={`leading-[normal] ${isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] not-italic' : "text-[11px]"}`}>{isRealmAndCrossRegionLatencyAndPacketLoss ? "  26.3 %" : "26.3 %"}</span>
            </p>
          </TableHelper3>
          <TableHelper2 additionalClassNames="bg-[rgba(255,255,255,0.2)] h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[41px]" />
          <TableHelper2 additionalClassNames="bg-white h-[33px]" />
          <TableHelper2 additionalClassNames="bg-white h-[51px]" />
          <TableHelper2 additionalClassNames="bg-white h-[39px]" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText1 text="FRA">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText1>
          <Wrapper additionalClassNames="bg-[#b9cda7]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[normal]" : "leading-[0]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] leading-[normal] text-[12px]'}`}>25.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : undefined}>
                {isRealmAndCrossRegionLatencyAndLatency && (
                  <>
                    <span className="leading-[normal] text-[12px]">{`   `}</span>
                    <span className="leading-[normal] text-[11px]">26.3 %</span>
                  </>
                )}
                {isRealmAndCrossRegionLatencyAndPacketLoss && "   26.3 %"}
              </p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText1 text="IAD">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText1>
          <TableHelper4 additionalClassNames="bg-[rgba(222,128,17,0.4)]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   126.3 %`}</p>
          </TableHelper4>
          <TableHelper3 additionalClassNames="bg-[#efb1a8]">
            <p className={`leading-[normal] mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>155.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>
              <span className="leading-[normal]">{`  `}</span>
              <span className="leading-[normal] text-[#222]">{` 176.3 %`}</span>
            </p>
          </TableHelper3>
          <Wrapper additionalClassNames="bg-[rgba(214,59,37,0.4)]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[0]" : "leading-[normal]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[normal] text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>{isRealmAndCrossRegionLatencyAndPacketLoss ? "155.1 m/s" : "156.1 m/s"}</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>
                {isRealmAndCrossRegionLatencyAndLatency && "   176.3 %"}
                {isRealmAndCrossRegionLatencyAndPacketLoss && (
                  <>
                    <span className="leading-[normal]">{`  `}</span>
                    <span className="leading-[normal] text-[#222]">{` 176.3 %`}</span>
                  </>
                )}
              </p>
            </div>
          </Wrapper>
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.2)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.2)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.2)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.2)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.2)]" />
          <TableHelper1 additionalClassNames="bg-white" />
          <TableHelper1 additionalClassNames="bg-white" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText1 text="JNB">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText1>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[rgba(222,128,17,0.4)]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   126.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText1 text="KIX">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText1>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <Wrapper additionalClassNames="bg-[rgba(214,59,37,0.4)]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[0]" : "leading-[normal]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[normal] text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>155.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>
                {isRealmAndCrossRegionLatencyAndLatency && "   176.3 %"}
                {isRealmAndCrossRegionLatencyAndPacketLoss && (
                  <>
                    <span className="leading-[normal]">{`  `}</span>
                    <span className="leading-[normal] text-[#222]">{` 176.3 %`}</span>
                  </>
                )}
              </p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <Wrapper additionalClassNames="bg-[#b9cda7]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] leading-[normal] not-italic relative shrink-0 text-[#222] text-[0px] text-right ${isRealmAndCrossRegionLatencyAndPacketLoss ? "w-[53px] whitespace-pre-wrap" : "whitespace-nowrap whitespace-pre"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[rgba(222,128,17,0.4)]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   126.3 %`}</p>
          </TableHelper4>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#aea8a2] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText2 text="LGA" additionalClassNames="w-[98px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText2>
          <Wrapper additionalClassNames="bg-[rgba(214,59,37,0.4)]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[0]" : "leading-[normal]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[normal] text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>155.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>
                {isRealmAndCrossRegionLatencyAndLatency && "   176.3 %"}
                {isRealmAndCrossRegionLatencyAndPacketLoss && (
                  <>
                    <span className="leading-[normal]">{`  `}</span>
                    <span className="leading-[normal] text-[#222]">{` 176.3 %`}</span>
                  </>
                )}
              </p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[#f2cca0]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{isRealmAndCrossRegionLatencyAndPacketLoss ? "   126.3 %" : "   26.3 %"}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[rgba(222,128,17,0.4)]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   126.3 %`}</p>
          </TableHelper4>
          <Wrapper additionalClassNames="bg-[#b9cda7]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] leading-[normal] not-italic relative shrink-0 text-[#222] text-[0px] whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "" : "text-right"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
            </div>
          </Wrapper>
          <Wrapper additionalClassNames="bg-[#b9cda7]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] leading-[normal] not-italic relative shrink-0 text-[#222] text-[0px] whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "" : "text-right"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
            </div>
          </Wrapper>
          <Wrapper additionalClassNames="bg-[rgba(214,59,37,0.4)]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[0]" : "leading-[normal]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[normal] text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>155.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>
                {isRealmAndCrossRegionLatencyAndLatency && "   176.3 %"}
                {isRealmAndCrossRegionLatencyAndPacketLoss && (
                  <>
                    <span className="leading-[normal]">{`  `}</span>
                    <span className="leading-[normal] text-[#222]">{` 176.3 %`}</span>
                  </>
                )}
              </p>
            </div>
          </Wrapper>
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
          <TableHelper1 additionalClassNames="bg-[rgba(255,255,255,0.4)]" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#aea8a2] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText2 text="NRT" additionalClassNames="w-[98px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText2>
          <Wrapper additionalClassNames="bg-[#b9cda7]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[0] text-[11px]" : "leading-[normal]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>
                {isRealmAndCrossRegionLatencyAndLatency && "25.1 m/s"}
                {isRealmAndCrossRegionLatencyAndPacketLoss && (
                  <>
                    <span className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic">25.1</span>
                    <span className="leading-[normal]">{` m/s`}</span>
                  </>
                )}
              </p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] leading-[normal]' : "text-[11px]"}>{`   26.3 %`}</p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#aea8a2] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText2 text="SEA" additionalClassNames="w-[98px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText2>
          <Wrapper additionalClassNames="bg-[rgba(214,59,37,0.4)]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[0]" : "leading-[normal]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[normal] text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>155.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>
                {isRealmAndCrossRegionLatencyAndLatency && "   176.3 %"}
                {isRealmAndCrossRegionLatencyAndPacketLoss && (
                  <>
                    <span className="leading-[normal]">{`  `}</span>
                    <span className="leading-[normal] text-[#222]">{` 176.3 %`}</span>
                  </>
                )}
              </p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[rgba(222,128,17,0.4)]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   126.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#aea8a2] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
          <TableText2 text="SJC" additionalClassNames="w-[99px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText2>
          <TableHelper4 additionalClassNames="bg-[rgba(222,128,17,0.4)]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   126.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <Wrapper additionalClassNames="bg-[rgba(214,59,37,0.4)]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[0]" : "leading-[normal]"}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "leading-[normal] text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>155.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>
                {isRealmAndCrossRegionLatencyAndLatency && "   176.3 %"}
                {isRealmAndCrossRegionLatencyAndPacketLoss && (
                  <>
                    <span className="leading-[normal]">{`  `}</span>
                    <span className="leading-[normal] text-[#222]">{` 176.3 %`}</span>
                  </>
                )}
              </p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col h-[447px] items-start min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border-[#b9b9b9] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
          <TableText2 text="SYD" additionalClassNames="w-[98px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isRealmAndCrossRegionLatencyAndPacketLoss ? "0 0 22.0893 19.618" : "0 0 14.7262 13.0787"}>
              <path d={isRealmAndCrossRegionLatencyAndPacketLoss ? svgPaths.pe547c00 : svgPaths.pa3ce800} fill={isRealmAndCrossRegionLatencyAndPacketLoss ? "var(--fill-0, #161513)" : "var(--fill-0, #665F5B)"} id="vector" />
            </svg>
          </TableText2>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{isRealmAndCrossRegionLatencyAndPacketLoss ? "   26.3 %" : "   26.3%"}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <Wrapper additionalClassNames="bg-[rgba(222,128,17,0.4)]">
            <div className={`font-["Helvetica_Neue:Regular",sans-serif] leading-[normal] not-italic relative shrink-0 text-[#222] text-[0px] text-right whitespace-nowrap whitespace-pre ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[12px]" : ""}`}>
              <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>125.1 m/s</p>
              <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif]' : "text-[11px]"}>{`   126.3 %`}</p>
            </div>
          </Wrapper>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
          <TableHelper4 additionalClassNames="bg-[#b9cda7]">
            <p className={`mb-0 ${isRealmAndCrossRegionLatencyAndPacketLoss ? "text-[11px]" : 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]'}`}>25.1 m/s</p>
            <p className={isRealmAndCrossRegionLatencyAndPacketLoss ? 'font-["Helvetica_Neue:Medium",sans-serif] text-[12px]' : "text-[11px]"}>{`   26.3 %`}</p>
          </TableHelper4>
        </div>
      </div>
    </div>
  );
}

export default function Table1() {
  return <Table className="relative size-full" />;
}