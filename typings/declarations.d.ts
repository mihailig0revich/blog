declare module '*.scss' {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module '*.svg' {
  const content: any;

  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module 'react-router-dom';
