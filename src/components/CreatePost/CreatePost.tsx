import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ChangePost from '../common/ChangePost/ChangePost';
import useAsync from '../../hooks/useAsync/useAsync';
import { CreatePostType, PostType, ValidateErrorTypes } from '../../types/types';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import withAuth from '../../hoc/withAuth';

function CreatePost() {
  const [validateError, setValidateError] = useState<ValidateErrorTypes[]>();
  const history = useHistory();
  const { error, loading, value, callback } = useAsync<{ articles: PostType[]; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'POST',
  });

  const hadleSubmit = (data: CreatePostType) => {
    callback({ url: '/articles', body: JSON.stringify({ article: data }) });
  };

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

  if (value) history.push('');
  if (error?.status === 422) <ErrorComponent />;

  return (
    <ChangePost
      handleCreate={hadleSubmit}
      validateError={validateError || []}
      loading={loading}
      name="Create new article"
    />
  );
}

export default withAuth(CreatePost);
