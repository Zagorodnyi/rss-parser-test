import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import {
  Table,
  TableBody,
  TableHead,
  TableItem,
  TitlePanel,
} from '@ui/table';
import { Plus } from '@ui/icons';
import { TableColumn } from '@ui/table/types';
import { Post, usePostsController } from '../../controllers/Post';

export const PostsList: FC = () => {
  const {
    meta,
    posts,
    handleSort,
    handleSearch,
    handlePageChange
  } = usePostsController();

  const columns: TableColumn<Post & { action: ReactNode }>[] = [
    {
      label: 'ID',
      name: 'id',
      handleClick: handleSort,
    },
    {
      label: 'Title',
      name: 'title',
      truncate: 60,
      handleClick: handleSort,
    },
    {
      label: 'Author',
      name: 'author',
      handleClick: handleSort,
    },
    {
      label: 'Publish Date',
      name: 'pubDate',
      handleClick: handleSort,
    },
    {
      label: 'Edit',
      name: 'action',
    },
  ];

  return (
    <div className="container max-w-full px-4 mx-auto sm:px-8">
      <div className="py-8">
        <TitlePanel handleSearch={handleSearch} title="Posts" />

        <Table
          totalPages={meta.totalPages}
          handlePageChange={handlePageChange}
          currentPage={meta?.currentPage}
        >
          <TableHead columns={columns} />
          <TableBody>
            {posts?.map((data, i) => (
              <TableItem
                key={'tableitem' + i}
                data={{
                  ...data,
                  pubDate: moment(data.pubDate).format(
                    'DD MMM YYYY [at] HH:mm'
                  ),
                  action: (
                    <NavLink
                      to={`${data.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </NavLink>
                  ),
                }}
                columns={columns}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <NavLink to="create">
        <button className="text-white bg-teal-600 p-2 rounded-full fixed right-10 bottom-10 hover:bg-teal-700 transition-[background-color]">
          <Plus />
        </button>
      </NavLink>
    </div>
  );
};
