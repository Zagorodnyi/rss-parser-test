import React, { FC } from 'react';

import { PaginationPanelProps } from './types';

const BUTTONS_LIMIT = 4;

export const PaginationPanel: FC<PaginationPanelProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const buttonCount = Math.min(BUTTONS_LIMIT, totalPages);
  const firstButton =
    totalPages - currentPage < buttonCount
      ? totalPages - buttonCount
      : currentPage === 1
      ? currentPage - 1
      : currentPage - 2;
  const pages = new Array(totalPages)
    .fill(0)
    .map((_, i) => i + 1)
    .splice(firstButton, buttonCount);

  const hasNextPage = currentPage !== totalPages;
  const hasPrevPage = currentPage !== 1;

  return (
    <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
      <div className="flex items-center">
        <button
          type="button"
          disabled={!hasPrevPage}
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-l rounded-l-xl hover:bg-gray-100"
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
        {pages.map((page, i) => (
          <button
            key={'paginationPage' + i}
            type="button"
            className={`w-full px-4 py-2 text-base ${
              page === currentPage
                ? 'text-indigo-500 drop-shadow-md'
                : 'text-gray-600 '
            } border border-collapse bg-white hover:bg-gray-100 `}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
