// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory, useParams } from 'react-router';
import { useContext, useEffect, useMemo, useState } from 'react';

import { PostType } from '../../types/types';
import Loader from '../common/Loader/Loader';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import AuthContext from '../../context/context';
import useAsync from '../../hooks/useAsync/useAsync';

import Post from './Post';

function PostContainer() {
  const [defVal, setdefVal] = useState<PostType | undefined>();
  const [update, setUpdate] = useState<boolean>(false);
  const { slug } = useParams<{ slug: string }>();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const { error, loading, value, callback } = useAsync<{ article: PostType; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'GET',
  });
  const {
    error: errorDelete,
    loading: loadingDelete,
    value: valueDelete,
    callback: callbackDelete,
  } = useAsync<{ article: PostType; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'DELETE',
  });

  const handleEdit = () => {
    history.push(`/articles/${slug}/edit`);
  };
  const handleDelete = () => {
    callbackDelete({ url: `/articles/${slug}` });
    if (!error || !errorDelete?.message) history.push('');
  };
  const handleUpdate = async () => {
    setUpdate(true);
    await callback({ url: `/articles/${slug}` });
    setUpdate(false);
  };

  useEffect(() => {
    callback({ url: `/articles/${slug}` });
  }, []);
  useEffect(() => {
    if (value) {
      setdefVal(value.article);
    }
  }, [value]);

  if (error || errorDelete?.message) return <ErrorComponent err={error?.message || errorDelete?.message} />;
  if ((loading && !update) || defVal === undefined) return <Loader />;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return (
    <Post
      load={!!loadingDelete}
      auth={auth.auth}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      updateFeed={handleUpdate}
      post={defVal}
    />
  );
}

export default PostContainer;
