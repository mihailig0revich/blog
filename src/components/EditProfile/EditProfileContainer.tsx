import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useAsync from '../../hooks/useAsync/useAsync';
import { PostType, User, ValidateErrorTypes } from '../../types/types';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import Loader from '../common/Loader/Loader';
import withAuth from '../../hoc/withAuth';

import EditProfile from './EditProfile';

function EditProfileContainer() {
  const [validateError, setValidateError] = useState<ValidateErrorTypes[]>();
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

  const onError = async () => {
    const arr: ValidateErrorTypes[] = [];
    if (error && !error.status) {
      Object.keys(error).forEach((k: string) => {
        arr.push([
          k,
          {
            type: 'manual',
            message: `${error[k]}`,
          },
        ]);
      });
      setValidateError(arr);
    }
  };

  useEffect(() => {
    onError();
  }, [error]);

  if (error?.status === 422 || errorGetPost?.status === 422) <ErrorComponent />;
  if (loadingGetPost) return <Loader />;
  if (value) {
    history.push('');
    window.location.reload();
  }

  return (
    <EditProfile
      handleCreate={hadleSubmit}
      validateError={validateError || []}
      loading={!!loading}
      user={valueGetPost?.user || undefined}
    />
  );
}

export default withAuth(EditProfileContainer);
