import clsx from "clsx";
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("bg-white relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
          <div className="bg-[rgba(80,130,35,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
            <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[3px]" />
            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] text-[11px] whitespace-nowrap">{"Healthy"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
      <div className="bg-[#f8f8f8] h-[37px] relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[#f8f8f8] relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">Metro</p>
          </div>
        </div>
      </div>
      <Helper additionalClassNames="h-[70px]" />
      <Helper additionalClassNames="h-[67px]" />
      <Helper additionalClassNames="h-[67px]" />
    </div>
  );
}