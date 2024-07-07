import { CSSProperties } from 'react';

import styles from './button.module.scss';

interface IButton {
  children: string | React.ReactNode | React.ReactElement;
  theme?: 'success' | 'danger' | 'normal' | 'hidden' | 'submit' | 'add';
  customStyles?: CSSProperties;
  handler?: () => void;
  submit?: boolean;
  disabled?: boolean;
}

const defaultStyles: CSSProperties = {
  fontSize: '18px',
  lineHeight: '28px',
  padding: '8px 18px',
};

const themeStyle = {
  success: {
    borderColor: '#52C41A',
    color: '#52C41A',
  },
  danger: {
    borderColor: '#F5222D',
    color: '#F5222D',
  },
  normal: {
    borderColor: 'black',
    color: 'black',
  },
  hidden: {
    border: 'none',
    color: 'black',
  },
  submit: {
    border: 'none',
    backgroundColor: '#1890FF',
    color: '#FFFFFF',
  },
  add: {
    borderColor: '#1890FF',
    color: '#1890FF',
  },
};

function Button({
  children,
  customStyles = defaultStyles,
  theme = 'normal',
  handler,
  submit = false,
  ...args
}: IButton) {
  return (
    <button
      className={styles.button}
      type={submit ? 'submit' : 'button'}
      onClick={handler}
      style={{
        ...customStyles,
        ...themeStyle[theme],
      }}
      {...args}
    >
      {children}
    </button>
  );
}

export default Button;
