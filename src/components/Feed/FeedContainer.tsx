import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../common/Loader/Loader';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import { PostType } from '../../types/types';
import useAsync from '../../hooks/useAsync/useAsync';
import { calculatePage } from '../../utils/utils';

import Feed from './Feed';

function FeedContainer() {
  const [page, setPage] = useState<number | null>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const { activePage = '1' } = useParams();
  const [scroll, setScroll] = useState<number>(0);
  const [articles, setArticles] = useState<PostType[]>([]);
  const ref = useRef(window);

  const { loading, error, value, callback } = useAsync<{ articles: PostType[]; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
  });

  const updateFeed = async () => {
    setUpdate(true);
    setScroll(ref.current.scrollY);
    await callback({ url: activePage ? `/articles?limit=10&offset=${(+activePage - 1) * 10}` : '/articles?limit=10' });
    setUpdate(false);
  };

  useEffect(() => {
    callback({ url: activePage ? `/articles?limit=10&offset=${(+activePage - 1) * 10}` : '/articles?limit=10' });
  }, [activePage]);

  useEffect(() => {
    if (value) setPage(calculatePage(+value.articlesCount, 10));
    if (value) setArticles(value.articles);
    ref.current.scroll(0, scroll);
  }, [value, error, page]);

  if (loading && !update) return <Loader />;
  if (error?.status === 422) return <ErrorComponent />;

  return <Feed maxPage={page} updateFeed={updateFeed} posts={articles} />;
}

export default FeedContainer;
