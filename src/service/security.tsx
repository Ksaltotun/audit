import React from 'react';
import Cookies from 'js-cookie';

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
      <div>
        <h1>Ошибка безопасности</h1>
        <p>Для работы с приложением необходимо включить куки и обновить страницу. </p>
      </div>
    );
  }
  return <>{children}</>;
};

export default HashProtected;

