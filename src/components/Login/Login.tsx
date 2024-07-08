import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';

import AuthCard from '../common/AuthCard/AuthCard';
import CustomInput from '../common/CustomInput/CustomInput';
import Button from '../common/Button/Button';
import noAuth from '../../hoc/noAuth';

import style from './login.module.scss';

interface ILogin {
  validateError: string;
  register: UseFormRegister<FieldValues>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<FieldValues>;
}

function Login({ validateError, onSubmit, register, errors }: ILogin) {
  return (
    <AuthCard>
      <p className={style.login__title}>Sign In</p>
      <form noValidate onSubmit={onSubmit}>
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

export default noAuth<ILogin>(Login);
