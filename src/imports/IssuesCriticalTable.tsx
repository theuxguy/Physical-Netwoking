import clsx from "clsx";
import svgPaths from "./svg-issues-chart-content-icon";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#d7d7d7] border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Helper4() {
  return (
    <Wrapper1 additionalClassNames="h-[59px]">
      <div className="content-stretch flex items-center justify-center px-[10px] py-[7px] relative size-full">
        <Text4 text="Critical" />
      </div>
    </Wrapper1>
  );
}
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return (
    <Wrapper1 additionalClassNames={additionalClassNames}>
      <div className="content-stretch flex items-center justify-center px-[10px] py-[7px] relative size-full">
        <Text3 text="Healthy" />
      </div>
    </Wrapper1>
  );
}

function Helper2() {
  return (
    <Wrapper1 additionalClassNames="bg-[rgba(214,59,37,0.2)] h-[37px]">
      <div className="size-full" />
    </Wrapper1>
  );
}
type Text4Props = {
  text: string;
};

function Text4({ text }: Text4Props) {
  return (
    <div className="bg-[rgba(214,59,37,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#d63b25] text-[11px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <Text3 text="Healthy" />
    </Wrapper>
  );
}
type Text3Props = {
  text: string;
};

function Text3({ text }: Text3Props) {
  return (
    <div className="bg-[rgba(80,130,35,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#508223] text-[11px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type Text2Props = {
  text: string;
  additionalClassNames?: string;
};

function Text2({ text, additionalClassNames = "" }: Text2Props) {
  return (
    <div className={clsx("content-stretch flex items-center relative w-full", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">{text}</p>
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <Text2 text={text} additionalClassNames="justify-center p-[10px]" />
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
      <Text1 text={text} />
    </div>
  );
}

function Helper() {
  return (
    <div className="bg-[rgba(214,59,37,0.2)] h-[37px] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white content-stretch flex flex-col h-[281px] items-start left-0 top-0 w-[72.72px]">
        <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-l border-solid border-t inset-[-1px_0_-1px_-1px] pointer-events-none" />
        <Helper />
        <Helper />
        <Text text="CFAB" />
        <Helper1 additionalClassNames="h-[55px]" />
        <Helper1 additionalClassNames="h-[59px]" />
        <Helper1 additionalClassNames="h-[55px]" />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[281px] items-start left-[72.72px] top-0 w-[72.72px]">
        <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
        <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-end size-full">
            <Text2 text="BLD 08 DXB" additionalClassNames="justify-end pl-[10px] py-[10px]" />
          </div>
        </div>
        <Text text="Fabric" />
        <Text text="JFAB" />
        <Wrapper additionalClassNames="h-[55px]">
          <div className="bg-[rgba(222,128,17,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
            <div aria-hidden="true" className="absolute border border-[#ac630c] border-solid inset-0 pointer-events-none rounded-[3px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#ac630c] text-[11px] whitespace-nowrap">Warning</p>
          </div>
        </Wrapper>
        <Wrapper additionalClassNames="h-[59px]">
          <Text4 text="Critical" />
        </Wrapper>
        <Helper1 additionalClassNames="h-[56px]" />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[281px] items-start left-[145.44px] top-0 w-[73.839px]">
        <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
        <div className="bg-[rgba(214,59,37,0.2)] h-[37px] relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="size-full" />
          </div>
        </div>
        <Helper2 />
        <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#d7d7d7] border-r border-solid inset-0 pointer-events-none" />
          <Text1 text="FFAB" />
        </div>
        <Helper3 additionalClassNames="h-[55px]" />
        <Helper4 />
        <Helper3 additionalClassNames="h-[55px]" />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[281px] items-start left-[219.28px] top-0 w-[72.72px]">
        <div aria-hidden="true" className="absolute border-[#d5d5d5] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
        <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-end size-full">
            <div className="content-stretch flex items-center justify-end p-[10px] relative w-full">
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
        <Helper2 />
        <div className="bg-[rgba(214,59,37,0.2)] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#d7d7d7] border-r border-solid inset-0 pointer-events-none" />
          <Text1 text="TOR" />
        </div>
        <Helper3 additionalClassNames="h-[56px]" />
        <Helper4 />
        <Helper3 additionalClassNames="h-[56px]" />
      </div>
    </div>
  );
}