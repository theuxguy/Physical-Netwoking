export default function PromptInfo() {
  return (
    <div className="relative size-full" data-name="Prompt/Info">
      <div className="absolute bg-white content-stretch flex inset-0 items-start p-[10px] rounded-[3px]" data-name="Tooltip">
        <div aria-hidden="true" className="absolute border border-[#bcb6b1] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]" />
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
          <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#161513] text-[11px] w-full whitespace-pre-wrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
            <p className="mb-0">
              <span className="leading-[18px]">{`AD-2 availability is `}</span>
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic text-[#d63b25]">Critical</span>
              <span className="leading-[18px]">{` on account of BLD-08 being in Critical state.`}</span>
            </p>
            <p className="leading-[18px] mb-0">&nbsp;</p>
            <p className="[text-decoration-skip-ink:none] decoration-solid leading-[18px] text-[#00688c] underline">View AD-2</p>
          </div>
        </div>
      </div>
    </div>
  );
}