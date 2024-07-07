// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { useContext } from 'react';

import AuthContext from '../../context/context';

import Header from './Header';

function HeaderContainer() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const toLogin = () => {
    history.replace('/sign-in');
  };
  const logOutHandler = () => {
    localStorage.clear();
    auth.clearAuth();
  };
  const toRegister = () => {
    history.replace('/sign-up');
  };
  const newPost = () => {
    history.replace('/new-article');
  };

  return (
    <Header
      auth={auth.auth}
      newPost={newPost}
      logOutHandler={logOutHandler}
      toLogin={toLogin}
      toRegister={toRegister}
    />
  );
}

export default HeaderContainer;
