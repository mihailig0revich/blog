import { CSSProperties, ReactElement, ReactNode } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { FieldErrorsImpl } from 'react-hook-form/dist/types/errors';

import style from './customCheckBox.module.scss';

interface ICheckBox {
  children: ReactNode | ReactElement;
  name: string;
  rule?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  error?: FieldErrorsImpl;
  styles?: CSSProperties;
}

function CustomCheckBox({ children, name, rule, styles, register, error }: ICheckBox) {
  const hasError = error && error[name];
  return (
    <div className={style.wrapper} style={styles}>
      <label className={style.container}>
        <input type="checkbox" {...register(name, rule)} />
        <span className={`${style.checkmark} ${hasError && style.checkmark_error}`}></span>
        <p className={style.text}>{children}</p>
      </label>
      {hasError && <p className={style.wrapper__error}>{error[name]?.message?.toString()}</p>}
    </div>
  );
}

export default CustomCheckBox;
