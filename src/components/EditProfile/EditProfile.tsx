import { useForm } from 'react-hook-form';

import AuthCard from '../common/AuthCard/AuthCard';
import CustomInput from '../common/CustomInput/CustomInput';
import Button from '../common/Button/Button';
import { User, ValidateErrorTypes } from '../../types/types';

import style from './editProfile.module.scss';

interface IEditProfile {
  handleCreate: (data: User) => void;
  loading: boolean;
  user: User | undefined;
  validateError: ValidateErrorTypes[];
}

function EditProfile({ handleCreate, user, loading, validateError }: IEditProfile) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<any>({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      image: user?.image || '',
    },
  });
  validateError.forEach((err: ValidateErrorTypes) => setError(err[0], err[1]));
  const onSubmit = (data: any) => {
    clearErrors();
    handleCreate(data);
  };
  return (
    <AuthCard>
      <p className={style.editPost__title}>Edit Profile</p>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          rule={{ required: 'required field' }}
          error={errors}
          name="username"
          type="text"
          register={register}
          label="Username"
          placeholder="John Doe"
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
          label="Email address"
          placeholder="john@example.com"
        />
        <CustomInput
          rule={{
            required: 'required',
          }}
          error={errors}
          name="bio"
          type="text"
          register={register}
          label="Bio"
          placeholder="Bio"
        />
        <CustomInput
          rule={{
            pattern: {
              message: 'enter the correct URL',
              value: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i,
            },
          }}
          error={errors}
          name="image"
          type="text"
          register={register}
          label="Avatar image (url)"
          placeholder="Avatar image"
          styles={{ marginBottom: '21px', paddingBottom: 0 }}
        />
        <Button
          submit
          theme="submit"
          disabled={loading}
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
    </AuthCard>
  );
}

export default EditProfile;
