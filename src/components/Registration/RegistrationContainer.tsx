import Api from '../../api/api';
import { SignUp } from '../../types/types';

import Registration from './Registration';

function RegistrationContainer() {
  const handleFetch = async (content: SignUp) => {
    const api = new Api();
    try {
      const response = await api.registration({ user: content });
      console.log(await response.json());
      if (response.ok) {
        /* empty */
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <Registration handleFetch={handleFetch} />;
}

export default RegistrationContainer;
