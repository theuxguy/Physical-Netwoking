import clsx from "clsx";
import svgPaths from "./svg-empty-table-icon";
type GraphsProps = {
  additionalClassNames?: string;
};

function Graphs({ children, additionalClassNames = "" }: React.PropsWithChildren<GraphsProps>) {
  return (
    <div className={clsx("col-1 h-[151px] mt-0 relative row-1 w-[329px]", additionalClassNames)}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex flex-col gap-[6px] h-[165px] items-center left-[calc(50%+0.5px)] p-[10px] rounded-[3px] top-[calc(50%+11px)] w-[354px]">{children}</div>
    </div>
  );
}
type TableSummaryIssuesHelper3Props = {
  additionalClassNames?: string;
};

function TableSummaryIssuesHelper3({ children, additionalClassNames = "" }: React.PropsWithChildren<TableSummaryIssuesHelper3Props>) {
  return (
    <div className={clsx("bg-[rgba(34,126,158,0.05)] relative shrink-0 w-full", additionalClassNames)}>
      <div className="content-stretch flex items-start px-[10px] py-[8px] relative size-full">{children}</div>
    </div>
  );
}

function TableSummaryIssuesHelper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(34,126,158,0.05)] h-[280px] relative shrink-0 w-full">
      <div className="content-stretch flex items-start px-[10px] py-[7px] relative size-full">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-white col-1 content-stretch flex flex-col h-[91px] items-start ml-0 mt-0 p-[10px] relative row-1">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="col-1 h-[46px] ml-[33.45px] mt-px relative row-1 w-[269px]">
            <div className="absolute inset-[-2.17%_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 269 47">
                <g id="Frame 626560">
                  <line id="Line 145" stroke="var(--stroke-0, #D5D5D5)" x2="268" y1="0.5" y2="0.5" />
                  <line id="Line 146" stroke="var(--stroke-0, #D5D5D5)" x2="268" y1="23.5" y2="23.5" />
                  <line id="Line 144" stroke="var(--stroke-0, #D5D5D5)" x2="268" y1="46.5" y2="46.5" />
                </g>
              </svg>
            </div>
          </div>
          <div className="col-1 content-stretch flex gap-[15px] items-start justify-center ml-[22.45px] mt-0 relative row-1">
            <Text text="07/06" additionalClassNames="w-[22px]" />
            <Text text="07/12" />
            <Text text="07/18" />
            <Text text="07/24" />
            <Text text="07/30" />
            <Text text="08/06" />
            <Text text="08/11" />
          </div>
          <div className="col-1 content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] h-[50px] items-end leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[8px] text-black w-[34px] whitespace-nowrap">
            <p className="relative shrink-0">{"100 pps"}</p>
            <p className="relative shrink-0">{"50 pps"}</p>
            <p className="relative shrink-0">{"0 pps"}</p>
          </div>
        </div>
      </div>
      <div className="col-1 h-[20px] ml-[44.5px] mt-[14px] relative row-1 w-[267px]" data-name="Graph">
        {children}
      </div>
    </div>
  );
}

function Vector1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 10">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[10px] py-[7px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type Text2Props = {
  text: string;
};

function Text2({ text, children }: React.PropsWithChildren<Text2Props>) {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative w-full">
      <div className="content-stretch flex gap-[44px] items-center relative shrink-0">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="h-0 relative shrink-0 w-[20px]">
            <div className="absolute inset-[-4px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
                {children}
              </svg>
            </div>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap">{text}</p>
        </div>
        <div className="content-stretch flex flex-col gap-[6px] h-[32px] items-start leading-[normal] not-italic relative shrink-0 text-[11px] text-black w-[120px]">
          <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[10px] items-start relative shrink-0 w-full">
            <p className="flex-[1_0_0] min-h-px min-w-px relative">{"min"}</p>
            <p className="relative shrink-0 w-[57px]">{"max"}</p>
          </div>
          <div className="content-stretch flex flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal gap-[18px] items-start min-h-px min-w-px relative w-full whitespace-nowrap">
            <p className="relative shrink-0">{"0.157pps"}</p>
            <p className="relative shrink-0">{"0.0679pps"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
type TableSummaryIssuesHelper1Props = {
  additionalClassNames?: string;
};

function TableSummaryIssuesHelper1({ additionalClassNames = "" }: TableSummaryIssuesHelper1Props) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[10px] py-[4px] relative size-full">
          <ArrowsChevronDown className="overflow-clip relative shrink-0 size-[20px]" />
        </div>
      </div>
    </div>
  );
}
type Helper2Props = {
  additionalClassNames?: string;
};

