import { useRef, useEffect, useState } from "react";
import type { ICategory } from "../../../../interfaces/category";

interface CategoryFilterProps {
  categories: ICategory[];
  selectedCategoryIds: number[];
  setSelectedCategoryIds: (ids: number[]) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}: CategoryFilterProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (id: number) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((c) => c !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        className="px-4 py-2 flex justify-between items-center gap-2 border rounded bg-white hover:bg-gray-100 transition max-md:w-full min-w-40"
        onClick={() => setOpen((prev) => !prev)}
      >
        Categorias
        {selectedCategoryIds.length > 0 && (
          <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {selectedCategoryIds.length}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-64 p-4 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="checkbox"
                checked={selectedCategoryIds.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
              />
              {category.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
