import clsx from "clsx";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center px-[10px] py-[7px] relative size-full">{children}</div>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("bg-[rgba(255,255,255,0.1)] relative shrink-0 w-full", additionalClassNames)}>
      <Wrapper>
        <div className="bg-[rgba(80,130,35,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
          <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[3px]" />
          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] text-[11px] whitespace-nowrap">{"Healthy"}</p>
        </div>
      </Wrapper>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex items-center relative w-full", additionalClassNames)}>
      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
      <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-end size-full">
          <Text text="AD-2" additionalClassNames="justify-end pl-[10px] py-[10px]" />
        </div>
      </div>
      <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <Text text="Fabric" additionalClassNames="justify-center p-[10px]" />
        </div>
      </div>
      <Helper additionalClassNames="h-[65px]" />
      <div className="bg-[rgba(255,255,255,0.1)] h-[69px] relative shrink-0 w-full">
        <Wrapper>
          <div className="bg-[rgba(214,59,37,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
            <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#d63b25] text-[11px] whitespace-nowrap">Critical</p>
          </div>
        </Wrapper>
      </div>
      <Helper additionalClassNames="h-[70px]" />
    </div>
  );
}