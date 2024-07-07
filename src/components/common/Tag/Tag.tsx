import style from './tag.module.scss';

interface ITag {
  text: string;
}

function Tag({ text }: ITag) {
  return <span className={style.tag}>{text}</span>;
}

export default Tag;
