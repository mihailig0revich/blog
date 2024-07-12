import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { CSSProperties } from 'react';

import { getErrorMessage } from '../../../utils/utils';
import ErrorComponent from '../ErrorComponent/ErrorComponent';

import style from './customInput.module.scss';

interface ICustomInput {
  type: string;
  name: string;
  rule?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  error?: FieldErrors<FieldValues> | undefined;
  label?: string;
  styles?: CSSProperties;
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
  wrapperStyles?: CSSProperties;
}

function CustomInput({ register, name, error, rule, label, styles, type, rows, wrapperStyles, ...rest }: ICustomInput) {
  let textError: string | false = getErrorMessage(error, name);
  try {
    if (error) {
      textError = getErrorMessage(error, name);
    }
  } catch {
    return <ErrorComponent err="We apologize, we are already trying to fix the problem, check back later." />;
  }
  if (type === 'textarea') {
    console.log(textError);
    return (
      <div className={style.customInput} style={wrapperStyles}>
        <p className={style.customInput__label}>{label}</p>
        <textarea
          className={`${style.customInput__input} ${textError && style.customInput__input_error}`}
          rows={rows}
          style={{ ...styles }}
          {...register(name, rule)}
          {...rest}
        />
        {textError && <p className={style.customInput__error}>{textError}</p>}
      </div>
    );
  }
  return (
    <div className={style.customInput} style={styles}>
      <p className={style.customInput__label}>{label}</p>
      <input
        type={type}
        className={`${style.customInput__input} ${textError && style.customInput__input_error}`}
        {...register(name, rule)}
        {...rest}
      />
      {textError && <p className={style.customInput__error}>{textError}</p>}
    </div>
  );
}

export default CustomInput;
