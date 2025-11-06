import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';

import { Issues } from './pages/Issues/Issues';

import { Analitics } from './pages/Analitics/Analitics';
import { Observ } from './pages/Observ/Observ';
import { Pings } from './pages/Pings/Pings';

import HashProtected from './service/security';
import HashHandler from './handler';

function App() {

  return (
    <BrowserRouter>
      <HashProtected>
        <HashHandler/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<MainPage />}>
            <Route path="analitics" element={<Analitics />} />
            <Route path="observe" element={<Observ />} />
            <Route index element={<Issues />} />
            <Route path="issues" element={<Issues />} />
            <Route path="pings" element={<Pings />} />
          </Route>
        </Routes>
      </HashProtected>
    </BrowserRouter>
  );
}

export default App;
