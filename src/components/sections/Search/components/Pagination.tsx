interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <button
        className="px-4 py-2 bg-secondary text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-secondary text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        onClick={onNext}
        disabled={disableNext}
      >
        Próxima
      </button>
    </div>
  );
}
