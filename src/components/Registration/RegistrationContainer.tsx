import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { User } from '../../types/types';
import useAsync from '../../hooks/useAsync/useAsync';
import AuthContext from '../../context/context';
import ErrorComponent from '../common/ErrorComponent/ErrorComponent';
import Loader from '../common/Loader/Loader';

import Registration from './Registration';

function RegistrationContainer() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
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

  const submit = async () => {
    if (value) {
      if (value.user.token) {
        localStorage.setItem('token', value.user.token);
        auth.setContextAuth(value.user.token);
      }
      history.push('');
    }
    if (error && !error.status) {
      Object.keys(error).forEach((k: string) => {
        setError(k, {
          type: 'manual',
          message: `${error[k]}`,
        });
      });
    }
  };

  const onSubmit = (data: any) => {
    clearErrors();
    callback({
      url: '/users',
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    });
  };

  useEffect(() => {
    submit();
  }, [value, error]);

  if (error?.status) return <ErrorComponent err={`${error.message}`} />;
  if (loading) <Loader />;

  return <Registration register={register} onSubmit={handleSubmit(onSubmit)} errors={errors} />;
}

export default RegistrationContainer;
