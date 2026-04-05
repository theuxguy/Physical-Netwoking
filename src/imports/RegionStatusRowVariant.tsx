import clsx from "clsx";
import svgPaths from "./svg-sort-icon";
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <TableRealmOneRegionText2 text="Warning" additionalClassNames="size-full" />
      </div>
    </div>
  );
}
type Text2Props = {
  text: string;
  additionalClassNames?: string;
};

function Text2({ text, additionalClassNames = "" }: Text2Props) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center p-[10px] relative", additionalClassNames)}>
      <div className="bg-[rgba(80,130,35,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] text-[11px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type TableRealmOneRegionText4Props = {
  text: string;
  additionalClassNames?: string;
};

function TableRealmOneRegionText4({ text, additionalClassNames = "" }: TableRealmOneRegionText4Props) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <Text2 text={text} additionalClassNames="size-full" />
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center p-[10px] relative", additionalClassNames)}>
      <div className="bg-[rgba(214,59,37,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#d63b25] text-[11px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type TableRealmOneRegionText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TableRealmOneRegionText3({ text, additionalClassNames = "" }: TableRealmOneRegionText3Props) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <Text1 text={text} additionalClassNames="size-full" />
      </div>
    </div>
  );
}
type TableRealmOneRegionText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TableRealmOneRegionText2({ text, additionalClassNames = "" }: TableRealmOneRegionText2Props) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center p-[10px] relative", additionalClassNames)}>
      <div className="bg-[rgba(222,128,17,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[#ac630c] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#ac630c] text-[11px] whitespace-nowrap">{text}</p>
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
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">{text}</p>
    </div>
  );
}
type TableRealmOneRegionText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TableRealmOneRegionText1({ text, additionalClassNames = "" }: TableRealmOneRegionText1Props) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <Text text={text} additionalClassNames="w-full" />
      </div>
    </div>
  );
}
type TableRealmOneRegionTextProps = {
  text: string;
};

