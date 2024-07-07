import Pagination from '../common/Pagination/Pagination';
import PostItem from '../common/PostItem/PostItem';
import { PostType } from '../../types/types';

import style from './feed.module.scss';

interface IFeed {
  posts?: PostType[] | undefined;
  maxPage: number | null;
  updateFeed: () => void;
}

function Feed({ maxPage, posts, updateFeed }: IFeed) {
  return (
    <div className={style.feed}>
      <div>{posts && posts.map((post) => <PostItem key={post.slug} updateFeed={updateFeed} post={post} />)}</div>
      {maxPage && <Pagination maxPage={maxPage} />}
    </div>
  );
}

export default Feed;
