import { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Loader from '../common/Loader/Loader';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import { User, UserLoginType } from '../../types/types';
import AuthContext from '../../context/context';
import useAsync from '../../hooks/useAsync/useAsync';

import Login from './Login';

function LoginContainer() {
  const [validateError, setValidateError] = useState<string>('');
  const history = useHistory();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
  });
  const { loading, error, value, callback } = useAsync<{ user: User }>({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const handleFetch = async (user: UserLoginType) => {
    await callback({ url: '/users/login', body: JSON.stringify({ user }) });
  };

  const handleLogin = () => {
    if (value) {
      if (value.user.token) {
        localStorage.setItem('token', value.user.token);
        auth.setContextAuth(value.user.token);
      }
      history.push('');
    }
    if (error && !error?.status) {
      setValidateError('invalid email or password');
    }
  };

  const onSubmit = (data: any) => {
    handleFetch(data);
  };

  useEffect(() => {
    handleLogin();
  }, [error, value]);

  if (!localStorage.getItem('token')) <Redirect to="" />;
  if (loading) return <Loader />;
  if (error?.status === 422) return <ErrorComponent />;

  return <Login validateError={validateError} errors={errors} onSubmit={handleSubmit(onSubmit)} register={register} />;
}

export default LoginContainer;
