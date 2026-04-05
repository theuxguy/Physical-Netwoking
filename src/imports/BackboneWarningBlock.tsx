import svgPaths from "./svg-backbone-warning-icon";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#f1efed] content-stretch flex flex-col h-[62px] items-start left-0 p-[10px] rounded-[6px] top-0">
        <div aria-hidden="true" className="absolute border border-[#de8011] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="content-stretch flex items-center relative shrink-0">
          <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[24px]" data-name="trunk">
              <div className="absolute inset-[8.33%]" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p36fdd780} fill="var(--fill-0, #161513)" id="vector" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
              <div className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[0px] text-black w-[67px]">
                <p className="mb-0 text-[11px]">Backbone</p>
                <p className="text-[#665f5b] text-[9px]">Some info. here</p>
              </div>
              <div className="relative shrink-0 size-[14px]" data-name="Alerts / warning-s-24">
                <div className="absolute inset-[14.29%_-57.14%_-57.14%_14.29%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.666 11.666">
                    <path d={svgPaths.p7609c00} fill="var(--fill-0, #AC630C)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}