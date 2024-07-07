// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { useEffect } from 'react';

import useAsync from '../../hooks/useAsync/useAsync';
import { PostType, User } from '../../types/types';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import Loader from '../common/Loader/Loader';

import EditProfile from './EditProfile';

function EditProfileContainer() {
  const history = useHistory();
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
  } = useAsync<{ user: User }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'GET',
  });

  const hadleSubmit = (data: User) => {
    callback({ url: '/user', body: JSON.stringify({ user: data }) });
  };

  useEffect(() => {
    callbackGetPost({ url: '/user' });
  }, []);

  console.log(valueGetPost);

  if (error || errorGetPost) <ErrorComponent err={error?.message || errorGetPost?.message} />;
  if (loadingGetPost) return <Loader />;
  if (value) {
    history.push('');
    window.location.reload();
  }

  return <EditProfile handleCreate={hadleSubmit} loading={!!loading} user={valueGetPost?.user || undefined} />;
}

export default EditProfileContainer;
