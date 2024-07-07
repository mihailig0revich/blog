import { SignUp, UserLoginType } from '../types/types';

export default class Api {
  private url = 'https://blog.kata.academy/api/';

  getArticles(): Promise<any | unknown> {
    const popularUrl = `${this.url}/rticles?limit=10`;
    return fetch(popularUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token') || ''}`,
      },
    });
  }

  getArticleById(slug: string): Promise<any | unknown> {
    const popularUrl = `${this.url}articles/${slug}`;
    return fetch(popularUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
  }

  async registration(content: { user: SignUp }): Promise<any | unknown> {
    return fetch(`${this.url}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
  }

  checkAuth() {
    return fetch(`${this.url}user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token') || ''}`,
      },
    });
  }

  logIn(user: { user: UserLoginType }) {
    return fetch(`${this.url}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }
}
