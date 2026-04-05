import svgPaths from "./svg-backbone-trunk-icon";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white dark:bg-[#2a2a2a] content-stretch flex flex-col h-[45px] items-start left-0 p-[10px] rounded-[6px] top-0">
        <div aria-hidden="true" className="absolute border border-[#de8011] dark:border-[#ff981e] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="content-stretch flex items-center relative shrink-0">
          <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[24px]" data-name="trunk">
              <div className="absolute inset-[8.33%]" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p36fdd780} fill="var(--fill-0, #161513)" className="dark:fill-white" id="vector" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
              <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[11px] text-black dark:text-white whitespace-nowrap">Backbone</p>
              <div className="relative shrink-0 size-[13px]" data-name="Alerts / warning-s-24">
                <div className="absolute inset-[10%]" data-name="Vector">
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