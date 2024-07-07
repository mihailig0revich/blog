import { useContext, useState } from 'react';

import AuthContext from '../../../context/context';
import { AuthContextType } from '../../../types/types';

import style from './like.module.scss';

interface ILike {
  count: number;
  like: boolean;
  setLike: () => void;
  deleteLike: () => void;
}
function Like({ count, like, setLike, deleteLike }: ILike) {
  const [isLike, setIsLike] = useState(like);
  const { auth } = useContext<AuthContextType>(AuthContext);
  const likeHandler = () => {
    if (!like) {
      setLike();
    } else {
      deleteLike();
    }
    setIsLike(!like);
  };

  console.log('hello');

  return (
    <button type="button" disabled={!auth.username} onClick={likeHandler} className={style.like}>
      <svg width="20" height="16" viewBox="-5 -2 60 55" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
	          c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
	          c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
	          C52.216,18.553,51.97,16.611,51.911,16.242z"
          fill={isLike ? '#F5222D' : 'white'}
          stroke={isLike ? '#F5222D' : 'black'}
          strokeWidth="4"
        />
      </svg>
      <span>{count}</span>
    </button>
  );
}

export default Like;
