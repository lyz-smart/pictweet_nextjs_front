"use client";

import { useForm } from 'react-hook-form';

interface SearchFormProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

const SearchForm = ({ onSearch, initialQuery }: SearchFormProps) => {
  const { register, handleSubmit } = useForm<{ searchText: string }>({
    defaultValues: { searchText: initialQuery }
  });

  const onSubmit = (data: { searchText: string }) => {
    onSearch(data.searchText);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('searchText')}
        placeholder="投稿を検索する"
        className="search-input"
      />
      <input type="submit" className="search-btn" value="検索" />
    </form>
  );
};

export default SearchForm;