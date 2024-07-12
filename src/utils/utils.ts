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

export function getErrorMessage(objError: any, name: string): string | false {
  const errorNames = name.split('.');
  if (!objError[errorNames[0]]) return false;
  if (errorNames.length === 1) {
    return (objError as any)[name].message;
  }
  if (errorNames.length > 1) {
    let error: any = objError;
    for (let i = 0; i < errorNames.length; i += 1) {
      if (Number.isNaN(+errorNames[i])) {
        error = error[errorNames[i]];
      } else {
        console.log(error);
        error = error[+errorNames[i]];
      }
      if (!error) return false;
    }
    return error.message;
  }
  return false;
}
