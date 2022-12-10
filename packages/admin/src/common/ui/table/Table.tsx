import React, { FC, PropsWithChildren } from 'react';

import { TableProps } from './types';
import { PaginationPanel } from './PaginationPanel';

export const Table: FC<PropsWithChildren<TableProps>> = ({
  children,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <>
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table className="min-w-full leading-normal">{children}</table>
          <PaginationPanel
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export const TableBody: FC<PropsWithChildren> = ({ children }) => {
  return <tbody>{children}</tbody>;
};
