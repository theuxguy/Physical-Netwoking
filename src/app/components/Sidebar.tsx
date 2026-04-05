export function Sidebar() {
  return (
    <div className="w-[180px] bg-[#f5f5f5] border-r border-[#d5d5d5] flex flex-col">
      {/* Collapse/Expand button */}
      <div className="h-[44px] flex items-center px-3 border-b border-[#d5d5d5]">
        <button className="text-gray-600">
          {/* Icon placeholder */}
          ⟨
        </button>
      </div>
      
      {/* Search filter */}
      <div className="p-3">
        <input 
          type="text"
          placeholder="enter text here to filter"
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
        />
      </div>
      
      {/* Tree navigation placeholder */}
      <div className="flex-1 px-3 py-2">
        <div className="text-xs text-gray-700">
          {/* Tree items will go here */}
        </div>
      </div>
    </div>
  );
}
