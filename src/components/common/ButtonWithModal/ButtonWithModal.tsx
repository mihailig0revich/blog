import { CSSProperties, useState } from 'react';

import Button from '../Button/Button';

import styles from './buttonWithModal.module.scss';

interface IButtonWithModal {
  children: string | React.ReactNode | React.ReactElement;
  theme?: 'success' | 'danger' | 'normal' | 'hidden' | 'submit' | 'add';
  customStyles?: CSSProperties;
  handler?: () => void;
  submit?: boolean;
  disabled?: boolean;
}

const btnsStyles: CSSProperties = {
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  textAlign: 'center',
};

function ButtonWithModal({ children, handler, ...args }: IButtonWithModal) {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={styles.wrapper}>
      <Button handler={() => setHidden(!hidden)} {...args}>
        {children}
      </Button>
      {hidden || (
        <div className={`${styles.modal} ${styles.modal_visible}`}>
          <div className={styles.modal__text}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM7.5 4.625C7.5 4.55625 7.55625 4.5 7.625 4.5H8.375C8.44375 4.5 8.5 4.55625 8.5 4.625V8.875C8.5 8.94375 8.44375 9 8.375 9H7.625C7.55625 9 7.5 8.94375 7.5 8.875V4.625ZM8 11.5C7.80374 11.496 7.61687 11.4152 7.47948 11.275C7.3421 11.1348 7.26515 10.9463 7.26515 10.75C7.26515 10.5537 7.3421 10.3652 7.47948 10.225C7.61687 10.0848 7.80374 10.004 8 10C8.19626 10.004 8.38313 10.0848 8.52052 10.225C8.6579 10.3652 8.73485 10.5537 8.73485 10.75C8.73485 10.9463 8.6579 11.1348 8.52052 11.275C8.38313 11.4152 8.19626 11.496 8 11.5Z"
                fill="#FAAD14"
              />
            </svg>
            <p>Are you sure to delete this article?</p>
          </div>
          <div className={styles.modal__btns}>
            <Button handler={() => setHidden(true)} customStyles={btnsStyles} theme="normal">
              No
            </Button>
            <Button handler={handler} customStyles={btnsStyles} theme="submit">
              Yes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonWithModal;
