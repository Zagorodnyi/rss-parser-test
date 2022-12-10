import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';

import { QueryError } from '@common/types';
import { SortDirection } from '@ui/table/types';
import { PostService, SearchParams } from '../../services';
import { PostsController, PostsQueryResponse } from './types';

export const usePostsController = (): PostsController => {
  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get('search');
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: search ? decodeURIComponent(search) : undefined,
    page: 1,
    limit: 20,
    sort: 'asc',
    sortBy: 'id',
  });

  const { data, isLoading, error } = useQuery<PostsQueryResponse, QueryError>(
    ['posts', JSON.stringify(searchParams)],
    () => PostService.getList(searchParams)
  );

  const handlePageChange = (nextPage: number) => {
    setSearchParams((prev) => ({ ...prev, page: nextPage }));
  };

  const handleSearch = (input: string) => {
    setSearchParams((prev) => ({ ...prev, search: input }));
    queryParams.set('search', encodeURIComponent(input));
    navigate(`${window.location.pathname}?${queryParams.toString()}`);
  };

  const handleSort = (sortBy: string, sortDir: SortDirection) => {
    setSearchParams((prev) => ({ ...prev, sortBy, sort: sortDir }));
  };

  return {
    handleSort,
    handleSearch,
    handlePageChange,
    meta: {
      curentSortBy: searchParams.sortBy,
      currentPage: data?.page || searchParams.page || 1,
      totalPages: data?.total || 1,
      currentSort: searchParams.sort,
      currentSearch: searchParams.search,
    },
    posts: data?.posts,
    loading: isLoading,
    error: error,
  };
};
