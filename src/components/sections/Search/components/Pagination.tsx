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
    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-12">
      <button
        className="px-4 py-2 bg-secondary text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        Anterior
      </button>
      <span className="text-center sm:text-base text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-secondary text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
        onClick={onNext}
        disabled={disableNext}
      >
        Próxima
      </button>
    </div>
  );
}