function Helper2({ additionalClassNames = "" }: Helper2Props) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <TableSummaryIssuesText10 text="Thu, Sep 02, 2023 00:12" additionalClassNames="items-center py-[8px]" />
      </div>
    </div>
  );
}
type TableSummaryIssuesText10Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText10({ text, additionalClassNames = "" }: TableSummaryIssuesText10Props) {
  return (
    <div className={clsx("content-stretch flex px-[10px] relative size-full", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#161513] text-[14px] w-[165px]">{text}</p>
    </div>
  );
}
type TableSummaryIssuesText9Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText9({ text, additionalClassNames = "" }: TableSummaryIssuesText9Props) {
  return (
    <div className={clsx("content-stretch flex px-[10px] relative size-full", additionalClassNames)}>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#161513] text-[14px]">{text}</p>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div className={clsx("content-stretch flex items-center px-[10px] relative size-full", additionalClassNames)}>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#161513] text-[14px]">{text}</p>
    </div>
  );
}
type TableSummaryIssuesText8Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText8({ text, additionalClassNames = "" }: TableSummaryIssuesText8Props) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <Text1 text={text} additionalClassNames="py-[8px]" />
      </div>
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <TableSummaryIssuesText7 text="JFAB" additionalClassNames="py-[7px]" />
      </div>
    </div>
  );
}
type TableSummaryIssuesText7Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText7({ text, additionalClassNames = "" }: TableSummaryIssuesText7Props) {
  return (
    <div className={clsx("content-stretch flex items-center px-[10px] relative size-full", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[52px]">{text}</p>
    </div>
  );
}
type TableSummaryIssuesText6Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText6({ text, additionalClassNames = "" }: TableSummaryIssuesText6Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[104px]">{text}</p>
    </Wrapper>
  );
}
type TableSummaryIssuesText5Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText5({ text, additionalClassNames = "" }: TableSummaryIssuesText5Props) {
  return (
    <div className={clsx("content-stretch flex px-[10px] py-[7px] relative size-full", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[109px]">{text}</p>
    </div>
  );
}
type TableSummaryIssuesText4Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText4({ text, additionalClassNames = "" }: TableSummaryIssuesText4Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] whitespace-nowrap">{text}</p>
    </Wrapper>
  );
}
type TableSummaryIssuesText3Props = {
  text: string;
};

function TableSummaryIssuesText3({ text }: TableSummaryIssuesText3Props) {
  return (
    <div className="bg-[#f8f8f8] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[10px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">{text}</p>
        </div>
      </div>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <TableSummaryIssuesText2 text="Critical" additionalClassNames="items-center py-[8px]" />
      </div>
    </div>
  );
}
type TableSummaryIssuesText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText2({ text, additionalClassNames = "" }: TableSummaryIssuesText2Props) {
  return (
    <div className={clsx("content-stretch flex justify-center px-[10px] relative size-full", additionalClassNames)}>
      <div className="bg-[rgba(214,59,37,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#d63b25] text-[11px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type TableSummaryIssuesText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TableSummaryIssuesText1({ text, additionalClassNames = "" }: TableSummaryIssuesText1Props) {
  return (
    <div className={clsx("content-stretch flex gap-[5px] items-center p-[10px] relative w-full", additionalClassNames)}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">{text}</p>
      <div className="relative shrink-0 size-[14px]" data-name="filter-alt">
        <div className="absolute inset-[8.33%_3.99%_9.92%_3.97%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8854 11.4439">
            <path d={svgPaths.pd19ba80} fill="var(--fill-0, #665F5B)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type TableSummaryIssuesHelperProps = {
  text: string;
  text1: string;
};

function TableSummaryIssuesHelper({ text, text1 }: TableSummaryIssuesHelperProps) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-white col-1 content-stretch flex gap-[10px] h-[36px] items-center ml-0 mt-0 p-[5px] relative row-1 w-[1363px]">
        <div aria-hidden="true" className="absolute border border-[#d7d7d7] border-solid inset-0 pointer-events-none" />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#665f5b] text-[12px] w-[175px]">{text}</p>
        <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative">
          <div className="col-1 content-stretch flex items-center justify-end ml-0 mt-0 relative row-1 w-[1168px]">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrows/caret left">
              <Vector1>
                <path d="M5 0V10L0 5L5 0Z" fill="var(--fill-0, #AEA8A2)" id="Vector" />
              </Vector1>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">{text1}</p>
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrows/caret right">
              <Vector1>
                <path d={svgPaths.p3a389f00} fill="var(--fill-0, #161513)" id="Vector" />
              </Vector1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type TableSummaryIssuesTextProps = {
  text: string;
};

function TableSummaryIssuesText({ text }: TableSummaryIssuesTextProps) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(12,87,200,0.1)] col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[5px] relative rounded-[20px] row-1">
        <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="PSFT/Icons/24/RW CrossRed">
            <div className="absolute inset-[20.83%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                <path d={svgPaths.p31782000} fill="var(--fill-0, #222222)" id="Vector" />
              </svg>
            </div>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute inset-[35%_20%]">
      <div className="absolute inset-[-6.07%_-3.03%_-12.14%_-3.03%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7283 7.09248">
          <path d={svgPaths.pa9eac00} id="Vector" stroke="var(--stroke-0, #161513)" strokeWidth="1.03" />
        </svg>
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
    <div className={clsx("content-stretch flex flex-col gap-[2px] items-center relative shrink-0", additionalClassNames)}>
      <div className="flex h-[47px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[47px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 1">
                <line id="Line 143" stroke="var(--stroke-0, #D5D5D5)" x2="47" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap">{text}</p>
    </div>
  );
}

function ArrowsChevronDown({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[20px]"} data-name="arrows/chevron down">
      <Vector />
    </div>
  );
}
type SearchInputProps = {
  className?: string;
  state?: "Default" | "Disabled" | "Focused" | "Searching" | "Diabled while searching";
  text?: "Hint" | "Yes";
};

function SearchInput({ className, state = "Default", text = "Hint" }: SearchInputProps) {
  const isDefaultAndHint = state === "Default" && text === "Hint";
  const isDefaultAndYes = state === "Default" && text === "Yes";
  const isDiabledWhileSearchingAndHint = state === "Diabled while searching" && text === "Hint";
  const isDiabledWhileSearchingAndYes = state === "Diabled while searching" && text === "Yes";
  const isDisabledAndHint = state === "Disabled" && text === "Hint";
  const isDisabledAndYes = state === "Disabled" && text === "Yes";
  const isFocusedAndHint = state === "Focused" && text === "Hint";
  const isFocusedAndYes = state === "Focused" && text === "Yes";
  const isSearchingAndHint = state === "Searching" && text === "Hint";
  const isSearchingAndYes = state === "Searching" && text === "Yes";
  return (
    <div className={className || "h-[35px] relative w-[340px]"}>
      <div className={`absolute border border-solid inset-0 rounded-[3px] ${isDisabledAndHint || isDiabledWhileSearchingAndHint || isDisabledAndYes || isDiabledWhileSearchingAndYes ? "bg-[#f1efed] border-[#bcb6b1]" : state === "Focused" && ["Hint", "Yes"].includes(text) ? "bg-white border-[#00688c] shadow-[0px_0px_0px_1px_white,0px_0px_0px_3px_#06485f]" : "bg-white border-[#bcb6b1]"}`} data-name="container" />
      <div className="absolute content-stretch flex gap-[6px] items-start left-[9px] top-[8px]" data-name="left">
        <div className={`relative shrink-0 ${isSearchingAndHint || isDiabledWhileSearchingAndHint || isSearchingAndYes || isDiabledWhileSearchingAndYes ? "" : "overflow-clip size-[20px]"}`} data-name="left icon">
          {(isDefaultAndHint || isFocusedAndHint || isDisabledAndHint || isDefaultAndYes || isFocusedAndYes || isDisabledAndYes) && (
            <div className="absolute inset-[3%]" data-name="magnify">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8 18.8">
                <path clipRule="evenodd" d={svgPaths.p351faf00} fill="var(--fill-0, #AEA8A2)" fillRule="evenodd" id="magnify" />
              </svg>
            </div>
          )}
          {(isSearchingAndHint || isDiabledWhileSearchingAndHint || isSearchingAndYes || isDiabledWhileSearchingAndYes) && (
            <div className="flex flex-col items-center size-full">
              <div className="content-stretch flex flex-col gap-[10px] items-center relative">
                <div className="relative shrink-0 size-[20px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0003 20">
                    <g id="Group 2">
                      <line id="Line 6" stroke="var(--stroke-0, #00688C)" strokeLinecap="round" strokeWidth="3" x1="10.8337" x2="10.8337" y1="16.8334" y2="18.5" />
                      <line id="Line 6_2" stroke="var(--stroke-0, #B4D5E1)" strokeLinecap="round" strokeWidth="3" x1="10.8337" x2="10.8337" y1="1.5" y2="3.16667" />
                      <line id="Line 6_3" stroke="var(--stroke-0, #5FA2BA)" strokeLinecap="round" strokeWidth="3" x1="18.5002" x2="16.8335" y1="10.8333" y2="10.8333" />
                      <line id="Line 6_4" stroke="var(--stroke-0, #EDF6F9)" strokeLinecap="round" strokeWidth="3" x1="3.16667" x2="1.5" y1="10.8333" y2="10.8333" />
                      <line id="Line 6_5" stroke="var(--stroke-0, #79B1C6)" strokeLinecap="round" strokeWidth="3" x1="16.5998" x2="15.3878" y1="4.57884" y2="5.79085" />
                      <line id="Line 6_6" stroke="var(--stroke-0, #F6FAFC)" strokeLinecap="round" strokeWidth="3" x1="5.79118" x2="4.57917" y1="15.388" y2="16.6001" />
                      <line id="Line 6_7" stroke="var(--stroke-0, #D0E5EE)" strokeLinecap="round" strokeWidth="3" x1="4.61273" x2="3.40072" y1="5.79041" y2="4.57839" />
                      <line id="Line 6_8" stroke="var(--stroke-0, #227E9E)" strokeLinecap="round" strokeWidth="3" x1="15.4213" x2="14.2093" y1="16.5997" y2="15.3877" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        {(isDefaultAndHint || isSearchingAndHint || isFocusedAndHint || isDisabledAndHint || isDiabledWhileSearchingAndHint || isDefaultAndYes || isSearchingAndYes || isDisabledAndYes || isDiabledWhileSearchingAndYes) && <p className={`font-["Helvetica_Neue:Regular",sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${text === "Yes" && ["Default", "Searching", "Diabled while searching"].includes(state) ? "text-[#161513]" : state === "Disabled" && ["Hint", "Yes"].includes(text) ? "text-[#aea8a2]" : "text-[#665f5b]"}`}>{text === "Yes" && ["Default", "Searching", "Disabled", "Diabled while searching"].includes(state) ? "Field text" : text === "Hint" && ["Searching", "Focused", "Disabled", "Diabled while searching"].includes(state) ? "Search" : "Search"}</p>}
        {isFocusedAndYes && (
          <div className="content-stretch flex font-['Helvetica_Neue:Regular',sans-serif] items-start leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] whitespace-nowrap">
            <p className="relative shrink-0">Field text</p>
            <p className="relative shrink-0">|</p>
          </div>
        )}
      </div>
      {isFocusedAndHint && <p className="absolute font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] left-[33px] not-italic text-[#161513] text-[14px] top-[8px] whitespace-nowrap">|</p>}
    </div>
  );
}

export default function TableSummaryIssues() {
  return (
    <div className="relative size-full" data-name="Table/Summary/Issues">
      <div className="absolute contents inset-0">
        <div className="absolute contents inset-0">
          <div className="absolute content-stretch flex flex-col inset-0 items-center">
            <div className="bg-white h-[50px] relative shrink-0 w-[1361px]">
              <div aria-hidden="true" className="absolute border border-[#d5d5d5] border-solid inset-[-1px] pointer-events-none" />
              <div className="absolute contents left-0 top-[9px]">
                <div className="absolute bg-white content-stretch flex gap-[68px] items-center left-0 px-[20px] top-[9px] w-[1360px]">
                  <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative">
                    <div className="col-1 content-stretch flex gap-[9px] items-center ml-0 mt-0 relative row-1 w-[999px]">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">Filters applied:</p>
                      <TableSummaryIssuesText text="JFAB" />
                      <TableSummaryIssuesText text="Performance" />
                    </div>
                  </div>
                  <SearchInput className="h-[35px] relative shrink-0 w-[253px]" />
                </div>
              </div>
            </div>
            <TableSummaryIssuesHelper text="Display 5 of 5 total events" text1="1 of 1" />
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="col-1 content-stretch flex h-[509px] items-start ml-0 mt-0 relative row-1 w-[1361px]">
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[73px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-l border-solid border-t inset-[-1px_0_-1px_-1px] pointer-events-none" />
                  <div className="bg-[#f8f8f8] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <TableSummaryIssuesText1 text="Type" additionalClassNames="justify-center" />
                    </div>
                  </div>
                  <div className="bg-[rgba(34,126,158,0.05)] h-[279px] relative shrink-0 w-full">
                    <div className="flex flex-row justify-center size-full">
                      <TableSummaryIssuesText2 text="Critical" additionalClassNames="items-start py-[8px]" />
                    </div>
                  </div>
                  <Helper additionalClassNames="h-[49px]" />
                  <Helper additionalClassNames="h-[52px]" />
                  <Helper additionalClassNames="h-[51px]" />
                  <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <TableSummaryIssuesText2 text="Critical" additionalClassNames="items-center py-[7px]" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[339px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <TableSummaryIssuesText3 text="Description" />
                  <TableSummaryIssuesHelper2>
                    <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#161513] text-[14px] whitespace-nowrap">
                      <p className="leading-[normal]">JFAB-JFAB links in Metro network between IAD11</p>
                    </div>
                  </TableSummaryIssuesHelper2>
                  <Wrapper additionalClassNames="h-[54px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] whitespace-nowrap">{`CFAB-CFAB links in Metro network between IAD11 `}</p>
                  </Wrapper>
                  <TableSummaryIssuesText4 text="CFAB-CFAB links in Metro network between IAD11" additionalClassNames="h-[38px]" />
                  <TableSummaryIssuesText4 text="CFAB-CFAB links in Metro network between IAD11 and IAD12..." additionalClassNames="h-[61px]" />
                  <TableSummaryIssuesText4 text="CFAB-CFAB links in Metro network between IAD11 and IAD12 ..." additionalClassNames="h-[39px]" />
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[119px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="bg-[#f8f8f8] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText1 text="Location 1" />
                    </div>
                  </div>
                  <div className="bg-[rgba(34,126,158,0.05)] h-[280px] relative shrink-0 w-full">
                    <TableSummaryIssuesText5 text="DXB/AD2/AD11" additionalClassNames="items-start" />
                  </div>
                  <div className="bg-white h-[55px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center px-[5px] py-[7px] relative size-full">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[114px]">DXB/AD2/AD33</p>
                      </div>
                    </div>
                  </div>
                  <Wrapper additionalClassNames="h-[42px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[113px]">DXB/AD2/AD31</p>
                  </Wrapper>
                  <Wrapper additionalClassNames="h-[59px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[103px]">DXB/AD2/AD23</p>
                  </Wrapper>
                  <div className="bg-white h-[44px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText5 text="DXB/AD2/AD21" additionalClassNames="items-center" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[114px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="bg-[#f8f8f8] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText1 text="Location2" />
                    </div>
                  </div>
                  <TableSummaryIssuesHelper2>
                    <p className="font-['Inter:Regular',sans-serif] font-normal h-[25px] leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[104px]">DXB/AD2/AD21</p>
                  </TableSummaryIssuesHelper2>
                  <TableSummaryIssuesText6 text="DXB/AD2/AD11" additionalClassNames="h-[56px]" />
                  <TableSummaryIssuesText6 text="DXB/AD2/AD21" additionalClassNames="h-[33px]" />
                  <TableSummaryIssuesText6 text="DXB/AD2/AD11" additionalClassNames="h-[62px]" />
                  <TableSummaryIssuesText6 text="DXB/AD2/AD11" additionalClassNames="h-[49px]" />
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[81px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="bg-[#f8f8f8] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText1 text="Net..." />
                    </div>
                  </div>
                  <TableSummaryIssuesHelper3 additionalClassNames="h-[280px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[57px]">JFAB</p>
                  </TableSummaryIssuesHelper3>
                  <div className="bg-white h-[52px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center px-[10px] py-[8px] relative size-full">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[53px]">JFAB</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white h-[39px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText7 text="JFAB" additionalClassNames="py-[8px]" />
                    </div>
                  </div>
                  <Helper1 additionalClassNames="h-[62px]" />
                  <Helper1 additionalClassNames="h-[49px]" />
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[110px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="bg-[#f8f8f8] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText1 text="Health me..." />
                    </div>
                  </div>
                  <TableSummaryIssuesHelper3 additionalClassNames="h-[281px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[14px] w-[100px]">Performance</p>
                  </TableSummaryIssuesHelper3>
                  <TableSummaryIssuesText8 text="Performance" additionalClassNames="h-[50px]" />
                  <TableSummaryIssuesText8 text="Performance" additionalClassNames="h-[41px]" />
                  <TableSummaryIssuesText8 text="Performance" additionalClassNames="h-[62px]" />
                  <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full">
                    <div className="flex flex-row items-center size-full">
                      <Text1 text="Performance" additionalClassNames="py-[7px]" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[154px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <TableSummaryIssuesText3 text="Start time" />
                  <div className="bg-[rgba(34,126,158,0.05)] h-[281px] relative shrink-0 w-full">
                    <TableSummaryIssuesText9 text="Tues, Aug 31, 2023 00:12" additionalClassNames="items-start py-[8px]" />
                  </div>
                  <div className="bg-white h-[55px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText9 text="Tues, Aug 31, 2023 01:43" additionalClassNames="items-center py-[8px]" />
                    </div>
                  </div>
                  <div className="bg-white h-[38px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText9 text="Tues, Aug 31, 2023 02:45" additionalClassNames="items-center py-[8px]" />
                    </div>
                  </div>
                  <div className="bg-white h-[56px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText9 text="Tues, Aug 31, 2023 17:01" additionalClassNames="items-center py-[8px]" />
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText9 text="Tues, Aug 31, 2023 18:51" additionalClassNames="items-center py-[7px]" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-start relative shrink-0 w-[175px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <TableSummaryIssuesText3 text="End time" />
                  <div className="bg-[rgba(34,126,158,0.05)] h-[281px] relative shrink-0 w-full">
                    <TableSummaryIssuesText10 text="Thu, Sep 02, 2023 00:12" additionalClassNames="items-start py-[8px]" />
                  </div>
                  <Helper2 additionalClassNames="h-[55px]" />
                  <Helper2 additionalClassNames="h-[38px]" />
                  <Helper2 additionalClassNames="h-[56px]" />
                  <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full">
                    <div className="flex flex-row items-center size-full">
                      <TableSummaryIssuesText10 text="Thu, Sep 02, 2023 00:12" additionalClassNames="items-center py-[7px]" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col h-[509px] items-center min-h-px min-w-px relative">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="bg-[#f8f8f8] h-[37px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-[rgba(34,126,158,0.05)] h-[280px] relative shrink-0 w-full">
                    <div className="flex flex-row justify-center size-full">
                      <div className="content-stretch flex items-start justify-center px-[10px] py-[8px] relative size-full">
                        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                          <div className="col-1 content-stretch flex h-[36px] items-start ml-0 mt-0 relative row-1 w-[135px]">
                            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                              <div className="bg-[#1397c3] col-1 content-stretch flex h-[36px] items-center justify-center ml-0 mt-0 overflow-clip p-[10px] relative rounded-[3px] row-1 w-[135.5px]">
                                <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0">
                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">View incidents</p>
                                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="external link">
                                    <div className="absolute inset-[12.5%]" data-name="icon external link">
                                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                                        <path d={svgPaths.p3c236c00} fill="var(--fill-0, white)" id="icon external link" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white h-[49px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-white h-[45px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-white h-[63px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[509px] items-end relative shrink-0 w-[40px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
                  <div className="bg-[#f8f8f8] h-[37px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-[rgba(34,126,158,0.05)] h-[279px] relative shrink-0 w-full">
                    <div className="content-stretch flex items-start px-[10px] py-[4px] relative size-full">
                      <div className="flex items-center justify-center relative shrink-0">
                        <div className="flex-none rotate-180">
                          <div className="overflow-clip relative size-[20px]" data-name="arrows/chevron down">
                            <Vector />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <TableSummaryIssuesHelper1 additionalClassNames="h-[50px]" />
                  <TableSummaryIssuesHelper1 additionalClassNames="h-[54px]" />
                  <TableSummaryIssuesHelper1 additionalClassNames="h-[46px]" />
                  <div className="bg-white h-[43px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-end size-full">
                      <div className="content-stretch flex items-center justify-end px-[10px] py-[7px] relative size-full">
                        <ArrowsChevronDown className="overflow-clip relative shrink-0 size-[20px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TableSummaryIssuesHelper text="Display 5 of 5 total events" text1="1 of 1" />
          </div>
        </div>
      </div>
      <div className="absolute contents inset-[32.01%_17.9%_41.52%_4.26%]">
        <div className="absolute content-stretch flex inset-[32.01%_17.9%_41.52%_4.26%] items-start">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
              <div className="col-1 h-[151px] ml-0 mt-0 relative row-1 w-[329px]">
                {"Spike chart" === "Spike chart" && (
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex flex-col gap-[6px] h-[165px] items-center left-[calc(50%+0.5px)] p-[10px] rounded-[3px] top-[calc(50%+11px)] w-[354px]">
                    <div aria-hidden="true" className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap">JFAB Client - Input Interface Errors</p>
                    <Wrapper1>
                      <div className="absolute flex inset-0 items-center justify-center">
                        <div className="flex-none h-[20.082px] rotate-[-0.06deg] w-[255.002px]">
                          <div className="relative size-full">
                            <div className="absolute inset-[-0.48%_0_-2.54%_0]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266.978 20.3279">
                                <path d={svgPaths.p2c41f000} id="Line 147" stroke="var(--stroke-0, #508223)" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Wrapper1>
                    <Text2 text="DXB1">
                      <line id="Line 148" stroke="var(--stroke-0, #508223)" strokeWidth="4" x2="20" y1="2" y2="2" />
                    </Text2>
                  </div>
                )}
              </div>
              <Graphs additionalClassNames="ml-[360px]">
                <div aria-hidden="true" className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap">JFAB Client - Input Interface Errors</p>
                <Wrapper1>
                  <div className="absolute flex inset-[19.11%_0_-0.77%_0] items-center justify-center">
                    <div className="flex-none h-[16.349px] rotate-[-0.06deg] w-[255.002px]">
                      <div className="relative size-full">
                        <div className="absolute inset-[-4.59%_0_-1.72%_0]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266.978 17.076">
                            <path d={svgPaths.p1e75a400} id="Line 147" stroke="var(--stroke-0, #DE8011)" strokeWidth="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Wrapper1>
                <Text2 text="DXB1">
                  <line id="Line 148" stroke="var(--stroke-0, #DE8011)" strokeWidth="4" x2="20" y1="2" y2="2" />
                </Text2>
              </Graphs>
              <Graphs additionalClassNames="ml-[720px]">
                <div aria-hidden="true" className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap">JFAB Client - Input Interface Errors</p>
                <Wrapper1>
                  <div className="absolute flex inset-[97.83%_0_-0.06%_0.01%] items-center justify-center">
                    <div className="flex-none h-[0.18px] rotate-[-0.06deg] w-[255.002px]">
                      <div className="relative size-full">
                        <div className="absolute inset-[-141.2%_0_-141.19%_0]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266.978 0.677071">
                            <path d={svgPaths.p22de7480} id="Line 147" stroke="var(--stroke-0, #D63B25)" strokeWidth="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Wrapper1>
                <Text2 text="DXB1">
                  <line id="Line 148" stroke="var(--stroke-0, #D63B25)" strokeWidth="4" x2="20" y1="2" y2="2" />
                </Text2>
              </Graphs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}