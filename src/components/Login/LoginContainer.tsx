import { useCallback, useContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';

import Loader from '../common/Loader/Loader';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import { RespType, User, UserLoginType } from '../../types/types';
import AuthContext from '../../context/context';
import useAsync from '../../hooks/useAsync/useAsync';

import Login from './Login';

function LoginContainer() {
  const [validateError, setValidateError] = useState<string>('');
  const history = useHistory();
  const auth = useContext(AuthContext);

  const { loading, error, value, callback } = useAsync<{ user: User }>({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleLogin = async () => {
    if (value) {
      if (value.user.token) {
        localStorage.setItem('token', value.user.token);
        auth.setContextAuth();
      }
      history.push('');
    }
    if (error && !error?.status) {
      setValidateError('invalid email or password');
    }
  };

  const handleSubmit = (user: UserLoginType) => callback({ url: '/users/login', body: JSON.stringify({ user }) });

  useEffect(() => {
    handleLogin();
  }, [error, value]);

  if (loading) return <Loader />;
  if (error?.status) return <ErrorComponent err={error.message} />;

  return <Login validateError={validateError} handleLogin={handleSubmit} />;
}

export default LoginContainer;
