export interface SignUp {
  username: string;
  email: string;
  password: string;
}

export interface Author {
  following: boolean;
  image: string;
  username: string;
  bio: string;
}

export interface PostType {
  author: Author;
  body: string;
  slug: string;
  title: string;
  description: string;
  tagList: (string | null)[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}

export interface UserLoginType {
  email: string;
  password: string;
}

export interface User {
  email?: string | undefined;
  token?: string;
  username: string;
  bio?: string | undefined;
  image?: null | string | undefined;
}

export interface AuthContextType {
  auth: User;
  clearAuth: () => void;
  setContextAuth: () => void;
}

export interface CurrentUser {
  user: User;
}

export interface RespType<T> {
  value: T | undefined;
  error: { message: string; status?: number } | undefined;
  loading: boolean | undefined;
  callback: (...i: any[]) => void;
}

export interface CreatePostType {
  title: string;
  description: string;
  body: string;
  tags: string[];
}
