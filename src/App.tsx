import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';

import { Issues } from './pages/Issues/Issues';

import { Analitics } from './pages/Analitics/Analitics';
import { Observ } from './pages/Observ/Observ';
import { Pings } from './pages/Pings/Pings';

import HashProtected from './service/security';
import HashHandler from './handler';
import Error403 from './pages/Errors/Error403';
import Error401 from './pages/Errors/Error401';
import Error404 from './pages/Errors/Error404';
import Error500 from './pages/Errors/Error500';
import Error from './pages/Errors/Error';
function App() {

  return (
    <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='401' element={<Error401 error={null}/>} />
          <Route path='403' element={<Error403 />} />
          <Route path='404' element={<Error404 />} />
          <Route path='500' element={<Error500 />} />
          <Route path='error' element={<Error />} />
          <Route element={<MainPage />}>
            <Route path="analitics" element={<Analitics />} />
            <Route path="observe" element={<Observ />} />
            <Route index element={<Issues />} />
            <Route path="issues" element={<Issues />} />
            <Route path="pings" element={<Pings />} />
          </Route>
        </Routes>

    </BrowserRouter>
  );
}

export default App;
