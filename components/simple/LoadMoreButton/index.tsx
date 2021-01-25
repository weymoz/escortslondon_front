import React, { ReactElement } from 'react';
import Button from '@simple/Button';

interface Props {
  loadMore: boolean;
  onLoadMore(): void;
}

export default function LoadMoreButton({
  loadMore,
  onLoadMore,
}: Props): ReactElement {
  return (
    <Button
      style={{
        backgroundColor: loadMore ? '#FA1D52' : '#E7E7E7',
        color: loadMore ? 'white' : 'black',
      }}
      onClick={
        loadMore
          ? onLoadMore
          : () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
      size="md"
    >
      {loadMore ? 'Show more' : 'Scroll to top'}
    </Button>
  );
}
