import Markdown from 'react-markdown';

import PostHeader from '../common/PostHeader/PostHeader';
import Button from '../common/Button/Button';
import PostCard from '../common/PostCard/PostCard';
import { PostType, User } from '../../types/types';
import ButtonWithModal from '../common/ButtonWithModal/ButtonWithModal';

import style from './post.module.scss';

interface IPost {
  post: PostType;
  updateFeed: () => void;
  auth: User;
  handleDelete: () => void;
  handleEdit: () => void;
  load: boolean;
}

function Post({ post, updateFeed, auth, handleEdit, handleDelete, load }: IPost) {
  return (
    <PostCard customStyles={{ height: '80vh' }}>
      <PostHeader post={post} updateFeed={updateFeed} />
      <section className={style.post__descr}>
        <p className={style.post__text}>{post.description}</p>
        {auth.username && auth.username === post.author.username && (
          <div className={style.post__buttons}>
            <ButtonWithModal
              customStyles={{
                fontSize: '14px',
                lineHeight: '22px',
                padding: '8px 18px',
                height: '30px',
              }}
              theme="danger"
              handler={handleDelete}
            >
              Delete
            </ButtonWithModal>
            <Button
              customStyles={{
                fontSize: '14px',
                lineHeight: '22px',
                padding: '8px 18px',
                height: '30px',
              }}
              disabled={load}
              handler={handleEdit}
              theme="success"
            >
              Edit
            </Button>
          </div>
        )}
      </section>
      <Markdown>{post.body}</Markdown>
    </PostCard>
  );
}

export default Post;
