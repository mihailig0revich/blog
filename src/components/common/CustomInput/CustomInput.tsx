import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { CSSProperties } from 'react';

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
}

function CustomInput({ register, name, error, rule, label, styles, type, rows, ...rest }: ICustomInput) {
  const hasError = error && error[name];
  if (type === 'textarea') {
    return (
      <div className={style.customInput} style={styles}>
        <p className={style.customInput__label}>{label}</p>
        <textarea
          className={`${style.customInput__input} ${hasError && style.customInput__input_error}`}
          rows={rows}
          style={{ ...styles }}
          {...register(name, rule)}
          {...rest}
        />
        {hasError && <p className={style.customInput__error}>{error[name]?.message?.toString()}</p>}
      </div>
    );
  }
  return (
    <div className={style.customInput} style={styles}>
      <p className={style.customInput__label}>{label}</p>
      <input
        type={type}
        className={`${style.customInput__input} ${hasError && style.customInput__input_error}`}
        {...register(name, rule)}
        {...rest}
      />
      {hasError && <p className={style.customInput__error}>{error[name]?.message?.toString()}</p>}
    </div>
  );
}

export default CustomInput;
