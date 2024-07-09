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
      <p className={style.post__text}>{post.description}</p>
    </PostCard>
  );
}

export default PostItem;
