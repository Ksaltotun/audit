import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HashHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = searchParams.get('hash');
    if (hash) {
      Cookies.set('hash', hash, { expires: 10/1440 }); 
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
};

export default HashHandler;
