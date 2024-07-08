import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';

import AuthCard from '../common/AuthCard/AuthCard';
import CustomInput from '../common/CustomInput/CustomInput';
import Button from '../common/Button/Button';
import CustomCheckBox from '../common/CustomCheckBox/CustomCheckBox';

import style from './registration.module.scss';

interface IRegistration {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function Registration({ errors, register, onSubmit }: IRegistration) {
  return (
    <AuthCard>
      <p className={style.login__title}>Create new account</p>
      <form noValidate onSubmit={onSubmit}>
        <CustomInput
          rule={{
            required: 'required field',
            minLength: { message: 'The username must be longer than 3 characters', value: 3 },
            maxLength: { message: 'The username must be shorter than 20 characters', value: 20 },
          }}
          error={errors}
          name="username"
          type="text"
          register={register}
          label="Username"
          placeholder="Username"
        />
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
          placeholder="Email Address"
        />
        <CustomInput
          rule={{
            required: 'required field',
            minLength: { message: 'The username must be longer than 6 characters', value: 6 },
            maxLength: { message: 'The username must be shorter than 40 characters', value: 40 },
          }}
          error={errors}
          name="password"
          type="text"
          register={register}
          label="Password"
          placeholder="Password"
        />
        <CustomInput
          rule={{
            required: 'required field',
            validate: (value, formValues) => {
              if (value === formValues.password) {
                return true;
              }
              return 'Password must match';
            },
          }}
          error={errors}
          name="repeatPassword"
          type="text"
          register={register}
          label="Repeat Password"
          placeholder="Password"
        />
        <div className={style.login__line}></div>
        <CustomCheckBox
          name="agree"
          error={errors}
          rule={{
            validate: (value) => {
              if (value) return true;
              return 'You must agree to the conditions';
            },
          }}
          register={register}
          styles={{ marginBottom: '21px', paddingBottom: 0 }}
        >
          I agree to the processing of my personal information
        </CustomCheckBox>
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
          Create
        </Button>
      </form>
      <p className={style.login__link}>
        Already have an account?{' '}
        <Link className={style.signUp} to="/sign-in">
          Sign In
        </Link>
        .
      </p>
    </AuthCard>
  );
}

export default Registration;
