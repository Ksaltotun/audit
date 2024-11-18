import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Issues } from './pages/Issues/Issues';
import { Schema } from './pages/Schema/Schema';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="main" element={<MainPage />}>
          <Route index element={<AdminPage />} />
          <Route path="*" element={<AdminPage />} />
          <Route path="issues" element={<Issues />} />
          <Route path="schema" element={<Schema />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
