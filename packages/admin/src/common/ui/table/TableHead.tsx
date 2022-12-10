import React, { FC, useRef, useState, useMemo } from 'react';

import { ArrowDown, ArrowUp } from '../icons';
import { SortDirection, TableHeadProps } from './types';

export const TableHead: FC<TableHeadProps> = ({ columns }) => {
  const activeSortBy = useRef(0);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleTitleClick = (
    colName: string,
    index: number,
    handle?: (name: string, dir: SortDirection) => void
  ) => {
    if (!handle) {
      return;
    }

    const newSort = sortDirection === 'asc' ? 'desc' : 'asc';

    setSortDirection((prev) => newSort);
    activeSortBy.current = index;
    handle(colName, newSort);
  };

  return useMemo(
    () => (
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={'tableHead' + i}
              scope="col"
              className={`px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 ${
                col?.handleClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => handleTitleClick(col.name, i, col.handleClick)}
            >
              <div className="flex">
                {col.label}
                {activeSortBy.current === i ? (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                  </span>
                ) : null}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    ),
    [columns, activeSortBy, sortDirection]
  );
};
