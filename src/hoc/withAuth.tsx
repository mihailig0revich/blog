import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../context/context';

function withAuth<T extends object>(Component: React.ComponentType<T>) {
  function WrappedComponent(props: T) {
    const auth = useContext(AuthContext);

    if (!auth.auth.username) return <Redirect to="/sign-in" />;

    return <Component {...props} />;
  }
  return WrappedComponent;
}

export default withAuth;
