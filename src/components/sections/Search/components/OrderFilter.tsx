import { useState, useRef, useEffect } from "react";

interface OrderFilterProps {
  orderByPrice: "ASC" | "DESC";
  setOrderByPrice: (order: "ASC" | "DESC") => void;
}

export default function OrderFilter({ orderByPrice, setOrderByPrice }: OrderFilterProps) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { label: "Preço Crescente", value: "ASC" as const },
    { label: "Preço Decrescente", value: "DESC" as const },
  ];

  return (
    <div className="relative" ref={popupRef}>
      <button
        className="px-4 py-2 flex items-center justify-between md:min-w-60 max-md:w-full border rounded bg-white hover:bg-gray-100 transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        {options.find((opt) => opt.value === orderByPrice)?.label}
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
        <div className="absolute z-50 mt-2 w-48 p-2 bg-white border rounded-lg shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 rounded cursor-pointer hover:bg-gray-100 ${
                orderByPrice === opt.value ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => {
                setOrderByPrice(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
