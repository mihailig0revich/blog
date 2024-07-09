import { createContext } from 'react';

import { AuthContextType } from '../types/types';

const AuthContext = createContext<AuthContextType>({
  auth: { username: '' },
  clearAuth: () => undefined,
  setContextAuth: () => undefined,
});

export default AuthContext;
