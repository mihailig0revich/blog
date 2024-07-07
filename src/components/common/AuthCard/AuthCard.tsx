import { CSSProperties } from 'react';

import style from './authCard.module.scss';

interface IAuthCard {
  children: string | React.ReactNode | React.ReactElement;
  customStyles?: CSSProperties;
}

function AuthCard({ children, customStyles }: IAuthCard) {
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

export default AuthCard;
