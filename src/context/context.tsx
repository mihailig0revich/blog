import { createContext } from 'react';

import { AuthContextType } from '../types/types';

const AuthContext = createContext<AuthContextType>({
  auth: { username: '' },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearAuth: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setContextAuth: () => {},
});

export default AuthContext;