function TableRealmOneRegionText({ text }: TableRealmOneRegionTextProps) {
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
type TableRealmOneRegionHelperProps = {
  additionalClassNames?: string;
};

function TableRealmOneRegionHelper({ additionalClassNames = "" }: TableRealmOneRegionHelperProps) {
  return (
    <div className={clsx("h-[37px] relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <div className="h-[185px] relative shrink-0 w-[1161px]" data-name="Table/Realm/One-Region">
        <div className="-translate-x-1/2 absolute bottom-0 content-stretch flex flex-col items-start left-1/2 top-0">
          <div className="bg-white content-stretch flex h-[185px] items-start relative shrink-0 w-[1162px]">
            <div className="content-stretch flex h-[185px] items-start relative shrink-0 w-[119px]">
              <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-[-1px] pointer-events-none" />
              <div className="content-stretch flex flex-[1_0_0] flex-col h-[185px] items-start min-h-px min-w-px relative">
                <TableRealmOneRegionHelper additionalClassNames="bg-[#f8f8f8]" />
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
                <TableRealmOneRegionText text="Availability" />
                <TableRealmOneRegionText text="Performance" />
                <TableRealmOneRegionText text="Reliability" />
              </div>
            </div>
            <div className="content-stretch flex h-[188px] items-start relative shrink-0">
              <div className="content-stretch flex flex-col h-[185px] items-start relative shrink-0 w-[96px]">
                <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                <TableRealmOneRegionHelper additionalClassNames="bg-[rgba(214,59,37,0.2)]" />
                <TableRealmOneRegionText1 text="AD-1" additionalClassNames="bg-[#f8f8f8]" />
                <div className="bg-white relative shrink-0 w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <TableRealmOneRegionText2 text="Warning" additionalClassNames="w-full" />
                  </div>
                </div>
                <TableRealmOneRegionText3 text="Critical" additionalClassNames="h-[31px]" />
                <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[39px]" />
              </div>
              <div className="content-stretch flex flex-col h-[185px] items-start relative shrink-0 w-[96px]">
                <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                <TableRealmOneRegionHelper additionalClassNames="bg-[rgba(214,59,37,0.2)]" />
                <TableRealmOneRegionText1 text="AD-2" additionalClassNames="bg-[#f8f8f8]" />
                <TableRealmOneRegionText3 text="Critical" additionalClassNames="h-[34px]" />
                <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[37px]" />
                <Helper additionalClassNames="h-[38px]" />
              </div>
              <div className="content-stretch flex flex-col h-[185px] items-start relative shrink-0 w-[96px]">
                <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                <TableRealmOneRegionHelper additionalClassNames="bg-[rgba(214,59,37,0.2)]" />
                <TableRealmOneRegionText1 text="AD-3" additionalClassNames="bg-[#f8f8f8]" />
                <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[34px]" />
                <Helper additionalClassNames="h-[37px]" />
                <TableRealmOneRegionText3 text="Critical" additionalClassNames="h-[38px]" />
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="col-1 content-stretch flex flex-col h-[185px] items-start ml-0 mt-0 relative row-1 w-[105.304px]">
                <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                <TableRealmOneRegionText1 text="DXB (Dubai)" additionalClassNames="bg-[rgba(214,59,37,0.2)]" />
                <TableRealmOneRegionText1 text="FastConnect" additionalClassNames="bg-[#f8f8f8]" />
                <TableRealmOneRegionText3 text="Critical" additionalClassNames="h-[36px]" />
                <div className="bg-white relative shrink-0 w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <Text1 text="Critical" additionalClassNames="w-full" />
                  </div>
                </div>
                <TableRealmOneRegionText3 text="Critical" additionalClassNames="h-[32px]" />
              </div>
            </div>
            <div className="content-stretch flex flex-col h-[185px] items-start relative shrink-0 w-[95px]">
              <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
              <TableRealmOneRegionHelper additionalClassNames="bg-[rgba(214,59,37,0.2)]" />
              <TableRealmOneRegionText1 text="Internet" additionalClassNames="bg-[#f8f8f8]" />
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center justify-center size-full">
                  <Text2 text="Healthy" additionalClassNames="w-full" />
                </div>
              </div>
              <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[31px]" />
              <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[39px]" />
            </div>
            <div className="content-stretch flex flex-col h-[185px] items-start relative shrink-0 w-[104px]">
              <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
              <div className="bg-[rgba(214,59,37,0.2)] h-[37px] relative shrink-0 w-full">
                <div className="flex flex-row items-center justify-end size-full">
                  <div className="size-full" />
                </div>
              </div>
              <TableRealmOneRegionText1 text="VPN" additionalClassNames="bg-[#f8f8f8]" />
              <TableRealmOneRegionText3 text="Critical" additionalClassNames="h-[35px]" />
              <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[43px]" />
              <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[32px]" />
            </div>
            <div className="content-stretch flex flex-col h-[185px] items-start relative shrink-0 w-[128px]">
              <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
              <div className="bg-[rgba(214,59,37,0.2)] h-[37px] relative shrink-0 w-full">
                <div className="flex flex-row items-center justify-end size-full">
                  <div className="content-stretch flex gap-[10px] items-center justify-end pr-[10px] py-[10px] relative size-full">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#00688c] text-[12px] w-[92px]">View all issues</p>
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
              <TableRealmOneRegionText1 text="Backbone" additionalClassNames="bg-[#f8f8f8]" />
              <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[43px]" />
              <TableRealmOneRegionText3 text="Critical" additionalClassNames="h-[35px]" />
              <TableRealmOneRegionText4 text="Healthy" additionalClassNames="h-[32px]" />
            </div>
            <div className="bg-white flex-[1_0_0] h-[186px] min-h-px min-w-px relative">
              <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-dashed inset-0 pointer-events-none" />
              <div className="flex flex-row items-center justify-center size-full">
                <Text text="Add up to 2 more regions" additionalClassNames="size-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}