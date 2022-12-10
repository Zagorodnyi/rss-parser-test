import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { SearchInput, TitlePanelProps } from './types';

export const TitlePanel: FC<TitlePanelProps> = ({ title, handleSearch }) => {
  const { register, handleSubmit } = useForm<SearchInput>();
  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get('search') || undefined;

  const handleSearchSubmit = ({ search }: SearchInput) => {
    handleSearch(search);
  };

  return (
    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
      <h2 className="text-2xl leading-tight">{title}</h2>
      <div className="text-end">
        <form
          className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
          onSubmit={handleSubmit(handleSearchSubmit)}
        >
          <div className=" relative ">
            <input
              {...register('search')}
              defaultValue={search && decodeURIComponent(search)}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              placeholder="Search"
            />
          </div>
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-200"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
