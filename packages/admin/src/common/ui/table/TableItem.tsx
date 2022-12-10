import React, { FC } from 'react';

import { TableItemProps } from './types';
import { truncate } from './utils/truncate';

export const TableItem: FC<TableItemProps> = ({ data, columns }) => {
  const renderItem = (
    data: string | number | React.ReactNode,
    limit?: number
  ) => {
    if (typeof data === 'string') {
      return (
        <p className="text-gray-900 whitespace-no-wrap">
          {truncate(data, limit)}
        </p>
      );
    }

    return data;
  };

  return (
    <tr>
      {columns.map((col, i) => (
        <td
          className="px-5 py-5 text-sm bg-white border-b border-gray-200"
          key={'itemCol' + i}
        >
          {typeof col === 'string'
            ? renderItem(data[col], 15)
            : renderItem(data[col.name], col.truncate)}
        </td>
      ))}
    </tr>
  );
};
