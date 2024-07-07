// eslint-disable-next-line import/no-extraneous-dependencies
import Markdown from 'react-markdown';

import PostHeader from '../PostHeader/PostHeader';
import PostCard from '../PostCard/PostCard';
import { PostType } from '../../../types/types';

import style from './postItem.module.scss';

interface IPost {
  post: PostType;
  updateFeed: () => void;
}

function PostItem({ post, updateFeed }: IPost) {
  return (
    <PostCard>
      <PostHeader post={post} updateFeed={updateFeed} />
      <Markdown className={style.post__text}>{post.description}</Markdown>
    </PostCard>
  );
}

export default PostItem;
