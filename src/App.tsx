import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import style from './App.module.scss';
import './variable.scss';
import CreatePost from './components/CreatePost/CreatePost';
import EditPost from './components/EditPost/EditPost';
import HeaderContainer from './components/Header/HeaderContainer';
import FeedContainer from './components/Feed/FeedContainer';
import RegistrationContainer from './components/Registration/RegistrationContainer';
import PostContainer from './components/Post/PostContainer';
import AuthContext from './context/context';
import { User } from './types/types';
import LoginContainer from './components/Login/LoginContainer';
import Loader from './components/common/Loader/Loader';
import ErrorComponent from './components/common/ErrorComponent/ErrorComponent';
import { formatAuth } from './utils/utils';
import EditProfileContainer from './components/EditProfile/EditProfileContainer';
import useAsync from './hooks/useAsync/useAsync';

function App() {
  const [auth, setAuth] = useState<User>({ username: '' });
  const { loading, error, value, callback } = useAsync<{ user: User }>({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token') || ''}`,
    },
  });
  const setContextAuth = (newToken: string) => {
    callback({
      url: '/user',
      header: {
        'Content-Type': 'application/json',
        Authorization: `Token ${newToken}`,
      },
    });
  };

  const clearAuth = () => {
    setAuth({ username: '' });
    localStorage.clear();
  };

  useEffect(() => {
    if (value) {
      localStorage.setItem('token', value?.user.token || '');
      setAuth(formatAuth(value));
    }
  }, [value]);

  useEffect(() => {
    setContextAuth(localStorage.getItem('token') || '');
  }, []);

  const authValue = useMemo(() => {
    return { auth, clearAuth, setContextAuth };
  }, [auth]);

  if (loading) return <Loader />;
  if (error && error.status !== 401) return <ErrorComponent err="Something went wrong" />;

  return (
    <AuthContext.Provider value={authValue}>
      <div className={style.app}>
        <Router>
          <HeaderContainer />
          <main className={style.main}>
            <Switch>
              <Route path="/new-article">
                <CreatePost />
              </Route>
              <Route path="/articles/:slug/edit">
                <EditPost />
              </Route>
              <Route path="/profile">
                <EditProfileContainer />
              </Route>
              <Route path="/sign-up">
                <RegistrationContainer />
              </Route>
              <Route path="/sign-in">
                <LoginContainer />
              </Route>
              <Route exact path={['/', '/articles', '/articles/:activePage']}>
                <FeedContainer />
              </Route>
              <Route path="/article/:slug">
                <PostContainer />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
