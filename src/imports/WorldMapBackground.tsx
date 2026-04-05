import img2560PxBlankMapWorldFlattened1 from "figma:asset/b21a0e9e9b11258529cfc8500b7737fda4ad18c1.png";

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative size-full">
      <div aria-hidden="true" className="absolute border-0 border-[#b9b9b9] border-solid inset-0 pointer-events-none" />
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
        <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
          <div className="col-1 h-[503px] ml-0 mt-0 relative row-1 w-[1160.5px]" data-name="2560px-BlankMap-World-Flattened 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2560PxBlankMapWorldFlattened1} />
          </div>
        </div>
      </div>
    </div>
  );
}