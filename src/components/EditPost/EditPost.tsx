import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ChangePost from '../common/ChangePost/ChangePost';
import useAsync from '../../hooks/useAsync/useAsync';
import { CreatePostType, PostType, ValidateErrorTypes } from '../../types/types';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import Loader from '../common/Loader/Loader';
import withAuth from '../../hoc/withAuth';

function EditPost() {
  const [validateError, setValidateError] = useState<ValidateErrorTypes[]>();
  const history = useHistory();
  const { slug } = useParams();
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

  useEffect(() => {
    callbackGetPost({ url: `/articles/${slug}` });
  }, []);

  if (error?.status === 422 || errorGetPost?.status === 422) <ErrorComponent />;
  if (loadingGetPost) return <Loader />;
  if (value) history.push('');

  return (
    <ChangePost
      handleCreate={hadleSubmit}
      loading={loading}
      validateError={validateError || []}
      name="Edit article"
      post={valueGetPost?.article || undefined}
    />
  );
}

export default withAuth(EditPost);
