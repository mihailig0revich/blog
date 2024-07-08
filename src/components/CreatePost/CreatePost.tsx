import { useHistory } from 'react-router-dom';

import ChangePost from '../common/ChangePost/ChangePost';
import useAsync from '../../hooks/useAsync/useAsync';
import { CreatePostType, PostType } from '../../types/types';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';

function CreatePost() {
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

  if (value) history.push('');
  if (error) <ErrorComponent err={`${error.message}`} />;

  return <ChangePost handleCreate={hadleSubmit} loading={loading} name="Create new article" />;
}

export default CreatePost;
