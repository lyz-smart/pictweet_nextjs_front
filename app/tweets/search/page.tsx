import React, { Suspense } from 'react';
import SearchPageClient from '../../_components/SearchPageClient';

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageClient />
    </Suspense>
  );
};

export default SearchPage;