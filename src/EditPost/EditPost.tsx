// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';

import ChangePost from '../components/common/ChangePost/ChangePost';
import useAsync from '../hooks/useAsync/useAsync';
import { CreatePostType, PostType } from '../types/types';
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent';
import Loader from '../components/common/Loader/Loader';

function EditPost() {
  const history = useHistory();
  const { slug } = useParams<{ slug: string }>();
  const { error, loading, value, callback } = useAsync<{ article: PostType; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'PUT',
  });
  const {
    error: errorGetPost,
    loading: loadingGetPost,
    value: valueGetPost,
    callback: callbackGetPost,
  } = useAsync<{ article: PostType; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'GET',
  });

  const hadleSubmit = (data: CreatePostType) => {
    callback({ url: `/articles/${slug}`, body: JSON.stringify({ article: data }) });
  };

  useEffect(() => {
    callbackGetPost({ url: `/articles/${slug}` });
  }, []);

  if (error || errorGetPost) <ErrorComponent err={error?.message || errorGetPost?.message} />;
  if (loadingGetPost) return <Loader />;
  if (value) history.push('');

  return (
    <ChangePost
      handleCreate={hadleSubmit}
      loading={loading}
      name="Edit article"
      post={valueGetPost?.article || undefined}
    />
  );
}

export default EditPost;
