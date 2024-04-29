import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type ContextType = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};
export const SearchContext = createContext<ContextType>({
  query: '',
  setQuery: () => {},
});

const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
