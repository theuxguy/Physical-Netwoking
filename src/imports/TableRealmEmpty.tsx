import svgPaths from "./svg-health-table-icons";
type TableRealmEmptyTextProps = {
  text: string;
};

function TableRealmEmptyText({ text }: TableRealmEmptyTextProps) {
  return (
    <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function TableRealmEmpty() {
  return (
    <div className="relative size-full" data-name="Table/Realm/Empty">
      <div className="absolute bg-white dark:bg-[#1a1a1a] content-stretch flex inset-0 items-start">
        <div className="content-stretch flex h-[185px] items-start relative shrink-0 w-[120px]">
          <div aria-hidden="true" className="absolute border border-[#d8d8d8] dark:border-[#404040] border-solid inset-[-1px] pointer-events-none" />
          <div className="content-stretch flex flex-[1_0_0] flex-col h-[185px] items-start min-h-px min-w-px relative">
            <div className="bg-[#f8f8f8] dark:bg-[#252525] h-[37px] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="size-full" />
              </div>
            </div>
            <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative w-full">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Metrics</p>
                  <div className="relative shrink-0 size-[16px]" data-name="SORT">
                    <div className="absolute inset-[16.67%]" data-name="Vector">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                        <path d={svgPaths.p33861080} className="fill-[#665F5B] dark:fill-[#a0a0a0]" id="Vector" />
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

        {/* Metro Column */}
        <div className="content-stretch flex h-[185px] items-start relative shrink-0 w-[96px]">
          <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
          <div className="content-stretch flex flex-[1_0_0] flex-col h-[185px] items-start min-h-px min-w-px relative">
            {/* Empty header cell */}
            <div className="bg-[#f8f8f8] dark:bg-[#252525] h-[37px] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="size-full" />
              </div>
            </div>
            {/* Metro label */}
            <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[46px]">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Metro</p>
                </div>
              </div>
            </div>
            {/* Metro Availability - Healthy */}
            <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full h-[34px]">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
                  <div className="bg-[rgba(80,130,35,0.2)] dark:bg-[rgba(80,130,35,0.15)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
                    <div aria-hidden="true" className="absolute border border-[#508223] dark:border-[#6ba32e] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] dark:text-[#6ba32e] text-[11px] whitespace-nowrap">Healthy</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Metro Performance - Healthy */}
            <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full h-[34px]">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
                  <div className="bg-[rgba(80,130,35,0.2)] dark:bg-[rgba(80,130,35,0.15)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
                    <div aria-hidden="true" className="absolute border border-[#508223] dark:border-[#6ba32e] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] dark:text-[#6ba32e] text-[11px] whitespace-nowrap">Healthy</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Metro Reliability - Healthy */}
            <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full h-[34px]">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
                  <div className="bg-[rgba(80,130,35,0.2)] dark:bg-[rgba(80,130,35,0.15)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
                    <div aria-hidden="true" className="absolute border border-[#508223] dark:border-[#6ba32e] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] dark:text-[#6ba32e] text-[11px] whitespace-nowrap">Healthy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] flex-[1_0_0] h-[185px] min-h-px min-w-px relative">
          <div aria-hidden="true" className="absolute border border-[#dcdcdc] dark:border-[#505050] border-dashed inset-0 pointer-events-none" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Add up to 3 regions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}