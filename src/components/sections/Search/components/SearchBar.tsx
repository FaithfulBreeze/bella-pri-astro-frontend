import type { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="relative rounded-md p-1 bg-primary">
      <input
        type="text"
        className="relative rounded-md w-full bg-white sm:text-xl md:text-3xl indent-8 md:indent-16 outline-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar produtos..."
      />
      <div className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-black/40">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
          <path
            d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="#e268bb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
}
