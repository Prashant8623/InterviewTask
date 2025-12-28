import React from "react";

const PaginationPage = ({ currentPage, totalPages, onPageChange, loading }) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-600 transition-colors"
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={loading}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationPage;
