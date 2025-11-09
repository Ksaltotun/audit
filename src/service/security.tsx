import React from 'react';
import Cookies from 'js-cookie';
import Error401 from '../pages/Errors/Error401';

interface CsrfProtectedProps {
  children: React.ReactNode;
}

const HashProtected: React.FC<CsrfProtectedProps> = ({ children }) => {

  const hash = Cookies.get('hash');
  console.dir(Cookies.get('hash'))

  const searchParams = new URLSearchParams(window.location.search);
  const hashFromQuery = searchParams.get('hash');
  

  if (!hash && !hashFromQuery) {
    return (
     <Error401 error={'Нет куки безопасности, попробуйте еще раз'}/>
    );
  }
  return <>{children}</>;
};

export default HashProtected;

