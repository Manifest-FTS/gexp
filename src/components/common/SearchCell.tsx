import { SearchContext } from '@/lib/context/GlobalSearchContext';
import React, { PropsWithChildren, useContext } from 'react';

type Props = PropsWithChildren & {
  query: string;
  value: string;
};

const SearchCell = ({ children, query, value }: Props) => {
  const setQuery = useContext(SearchContext).setQuery;
  return (
    <div
      className="relative cursor-pointer flex items-center gap-1 group"
      onClick={() => {
        setQuery((e) => {
          if (e.includes(`${query}:${value}`) || !value) return e;
          if (!e) return `${query}:${value}`;
          return (e += ` OR ${query}:${value}`);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {children}
      {value && (
        <p className="min-w-5">
          <span className="text-xs ml-1 hidden group-hover:block">🔍</span>
        </p>
      )}
    </div>
  );
};

export default SearchCell;
