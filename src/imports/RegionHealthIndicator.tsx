import clsx from "clsx";
import svgPaths from "./svg-region-warning-icon";
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col gap-[10px] items-center top-[6.61px]", additionalClassNames)}>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] h-[14.103px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[17.727px]">{text}</p>
      <AlertsWarningS />
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-center", additionalClassNames)}>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] h-[23px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[18px]">{text}</p>
      <Success className="relative shrink-0 size-[14px]" />
    </div>
  );
}

function AlertsWarningS() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <div className="absolute inset-[14.29%_-57.14%_-57.14%_14.29%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.666 11.666">
          <path d={svgPaths.p7609c00} fill="var(--fill-0, #AC630C)" id="Vector" />
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

export default function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] items-center justify-center p-[16px] relative rounded-[8px] size-full">
      <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex items-center relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
          <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
            <AlertsWarningS />
            <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[11px] text-black w-[65px]">AD-1</p>
          </div>
        </div>
      </div>
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
        <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
          <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[57.901px] ml-[90.18px] mt-0 relative rounded-[5px] row-1 w-[36.313px]">
            <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-[-1px] pointer-events-none rounded-[6px]" />
          </div>
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[2.01%] place-items-start relative row-1">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[43.35%] mt-0 place-items-start relative row-1">
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
                <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
                  <div className="col-1 h-[51.698px] ml-0 mt-0 relative rounded-[5px] row-1 w-[30.26px]">
                    <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-[-1px] pointer-events-none rounded-[6px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 h-[51.698px] ml-0 mt-[99.66px] relative row-1 w-[215px]">
              <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
              <div className="absolute contents left-0 top-0">
                <div className="absolute border border-[#508223] border-solid h-[50px] left-0 rounded-[5px] top-0 w-[30px]" />
              </div>
              <div className="absolute contents left-[37px] top-0">
                <div className="absolute border border-[#508223] border-solid h-[50px] left-[37px] rounded-[5px] top-0 w-[30px]" />
              </div>
              <div className="absolute contents left-[74px] top-0">
                <div className="absolute contents left-[74px] top-0">
                  <div className="absolute border border-[rgba(222,128,17,0.6)] border-solid h-[50px] left-[74px] rounded-[5px] top-0 w-[30px]" />
                </div>
              </div>
              <div className="absolute contents left-[111px] top-0">
                <div className="absolute contents left-[111px] top-0">
                  <div className="absolute border border-[rgba(222,128,17,0.6)] border-solid h-[50px] left-[111px] rounded-[5px] top-0 w-[30px]" />
                </div>
              </div>
              <div className="absolute contents left-[148px] top-0">
                <div className="absolute border border-[#508223] border-solid h-[50px] left-[148px] rounded-[5px] top-0 w-[30px]" />
                <div className="absolute border border-[#508223] border-solid h-[50px] left-[148px] rounded-[5px] top-0 w-[30px]" />
              </div>
              <div className="absolute contents left-[185px] top-0">
                <div className="absolute border border-[#508223] border-solid h-[50px] left-[185px] rounded-[5px] top-0 w-[30px]" />
                <div className="absolute border border-[#508223] border-solid h-[50px] left-[185px] rounded-[5px] top-0 w-[30px]" />
              </div>
              <Text text="BLD 02" additionalClassNames="left-[6.18px] top-[5.61px]" />
              <Text text="BLD 03" additionalClassNames="gap-px left-[43.18px] top-[5.61px]" />
              <div className="absolute content-stretch flex flex-col items-start left-[154.18px] top-[6.61px]">
                <p className="font-['Helvetica_Neue:Regular',sans-serif] h-[23px] leading-[normal] not-italic relative shrink-0 text-[9px] text-black text-center w-[18px]">BLD 06</p>
                <Success className="relative shrink-0 size-[14px]" />
              </div>
              <Text text="BLD 07" additionalClassNames="left-[191.18px] top-[7.61px]" />
              <Text1 text="BLD 04" additionalClassNames="left-[80.18px]" />
              <Text1 text="BLD 05" additionalClassNames="left-[117.18px]" />
            </div>
            <div className="col-1 flex h-[44.46px] items-center justify-center ml-[15.13px] mt-[55.2px] relative row-1 w-[92.799px]">
              <div className="flex-none h-px rotate-[154.4deg] skew-x-[-1.09deg] w-[102.899px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.67px_-2.59%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 108.233 5.33333">
                      <path d={svgPaths.p3d36c040} fill="var(--stroke-0, #508223)" id="Line 50" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 flex h-[44.46px] items-center justify-center ml-[52.45px] mt-[55.2px] relative row-1 w-[55.477px]">
              <div className="flex-none h-px rotate-[141.29deg] skew-x-[-1.38deg] w-[71.094px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.67px_-3.75%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76.4278 5.33333">
                      <path d={svgPaths.p1bf3ae70} fill="var(--stroke-0, #508223)" id="Line 65" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 flex h-[44.46px] items-center justify-center ml-[89.77px] mt-[55.2px] relative row-1 w-[18.156px]">
              <div className="flex-none h-px rotate-[112.21deg] skew-x-[-1.01deg] w-[48.024px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.67px_-5.55%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.3576 5.33333">
                      <path d={svgPaths.p2a0e8e80} fill="var(--stroke-0, #AC630C)" id="Line 66" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 flex h-[44.46px] items-center justify-center ml-[107.93px] mt-[55.2px] relative row-1 w-[19.165px]">
              <div className="flex-none h-px rotate-[66.68deg] skew-x-[1.05deg] w-[48.415px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.67px_-5.51%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.7479 5.33333">
                      <path d={svgPaths.p1a769c00} fill="var(--stroke-0, #AC630C)" id="Line 67" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 flex h-[44.46px] items-center justify-center ml-[107.93px] mt-[55.2px] relative row-1 w-[56.486px]">
              <div className="flex-none h-px rotate-[38.21deg] skew-x-[1.37deg] w-[71.884px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.67px_-3.71%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.2177 5.33333">
                      <path d={svgPaths.p2320d180} fill="var(--stroke-0, #508223)" id="Line 68" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 flex h-[44.46px] items-center justify-center ml-[107.93px] mt-[55.2px] relative row-1 w-[93.807px]">
              <div className="flex-none h-px rotate-[25.36deg] skew-x-[1.08deg] w-[103.81px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.67px_-2.57%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.143 5.33333">
                      <path d={svgPaths.p36e4e600} fill="var(--stroke-0, #508223)" id="Line 69" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[calc(50%-7.32px)] mt-[calc(50%-67.93px)] place-items-start relative row-1">
          <div className="col-1 content-stretch flex flex-col items-center ml-0 mt-0 relative row-1">
            <div aria-hidden="true" className="absolute border-0 border-[#b6b2ad] border-solid inset-0 pointer-events-none" />
            <p className="font-['Helvetica_Neue:Regular',sans-serif] h-[24px] leading-[normal] not-italic relative shrink-0 text-[#222] text-[9px] text-center w-[18.156px]">BLD 01</p>
            <div className="relative shrink-0 size-[14px]" data-name="Alerts / error-s-24">
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
          </div>
        </div>
      </div>
    </div>
  );
}