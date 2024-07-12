import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../context/context';

function noAuth<T extends object>(Component: React.ComponentType<T>) {
  function WrappedComponent(props: T) {
    const auth = useContext(AuthContext);

    if (localStorage.getItem('token')) {
      return <Redirect to="" />;
    }

    return <Component {...props} />;
  }
  return WrappedComponent;
}

export default noAuth;
