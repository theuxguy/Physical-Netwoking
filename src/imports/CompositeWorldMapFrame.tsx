import clsx from "clsx";
import svgPaths from "./svg-region-health-indicator-icon";
import img2560PxBlankMapWorldFlattened1 from "figma:asset/b21a0e9e9b11258529cfc8500b7737fda4ad18c1.png";
import imgScreenshot20231003At5052 from "figma:asset/344b2d237f1df85f01f39ebe3cc4a36c83879fdc.png";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center px-[2.5px] relative w-full">{children}</div>
    </div>
  );
}
type Health1Props = {
  additionalClassNames?: string;
  text: string;
};

function Health1({ children, additionalClassNames = "", text }: React.PropsWithChildren<Health1Props>) {
  return (
    <div className={clsx("absolute bg-[#5f7d4f] rounded-[3px] w-[37px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#5f7d4f] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <Wrapper1>
        <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
          <Vector />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">{text}</p>
        </div>
      </Wrapper1>
    </div>
  );
}
type HealthProps = {
  additionalClassNames?: string;
  text: string;
};

function Health({ children, additionalClassNames = "", text }: React.PropsWithChildren<HealthProps>) {
  return (
    <div className={clsx("bg-[#5f7d4f] rounded-[3px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#5f7d4f] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[2.5px] relative">
          <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
            <Vector />
            <div className="bg-white content-stretch flex h-[8px] items-center justify-center p-[2px] relative rounded-[5px] shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#508223] text-[7px] text-center whitespace-nowrap">{"ePOP"}</p>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-7.69%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119.156 7">
          {children}
        </svg>
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, children, additionalClassNames = "" }: React.PropsWithChildren<Text1Props>) {
  return (
    <div className={clsx("absolute bg-white content-stretch flex flex-col gap-[10px] h-[120px] items-end justify-center left-0 p-[5px] rounded-[5px] top-0 w-[135px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#d7d7d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="relative shrink-0 w-full">
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[15px] items-end pr-[10px] relative w-full">{children}</div>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#00688c] text-[11px] text-right underline w-full">{text}</p>
    </div>
  );
}

function Helper14() {
  return (
    <div className="absolute inset-[1.35%_1.89%_1.35%_97.85%] rounded-[5px]">
      <div aria-hidden="true" className="absolute border-2 border-[#227e9e] border-solid inset-[-2px] pointer-events-none rounded-[7px]" />
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
      <div className="h-[24px] relative shrink-0 w-[1141px]">
        <div className="absolute contents inset-[0_0.25%_0_0]">
          <div className="absolute bg-[rgba(34,126,158,0.1)] border border-[#b6b2ad] border-solid inset-[0_2.88px_0_3.88px] rounded-[6px]" />
          <div className="absolute contents inset-[22.87%_0.25%_41.67%_0.42%]">
            <Wrapper additionalClassNames="inset-[31.25%_89.14%_41.67%_0.42%]">
              <g id="Group 544">
                <path d={svgPaths.p3f328aa0} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                <path d={svgPaths.p3e09af00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.1761" x2="91.5107" y1="6.5" y2="6.5" />
              </g>
            </Wrapper>
            <Wrapper additionalClassNames="inset-[31.25%_78.78%_41.67%_10.78%]">
              <g id="Group 545">
                <path d={svgPaths.p3f328aa0} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                <path d={svgPaths.p3e09af00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.1761" x2="91.5107" y1="6.5" y2="6.5" />
              </g>
            </Wrapper>
            <div className="absolute inset-[22.87%_44.03%_41.67%_45.57%]">
              <div className="absolute inset-[-5.88%_0_-0.37%_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118.775 9.04159">
                  <g id="Group 547">
                    <path d={svgPaths.p2e4f4200} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                    <path d={svgPaths.p2bc86e00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                    <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="36.7955" x2="91.1301" y1="8.51025" y2="8.51025" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="absolute inset-[22.92%_54.41%_41.67%_21.14%]">
              <div className="absolute inset-[-5.88%_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 279.01 9">
                  <g id="Group 546">
                    <path d={svgPaths.pbd40900} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                    <path d={svgPaths.p348bab00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                    <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.176" x2="91.5106" y1="8.5" y2="8.5" />
                    <line id="Line 116" stroke="var(--stroke-0, #227E9E)" x1="170.622" x2="224.957" y1="0.5" y2="0.5" />
                    <line id="Line 118" stroke="var(--stroke-0, #227E9E)" x1="224.675" x2="279.01" y1="0.5" y2="0.5" />
                    <line id="Line 117" stroke="var(--stroke-0, #227E9E)" x1="118.534" x2="172.869" y1="0.5" y2="0.5" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="absolute inset-[31.25%_33.83%_41.67%_55.72%]">
              <div className="absolute inset-[-7.69%_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119.155 7">
                  <g id="Group 548">
                    <path d={svgPaths.p3f328aa0} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                    <path d={svgPaths.p136b9c00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                    <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.176" x2="91.5106" y1="6.5" y2="6.5" />
                  </g>
                </svg>
              </div>
            </div>
            <Wrapper additionalClassNames="inset-[31.25%_23.47%_41.67%_66.08%]">
              <g id="Group 549">
                <path d={svgPaths.p3f328aa0} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                <path d={svgPaths.p3e09af00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.1761" x2="91.5107" y1="6.5" y2="6.5" />
              </g>
            </Wrapper>
            <div className="absolute inset-[31.25%_0.25%_41.67%_76.44%]">
              <div className="absolute inset-[-7.69%_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265.953 7">
                  <g id="Group 550">
                    <path d={svgPaths.p261e0500} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                    <path d={svgPaths.p207f2510} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                    <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="35.5207" x2="87.4363" y1="6.5" y2="6.5" />
                    <line id="Line 116" stroke="var(--stroke-0, #227E9E)" x1="163.034" x2="214.949" y1="6.5" y2="6.5" />
                    <line id="Line 118" stroke="var(--stroke-0, #227E9E)" x1="214.037" x2="265.953" y1="6.5" y2="6.5" />
                    <line id="Line 117" stroke="var(--stroke-0, #227E9E)" x1="112.028" x2="163.944" y1="6.5" y2="6.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#addbeb] border border-[#227e9e] border-solid inset-[16.67%_99.33%_8.33%_0] rounded-[10px]" />
        </div>
        <div className="absolute bg-[#addbeb] border border-[#227e9e] border-solid inset-[16.67%_0_8.33%_99.33%] rounded-[10px]" />
      </div>
      <div className="h-[79px] relative shrink-0 w-[1161px]" data-name="Header">
        <div className="absolute bottom-full contents left-0 right-full top-0" />
        <div className="absolute contents inset-[0_-0.43%_1.35%_0.09%]">
          <div className="absolute flex inset-[17.57%_1.89%_18.92%_1.03%] items-center justify-center">
            <div className="flex-none h-[1127px] rotate-90 w-[47px]">
              <div className="relative size-full">
                <div className="absolute inset-[0_-1%_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.6757 1127.5">
                    <path d="M0 1127H50.1757V0" id="Line 44" stroke="var(--stroke-0, #D5D5D5)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0_84.24%_87.84%_0.86%] leading-[normal] not-italic text-[#161513] text-[11px]">{text}</p>
          <HeaderHelper text="07/09" text1="07/10" text2="07/11" text3="07/12" text4="07/13" text5="07/14" text6="07/15" text7="07/16" text8="07/17" text9="07/18" text10="07/19" text11="07/20" text12="07/21" text13="07/22" text14="07/23" text15="07/24" text16="07/25" text17="07/26" text18="07/27" text19="07/28" text20="07/29" text21="07/30" text22="07/31" text23="08/01" text24="08/02" text25="08/03" text26="08/04" text27="08/05" text28="08/06" text29="08/07" text30="08/08" text31="08/09" text32="08/10" text33="08/11" text34="08/12" text35="08/13" text36="08/14" text37="08/15" text38="08/16" text39="08/17" />
          <HeaderHelper1 text="20" text1="15" text2="10" text3="5" />
          <HeaderHelper2 />
          <Helper14 />
        </div>
      </div>
    </div>
  );
}

function Helper13() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[10px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function Helper12() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[8px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function Helper11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
        <div className="bg-[#508223] h-[22px] shrink-0 w-full" />
        <div className="bg-[#de8011] h-[10px] shrink-0 w-full" />
        <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
      </div>
    </div>
  );
}

function Helper10() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[23px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function Helper9() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[4px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[6px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[13px] shrink-0 w-full" />
    </div>
  );
}

function Helper8() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[10px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function Helper7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
        <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
        <div className="bg-[#de8011] h-[10px] shrink-0 w-full" />
        <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
      </div>
    </div>
  );
}

function Helper6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
        <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
        <div className="bg-[#de8011] h-[5px] shrink-0 w-full" />
        <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
      </div>
    </div>
  );
}

function Helper5() {
  return (
    <div className="flex items-center justify-center relative shrink-0 w-full">
      <div className="-scale-y-100 flex-none w-full">
        <div className="bg-[#508223] h-px w-full" />
      </div>
    </div>
  );
}
type Helper4Props = {
  additionalClassNames?: string;
};

function Helper4({ additionalClassNames = "" }: Helper4Props) {
  return (
    <div className={clsx("grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0", additionalClassNames)}>
      <div className="col-1 content-stretch flex flex-col h-[5px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
        <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
        <div className="bg-[#de8011] h-px shrink-0 w-full" />
        <div className="bg-[#d63b25] h-[2px] shrink-0 w-full" />
      </div>
    </div>
  );
}
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return (
    <div className={clsx("grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0", additionalClassNames)}>
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
        <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
          <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
          <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
          <div className="bg-[#d63b25] h-[2px] shrink-0 w-full" />
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
    <div className={clsx("grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0", additionalClassNames)}>
      <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
        <div className="bg-[#508223] h-[7px] shrink-0 w-full" />
        <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
        <div className="bg-[#d63b25] h-[10px] shrink-0 w-full" />
      </div>
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={clsx("grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0", additionalClassNames)}>
      <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[3px]">
        <div className="bg-[#508223] h-[4px] shrink-0 w-[3px]" />
        <div className="bg-[#de8011] h-[4px] shrink-0 w-[3px]" />
        <div className="bg-[#d63b25] h-[6px] shrink-0 w-[3px]" />
      </div>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("content-stretch flex gap-px items-end justify-center relative shrink-0", additionalClassNames)}>
      <Helper1 />
      <Helper2 />
    </div>
  );
}

function HeaderHelper2() {
  return (
    <div className="absolute contents inset-[45.95%_0.39%_20.1%_1.03%]">
      <div className="absolute content-stretch flex gap-[0.5px] inset-[45.95%_0.39%_20.1%_1.03%] items-end">
        <Helper additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="col-1 content-stretch flex gap-[0.5px] items-end justify-center ml-0 mt-0 relative row-1">
            <Helper />
            <Helper3 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper3 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper1 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper4 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper2 />
            <Helper4 />
          </div>
        </div>
        <div className="content-stretch flex gap-[0.5px] items-end justify-center relative shrink-0">
          <Helper additionalClassNames="leading-[0]" />
          <Helper3 additionalClassNames="leading-[0]" />
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
              <Helper5 />
              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
            </div>
          </div>
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper6 />
          <Helper7 />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper9 />
          <Helper8 />
          <Helper2 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
              <div className="bg-[#508223] h-[4px] shrink-0 w-full" />
              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
              <div className="bg-[#d63b25] h-[30px] shrink-0 w-full" />
            </div>
          </div>
          <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
            <div className="bg-[#508223] h-[6px] shrink-0 w-full" />
            <div className="bg-[#de8011] h-[6px] shrink-0 w-full" />
            <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
          </div>
          <Helper3 additionalClassNames="leading-[0]" />
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">
              <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
              <div className="bg-[#d63b25] h-[6px] shrink-0 w-full" />
            </div>
          </div>
          <Helper7 />
          <Helper4 additionalClassNames="leading-[0]" />
          <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
            <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
            <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
            <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
          </div>
          <Helper4 additionalClassNames="leading-[0]" />
          <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
            <Helper5 />
            <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
            <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
          </div>
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper10 />
          <Helper2 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper11 />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper12 />
          <Helper1 additionalClassNames="leading-[0]" />
          <Helper1 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
            <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
            <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
            <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
          </div>
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper13 />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper1 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper13 />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper1 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper2 additionalClassNames="leading-[0]" />
          <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
            <Helper5 />
            <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
            <div className="bg-[#d63b25] h-[34px] shrink-0 w-full" />
          </div>
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper6 />
          <Helper7 />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper9 />
          <Helper8 />
          <Helper2 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper2 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper1 additionalClassNames="leading-[0]" />
          <Helper2 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper10 />
          <Helper2 additionalClassNames="leading-[0]" />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper11 />
          <Helper4 additionalClassNames="leading-[0]" />
          <Helper12 />
          <Helper1 additionalClassNames="leading-[0]" />
          <Helper1 additionalClassNames="leading-[0]" />
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="col-1 content-stretch flex gap-[0.5px] items-end justify-center ml-0 mt-0 relative row-1">
            <Helper />
            <Helper3 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper3 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper1 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper4 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper2 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper4 />
            <Helper1 />
            <Helper2 />
            <Helper4 />
          </div>
        </div>
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper9 />
        <Helper8 />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <div className="content-stretch flex flex-col h-[5px] items-start justify-end relative shrink-0 w-[3px]">
          <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
          <div className="bg-[#de8011] h-px shrink-0 w-full" />
          <div className="bg-[#d63b25] h-[2px] shrink-0 w-full" />
        </div>
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper3 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper2 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <Helper1 additionalClassNames="leading-[0]" />
        <Helper4 additionalClassNames="leading-[0]" />
        <div className="content-stretch flex gap-px items-end justify-center leading-[0] relative shrink-0">
          <Helper1 />
          <Helper2 />
          <Helper4 />
          <Helper2 />
          <Helper4 />
          <Helper2 />
          <Helper4 />
          <Helper1 />
          <Helper4 />
          <Helper4 />
          <Helper1 />
          <Helper4 />
          <Helper1 />
          <Helper4 />
          <Helper4 />
          <Helper4 />
        </div>
      </div>
    </div>
  );
}
type HeaderHelper1Props = {
  text: string;
  text1: string;
  text2: string;
  text3: string;
};

function HeaderHelper1({ text, text1, text2, text3 }: HeaderHelper1Props) {
  return (
    <div className="absolute contents inset-[16.22%_99.11%_19.99%_0.09%]">
      <div className="absolute content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-px inset-[16.22%_99.11%_19.99%_0.09%] items-center leading-[normal] not-italic text-[#161513] text-[8px] text-center whitespace-nowrap">
        <p className="relative shrink-0">{text}</p>
        <p className="relative shrink-0">{text1}</p>
        <p className="relative shrink-0">{text2}</p>
        <p className="relative shrink-0">{text3}</p>
      </div>
    </div>
  );
}
type HeaderHelperProps = {
  text: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
  text8: string;
  text9: string;
  text10: string;
  text11: string;
  text12: string;
  text13: string;
  text14: string;
  text15: string;
  text16: string;
  text17: string;
  text18: string;
  text19: string;
  text20: string;
  text21: string;
  text22: string;
  text23: string;
  text24: string;
  text25: string;
  text26: string;
  text27: string;
  text28: string;
  text29: string;
  text30: string;
  text31: string;
  text32: string;
  text33: string;
  text34: string;
  text35: string;
  text36: string;
  text37: string;
  text38: string;
  text39: string;
};

function HeaderHelper({ text, text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12, text13, text14, text15, text16, text17, text18, text19, text20, text21, text22, text23, text24, text25, text26, text27, text28, text29, text30, text31, text32, text33, text34, text35, text36, text37, text38, text39 }: HeaderHelperProps) {
  return (
    <div className="absolute contents inset-[83.78%_-0.43%_4.15%_1.03%]">
      <div className="absolute content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[4px] inset-[83.78%_-0.43%_4.15%_1.03%] items-start leading-[normal] not-italic text-[#161513] text-[8px] text-center whitespace-nowrap">
        <p className="relative shrink-0">{`07/06 `}</p>
        <p className="relative shrink-0">{`07/07 `}</p>
        <p className="relative shrink-0">{`07/08 `}</p>
        <p className="relative shrink-0">{text}</p>
        <p className="relative shrink-0">{text1}</p>
        <p className="relative shrink-0">{text2}</p>
        <p className="relative shrink-0">{text3}</p>
        <p className="relative shrink-0">{text4}</p>
        <p className="relative shrink-0">{text5}</p>
        <p className="relative shrink-0">{text6}</p>
        <p className="relative shrink-0">{text7}</p>
        <p className="relative shrink-0">{text8}</p>
        <p className="relative shrink-0">{text9}</p>
        <p className="relative shrink-0">{text10}</p>
        <p className="relative shrink-0">{text11}</p>
        <p className="relative shrink-0">{text12}</p>
        <p className="relative shrink-0">{text13}</p>
        <p className="relative shrink-0">{text14}</p>
        <p className="relative shrink-0">{text15}</p>
        <p className="relative shrink-0">{text16}</p>
        <p className="relative shrink-0">{text17}</p>
        <p className="relative shrink-0">{text18}</p>
        <p className="relative shrink-0">{text19}</p>
        <p className="relative shrink-0">{text20}</p>
        <p className="relative shrink-0">{text21}</p>
        <p className="relative shrink-0">{text22}</p>
        <p className="relative shrink-0">{text23}</p>
        <p className="relative shrink-0">{text24}</p>
        <p className="relative shrink-0">{text25}</p>
        <p className="relative shrink-0">{text26}</p>
        <p className="relative shrink-0">{text27}</p>
        <p className="relative shrink-0">{text28}</p>
        <p className="relative shrink-0">{text29}</p>
        <p className="relative shrink-0">{text30}</p>
        <p className="relative shrink-0">{text31}</p>
        <p className="relative shrink-0">{text32}</p>
        <p className="relative shrink-0">{text33}</p>
        <p className="relative shrink-0">{text34}</p>
        <p className="relative shrink-0">{text35}</p>
        <p className="relative shrink-0">{text36}</p>
        <p className="relative shrink-0">{text37}</p>
        <p className="relative shrink-0">{text38}</p>
        <p className="relative shrink-0">{text39}</p>
      </div>
    </div>
  );
}

function Vector() {
  return (
    <div className="relative shrink-0 size-[9px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <path d={svgPaths.p24a580} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}
type LeftTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LeftText({ text, additionalClassNames = "" }: LeftTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex gap-[6px] left-[9px] top-[8px]", additionalClassNames)}>
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="left icon">
        <div className="absolute inset-[3%]" data-name="magnify">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8 18.8">
            <path clipRule="evenodd" d={svgPaths.p351faf00} fill="var(--fill-0, #AEA8A2)" fillRule="evenodd" id="magnify" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#665f5b] text-[14px] whitespace-nowrap">{text}</p>
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
type TableRealmEmptyTextProps = {
  text: string;
};

function TableRealmEmptyText({ text }: TableRealmEmptyTextProps) {
  return (
    <div className="bg-[#f8f8f8] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">{text}</p>
        </div>
      </div>
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
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <path clipRule="evenodd" d={svgPaths.p1e5f5780} fill="var(--fill-0, #508223)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Error({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[20px]"} data-name="error">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <path clipRule="evenodd" d={svgPaths.p6a7d580} fill="var(--fill-0, #D63B25)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
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
          <Text1 text="How is this calculated?" additionalClassNames="opacity-0">
            <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
              <Error className="relative shrink-0 size-[16px]" />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">Critical</p>
            </div>
            <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
              <LegendFutureTrailingIcon02Warning />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">Warning</p>
            </div>
            <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
              <Success className="relative shrink-0 size-[16px]" />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] whitespace-nowrap">Healthy</p>
            </div>
          </Text1>
        </div>
        <button className="absolute bg-[#eee] content-stretch cursor-pointer flex items-center justify-center left-0 p-[10px] rounded-[5px] top-[123px] w-[135px]">
          <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[5px]" />
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 content-stretch flex gap-[8px] items-center ml-0 mt-0 relative row-1">
              <div className="relative shrink-0 size-[16px]" data-name="legend">
                <div className="absolute inset-[12.5%_8.34%_12.5%_8.32%]" data-name="vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3336 12">
                    <path d={svgPaths.p1b2b2880} fill="var(--fill-0, #161513)" id="vector" />
                  </svg>
                </div>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Legend</p>
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-180">
                  <ArrowsCaretDown className="overflow-clip relative size-[20px]" />
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }
  return (
    <button className={className || "block cursor-pointer h-[163px] relative w-[135px]"} data-name="State=Expanded">
      <div className="absolute contents left-0 top-0">
        <Text1 text="How is this calculated?">
          <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
            <Error className="relative shrink-0 size-[16px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Critical</p>
          </div>
          <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
            <LegendFutureTrailingIcon02Warning />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Warning</p>
          </div>
          <div className="content-stretch flex gap-[5px] items-end relative shrink-0">
            <Success className="relative shrink-0 size-[16px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Healthy</p>
          </div>
        </Text1>
      </div>
      <div className="absolute bg-[#eee] content-stretch flex items-center justify-center left-0 p-[10px] rounded-[5px] top-[123px] w-[135px]">
        <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="col-1 content-stretch flex gap-[8px] items-center ml-0 mt-0 relative row-1">
            <div className="relative shrink-0 size-[16px]" data-name="legend">
              <div className="absolute inset-[12.5%_8.34%_12.5%_8.32%]" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0004 18">
                  <path d={svgPaths.p2c32df00} fill="var(--fill-0, #161513)" id="vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] text-[14px] text-left whitespace-nowrap">Legend</p>
            <ArrowsCaretDown className="overflow-clip relative shrink-0 size-[20px]" />
          </div>
        </div>
      </div>
    </button>
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
          <LeftText text="Find resource on map" additionalClassNames="items-center" />
        </>
      )}
      {state === "Enabled" && (
        <div className="absolute contents left-0 top-0">
          <div className="absolute bg-white border border-[#bcb6b1] border-solid inset-0 rounded-[3px]" data-name="container" />
          <LeftText text="New" additionalClassNames="items-center" />
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
              <Health additionalClassNames="relative shrink-0" text="DXB" />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">New York (LGA)</p>
            </div>
            <div className="content-stretch flex gap-[7px] items-start relative shrink-0">
              <div className="bg-[#5f7d4f] relative rounded-[3px] shrink-0 w-[38px]" data-name="Health">
                <div aria-hidden="true" className="absolute border border-[#5f7d4f] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <Wrapper1>
                  <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
                    <Vector />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">{"DXB"}</p>
                  </div>
                </Wrapper1>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">Newport (CWL)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
type HeaderProps = {
  className?: string;
  property1?: "Time series" | "Time series with line graph" | "Time series with table header";
};

function Header({ className, property1 = "Time series" }: HeaderProps) {
  const isTimeSeries = property1 === "Time series";
  const isTimeSeriesWithLineGraph = property1 === "Time series with line graph";
  const isTimeSeriesWithTableHeader = property1 === "Time series with table header";
  return (
    <div className={className || `relative ${isTimeSeriesWithTableHeader ? "" : isTimeSeriesWithLineGraph ? "w-[1161px]" : "h-[74px] w-[1161px]"}`}>
      <div aria-hidden={isTimeSeriesWithTableHeader ? "true" : undefined} className={isTimeSeriesWithTableHeader ? "absolute border-[#c4c4c4] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none" : isTimeSeriesWithLineGraph ? "content-stretch flex flex-col items-start p-[10px] relative w-full" : "absolute bottom-full contents left-0 right-full top-0"}>
        {isTimeSeriesWithLineGraph && <Text text="Incident count (in thousands)" />}
      </div>
      {["Time series", "Time series with table header"].includes(property1) && (
        <div className={isTimeSeriesWithTableHeader ? "content-stretch flex flex-col items-start relative" : "absolute contents inset-[0_-0.43%_1.35%_0.09%]"}>
          <div className={isTimeSeriesWithTableHeader ? "grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" : "absolute flex inset-[17.57%_1.89%_18.92%_1.03%] items-center justify-center"}>
            <div className={isTimeSeriesWithTableHeader ? "col-1 content-stretch flex flex-col gap-[5px] items-start ml-0 mt-0 relative row-1" : "flex-none h-[1127px] rotate-90 w-[47px]"}>
              {isTimeSeries && (
                <div className="relative size-full">
                  <div className="absolute inset-[0_-1.06%_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.5 1127.5">
                      <path d="M0 1127H47V0" id="Line 44" stroke="var(--stroke-0, #D5D5D5)" />
                    </svg>
                  </div>
                </div>
              )}
              {isTimeSeriesWithTableHeader && (
                <div className="relative shrink-0 w-[1161px]" data-name="Header">
                  <div className="content-stretch flex flex-col items-start p-[10px] relative w-full">
                    <Text text="Incident count (in thousands)" />
                  </div>
                </div>
              )}
            </div>
          </div>
          {isTimeSeries && (
            <>
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0_84.24%_87.84%_0.86%] leading-[normal] not-italic text-[#161513] text-[8px]">Incident count (in thousands)</p>
              <HeaderHelper text="07/09" text1="07/10" text2="07/11" text3="07/12" text4="07/13" text5="07/14" text6="07/15" text7="07/16" text8="07/17" text9="07/18" text10="07/19" text11="07/20" text12="07/21" text13="07/22" text14="07/23" text15="07/24" text16="07/25" text17="07/26" text18="07/27" text19="07/28" text20="07/29" text21="07/30" text22="07/31" text23="08/01" text24="08/02" text25="08/03" text26="08/04" text27="08/05" text28="08/06" text29="08/07" text30="08/08" text31="08/09" text32="08/10" text33="08/11" text34="08/12" text35="08/13" text36="08/14" text37="08/15" text38="08/16" text39="08/17" />
              <HeaderHelper1 text="20" text1="15" text2="10" text3="5" />
              <HeaderHelper2 />
              <Helper14 />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#eef1f4] relative size-full">
      <div className="absolute h-[65px] left-0 top-0 w-[1440px]" data-name="Table header">
        <div className="absolute inset-[0_0_40%_0]" data-name="navbar-header">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 39">
            <path d="M0 0H1440V39H0V0Z" fill="var(--fill-0, #011E39)" id="navbar-header" />
          </svg>
        </div>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[15.38%_10.35%_58.46%_85.69%] leading-[normal] not-italic text-[14px] text-white whitespace-nowrap">Email Us</p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[15.38%_3.26%_58.46%_92.71%] leading-[normal] not-italic text-[14px] text-white whitespace-nowrap">Slack Us</p>
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[15.38%_94.58%_55.38%_1.18%] leading-[normal] not-italic text-[16px] text-white tracking-[1px] whitespace-nowrap">iNsight</p>
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[15.38%_17.57%_58.46%_77.01%] leading-[normal] not-italic text-[14px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white whitespace-nowrap">Realm: OC1</p>
      </div>
      <div className="absolute contents left-[264px] top-[39px]">
        <div className="absolute contents left-[264px] top-[150px]">
          <div className="absolute bg-[#f5f4f2] content-stretch flex gap-[40px] items-center left-[264px] p-[10px] top-[150px] w-[1176px]" data-name="Table Header">
            <div aria-hidden="true" className="absolute border border-[#b9b9b9] border-solid inset-0 pointer-events-none" />
            <div className="flex-[1_0_0] min-h-px min-w-px relative">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[10px] items-center leading-[normal] not-italic px-[3px] relative text-[14px] text-black w-full whitespace-nowrap">
                  <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">Map:</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">World map (Region health)</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center self-stretch">
              <div className="grid-cols-[max-content] grid-rows-[max-content] h-full inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="col-1 content-stretch flex gap-[10px] h-[35px] items-start ml-0 mt-0 relative row-1">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
                      <div className="col-1 content-stretch flex gap-[10px] h-[35px] items-start ml-0 mt-0 relative row-1">
                        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                          <div className="bg-white border border-[#aea8a2] border-solid col-1 h-[35px] ml-0 mt-0 rounded-[3px] row-1 w-[179px]" />
                          <div className="col-1 content-stretch flex gap-[8px] items-center ml-[7px] mt-[7px] relative row-1">
                            <div className="h-[21.538px] relative shrink-0 w-[16px]" data-name="calendar hg">
                              <div className="absolute inset-[12.5%_10%]" data-name="Union">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8 16.1538">
                                  <path clipRule="evenodd" d={svgPaths.pf4ffe00} fill="var(--fill-0, #161513)" fillRule="evenodd" id="Union" />
                                </svg>
                              </div>
                            </div>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[13.75px] whitespace-nowrap">Mon, Jul 06, 2023</p>
                          </div>
                        </div>
                        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                          <div className="bg-white border border-[#aea8a2] border-solid col-1 h-[35px] ml-0 mt-0 rounded-[3px] row-1 w-[179px]" />
                          <div className="col-1 content-stretch flex gap-[12px] items-center ml-[7px] mt-[5.38px] relative row-1">
                            <div className="content-stretch flex h-[25.577px] items-center relative shrink-0">
                              <div className="relative shrink-0 size-[16px]" data-name="calendar hg">
                                <div className="absolute inset-[12.5%_10%]" data-name="Union">
                                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8 12">
                                    <path clipRule="evenodd" d={svgPaths.p2ef30a00} fill="var(--fill-0, #161513)" fillRule="evenodd" id="Union" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#161513] text-[13.75px] whitespace-nowrap">Mon, Aug 18, 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex h-[36px] items-start ml-0 mt-0 relative row-1">
                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                        <div className="bg-[#1397c3] col-1 content-stretch flex h-[36px] items-center justify-center ml-0 mt-0 overflow-clip p-[10px] relative rounded-[3px] row-1 w-[112px]">
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Set timeline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center relative shrink-0">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="col-1 content-stretch flex gap-[10px] items-center justify-end ml-0 mt-0 px-[10px] relative row-1 w-[283px]">
                  <div className="h-[35px] opacity-0 relative shrink-0 w-[196px]" data-name="Search input">
                    <div className="absolute bg-white border border-[#bcb6b1] border-solid inset-0 rounded-[3px]" data-name="container" />
                    <LeftText text="Find resource on map" additionalClassNames="items-start" />
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex gap-[20px] items-center justify-end ml-0 mt-0 relative row-1">
                      <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                        <div className="relative shrink-0 size-[24px]" data-name="help">
                          <div className="absolute inset-[8.33%_8.34%_8.33%_8.33%]" data-name="vector">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                              <path d={svgPaths.p599e380} fill="var(--fill-0, #161513)" id="vector" />
                            </svg>
                          </div>
                        </div>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">Help</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#f5f4f2] h-[112px] left-[264px] top-[39px] w-[1176px]" data-name="Page header">
          <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-end p-[10px] relative size-full">
              <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-[1137px]">
                <div className="relative shrink-0" data-name="Breadcrumbs">
                  <div className="flex flex-row items-end size-full">
                    <div className="content-stretch flex gap-[4px] items-end relative">
                      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#665f5b] text-[16px] whitespace-nowrap">Realm view</p>
                      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrows/chevron right">
                        <div className="absolute inset-[20%_35%]" data-name="Vector">
                          <div className="absolute inset-[-3.03%_-12.14%_-3.03%_-6.07%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.09248 12.7283">
                              <path d={svgPaths.p1f91cdc0} id="Vector" stroke="var(--stroke-0, #161513)" strokeWidth="1.03" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal items-start justify-end leading-[normal] not-italic relative shrink-0 w-full">
                  <p className="h-[32px] relative shrink-0 text-[#161513] text-[24px] w-full">Realm View</p>
                  <p className="relative shrink-0 text-[#665f5b] text-[11px] w-[1137px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b9b9b9] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="absolute contents left-[264px] top-[212px]">
          <div className="absolute content-stretch flex flex-col items-start left-[264px] top-[212px]">
            <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
              <div className="relative shrink-0" data-name="Body/Realm">
                <div className="content-stretch flex flex-col items-start relative">
                  <div className="content-stretch flex flex-col items-start relative shrink-0">
                    <div className="h-[118px] relative shrink-0" data-name="Header">
                      <div aria-hidden="true" className="absolute border-[#b8b8b8] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none" />
                      <div className="content-stretch flex flex-col h-full items-start relative">
                        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                          <div className="col-1 content-stretch flex flex-col gap-[5px] items-start ml-0 mt-0 relative row-1">
                            <Header className="relative shrink-0 w-[1161px]" property1="Time series with line graph" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative shrink-0" data-name="Graph">
                      <div className="content-stretch flex flex-col items-start pb-[20px] relative">
                        <div className="h-[506px] relative shrink-0 w-[1161px]">
                          <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
                          <div className="absolute contents left-0 top-px">
                            <div className="absolute contents left-0 top-px">
                              <div className="absolute content-stretch flex flex-col h-[506px] items-center justify-center left-0 top-px w-[1162px]">
                                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                  <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
                                    <div className="col-1 h-[503px] ml-0 mt-0 relative row-1 w-[1160.5px]" data-name="2560px-BlankMap-World-Flattened 1">
                                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2560PxBlankMapWorldFlattened1} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute h-[170.521px] left-[448px] top-[120.66px] w-[289px]" />
                              <Search className="absolute h-[35px] left-[13px] top-[19px] w-[196px]" />
                            </div>
                          </div>
                          <div className="absolute right-[10px] top-[19px]" data-name="Button/Last updated">
                            <div className="content-stretch flex flex-col items-start relative">
                              <div className="bg-[#f5f4f2] content-stretch flex items-center px-[10px] py-[9px] relative rounded-[5px] shrink-0">
                                <div aria-hidden="true" className="absolute border border-[#bcb6b1] border-solid inset-0 pointer-events-none rounded-[5px]" />
                                <div className="content-stretch flex items-center relative shrink-0">
                                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                      <div className="col-1 content-stretch flex items-center ml-0 mt-0 relative row-1">
                                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#312d2a] text-[14px] whitespace-nowrap">Showing data for Aug 18, 2023 23:55pm UTC (Latest)</p>
                                      </div>
                                    </div>
                                    <div className="relative shrink-0 size-[16px]" data-name="refresh">
                                      <div className="absolute inset-[16.67%_9.56%_12.5%_8.33%]" data-name="vector">
                                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1381 11.3333">
                                          <path clipRule="evenodd" d={svgPaths.p27766f00} fill="var(--fill-0, #161513)" fillRule="evenodd" id="vector" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute h-[17px] left-[10px] top-[19px] w-[303px]" />
                          <Health1 additionalClassNames="left-[211px] top-[77px]" text="YUL" />
                          <Health1 additionalClassNames="left-[267px] top-[123px]" text="IAD" />
                          <Health1 additionalClassNames="left-[626px] top-[93px]" text="FRA" />
                          <Health1 additionalClassNames="left-[656px] top-[133px]" text="ZRH" />
                          <Health1 additionalClassNames="left-[986px] top-[113px]" text="KIX" />
                          <Health1 additionalClassNames="left-[610px] top-[368px]" text="JNB" />
                          <Health1 additionalClassNames="left-[1008px] top-[327px]" text="SYD" />
                          <Health1 additionalClassNames="left-[756px] top-[181px]" text="BOM" />
                          <div className="absolute bg-[#ac630c] left-[990px] rounded-[3px] top-[122px]" data-name="Health">
                            <div aria-hidden="true" className="absolute border border-[#ac630c] border-solid inset-0 pointer-events-none rounded-[3px]" />
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex gap-[5px] items-center justify-center px-[2.5px] relative">
                                <div className="relative shrink-0 size-[10px]" data-name="Alerts / warning-s-24">
                                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                                    <g id="Alerts / warning-s-24">
                                      <path d={svgPaths.pcef2880} fill="var(--fill-0, white)" id="Vector" />
                                    </g>
                                  </svg>
                                </div>
                                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">NRT</p>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-[#d63b25] left-[693px] rounded-[3px] top-[156px]" data-name="Health">
                            <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center px-[2.5px] relative">
                                <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
                                  <div className="relative shrink-0 size-[10px]" data-name="error">
                                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                                      <g id="error">
                                        <path clipRule="evenodd" d={svgPaths.p1a4c9d80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
                                      </g>
                                    </svg>
                                  </div>
                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">DXB</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Health1 additionalClassNames="left-[143px] top-[115px]" text="LAX" />
                          <Health additionalClassNames="absolute left-[276px] top-[98px]" text="LGA" />
                          <Health additionalClassNames="absolute left-[146px] top-[83px]" text="SEA" />
                          <div className="absolute content-stretch flex items-center left-[22px] top-[466px] w-[303px]">
                            <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative">
                              <div className="col-1 h-[17px] ml-0 mt-0 row-1 w-[303px]" />
                            </div>
                          </div>
                          <Legend className="absolute h-[163px] left-[977px] top-[320px] w-[135px]" state="Collapsed" />
                          <div className="absolute h-[298px] left-[1106px] top-[122px] w-[44px]" data-name="Zoom">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] h-[36px] items-start min-h-px min-w-px relative">
                  <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative self-stretch">
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="col-1 content-stretch flex flex-col h-[36px] items-start ml-0 mt-0 relative row-1 w-[995px]">
                        <div className="h-[36px] relative shrink-0 w-[231px]" data-name="Switch">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-px h-[36px] items-start left-[calc(50%-0.5px)] top-1/2 w-[232px]">
                            <div className="bg-[#b9b9b9] relative rounded-tl-[3px] rounded-tr-[3px] shrink-0">
                              <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
                                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="PSFT/Icons/24/Global">
                                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path d={svgPaths.p4322c00} fill="var(--fill-0, black)" id="Vector" />
                                  </svg>
                                </div>
                                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-black whitespace-nowrap">General health</p>
                              </div>
                              <div aria-hidden="true" className="absolute border border-[#b9b9b9] border-solid inset-0 pointer-events-none rounded-tl-[3px] rounded-tr-[3px]" />
                            </div>
                            <div className="bg-white h-[36px] relative rounded-tl-[3px] rounded-tr-[3px] shrink-0">
                              <div className="content-stretch flex gap-[10px] h-full items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
                                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                  <div className="col-1 content-stretch flex gap-[4px] items-start ml-0 mt-0 relative row-1">
                                    <div className="relative shrink-0 size-[16px]" data-name="divider-grid">
                                      <div className="absolute inset-[8.33%_8.34%_8.33%_8.33%]" data-name="vector">
                                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                                          <path d={svgPaths.p27cb6bf0} fill="var(--fill-0, #161513)" id="vector" />
                                        </svg>
                                      </div>
                                    </div>
                                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-black whitespace-nowrap">Backbone health</p>
                                  </div>
                                </div>
                                <div className="overflow-clip relative shrink-0 size-[18px]" data-name="information">
                                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <g id="Union">
                                      <path d={svgPaths.p24b7a2f0} fill="var(--fill-0, #665F5B)" />
                                      <path d={svgPaths.p3fab4b00} fill="var(--fill-0, #665F5B)" />
                                      <path clipRule="evenodd" d={svgPaths.p26771600} fill="var(--fill-0, #665F5B)" fillRule="evenodd" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                              <div aria-hidden="true" className="absolute border border-[#b9b9b9] border-solid inset-0 pointer-events-none rounded-tl-[3px] rounded-tr-[3px]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-1 h-[36px] ml-[1000px] mt-0 relative row-1 w-[78px]" data-name="Switch">
                        <div className="absolute content-stretch flex gap-px inset-0 items-start">
                          <div className="bg-white relative rounded-[3px] shrink-0">
                            <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
                              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                <div className="col-1 content-stretch flex gap-[4px] items-start ml-0 mt-0 relative row-1">
                                  <div className="relative shrink-0 size-[16px]" data-name="export">
                                    <div className="absolute inset-[8.33%_8.34%_8.33%_8.33%]" data-name="vector">
                                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                                        <path d={svgPaths.p18dbea70} fill="var(--fill-0, #161513)" id="vector" />
                                      </svg>
                                    </div>
                                  </div>
                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-black whitespace-nowrap">Export</p>
                                </div>
                              </div>
                            </div>
                            <div aria-hidden="true" className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[3px]" />
                          </div>
                        </div>
                      </div>
                      <div className="col-1 h-[36px] ml-[1083px] mt-0 relative row-1 w-[78px]" data-name="Switch">
                        <div className="absolute content-stretch flex gap-px inset-0 items-start">
                          <div className="bg-white relative rounded-[3px] shrink-0">
                            <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
                              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                <div className="col-1 content-stretch flex gap-[4px] items-start ml-0 mt-0 relative row-1">
                                  <div className="relative shrink-0 size-[16px]" data-name="filter-alt">
                                    <div className="absolute inset-[8.33%_3.99%_9.92%_3.97%]" data-name="vector">
                                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7262 13.0787">
                                        <path d={svgPaths.pa3ce800} fill="var(--fill-0, #161513)" id="vector" />
                                      </svg>
                                    </div>
                                  </div>
                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-black whitespace-nowrap">Filters</p>
                                </div>
                              </div>
                            </div>
                            <div aria-hidden="true" className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[3px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[185px] relative shrink-0 w-full" data-name="Table/Realm/Empty">
                <div className="absolute bg-white content-stretch flex inset-0 items-start">
                  <div className="content-stretch flex h-[185px] items-start relative shrink-0 w-[120px]">
                    <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-[-1px] pointer-events-none" />
                    <div className="content-stretch flex flex-[1_0_0] flex-col h-[185px] items-start min-h-px min-w-px relative">
                      <div className="bg-[#f8f8f8] h-[37px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="size-full" />
                        </div>
                      </div>
                      <div className="bg-[#f8f8f8] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative w-full">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">Metrics</p>
                            <div className="relative shrink-0 size-[16px]" data-name="SORT">
                              <div className="absolute inset-[16.67%]" data-name="Vector">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                                  <path d={svgPaths.p33861080} fill="var(--fill-0, #665F5B)" id="Vector" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <TableRealmEmptyText text="Availability" />
                      <TableRealmEmptyText text="Performance" />
                      <TableRealmEmptyText text="Reliability" />
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[185px] min-h-px min-w-px relative">
                    <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-dashed inset-0 pointer-events-none" />
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">Add up to 3 regions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#d9d9d9] h-[199px] left-[764px] opacity-0 top-[461px] w-[262px]" />
        </div>
      </div>
      <div className="absolute contents left-0 top-[39px]">
        <div className="absolute contents left-0 top-[39px]">
          <div className="absolute bg-[#eef1f4] h-[811px] left-0 top-[39px] w-[256px]">
            <div aria-hidden="true" className="absolute border border-[#bcb6b1] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
        <div className="absolute h-[120.107px] left-[3px] top-[56.36px] w-[250px]" data-name="Screenshot 2023-10-03 at 5.05 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-[-1.69%] max-w-none top-0 w-[105.93%]" src={imgScreenshot20231003At5052} />
          </div>
        </div>
      </div>
    </div>
  );
}