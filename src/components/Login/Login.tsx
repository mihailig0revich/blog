import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import AuthCard from '../common/AuthCard/AuthCard';
import CustomInput from '../common/CustomInput/CustomInput';
import Button from '../common/Button/Button';
import { UserLoginType } from '../../types/types';

import style from './login.module.scss';

interface ILogin {
  handleLogin: (i: UserLoginType) => void;
  validateError: string;
}

function Login({ handleLogin, validateError }: ILogin) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
  });
  const onSubmit = async (data: any) => {
    handleLogin(data);
  };
  return (
    <AuthCard>
      <p className={style.login__title}>Sign In</p>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          rule={{
            required: 'required field',
            pattern: { message: 'enter the correct e-mail', value: /\S+@\S+\.\S+/ },
          }}
          error={errors}
          name="email"
          type="text"
          register={register}
          label="Email Address"
        />
        <CustomInput
          rule={{ required: 'required field' }}
          error={errors}
          name="password"
          type="text"
          register={register}
          label="Password"
          styles={{ marginBottom: '21px', paddingBottom: 0 }}
        />
        {validateError && <p className={style.error}>{validateError}</p>}
        <Button
          submit
          theme="submit"
          customStyles={{
            textAlign: 'center',
            height: '40px',
            width: '100%',
            marginBottom: '8px',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
          }}
        >
          Login
        </Button>
      </form>
      <p className={style.login__link}>
        Don’t have an account?{' '}
        <Link className={style.signUp} to="/sign-up">
          Sign Up
        </Link>
        .
      </p>
    </AuthCard>
  );
}

export default Login;
