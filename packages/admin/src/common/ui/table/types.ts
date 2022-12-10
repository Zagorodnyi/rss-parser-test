export interface TableProps {
  handlePageChange: (nextPage: number) => void;
  totalPages: number;
  currentPage: number;
}

export interface TitlePanelProps {
  title: string;
  handleSearch: (input: string) => void;
}

export interface SearchInput {
  search: string;
}

export type SortDirection = 'asc' | 'desc';

export type TableColumn<
  T extends {} = { [key: string]: string },
  I = Record<keyof T, unknown>,
  N = keyof I
> = {
  label: string;
  name: N extends string ? N : never;
  truncate?: number;
  handleClick?: (name: string, direction: SortDirection) => void;
};

export interface TableHeadProps {
  columns: TableColumn[];
}

export interface TableItemProps {
  data: Record<string, string | number | React.ReactNode>;
  columns: Array<string | TableColumn>;
}

export interface PaginationPanelProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (nextPage: number) => void;
}
