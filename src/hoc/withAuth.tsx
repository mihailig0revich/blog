import { Redirect } from 'react-router-dom';

function withAuth<T extends object>(Component: React.ComponentType<T>) {
  function WrappedComponent(props: T) {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/sign-in" />;
    }

    return <Component {...props} />;
  }
  return WrappedComponent;
}

export default withAuth;
