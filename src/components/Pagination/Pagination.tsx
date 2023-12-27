// Pagination.tsx

import React, { useEffect } from "react";
import "./Pagination.scss";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onChangePage,
}: PaginationProps): React.ReactNode => {
  // Maximum number of pages to show before and after the current page
  const maxPagesToShow = 5;

  // Function to check if ellipsis is needed
  const shouldShowEllipsis = () => totalPages > maxPagesToShow;

  // Function to calculate start and end index for visible pages
  const calculateVisiblePages = () => {
    const visiblePages = [];
    let start = 1;
    let end = totalPages;

    if (shouldShowEllipsis()) {
      const halfMaxPages = Math.floor(maxPagesToShow / 2);

      start = Math.max(currentPage - halfMaxPages, 1);
      end = start + maxPagesToShow - 1;

      if (end > totalPages) {
        start -= end - totalPages;
        end = totalPages;
      }
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = calculateVisiblePages();

  return (
    <div className="pagination">
      <button
        className="button-pag"
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {shouldShowEllipsis() && visiblePages[0] > 1 && (
        <button
          className="button-pag"
          onClick={() => onChangePage(visiblePages[0] - 1)}
        >
          ...
        </button>
      )}
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`button-pag ${
            page === currentPage ? "button-pag__current" : ""
          }`}
          onClick={() => onChangePage(page)}
        >
          {page}
        </button>
      ))}
      {shouldShowEllipsis() &&
        visiblePages[visiblePages.length - 1] < totalPages && (
          <button
            className="button-pag"
            onClick={() =>
              onChangePage(visiblePages[visiblePages.length - 1] + 1)
            }
          >
            ...
          </button>
        )}
      <button
        className="button-pag"
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
