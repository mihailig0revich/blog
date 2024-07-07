import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../common/Button/Button';
import avatar from '../../img/Rectangle.png';
import { User } from '../../types/types';

import style from './header.module.scss';

interface IHeader {
  toLogin: () => void;
  toRegister: () => void;
  auth: User;
  logOutHandler: () => void;
  newPost: () => void;
}

function Header({ toLogin, toRegister, auth, logOutHandler, newPost }: IHeader) {
  return (
    <header className={style.header}>
      <div className={style.header__left}>
        <Link to="/" className={style.header__title}>
          Realworld Blog
        </Link>
      </div>
      <div className={style.header__right}>
        {auth.username ? (
          <>
            <Button
              customStyles={{
                fontSize: '14px',
                lineHeight: '22px',
                padding: '6px 10px',
                height: '30px',
              }}
              theme="success"
              handler={newPost}
            >
              Create article
            </Button>
            <Link to="/profile" className={style.header__user}>
              <p>{auth.username}</p>
              <img alt="avatar" src={auth.image || avatar} />
            </Link>
            <Button
              customStyles={{
                fontSize: '18px',
                lineHeight: '28px',
                padding: '8px 18px',
                height: '50px',
              }}
              theme="normal"
              handler={logOutHandler}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button
              customStyles={{
                fontSize: '18px',
                lineHeight: '28px',
                padding: '8px 18px',
                height: '50px',
              }}
              theme="hidden"
              handler={toLogin}
            >
              Sign In
            </Button>
            <Button
              customStyles={{
                fontSize: '18px',
                lineHeight: '28px',
                padding: '8px 18px',
                height: '50px',
              }}
              theme="success"
              handler={toRegister}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
