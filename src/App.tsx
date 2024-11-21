import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Issues } from './pages/Issues/Issues';
import { Schema } from './pages/Schema/Schema';
import { Analitics } from './pages/Analitics/Analitics';
import { Observ } from './pages/Observ/Observ';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="main" element={<MainPage />}>
          <Route index element={<AdminPage />} />
          <Route path="*" element={<AdminPage />} />
          <Route path="analitics" element={<Analitics />} />
          <Route path="observe" element={<Observ />} />
          <Route path="issues" element={<Issues />} />
          <Route path="schema" element={<Schema />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
