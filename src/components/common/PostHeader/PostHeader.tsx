import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Tag from '../Tag/Tag';
import Like from '../Like/Like';
import { PostType } from '../../../types/types';
import useAsync from '../../../hooks/useAsync/useAsync';

import style from './postHeader.module.scss';

interface IPostHeader {
  post: PostType;
  updateFeed: () => void;
}

function PostHeader({ post, updateFeed }: IPostHeader) {
  const { callback: callbackSetLike } = useAsync<{ articles: PostType[]; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'POST',
  });
  const { callback: callbackDelLike } = useAsync<{ articles: PostType[]; articlesCount: number }>({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
    method: 'DELETE',
  });

  const setLike = async () => {
    await callbackSetLike({ url: `/articles/${post.slug}/favorite` });
    updateFeed();
  };

  const delLike = async () => {
    await callbackDelLike({ url: `/articles/${post.slug}/favorite` });
    updateFeed();
  };
  return (
    <header className={style.header}>
      <div className={`${style.header__left} ${style.left}`}>
        <div className={style.left__title}>
          <Link className={style.left__titleText} to={`/article/${post.slug}`}>
            {post.title.length > 40 ? `${post.title.slice(0, 40)}...` : post.title}
          </Link>
          <Like setLike={setLike} deleteLike={delLike} count={post.favoritesCount} like={post.favorited} />
        </div>
        <div className={style.left__tags}>
          {post.tagList.map((text, index) => {
            if (text) {
              // eslint-disable-next-line react/no-array-index-key
              return <Tag key={index} text={text} />;
            }
            return null;
          })}
        </div>
      </div>
      <div className={`${style.header__right} ${style.right}`}>
        <div className={style.right__name}>
          <p>{post.author.username}</p>
          <p>{format(post.createdAt, 'PP')}</p>
        </div>
        <img alt="avatar" src={post.author.image} className={style.right__avatar} />
      </div>
    </header>
  );
}

export default PostHeader;
