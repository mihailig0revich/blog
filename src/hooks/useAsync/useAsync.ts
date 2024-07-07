import { useState } from 'react';

import { simpleObject } from '../../utils/utils';
import { RespType } from '../../types/types';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
};

export default function useAsync<T>(options: any = {}): RespType<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<T>();

  const callback = async (params: { body?: string; url: string }) => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);

    const baseUrl = 'https://blog.kata.academy/api';

    const fetchUrl = `${baseUrl}${params.url}`;
    const fetchOptions = params.body
      ? { ...DEFAULT_OPTIONS, ...options, body: params.body }
      : { ...DEFAULT_OPTIONS, ...options };

    await fetch(fetchUrl, fetchOptions)
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(setValue)
      .catch((error) => setError(simpleObject(error)))
      .finally(() => setLoading(false));
  };

  return { loading, error, value, callback };
}
