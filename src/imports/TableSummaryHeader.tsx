import clsx from "clsx";
import svgPaths from "./svg-table-header-icon";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex gap-[0.5px] items-end justify-center ml-0 mt-0 relative row-1">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex flex-col h-[18px] items-start justify-end ml-0 mt-0 relative row-1 w-[3px]">{children}</div>
    </div>
  );
}
type HeaderHelper11Props = {
  additionalClassNames?: string;
};

function HeaderHelper11({ children, additionalClassNames = "" }: React.PropsWithChildren<HeaderHelper11Props>) {
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

function HeaderHelper10() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[10px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function HeaderHelper9() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[8px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function HeaderHelper8() {
  return (
    <Wrapper>
      <div className="bg-[#508223] h-[22px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[10px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </Wrapper>
  );
}

function HeaderHelper7() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[23px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function HeaderHelper6() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[4px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[6px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[13px] shrink-0 w-full" />
    </div>
  );
}

function Helper2() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
      <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[10px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </div>
  );
}

function HeaderHelper5() {
  return (
    <Wrapper>
      <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[10px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </Wrapper>
  );
}

function HeaderHelper4() {
  return (
    <Wrapper>
      <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
      <div className="bg-[#de8011] h-[5px] shrink-0 w-full" />
      <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
    </Wrapper>
  );
}

function HeaderHelper3() {
  return (
    <div className="flex items-center justify-center relative shrink-0 w-full">
      <div className="-scale-y-100 flex-none w-full">
        <div className="bg-[#508223] h-px w-full" />
      </div>
    </div>
  );
}
type HeaderHelper2Props = {
  additionalClassNames?: string;
};

function HeaderHelper2({ additionalClassNames = "" }: HeaderHelper2Props) {
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
type HeaderHelper1Props = {
  additionalClassNames?: string;
};

function HeaderHelper1({ additionalClassNames = "" }: HeaderHelper1Props) {
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
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
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
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
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
type HeaderHelperProps = {
  additionalClassNames?: string;
};

function HeaderHelper({ additionalClassNames = "" }: HeaderHelperProps) {
  return (
    <div className={clsx("content-stretch flex gap-px items-end justify-center relative shrink-0", additionalClassNames)}>
      <Helper />
      <Helper1 />
    </div>
  );
}

export default function Header() {
  return (
    <div className="relative size-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#b8b8b8] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none" />
      <div className="content-stretch flex flex-col items-start relative size-full">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="col-1 content-stretch flex flex-col gap-[5px] items-start ml-0 mt-0 relative row-1">
            <div className="relative shrink-0 w-[1161px]" data-name="Header">
              <div className="content-stretch flex flex-col items-start p-[10px] relative w-full">
                <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
                  <div className="h-[24px] relative shrink-0 w-[1141px]" data-name="Header/Line graph">
                    <div className="absolute contents inset-[0_0.25%_0_0]">
                      <div className="absolute bg-[rgba(34,126,158,0.1)] border border-[#b6b2ad] border-solid inset-[0_2.88px_0_3.88px] rounded-[6px]" />
                      <div className="absolute contents inset-[22.87%_0.25%_41.67%_0.42%]">
                        <HeaderHelper11 additionalClassNames="inset-[31.25%_89.14%_41.67%_0.42%]">
                          <g id="Group 544">
                            <path d={svgPaths.p3f328aa0} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                            <path d={svgPaths.p3e09af00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                            <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.1761" x2="91.5107" y1="6.5" y2="6.5" />
                          </g>
                        </HeaderHelper11>
                        <HeaderHelper11 additionalClassNames="inset-[31.25%_78.78%_41.67%_10.78%]">
                          <g id="Group 545">
                            <path d={svgPaths.p3f328aa0} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                            <path d={svgPaths.p3e09af00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                            <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.1761" x2="91.5107" y1="6.5" y2="6.5" />
                          </g>
                        </HeaderHelper11>
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
                        <HeaderHelper11 additionalClassNames="inset-[31.25%_23.47%_41.67%_66.08%]">
                          <g id="Group 549">
                            <path d={svgPaths.p3f328aa0} id="Line 113" stroke="var(--stroke-0, #227E9E)" />
                            <path d={svgPaths.p3e09af00} id="Line 115" stroke="var(--stroke-0, #227E9E)" />
                            <line id="Line 114" stroke="var(--stroke-0, #227E9E)" x1="37.1761" x2="91.5107" y1="6.5" y2="6.5" />
                          </g>
                        </HeaderHelper11>
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
                      <p className="absolute font-normal inset-[0_84.24%_87.84%_0.86%] leading-[normal] not-italic text-[#161513] text-[11px]">Incident count (in thousands)</p>
                      <div className="absolute contents inset-[83.78%_-0.43%_4.15%_1.03%]">
                        <div className="absolute content-stretch flex font-normal gap-[4px] inset-[83.78%_-0.43%_4.15%_1.03%] items-start leading-[normal] not-italic text-[#161513] text-[8px] text-center whitespace-nowrap">
                          <p className="relative shrink-0">{`07/06 `}</p>
                          <p className="relative shrink-0">{`07/07 `}</p>
                          <p className="relative shrink-0">{`07/08 `}</p>
                          <p className="relative shrink-0">07/09</p>
                          <p className="relative shrink-0">07/10</p>
                          <p className="relative shrink-0">07/11</p>
                          <p className="relative shrink-0">07/12</p>
                          <p className="relative shrink-0">07/13</p>
                          <p className="relative shrink-0">07/14</p>
                          <p className="relative shrink-0">07/15</p>
                          <p className="relative shrink-0">07/16</p>
                          <p className="relative shrink-0">07/17</p>
                          <p className="relative shrink-0">07/18</p>
                          <p className="relative shrink-0">07/19</p>
                          <p className="relative shrink-0">07/20</p>
                          <p className="relative shrink-0">07/21</p>
                          <p className="relative shrink-0">07/22</p>
                          <p className="relative shrink-0">07/23</p>
                          <p className="relative shrink-0">07/24</p>
                          <p className="relative shrink-0">07/25</p>
                          <p className="relative shrink-0">07/26</p>
                          <p className="relative shrink-0">07/27</p>
                          <p className="relative shrink-0">07/28</p>
                          <p className="relative shrink-0">07/29</p>
                          <p className="relative shrink-0">07/30</p>
                          <p className="relative shrink-0">07/31</p>
                          <p className="relative shrink-0">08/01</p>
                          <p className="relative shrink-0">08/02</p>
                          <p className="relative shrink-0">08/03</p>
                          <p className="relative shrink-0">08/04</p>
                          <p className="relative shrink-0">08/05</p>
                          <p className="relative shrink-0">08/06</p>
                          <p className="relative shrink-0">08/07</p>
                          <p className="relative shrink-0">08/08</p>
                          <p className="relative shrink-0">08/09</p>
                          <p className="relative shrink-0">08/10</p>
                          <p className="relative shrink-0">08/11</p>
                          <p className="relative shrink-0">08/12</p>
                          <p className="relative shrink-0">08/13</p>
                          <p className="relative shrink-0">08/14</p>
                          <p className="relative shrink-0">08/15</p>
                          <p className="relative shrink-0">08/16</p>
                          <p className="relative shrink-0">08/17</p>
                        </div>
                      </div>
                      <div className="absolute contents inset-[16.22%_99.11%_19.99%_0.09%]">
                        <div className="absolute content-stretch flex flex-col font-normal gap-px inset-[16.22%_99.11%_19.99%_0.09%] items-center leading-[normal] not-italic text-[#161513] text-[8px] text-center whitespace-nowrap">
                          <p className="relative shrink-0">20</p>
                          <p className="relative shrink-0">15</p>
                          <p className="relative shrink-0">10</p>
                          <p className="relative shrink-0">5</p>
                        </div>
                      </div>
                      <div className="absolute contents inset-[45.95%_0.39%_20.1%_1.03%]">
                        <div className="absolute content-stretch flex gap-[0.5px] inset-[45.95%_0.39%_20.1%_1.03%] items-end">
                          <HeaderHelper additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Wrapper1>
                            <HeaderHelper />
                            <HeaderHelper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper1 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <Helper />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <Helper1 />
                            <HeaderHelper2 />
                          </Wrapper1>
                          <div className="content-stretch flex gap-[0.5px] items-end justify-center relative shrink-0">
                            <HeaderHelper additionalClassNames="leading-[0]" />
                            <HeaderHelper1 additionalClassNames="leading-[0]" />
                            <Wrapper>
                              <HeaderHelper3 />
                              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
                            </Wrapper>
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper4 />
                            <HeaderHelper5 />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper6 />
                            <Helper2 />
                            <Helper1 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <Wrapper>
                              <div className="bg-[#508223] h-[4px] shrink-0 w-full" />
                              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
                              <div className="bg-[#d63b25] h-[30px] shrink-0 w-full" />
                            </Wrapper>
                            <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
                              <div className="bg-[#508223] h-[6px] shrink-0 w-full" />
                              <div className="bg-[#de8011] h-[6px] shrink-0 w-full" />
                              <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
                            </div>
                            <HeaderHelper1 additionalClassNames="leading-[0]" />
                            <Wrapper>
                              <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
                              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
                              <div className="bg-[#d63b25] h-[6px] shrink-0 w-full" />
                            </Wrapper>
                            <HeaderHelper5 />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
                              <div className="bg-[#508223] h-[3px] shrink-0 w-full" />
                              <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
                              <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
                            </div>
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
                              <HeaderHelper3 />
                              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
                              <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
                            </div>
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper7 />
                            <Helper1 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper8 />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper9 />
                            <Helper additionalClassNames="leading-[0]" />
                            <Helper additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
                              <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
                              <div className="bg-[#de8011] h-[16px] shrink-0 w-full" />
                              <div className="bg-[#d63b25] h-[20px] shrink-0 w-full" />
                            </div>
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper10 />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <Helper additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper10 />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <Helper additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <Helper1 additionalClassNames="leading-[0]" />
                            <div className="content-stretch flex flex-col h-[18px] items-start justify-end relative shrink-0 w-[3px]">
                              <HeaderHelper3 />
                              <div className="bg-[#de8011] h-[4px] shrink-0 w-full" />
                              <div className="bg-[#d63b25] h-[34px] shrink-0 w-full" />
                            </div>
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper4 />
                            <HeaderHelper5 />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper6 />
                            <Helper2 />
                            <Helper1 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <Helper1 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <Helper additionalClassNames="leading-[0]" />
                            <Helper1 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper7 />
                            <Helper1 additionalClassNames="leading-[0]" />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper8 />
                            <HeaderHelper2 additionalClassNames="leading-[0]" />
                            <HeaderHelper9 />
                            <Helper additionalClassNames="leading-[0]" />
                            <Helper additionalClassNames="leading-[0]" />
                          </div>
                          <Wrapper1>
                            <HeaderHelper />
                            <HeaderHelper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper1 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <Helper />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <Helper1 />
                            <HeaderHelper2 />
                          </Wrapper1>
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper6 />
                          <Helper2 />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <div className="content-stretch flex flex-col h-[5px] items-start justify-end relative shrink-0 w-[3px]">
                            <div className="bg-[#508223] h-[2px] shrink-0 w-full" />
                            <div className="bg-[#de8011] h-px shrink-0 w-full" />
                            <div className="bg-[#d63b25] h-[2px] shrink-0 w-full" />
                          </div>
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper1 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <Helper1 additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <Helper additionalClassNames="leading-[0]" />
                          <HeaderHelper2 additionalClassNames="leading-[0]" />
                          <div className="content-stretch flex gap-px items-end justify-center leading-[0] relative shrink-0">
                            <Helper />
                            <Helper1 />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <Helper1 />
                            <HeaderHelper2 />
                            <Helper />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <Helper />
                            <HeaderHelper2 />
                            <Helper />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                            <HeaderHelper2 />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-[1.35%_1.89%_1.35%_97.85%] rounded-[5px]">
                        <div aria-hidden="true" className="absolute border-2 border-[#227e9e] border-solid inset-[-2px] pointer-events-none rounded-[7px]" />
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
  );
}