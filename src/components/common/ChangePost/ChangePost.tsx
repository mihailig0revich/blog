import { useFieldArray, useForm } from 'react-hook-form';

import PostCard from '../PostCard/PostCard';
import Button from '../Button/Button';
import CustomInput from '../CustomInput/CustomInput';
import { CreatePostType, PostType, ValidateErrorTypes } from '../../../types/types';

import style from './changePost.module.scss';

type Tags = { value: string }[];

export interface Post {
  title: string;
  description: string;
  body: string;
  id: string;
  tags: Tags;
}

interface ICreatePost {
  post?: PostType | undefined;
  name: string;
  handleCreate: (i: CreatePostType) => void;
  loading: boolean | undefined;
  validateError: ValidateErrorTypes[];
}

function ChangePost({ name, post, handleCreate, loading, validateError }: ICreatePost) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<{ [key: string]: any }>({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
    defaultValues: {
      title: post?.title || '',
      description: post?.description || '',
      body: post?.body || '',
      tags: [
        ...((post &&
          post.tagList.map((val: string | null) => {
            return { value: val };
          })) || [{ value: '' }]),
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });
  validateError.forEach((err: ValidateErrorTypes) => setError(err[0], err[1]));
  const onSubmit = async (data: any) => {
    clearErrors();
    handleCreate({
      ...data,
      tagList: data.tags
        .filter((tag: { value: string }) => {
          return !!tag.value.replace(/\s+/g, '');
        })
        .map((val: { value: string }) => val.value.replace(/\s+/g, '')),
    });
  };
  return (
    <PostCard customStyles={{ padding: '48px 32px' }}>
      <p className={style.newArticle__title}>{name}</p>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={style.createPost}>
        <CustomInput
          rule={{
            required: 'required field',
          }}
          error={errors}
          name="title"
          type="text"
          register={register}
          placeholder="Title"
          label="Title"
        />
        <CustomInput
          rule={{
            required: 'required field',
          }}
          error={errors}
          name="description"
          type="text"
          register={register}
          label="Short description"
          placeholder="Description"
          defaultValue={post?.description}
          styles={{ marginBottom: '21px', paddingBottom: 0 }}
        />
        <CustomInput
          rule={{ required: 'required field' }}
          error={errors}
          name="body"
          type="textarea"
          register={register}
          label="Text"
          rows={5}
          wrapperStyles={{ marginBottom: '21px' }}
          defaultValue={post?.body}
          styles={{ paddingBottom: '21px', height: '170px', resize: 'none' }}
        />
        <div className={style.tag}>
          <ul className={style.tag__list}>
            {fields.map((tag, index) => (
              <li key={tag.id} className={style.tag__item}>
                <CustomInput
                  error={errors}
                  name={`tags.${index}.value`}
                  type="text"
                  register={register}
                  rule={{
                    required: 'required field',
                    validate: (value: string) => {
                      if (value.split(' ').length === 1) {
                        return true;
                      }
                      return 'Tag can contain only one word';
                    },
                  }}
                  defaultValue={tag.id}
                  styles={{
                    paddingBottom: 0,
                    margin: '0 17px 0 0',
                    maxWidth: '300px',
                    width: '100%',
                    resize: 'none',
                  }}
                />
                <Button
                  theme="danger"
                  handler={() => remove(index)}
                  customStyles={{
                    textAlign: 'center',
                    height: '40px',
                    width: '120px',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    margin: '0 17px 0 0',
                  }}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <div>
            <Button
              theme="add"
              customStyles={{
                textAlign: 'center',
                height: '40px',
                width: '140px',
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
              }}
              handler={() => append([{ value: '' }])}
            >
              Add tag
            </Button>
          </div>
        </div>
        <Button
          submit
          theme="submit"
          disabled={!!loading}
          customStyles={{
            textAlign: 'center',
            height: '40px',
            width: '320px',
            marginBottom: '8px',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
          }}
        >
          Send
        </Button>
      </form>
    </PostCard>
  );
}

export default ChangePost;
