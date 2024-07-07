import { CSSProperties } from 'react';

import style from './postCard.module.scss';

interface IPostCard {
  children: string | React.ReactNode | React.ReactElement;
  customStyles?: CSSProperties;
}

function PostCard({ children, customStyles }: IPostCard) {
  return (
    <article
      className={style.card}
      style={{
        ...customStyles,
      }}
    >
      {children}
    </article>
  );
}

export default PostCard;
