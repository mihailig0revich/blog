import { User } from '../types/types';

export function formatAuth(resp: { user: User }) {
  return {
    email: resp.user?.email,
    username: resp.user.username,
    bio: resp.user?.bio,
    image: resp.user?.image,
  };
}

export function simpleObject(obj: any): object {
  const keys = Object.keys(obj);
  const newObj: any = {};
  for (let i = 0; i < keys.length; i += 1) {
    if (typeof obj[keys[i]] !== 'object') {
      newObj[keys[i]] = obj[keys[i]];
    } else {
      return { ...newObj, ...simpleObject(obj[keys[i]]) };
    }
  }
  return newObj;
}

export function calculatePage(value: number, page: number): number {
  return Math.ceil(value / page);
}
